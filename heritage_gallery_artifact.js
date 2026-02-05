import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import {
    Award,
    Book,
    Camera,
    Compass,
    Crown,
    ExternalLink,
    History,
    Layers,
    Maximize2,
    Star
} from 'lucide-react';

/**
 * COMPONENTA: TEZAURUL PRINCIPELE CAROL (Heritage Showcase)
 * Rol: Creative Director & Lead Frontend Architect
 * Concept: "Eclat Regal" - O galerie interactivă ce îmbină gravitația simbolică cu luxul digital.
 */

const HeritageGallery = () => {
    const [filter, setFilter] = useState('all');
    const [hoveredId, setHoveredId] = useState(null);

    // Categories definition
    const categories = [
        { id: 'all', label: 'Tot Tezaurul' },
        { id: 'history', label: 'Arhivă 1921' },
        { id: 'achievements', label: 'Performanță' },
        { id: 'art', label: 'Expresie Creativă' }
    ];

    // Artifact Data
    const assets = [
        {
            id: 1,
            category: 'history',
            title: 'Actul de Fundație',
            year: '1921',
            desc: 'Document original semnat sub patronajul Casei Regale a României.',
            img: 'https://images.unsplash.com/photo-1585642500803-34e857413649?auto=format&fit=crop&q=80&w=800',
            depth: 1.2
        },
        {
            id: 2,
            category: 'achievements',
            title: 'Excelsior Carol',
            year: '2024',
            desc: 'Trofeul de excelență pentru inovație în educație la nivel național.',
            img: 'https://images.unsplash.com/photo-1578319439584-104c94d37305?auto=format&fit=crop&q=80&w=800',
            depth: 0.8
        },
        {
            id: 3,
            category: 'art',
            title: 'Viziuni Bucovinene',
            year: '2025',
            desc: 'Expoziție permanentă de grafică realizată de elevii claselor V-VIII.',
            img: 'https://images.unsplash.com/photo-1460518451285-97b6aa326961?auto=format&fit=crop&q=80&w=800',
            depth: 1.5
        },
        {
            id: 4,
            category: 'history',
            title: 'Uniforma de Gală',
            year: '1930',
            desc: 'Replica minuțioasă a uniformei purtate de prima generație de elevi.',
            img: 'https://images.unsplash.com/photo-1549416878-b9ca35c2d47a?auto=format&fit=crop&q=80&w=800',
            depth: 1.1
        },
        {
            id: 5,
            category: 'achievements',
            title: 'Mentoratul Regal',
            year: 'Constant',
            desc: 'Programul de transfer de valori între alumni și actualii elevi.',
            img: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
            depth: 0.9
        },
        {
            id: 6,
            category: 'art',
            title: 'Corul "Vox Carol"',
            year: 'Fondat 1940',
            desc: 'Înregistrări de aur ale ansamblului coral premiat internațional.',
            img: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&q=80&w=800',
            depth: 1.3
        }
    ];

    const filteredAssets = filter === 'all' ? assets : assets.filter(a => a.category === filter);

    // Parallax physics simulation for Antigravity
    const { scrollYProgress } = useScroll();
    const yRange = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const physicsSpring = useSpring(yRange, { stiffness: 100, damping: 30 });

    return (
        <div className="min-h-screen bg-[#FFFFFF] text-[#002851] font-sans selection:bg-[#D4AF37] selection:text-white">
            {/* Dynamic Font Injection */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Inter:wght@300;400;600;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .gold-shimmer {
          background: linear-gradient(90deg, #D4AF37 0%, #F5DEB3 50%, #D4AF37 100%);
          background-size: 200% auto;
          animation: shimmer 3s linear infinite;
        }
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
        .royal-shadow { box-shadow: 0 20px 50px rgba(0, 40, 81, 0.1); }
        .glass-panel { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(212, 175, 55, 0.1); }
      `}</style>

            {/* Hero Header */}
            <section className="pt-32 pb-20 px-6 overflow-hidden relative">
                <motion.div
                    style={{ y: physicsSpring }}
                    className="absolute -top-20 -right-20 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl"
                />

                <div className="container mx-auto max-w-6xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#D4AF37]/30 mb-6 group cursor-default">
                            <Crown size={14} className="text-[#D4AF37] group-hover:rotate-12 transition-transform" />
                            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#D4AF37]">Tezaur Academic</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-serif font-black mb-6 leading-tight">
                            Galeria Valorilor <br />
                            <span className="italic text-[#D4AF37]">Principele Carol</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-lg text-slate-500 font-light leading-relaxed">
                            O incursiune tactilă în moștenirea noastră de un secol. Fiecare exponat poartă amprenta excelenței și a spiritului regal românesc.
                        </p>
                    </motion.div>

                    {/* Luxury Filter Toggle */}
                    <div className="mt-16 flex flex-wrap justify-center gap-4 md:gap-8">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setFilter(cat.id)}
                                className={`relative px-6 py-2 text-sm font-bold uppercase tracking-widest transition-all duration-300 ${filter === cat.id ? 'text-[#002851]' : 'text-slate-400 hover:text-[#002851]'
                                    }`}
                            >
                                {cat.label}
                                {filter === cat.id && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute bottom-0 left-0 w-full h-0.5 bg-[#D4AF37]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Antigravity Grid */}
            <section className="py-20 px-6 container mx-auto max-w-7xl">
                <motion.div
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredAssets.map((asset, index) => (
                            <motion.div
                                key={asset.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                onMouseEnter={() => setHoveredId(asset.id)}
                                onMouseLeave={() => setHoveredId(null)}
                                className="relative group h-[500px] cursor-pointer"
                            >
                                {/* Antigravity Physics Frame */}
                                <motion.div
                                    animate={{
                                        y: hoveredId === asset.id ? -15 : 0,
                                        rotateX: hoveredId === asset.id ? 5 : 0,
                                        rotateY: hoveredId === asset.id ? -5 : 0,
                                    }}
                                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                                    className="w-full h-full relative z-10 rounded-2xl overflow-hidden royal-shadow border border-slate-100"
                                >
                                    {/* Image Layer with Parallax Tilt */}
                                    <div className="absolute inset-0 z-0">
                                        <img
                                            src={asset.img}
                                            alt={asset.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#002851] via-transparent to-transparent opacity-80" />
                                    </div>

                                    {/* Content Overlay */}
                                    <div className="absolute inset-x-0 bottom-0 p-8 z-20">
                                        <motion.div
                                            animate={{ y: hoveredId === asset.id ? 0 : 10, opacity: hoveredId === asset.id ? 1 : 0.9 }}
                                        >
                                            <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-[0.2em] mb-2 block">
                                                {asset.year} • {asset.category}
                                            </span>
                                            <h3 className="text-2xl font-serif text-white font-bold mb-3">{asset.title}</h3>
                                            <p className="text-slate-200 text-sm font-light leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {asset.desc}
                                            </p>
                                        </motion.div>

                                        <div className="mt-6 flex items-center gap-4">
                                            <div className="h-[1px] w-12 bg-[#D4AF37]/50 group-hover:w-24 transition-all duration-500" />
                                            <Maximize2 size={16} className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>

                                    {/* Decorative Border Glow */}
                                    <div className="absolute inset-0 border-[0.5px] border-white/20 rounded-2xl z-30 pointer-events-none" />
                                </motion.div>

                                {/* Spectral Shadow (The 'Antigravity' Depth) */}
                                <motion.div
                                    animate={{
                                        scale: hoveredId === asset.id ? 1.05 : 0.95,
                                        opacity: hoveredId === asset.id ? 0.3 : 0.1
                                    }}
                                    className="absolute inset-0 bg-[#002851] rounded-2xl blur-2xl -z-10 translate-y-10 transition-all duration-500"
                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </section>

            {/* CTA: Curating the Future */}
            <section className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="glass-panel rounded-[40px] p-12 md:p-20 text-center relative overflow-hidden">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="absolute -top-20 -left-20 pointer-events-none opacity-10"
                        >
                            <Layers size={300} className="text-[#D4AF37]" />
                        </motion.div>

                        <h2 className="text-4xl md:text-5xl font-serif font-black mb-8 relative z-10">
                            Contribuie la Istoria Noastră
                        </h2>
                        <p className="text-slate-600 max-w-xl mx-auto mb-10 text-lg font-light relative z-10">
                            Ești un absolvent cu amintiri prețioase sau un elev cu o viziune nouă? Ajută-ne să extindem Tezaurul.
                        </p>

                        <div className="flex flex-col md:flex-row justify-center items-center gap-6 relative z-10">
                            <button className="gold-shimmer px-10 py-4 text-[#002851] font-bold rounded-full shadow-lg shadow-[#D4AF37]/20 flex items-center gap-2 hover:scale-105 transition-all">
                                <Compass size={20} />
                                Propune un Exponat
                            </button>
                            <button className="px-10 py-4 bg-transparent border-2 border-[#002851] text-[#002851] font-bold rounded-full hover:bg-[#002851] hover:text-white transition-all">
                                Vezi Arhiva Digitală 3D
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Aesthetic Footer Detail */}
            <footer className="py-12 text-center">
                <div className="w-16 h-1 bg-[#D4AF37]/20 mx-auto mb-8 rounded-full" />
                <p className="text-[10px] uppercase tracking-[0.5em] text-slate-400 font-bold">
                    Conservând Elite • Din 1921
                </p>
            </footer>
        </div>
    );
};

export default HeritageGallery;
