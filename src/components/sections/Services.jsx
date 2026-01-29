import { displayServices } from '../../data/services';
import { ArrowRight } from 'lucide-react';

const Services = ({ onOpenModal }) => {
  return (
    <section id="services" className="py-32 bg-white relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px)] bg-[size:60px_100%]"></div>
      <div className="absolute -left-20 top-40 w-96 h-96 bg-rose-50/50 rounded-full blur-[100px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <span className="text-rose-500 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Our Expertise</span>
            {/* COPYWRITING UPDATE: Benefit-driven headline */}
            <h2 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 leading-tight">
              Expert Treatments <br/>
              <span className="italic text-rose-400">For The Modern You.</span>
            </h2>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {displayServices.map((service, index) => (
            <div 
              key={index}
              onClick={onOpenModal}
              className="group relative h-[500px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl shadow-gray-200 cursor-pointer"
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-10 flex flex-col justify-end text-white">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/20">
                    {service.category}
                  </span>
                  <h3 className="text-3xl font-serif font-bold mb-3">{service.title}</h3>
                  <p className="text-white/80 text-lg leading-relaxed mb-6 line-clamp-2">
                    {service.desc}
                  </p>
                  
                  <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-rose-300 group-hover:text-rose-200 transition-colors">
                    Reserve Now <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
