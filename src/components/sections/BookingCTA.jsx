import { Calendar, Sparkles } from 'lucide-react';
import { WHATSAPP_BOOKING_LINK } from '../../data/constants';

const BookingCTA = ({ onOpenModal }) => {
    return (
        <section id="book" className="py-32 bg-rose-50/50 relative overflow-hidden">
            {/* Abstract shapes in background */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white rounded-full blur-3xl opacity-60 translate-x-1/3 -translate-y-1/3"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-100 rounded-full blur-3xl opacity-60 -translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="relative overflow-hidden rounded-[3rem] bg-gray-900 shadow-2xl flex flex-col items-center text-center p-12 md:p-24 group">
                    <div className="absolute inset-0 z-0">
                        <img 
                        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=2574&auto=format&fit=crop" 
                        alt="Luxury Salon Interior" 
                        className="w-full h-full object-cover opacity-30 group-hover:scale-105 transition-transform duration-1000 saturate-0 group-hover:saturate-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/80 to-transparent"></div>
                    </div>
                    <div className="relative z-10 w-full max-w-2xl mx-auto">
                        <div className="inline-block p-4 rounded-full bg-white/5 backdrop-blur-md mb-8 border border-white/10">
                        <Sparkles className="w-8 h-8 text-rose-300" />
                        </div>
                        {/* COPYWRITING UPDATE: Urgency and Ease */}
                        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 leading-tight">
                        Your Transformation is <span className="text-rose-300 italic">One Click Away.</span>
                        </h2>
                        <p className="text-gray-300 text-xl mb-12 leading-relaxed font-light">
                        Our calendar fills up fast because we prioritize quality over quantity. Don't wait for a special occasion to look your best.
                        </p>
                        <button 
                        onClick={onOpenModal}
                        className="bg-white text-gray-900 hover:bg-rose-50 text-xl font-bold py-5 px-12 rounded-full shadow-2xl shadow-white/5 transition-all transform hover:-translate-y-1 hover:scale-105 flex items-center justify-center gap-3 mx-auto"
                        >
                        <Calendar className="w-6 h-6 text-rose-500" />
                        Book My VIP Session
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BookingCTA;
