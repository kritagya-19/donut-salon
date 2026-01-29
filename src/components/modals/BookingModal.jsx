import { useState } from 'react';
import { X, CheckCircle, AlertCircle } from 'lucide-react';
import { WHATSAPP_BOOKING_LINK, API_URL } from '../../data/constants';

const BookingModal = ({ isOpen, onClose }) => {
    const [bookingStatus, setBookingStatus] = useState('idle'); // idle, loading, success, unavailable, error
    const [alternatives, setAlternatives] = useState([]); // Added for availability handling
  
    const handleBookingSubmit = async (e) => {
      e.preventDefault();
      setBookingStatus('loading');
      setAlternatives([]);
  
      // 1. Capture Form Data
      const formData = new FormData(e.target);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'), // ADDED: Email field
        phone: formData.get('phone'),
        service: formData.get('service'),
        date: formData.get('date'),
        time: formData.get('time')
      };
  
      // 1.5. Validate Phone Number
      const phoneRegex = /^[0-9]{10}$/;
      if (!phoneRegex.test(data.phone.replace(/\D/g, ''))) {
        alert("Please enter a valid 10-digit WhatsApp number.");
        setBookingStatus('idle');
        return;
      }
  
      // 1.6 Validate Time (8 AM to 8 PM)
      if (data.time) {
        const [hours, minutes] = data.time.split(':').map(Number);
        if (hours < 8 || hours >= 20 || (hours === 20 && minutes > 0)) {
          alert("Please select a time between 8:00 AM and 8:00 PM.");
          setBookingStatus('idle');
          return;
        }
      }
  
      // 2. Send to Backend
      try {
        const response = await fetch(`${API_URL}/api/book`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        const result = await response.json();
  
        if (result.success) {
          setBookingStatus('success');
          
          setTimeout(() => {
              onClose();
              setBookingStatus('idle');
              setAlternatives([]);
          }, 3000);
        } else {
          // Handle Unavailable / Error
          if (result.alternatives) {
            setAlternatives(result.alternatives);
            setBookingStatus('unavailable');
          } else {
            alert(result.message || "Something went wrong.");
            setBookingStatus('idle');
          }
        }
  
      } catch (error) {
         console.error('Error!', error);
         alert("Failed to connect to the server. Please try again.");
         setBookingStatus('idle');
      }
    };
  
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          ></div>
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-fade-in-up">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-pink-600"></div>
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 p-2 bg-gray-100 rounded-full hover:bg-rose-100 hover:text-rose-500 transition-colors z-20"
            >
              <X size={20} />
            </button>
            <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-2">Reserve Your Spot</h3>
                <p className="text-gray-500">Fill in the details below.</p>
              </div>
              {bookingStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center animate-fade-in py-12">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600 w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Thanks!</h3>
                  <p className="text-green-700 mb-6">We’ll confirm your appointment shortly via email.</p>
                </div>
              ) : bookingStatus === 'unavailable' ? (
                 <div className="bg-rose-50 border border-rose-200 rounded-2xl p-8 text-center animate-fade-in py-8">
                  <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="text-rose-600 w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Slot Unavailable</h3>
                  <p className="text-gray-600 mb-6">That time is fully booked. Please try these available times:</p>
                  
                  <div className="flex flex-wrap gap-3 justify-center mb-6">
                    {alternatives.map((time, i) => (
                      <button 
                        key={i}
                        type="button"
                        onClick={() => {
                          setBookingStatus('idle');
                        }}
                        className="bg-white border border-rose-200 text-rose-600 px-4 py-2 rounded-lg font-bold hover:bg-rose-500 hover:text-white transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={() => setBookingStatus('idle')}
                    className="text-sm text-gray-500 underline hover:text-gray-900"
                  >
                    Go back and choose another time
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                    <input 
                      name="name"
                      type="text" 
                      required 
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all bg-gray-50 hover:bg-white"
                      placeholder="Jane Doe"
                    />
                  </div>
                   <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
                    <input 
                      name="email"
                      type="email" 
                      required 
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all bg-gray-50 hover:bg-white"
                      placeholder="hello@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Number</label>
                    <input 
                      name="phone"
                      type="tel" 
                      required 
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all bg-gray-50 hover:bg-white"
                      placeholder="e.g. 98765 43210"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Date</label>
                      <input 
                        name="date"
                        type="date" 
                        required 
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all bg-gray-50 hover:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Time (8 AM - 8 PM)</label>
                      <input 
                        name="time"
                        type="time" 
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all bg-gray-50 hover:bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Service Required</label>
                    <div className="relative">
                      <select name="service" required className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all bg-gray-50 hover:bg-white appearance-none cursor-pointer">
                        <option value="">Select a service...</option>
                        <option value="Haircut">Haircut</option>
                        <option value="Hair Color">Hair Color</option>
                        <option value="Facial">Facial</option>
                        <option value="Spa">Spa</option>
                        <option value="Bridal">Bridal</option>
                        <option value="Nail Art">Nail Art</option>
                        <option value="Other">Other</option>
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-gray-500">
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                      </div>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={bookingStatus === 'loading'}
                    className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-rose-500/30 transition-all transform hover:-translate-y-1 mt-4 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {bookingStatus === 'loading' ? (
                      <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : (
                      'Confirm Request'
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
    );
};

export default BookingModal;
