import { fullMenuData } from '../../data/services';
import { X } from 'lucide-react';
import { WHATSAPP_BOOKING_LINK } from '../../data/constants';

const MenuModal = ({ isOpen, onClose, onBookClick }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-stone-900/80 backdrop-blur-md transition-opacity"
            onClick={onClose}
          ></div>
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-4xl relative z-10 overflow-hidden animate-fade-in-up h-[85vh] flex flex-col">
            
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
              <div>
                <h3 className="text-3xl font-serif font-bold text-gray-900">Full Service Menu</h3>
                <p className="text-gray-500 mt-1">Select a service to book</p>
              </div>
              <button 
                onClick={onClose}
                className="p-2 bg-gray-100 rounded-full hover:bg-rose-100 hover:text-rose-500 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content Scrollable */}
            <div className="p-8 overflow-y-auto flex-1 bg-stone-50/50">
              <div className="grid md:grid-cols-2 gap-8">
                {fullMenuData.map((section, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <h4 className="text-xl font-serif font-bold text-gray-900 mb-6 flex items-center gap-2">
                      <span className="w-1 h-6 bg-rose-500 rounded-full"></span>
                      {section.category}
                    </h4>
                    <div className="space-y-4">
                      {section.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center group border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                          <div>
                            <p className="font-medium text-gray-800 group-hover:text-rose-600 transition-colors">{item.name}</p>
                            <p className="text-sm text-gray-400">{item.price}</p>
                          </div>
                          <button 
                            onClick={onBookClick}
                            className="px-4 py-1.5 rounded-full bg-gray-100 text-xs font-bold text-gray-600 group-hover:bg-rose-500 group-hover:text-white transition-all"
                          >
                            Book
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer CTA */}
            <div className="p-6 border-t border-gray-100 bg-white text-center">
              <p className="text-sm text-gray-500 mb-3">Looking for something else?</p>
              <button 
                onClick={onBookClick}
                className="text-rose-500 font-bold hover:underline"
              >
                Book a Custom Consultation
              </button>
            </div>
          </div>
        </div>
    );
};

export default MenuModal;
