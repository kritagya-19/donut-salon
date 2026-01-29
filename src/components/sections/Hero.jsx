import { motion } from "framer-motion";
import { Star, Calendar } from 'lucide-react';
import { LOGO_URL, WHATSAPP_BOOKING_LINK } from '../../data/constants';

const Hero = ({ onOpenModal }) => {
  return (
    <header className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-white">
      {/* Soft Warm Gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-50/60 blur-[120px] rounded-full transform translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-stone-100/80 blur-[100px] rounded-full transform -translate-x-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Centered Content Container */}
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-rose-100 rounded-full px-4 py-1.5 mb-8 shadow-sm animate-fade-in-up">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
              <span className="text-xs font-bold tracking-wide text-gray-600 uppercase">Voted Indore's Most Trusted Salon</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-gray-900 leading-[1.1] mb-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              Beauty That <br />
              <span className="relative inline-block">
                Empowers
                {/* Animated Curved Underline */}
                <svg 
                  className="absolute w-[110%] h-6 -bottom-2 -left-[5%] text-rose-300/80 -z-10" 
                  viewBox="0 0 100 20" 
                  preserveAspectRatio="none"
                >
                  <motion.path 
                    d="M0 10 Q 50 25 100 10" 
                    stroke="currentColor" 
                    strokeWidth="8" 
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 1.5, delay: 0.8, ease: "easeOut" }}
                  />
                </svg>
              </span> 
              <span className="text-rose-500 italic ml-4">You.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              You work hard. You deserve a look that works harder. Step into Donut Salon for a transformation that feels as good as it looks. Expert care, zero compromises.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <button 
                onClick={onOpenModal}
                className="bg-rose-500 hover:bg-rose-600 text-white px-10 py-5 rounded-full font-bold text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-rose-500/20 flex items-center justify-center gap-3"
              >
                <Calendar className="w-5 h-5" /> Secure My Session
              </button>
              <a 
                href="#services" 
                className="bg-white border border-gray-200 hover:border-rose-200 text-gray-900 px-10 py-5 rounded-full font-bold text-lg transition-all hover:bg-rose-50 flex items-center justify-center gap-3"
              >
                View Menu
              </a>
          </div>

          {/* Social Proof */}
          <div className="mt-12 flex flex-col items-center gap-3 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <img key={i} className="w-12 h-12 rounded-full border-4 border-white object-cover" src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="Client" />
                ))}
              </div>
              <div className="text-sm">
                <div className="flex text-yellow-400 justify-center mb-1">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-gray-500 font-medium"><span className="text-gray-900 font-bold">2,000+</span> Women Trust Us</p>
              </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Hero;
