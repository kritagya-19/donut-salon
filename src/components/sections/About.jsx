import { ABOUT_MAIN_IMAGE, ABOUT_SECONDARY_IMAGE } from '../../data/constants';
import { Sparkles, Star } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 bg-stone-100 relative overflow-hidden">
      {/* Subtle Noise/Texture specific to this section */}
      <div className="absolute inset-0 opacity-[0.4] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1 mt-12 lg:mt-0">
            <div className="relative z-10">
              <img 
                src={ABOUT_MAIN_IMAGE} 
                alt="Premium Salon Interior" 
                className="rounded-[2rem] shadow-2xl w-full object-cover h-[500px]"
              />
            </div>
            <div className="absolute -bottom-12 -right-4 lg:-right-12 w-2/3 border-8 border-white rounded-[2rem] shadow-xl z-20 hidden md:block">
              <img 
                src={ABOUT_SECONDARY_IMAGE} 
                alt="Detailed care" 
                className="rounded-2xl w-full h-[250px] object-cover"
              />
            </div>
            <div className="absolute -top-6 -left-6 lg:top-10 lg:-left-10 bg-rose-500 text-white p-6 rounded-2xl shadow-lg z-30 transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <p className="text-3xl font-serif font-bold text-center">5+</p>
              <p className="text-xs uppercase tracking-widest font-medium text-center">Years of<br/>Excellence</p>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-rose-500 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">The Donut Difference</span>
            {/* COPYWRITING UPDATE: Emotional Headline & Trust Building */}
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              Not Just a Service. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600">A Sweet Escape.</span>
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We know the anxiety of trying a new salon. Will they listen? Will it look good? At Donut Salon, we replace that fear with trust.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed mb-10">
              Why "Donut"? Because life is short, and you deserve a treat. We aren't just a salon; we are the pause button in your busy life in <span className="font-semibold text-gray-900">Mahalaxmi Nagar</span>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Sparkles className="w-6 h-6 text-rose-500" />
                 </div>
                 <div>
                    <h4 className="font-serif font-bold text-xl text-gray-900 mb-1">We Listen First</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">We consult before we cut. Your vision is our blueprint.</p>
                 </div>
              </div>
              <div className="flex gap-4">
                 <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm">
                    <Star className="w-6 h-6 text-rose-500" />
                 </div>
                 <div>
                    <h4 className="font-serif font-bold text-xl text-gray-900 mb-1">Global Brands</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">No generic products. Only top-tier care for your hair & skin.</p>
                 </div>
              </div>
            </div>
            <div className="flex items-center gap-6">
               <div className="h-px bg-gray-300 flex-grow"></div>
               <span className="font-serif italic text-gray-400 text-lg">Indore's Finest</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
