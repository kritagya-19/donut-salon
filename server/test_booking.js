// test_booking.js
import fetch from 'node-fetch'; // You might need to install node-fetch if using older node, but usually fetch is global in 18+
// If running with node 18+, fetch is available.

const testBooking = async () => {
    console.log("Testing Booking API...");
    try {
        const response = await fetch('http://localhost:5000/api/book', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: "Test User",
                phone: "1234567890",
                email: "kritagyajaiswal0@gmail.com", // Valid email for real test
                service: "Makeup",
                date: new Date().toISOString().split('T')[0], // Today
                time: "10:00" // 10 AM
            })
        });

        const data = await response.json();
        console.log("Response:", data);
        if (data.success) {
            console.log("✅ Booking Successful!");
        } else {
            console.log("❌ Booking Failed:", data.message);
            if (data.alternatives) console.log("Alternatives:", data.alternatives);
        }
    } catch (error) {
        console.error("Connection Error:", error);
    }
};

testBooking();
