import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';
import dayjs from 'dayjs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// --- Configuration ---
const CREDENTIALS = process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS 
  ? JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_CREDENTIALS) 
  : null;

const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const MAX_SEATS = 6;
const SALON_OPEN_HOUR = 8;
const SALON_CLOSE_HOUR = 20;

// Google Auth
// Google Auth
if (CREDENTIALS && CREDENTIALS.private_key) {
  // Fix newline formatting if it was escaped in the .env JSON
  CREDENTIALS.private_key = CREDENTIALS.private_key.replace(/\\n/g, '\n');
}

const auth = CREDENTIALS ? new google.auth.JWT(
  CREDENTIALS.client_email,
  null,
  CREDENTIALS.private_key,
  ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/spreadsheets']
) : null;

const calendar = google.calendar({ version: 'v3', auth });
const sheets = google.sheets({ version: 'v4', auth });

// Service Durations (Minutes)
const SERVICE_DURATIONS = {
  "Makeup": 90,
  "Hair Removal": 30,
  "Skin Care": 60,
  "Nail": 60,
  "Hair Care": 60,
  "Mehndi": 90,
  "Grooming": 45,
  "Hairstyling": 60, // Mapped 'Hairstyling' to Hair Care duration as default
  "Other": 60 // Default
};

// --- Helpers ---

// Calculate End Time
const getEndTime = (startTime, durationMinutes) => {
  return dayjs(startTime).add(durationMinutes, 'minute');
};

// Check if time is within Salon hours
const isWithinHours = (start, end) => {
  const s = dayjs(start);
  const e = dayjs(end);
  return s.hour() >= SALON_OPEN_HOUR && e.hour() < SALON_CLOSE_HOUR && !(e.hour() === SALON_CLOSE_HOUR && e.minute() > 0);
};

// Helper: Check Availability (Mockable)
const checkAvailability = async (startTime, endTime) => {
  if (!CREDENTIALS) {
    console.warn("⚠️ No Credentials found. Mocking Availability as TRUE.");
    return { available: true };
  }

  try {
    const response = await calendar.events.list({
      calendarId: CALENDAR_ID,
      timeMin: startTime.toISOString(),
      timeMax: endTime.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];
    
    // Simple Overlap Logic: Count events that overlap with requested time
    // A simplistic approach usually counts how many events are active AT THE SAME TIME.
    // However, the rule says: "If 6 overlapping events exist, slot is FULL".
    // We strictly follow the rule: Count ALL overlapping events in this window.
    // Ideally, we start counting min-cut or max-overlap, but "count overlapping events" 
    // often implies "are there ever 6 people at once?".
    // We will check if at any point in the interval, concurrency >= 6.
    
    // We'll scan minute by minute (or 5 min chunks) to find max concurrency? 
    // Or simpler: just count total overlaps? The prompt says "If 6 overlapping events exist".
    // I will interpret this as: "If there are 6 existing appointments that overlap with the filtered time range".
    // This assumes if 6 people are served in that window *at any point*, we preserve the quality.
    
    const overlapCount = events.length;
    console.log(`📅 Checking ${startTime.toISOString()} to ${endTime.toISOString()}`);
    console.log(`   Found ${overlapCount} overlapping events.`);

    if (overlapCount >= MAX_SEATS) {
        console.log("   ❌ Slot FULL.");
        return { available: false };
    }
    console.log("   ✅ Slot AVAILABLE.");
    return { available: true };

  } catch (error) {
    console.error("❌ Error checking availability:", error.message);
    if (error.errors) console.error("Details:", JSON.stringify(error.errors, null, 2));
    // Fail safe: Block if error? Or allow? Let's Block to be safe.
    return { available: false, error: true };
  }
};

// Find Alternatives
const findAlternatives = async (requestedDate, duration) => {
  const alternatives = [];
  let attemptTime = dayjs(requestedDate).hour(SALON_OPEN_HOUR).minute(0).second(0);
  const endTimeBoundary = dayjs(requestedDate).hour(SALON_CLOSE_HOUR).minute(0).second(0);

  // Scan the whole day
  while (attemptTime.isBefore(endTimeBoundary)) {
    const attemptEnd = attemptTime.add(duration, 'minute');
    if (attemptEnd.isAfter(endTimeBoundary)) break;

    const { available } = await checkAvailability(attemptTime, attemptEnd);
    if (available) {
      alternatives.push(attemptTime.format('HH:mm'));
    }
    
    if (alternatives.length >= 3) break; // Return top 3
    attemptTime = attemptTime.add(30, 'minute');
  }
  return alternatives;
};

// Append to Sheets
const logToSheets = async (data, status, reason = "") => {
  if (!CREDENTIALS || !SHEET_ID) return;
  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A:K',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[
          data.name, data.phone, data.email, data.date, data.startTime, data.endTime,
          data.service, data.duration, status, data.source || 'Website', reason, new Date().toISOString()
        ]]
      }
    });
  } catch (err) {
    console.error("Error logging to sheets:", err);
  }
};

