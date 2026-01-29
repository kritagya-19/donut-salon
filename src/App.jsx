import { useState } from 'react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Services from './components/sections/Services';
import Testimonials from './components/sections/Testimonials';
import BookingCTA from './components/sections/BookingCTA';
import Footer from './components/layout/Footer';
import BookingModal from './components/modals/BookingModal';
import MenuModal from './components/modals/MenuModal';
import { LOGO_URL } from './data/constants';

// --- Main Page Component ---

const DonutSalon = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="font-sans text-gray-800 bg-white selection:bg-rose-200 relative">
      
      {/* Global Grain Texture Overlay */}
      <div className="fixed inset-0 z-[60] pointer-events-none opacity-[0.04] mix-blend-multiply" 
           style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/stardust.png")` }}>
      </div>

      {/* Top Left Logo */}
      <div className="absolute top-8 left-6 md:left-12 z-50 animate-fade-in-up">
        <div className="flex items-center gap-3">
          <img 
            src={LOGO_URL} 
            alt="Donut Salon Logo" 
            className="w-12 h-12 rounded-full object-cover shadow-lg shadow-rose-500/30"
          />
          <span className="text-2xl font-serif font-bold tracking-tight text-gray-900">
            Donut <span className="text-rose-500 italic">Salon</span>
          </span>
        </div>
      </div>

      <Hero onOpenModal={() => setIsModalOpen(true)} />
      
      <About />

      <Services onOpenModal={() => setIsModalOpen(true)} />

      <Testimonials />

      <BookingCTA onOpenModal={() => setIsModalOpen(true)} />

      {/* Footer */}
      <Footer
        logo={<img src={LOGO_URL} alt="Logo" className="w-10 h-10 rounded-full object-cover shadow-lg" />}
        brandName="Donut Salon"
        socialLinks={[
          {
            icon: <Instagram className="h-5 w-5" />,
            href: "https://instagram.com",
            label: "Instagram",
          },
          {
            icon: <Facebook className="h-5 w-5" />,
            href: "https://facebook.com",
            label: "Facebook",
          },
          {
            icon: <MessageCircle className="h-5 w-5" />,
            href: "https://wa.me/917222989610",
            label: "WhatsApp",
          },
        ]}
        mainLinks={[]}
        legalLinks={[
          { href: "#", label: "Privacy Policy" },
          { href: "#", label: "Terms of Service" },
          { href: "https://www.linkedin.com/in/kritagya-jaiswal/", label: "Developed by Kritagya Jaiswal" },
        ]}
        copyright={{
          text: `© ${new Date().getFullYear()} Donut Salon`,
          license: "All rights reserved",
        }}
      />

      <MenuModal 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)} 
        onBookClick={() => {
            setIsMenuOpen(false);
            setIsModalOpen(true);
        }}
      />

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default DonutSalon;