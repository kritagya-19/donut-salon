import { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { minimalTestimonials } from '../../data/testimonials';

const Testimonials = () => {
    const [active, setActive] = useState(0);

    return (
      <section id="testimonials" className="py-24 bg-stone-50/50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
             <span className="text-rose-500 font-bold uppercase tracking-[0.2em] text-sm mb-4 block">Testimonials</span>
             <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
               Voices of Beauty
             </h2>
             <p className="text-gray-500 text-lg font-light max-w-lg mx-auto">
               Real experiences from our lovely community.
             </p>
          </div>
  
          <div className="w-full">
            <div className="relative min-h-[160px] md:min-h-[120px] mb-12 flex items-center justify-center text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <p className="text-2xl md:text-3xl font-serif font-light leading-relaxed text-stone-800 italic">
                    "{minimalTestimonials[active].quote}"
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
  
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-8">
              <div className="flex -space-x-3">
                {minimalTestimonials.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`
                      relative w-14 h-14 rounded-full overflow-hidden border-2 border-white transition-all duration-300 ease-out
                      ${active === i ? "z-10 scale-125 ring-4 ring-rose-100 grayscale-0" : "grayscale hover:grayscale-0 hover:scale-110 opacity-70 hover:opacity-100"}
                    `}
                  >
                    <img src={t.image} alt={t.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
  
              <div className="hidden md:block h-12 w-px bg-stone-200" />
  
              <div className="flex flex-col items-center md:items-start min-w-[150px]">
                <motion.span 
                   key={`name-${active}`}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   className="text-lg font-bold text-stone-900"
                >
                  {minimalTestimonials[active].name}
                </motion.span>
                <motion.span 
                   key={`role-${active}`}
                   initial={{ opacity: 0, x: -10 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.05 }}
                   className="text-xs uppercase tracking-wider text-rose-500 font-medium"
                >
                  {minimalTestimonials[active].role}
                </motion.span>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
}

export default Testimonials;