// Send Email
const sendEmail = async (to, subject, text) => {
    // Configure Transporter (Requires Env Vars)
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        console.warn("⚠️ Email not configured. Skipping email.");
        return;
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or host/port from env
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        await transporter.sendMail({
            from: `"Donut Salon" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text
        });
        console.log(`Email sent to ${to}`);
    } catch (err) {
        console.error("Error sending email:", err);
    }
};


// --- Routes ---

app.post('/api/book', async (req, res) => {
  try {
    const { name, phone, email, service, date, time } = req.body;

    const mapService = (s) => {
        if (SERVICE_DURATIONS[s]) return s;
        if (s === "Hairstyling") return "Hair Care"; // Map generic to specific if needed
        return "Other";
    };
    
    const duration = SERVICE_DURATIONS[mapService(service)] || 60;
    
    const startDateTime = dayjs(`${date} ${time}`);
    const endDateTime = getEndTime(startDateTime, duration);

    // 1. Validate Time
    if (!isWithinHours(startDateTime, endDateTime)) {
        return res.status(400).json({ 
            success: false, 
            message: "Slot outside working hours (8 AM - 8 PM)." 
        });
    }

    // 2. Check Availability
    const { available } = await checkAvailability(startDateTime, endDateTime);

    if (!available) {
        // Find Alternatives
        const alternatives = await findAlternatives(date, duration);
        
        // Log Rejection
        await logToSheets({
            name, phone, email, date, startTime: time, endTime: endDateTime.format('HH:mm'),
            service, duration, source: 'Website'
        }, 'Rejected', 'Slot Full');

        return res.json({
            success: false,
            message: "This time slot is unavailable.",
            alternatives
        });
    }

    // 3. Book Slot (Create Event)
    if (CREDENTIALS) {
        await calendar.events.insert({
            calendarId: CALENDAR_ID,
            requestBody: {
                summary: `${name} - ${service}`,
                description: `Phone: ${phone}\nEmail: ${email}\nService: ${service}`,
                start: { dateTime: startDateTime.toISOString() },
                end: { dateTime: endDateTime.toISOString() },
            }
        });
    } else {
        console.warn("⚠️ Mocking Calendar Event Creation");
    }

    // 4. Log Success
    await logToSheets({
        name, phone, email, date, startTime: time, endTime: endDateTime.format('HH:mm'),
        service, duration, source: 'Website'
    }, 'Confirmed');

    // 5. Send Email
    const emailMsg = `Hi ${name} 👋\n\nYour ${service} appointment is CONFIRMED ✅\n\n📅 ${date}\n⏰ ${time} – ${endDateTime.format('HH:mm')}\n\n– Donut Salon`;
    await sendEmail(email, "Appointment Confirmed - Donut Salon", emailMsg);

    // 6. Notify Receptionist
    const msgToReception = `🔔 New Appointment Alert!\n\nCustomer: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\nDate: ${date}\nTime: ${time} – ${endDateTime.format('HH:mm')}\nDuration: ${duration} mins\n\n✅ Calendar Event Created`;
    
    const RECEPTION_EMAIL = process.env.RECEPTION_EMAIL || process.env.EMAIL_USER;
    if (RECEPTION_EMAIL) {
        await sendEmail(RECEPTION_EMAIL, "🔔 New Booking: " + name, msgToReception);
    }

    return res.json({ success: true, message: "Appointment Confirmed!" });

  } catch (error) {
    console.error("❌ Error in Processing:", error.message);
    
    // Handle Google Permission Errors specifically
    if (error.code === 403 || (error.errors && error.errors[0]?.reason === 'requiredAccessLevel')) {
        return res.status(500).json({ 
            success: false, 
            message: "Configuration Error: The system does not have 'Write' permission to the Google Calendar. Please check sharing settings." 
        });
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
