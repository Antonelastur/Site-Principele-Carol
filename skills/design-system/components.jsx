import React from 'react';
import { motion } from 'framer-motion';

/** 
 * 1. REGAL CTA BUTTON
 * An elegant, floating button with gold accents.
 */
export const RegalButton = ({ children, variant = 'primary', ...props }) => {
    const isGold = variant === 'gold';

    return (
        <motion.button
            whileHover={{ y: -3, scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            whileTap={{ scale: 0.98 }}
            className={`
        px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all
        ${isGold
                    ? 'bg-[#D4AF37] text-[#002851] hover:bg-[#F1D592]'
                    : 'bg-[#002851] text-white border-2 border-[#D4AF37]'}
      `}
            {...props}
        >
            {children}
        </motion.button>
    );
};

/**
 * 2. HISTORY CARD
 * A sophisticated card for archival content.
 */
export const HistoryCard = ({ year, title, description, image }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="group relative overflow-hidden bg-white rounded-2xl border border-slate-100 shadow-royal p-6 transition-all hover:border-[#D4AF37]/30"
    >
        <div className="flex items-center gap-4 mb-4">
            <span className="text-4xl font-black text-[#D4AF37]/20 font-serif">{year}</span>
            <div className="h-[1px] flex-grow bg-slate-100 group-hover:bg-[#D4AF37]/20 transition-colors"></div>
        </div>
        <h3 className="text-xl font-bold mb-2 text-[#002851]">{title}</h3>
        <p className="text-slate-500 text-sm leading-relaxed">{description}</p>
        {image && (
            <div className="mt-6 rounded-lg overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
                <img src={image} alt={title} className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-1000" />
            </div>
        )}
    </motion.div>
);

/**
 * 3. HERO SECTION (OFFICIAL HEADER)
 * The grand opening of a portal or section.
 */
export const RoyalHero = ({ title, subtitle, logo }) => (
    <div className="relative w-full py-24 px-4 bg-[#002851] text-center overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-[-50%] left-[-10%] w-[120%] h-[200%] border-[40px] border-[#D4AF37] rounded-full rotate-45"></div>
        </div>

        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 max-w-4xl mx-auto"
        >
            {logo && <img src={logo} alt="Logo" className="w-24 h-24 mx-auto mb-8 drop-shadow-lg" />}
            <h1 className="text-5xl md:text-7xl font-serif font-black text-[#D4AF37] mb-6 tracking-tight">
                {title}
            </h1>
            <p className="text-xl md:text-2xl font-light text-slate-300 max-w-2xl mx-auto border-t border-b border-[#D4AF37]/30 py-4 uppercase tracking-[0.2em]">
                {subtitle}
            </p>
        </motion.div>
    </div>
);
