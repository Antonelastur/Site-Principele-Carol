import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    History,
    GraduationCap,
    Calendar,
    BookOpen,
    MessageSquare,
    Bell,
    Search,
    Sun,
    Moon,
    Award,
    ChevronRight,
    Menu,
    X,
    Clock,
    MapPin,
    Mail,
    Phone
} from 'lucide-react';

/**
 * Școala Gimnazială "Principele Carol" - Heritage Portal
 * Lead Frontend Engineer & UI/UX Designer: Antigravity
 * Technology: React, Tailwind CSS, Framer Motion
 */

const App = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // Scroll detection for navbar
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Theme configuration
    const theme = {
        navy: '#002851',
        gold: '#D4AF37',
        academic: '#00509E',
        white: '#FFFFFF',
        text: darkMode ? '#E2E8F0' : '#1A1A1A',
        bg: darkMode ? '#0F172A' : '#FFFFFF',
        card: darkMode ? '#1E293B' : '#F8FAFC',
    };

    // Mock Data: Timeline
    const historyMilestones = [
        { year: 1921, title: 'Inaugurarea Școlii', desc: 'Înființată sub patronajul Casei Regale, școala a devenit rapid un reper cultural în Gura Humorului.' },
        { year: 1945, title: 'Reconstrucția Post-Război', desc: 'Eforturile comunității au redat strălucirea clădirii emblematice.' },
        { year: 1990, title: 'Modernizarea Curriculumului', desc: 'Adoptarea standardelor educaționale europene păstrând rigoarea tradițională.' },
        { year: 2021, title: 'Centenarul Carol', desc: 'O sută de ani de excelență academică și formare de elite.' },
    ];

    // Mock Data: Dashboard
    const studentData = {
        name: 'Andrei Popescu',
        class: 'Clasa a VII-a A',
        average: 9.85,
        attendance: '100%',
        schedule: [
            { time: '08:00', subject: 'Matematică', room: 'Laborator 102' },
            { time: '09:00', subject: 'Limba Română', room: 'Aula Regală' },
            { time: '10:00', subject: 'Istorie', room: 'Sala 204' },
        ],
        announcements: [
            { id: 1, title: 'Olimpiada de Matematică', date: '15 Feb 2026', priority: 'high' },
            { id: 2, title: 'Excursie de studiu: Putna', date: '21 Feb 2026', priority: 'medium' },
        ]
    };

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const stagger = {
        visible: { transition: { staggerChildren: 0.2 } }
    };

    return (
        <div className={`${darkMode ? 'dark' : ''} min-h-screen font-sans antialiased text-slate-900 overflow-x-hidden`}
            style={{ backgroundColor: theme.bg, color: theme.text }}>

            {/* Styles Injection for specific fonts */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@400;500;600;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .gold-glow { text-shadow: 0 0 10px rgba(212, 175, 55, 0.3); }
        .royal-border { border: 1px solid rgba(212, 175, 55, 0.2); }
      `}</style>

            {/* Navigation */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'py-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-lg' : 'py-6 bg-transparent'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                    >
                        <div className="w-10 h-10 bg-[#002851] flex items-center justify-center rounded-lg shadow-xl royal-border">
                            <span className="text-[#D4AF37] font-serif font-bold text-xl">C</span>
                        </div>
                        <div>
                            <h1 className="text-xl font-serif font-bold hidden md:block dark:text-white">Principele Carol</h1>
                            <p className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold hidden md:block">Gura Humorului</p>
                        </div>
                    </motion.div>

                    <div className="hidden md:flex items-center gap-8">
                        {['Istorie', 'Dashboard', 'Profesori', 'Contact'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-medium hover:text-[#D4AF37] transition-colors uppercase tracking-wider dark:text-gray-300">
                                {item}
                            </a>
                        ))}
                        <button
                            onClick={() => setDarkMode(!darkMode)}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        >
                            {darkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-slate-600" />}
                        </button>
                    </div>

                    <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed top-[72px] w-full bg-white dark:bg-slate-900 z-40 border-b border-gray-100 dark:border-slate-800 md:hidden"
                    >
                        <div className="p-6 flex flex-col gap-4">
                            {['Istorie', 'Dashboard', 'Profesori', 'Contact'].map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="text-lg font-serif font-bold py-2 border-b border-gray-50 dark:border-slate-800" onClick={() => setIsMenuOpen(false)}>
                                    {item}
                                </a>
                            ))}
                            <button
                                onClick={() => { setDarkMode(!darkMode); setIsMenuOpen(false); }}
                                className="flex items-center gap-2 py-2 text-[#D4AF37] font-bold"
                            >
                                {darkMode ? <><Sun size={20} /> Light Mode</> : <><Moon size={20} /> Dark Mode</>}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Background Elements */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-20 left-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-[100px] animate-pulse"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#002851]/10 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={stagger}
                        className="max-w-4xl mx-auto"
                    >
                        <motion.span
                            variants={fadeIn}
                            className="inline-block py-1 px-4 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-6 royal-border"
                        >
                            Excelență din 1921
                        </motion.span>

                        <motion.h2
                            variants={fadeIn}
                            className="text-5xl md:text-8xl font-serif font-black mb-8 leading-tight dark:text-white"
                        >
                            Unde Tradiția Devine <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#B8860B] to-[#D4AF37] gold-glow">
                                Viitor Digital
                            </span>
                        </motion.h2>

                        <motion.p
                            variants={fadeIn}
                            className="text-lg md:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
                        >
                            Școala Gimnazială Principele Carol îmbină moștenirea istorică de prestigiu cu cele mai avansate tehnologii educaționale pentru o nouă generație de elite.
                        </motion.p>

                        <motion.div
                            variants={fadeIn}
                            className="flex flex-col md:flex-row gap-4 justify-center items-center"
                        >
                            <button className="px-8 py-4 bg-[#002851] text-white rounded-xl shadow-2xl shadow-[#002851]/30 flex items-center gap-2 hover:bg-[#003d7a] transition-all transform hover:-translate-y-1">
                                <GraduationCap size={20} className="text-[#D4AF37]" />
                                Înscrieri 2026
                            </button>
                            <button className="px-8 py-4 bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] rounded-xl font-bold flex items-center gap-2 hover:bg-[#D4AF37]/10 transition-all">
                                Tur Virtual 360°
                                <ChevronRight size={20} />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold">Scroll</span>
                    <div className="w-[1px] h-12 bg-gradient-to-b from-[#D4AF37] to-transparent"></div>
                </motion.div>
            </section>

            {/* History Timeline */}
            <section id="istorie" className="py-24 bg-slate-50 dark:bg-slate-900/50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col items-center mb-16 text-center">
                        <h3 className="text-3xl md:text-5xl font-serif font-bold mb-4 dark:text-white">File de Istorie</h3>
                        <div className="w-24 h-1 bg-[#D4AF37] rounded-full"></div>
                        <p className="mt-6 text-slate-600 dark:text-slate-400 max-w-xl">Peste un secol de educație sub egida valorilor regale, în inima Bucovinei.</p>
                    </div>

                    <div className="relative max-w-5xl mx-auto">
                        {/* Timeline Line */}
                        <div className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full bg-[#D4AF37]/20 hidden md:block"></div>

                        <div className="flex flex-col gap-12">
                            {historyMilestones.map((item, idx) => (
                                <motion.div
                                    key={item.year}
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="flex-1 text-center md:text-left">
                                        <div className={`${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                            <span className="text-4xl font-serif font-black text-[#002851] dark:text-[#D4AF37] mb-2 block">{item.year}</span>
                                            <h4 className="text-xl font-bold mb-3 dark:text-white">{item.title}</h4>
                                            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
                                        </div>
                                    </div>
                                    <div className="relative z-10 w-12 h-12 bg-[#D4AF37] rounded-full border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center">
                                        <History size={20} className="text-white" />
                                    </div>
                                    <div className="flex-1 hidden md:block"></div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Student Dashboard Area */}
            <section id="dashboard" className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#002851]/5 transform skew-x-12 -z-10"></div>

                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                        {/* Left Info */}
                        <div className="lg:col-span-5">
                            <span className="text-[#D4AF37] font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Portal Digital</span>
                            <h3 className="text-4xl md:text-5xl font-serif font-bold mb-6 dark:text-white">Centrul de Excelență Personalizat</h3>
                            <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                Fiecare elev are acces la o platformă modernă pentru gestionarea cursurilor, monitorizarea progresului și comunicare directă cu mentorii.
                            </p>

                            <div className="space-y-4">
                                {[
                                    { icon: <BookOpen className="text-[#D4AF37]" />, text: 'Resurse Digitale Interactive' },
                                    { icon: <Award className="text-[#D4AF37]" />, text: 'Sistem de Meritocrație' },
                                    { icon: <Calendar className="text-[#D4AF37]" />, text: 'Agenda Evenimentelor Regale' }
                                ].map((item, i) => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-sm royal-border"
                                    >
                                        {item.icon}
                                        <span className="font-semibold text-sm dark:text-gray-200">{item.text}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Dashboard Mockup */}
                        <div className="lg:col-span-7">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden royal-border border-[#D4AF37]/30"
                            >
                                {/* Header Dashboard */}
                                <div className="bg-[#002851] p-6 flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#D4AF37] border-2 border-white/20 flex items-center justify-center text-white font-bold text-xl">AP</div>
                                        <div>
                                            <h4 className="text-white font-bold">{studentData.name}</h4>
                                            <p className="text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest">{studentData.class}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="p-2 bg-white/10 rounded-lg text-white"><Bell size={18} /></div>
                                        <div className="p-2 bg-white/10 rounded-lg text-white"><Search size={18} /></div>
                                    </div>
                                </div>

                                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Progress Card */}
                                    <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl relative overflow-hidden group">
                                        <div className="flex justify-between items-start mb-4">
                                            <h5 className="font-bold text-sm dark:text-gray-200">Media Generală</h5>
                                            <Award size={20} className="text-[#D4AF37]" />
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl font-serif font-black text-[#002851] dark:text-[#D4AF37]">{studentData.average}</span>
                                            <span className="text-xs text-green-500 font-bold">+0.12 periodic</span>
                                        </div>
                                        <div className="mt-4 w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: '98.5%' }}
                                                className="h-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B]"
                                            />
                                        </div>
                                    </div>

                                    {/* Attendance Card */}
                                    <div className="bg-slate-50 dark:bg-slate-800 p-5 rounded-2xl">
                                        <div className="flex justify-between items-start mb-4">
                                            <h5 className="font-bold text-sm dark:text-gray-200">Prezență</h5>
                                            <Clock size={20} className="text-[#002851] dark:text-[#D4AF37]" />
                                        </div>
                                        <span className="text-4xl font-serif font-black text-[#002851] dark:text-[#D4AF37]">{studentData.attendance}</span>
                                        <p className="text-[10px] text-slate-500 mt-2 uppercase tracking-tighter">Status: Frecvență Perfectă</p>
                                    </div>

                                    {/* Schedule */}
                                    <div className="md:col-span-2">
                                        <h5 className="font-bold text-sm mb-4 dark:text-gray-200">Orar Astăzi</h5>
                                        <div className="space-y-3">
                                            {studentData.schedule.map((slot, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-700 rounded-xl hover:border-[#D4AF37] transition-all cursor-pointer">
                                                    <div className="flex items-center gap-4">
                                                        <span className="text-xs font-bold text-[#D4AF37] w-12">{slot.time}</span>
                                                        <div>
                                                            <p className="text-sm font-bold dark:text-white">{slot.subject}</p>
                                                            <p className="text-[10px] text-slate-400 uppercase">{slot.room}</p>
                                                        </div>
                                                    </div>
                                                    <ChevronRight size={16} className="text-slate-300" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community / CTA */}
            <section className="py-24 bg-[#002851]">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h3 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">
                            Fii parte din <span className="text-[#D4AF37]">Tradiție</span>
                        </h3>
                        <p className="text-blue-100/70 text-lg mb-12">
                            Te invităm să explorezi universul nostru educațional și să descoperi cum formăm liderii de mâine.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-serif font-black text-[#D4AF37]">550+</span>
                                <span className="text-blue-200 text-xs uppercase tracking-widest mt-2">Elevi</span>
                            </div>
                            <div className="w-[1px] h-12 bg-white/10"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-serif font-black text-[#D4AF37]">45</span>
                                <span className="text-blue-200 text-xs uppercase tracking-widest mt-2">Profesori</span>
                            </div>
                            <div className="w-[1px] h-12 bg-white/10"></div>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl font-serif font-black text-[#D4AF37]">105</span>
                                <span className="text-blue-200 text-xs uppercase tracking-widest mt-2">Ani de Istorie</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="py-16 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-[#002851] flex items-center justify-center rounded-lg royal-border">
                                    <span className="text-[#D4AF37] font-serif font-bold text-xl">C</span>
                                </div>
                                <h1 className="text-2xl font-serif font-bold dark:text-white">Principele Carol</h1>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-8">
                                Excelență în educație, tradiție regală și inovație constantă pentru elevii din Gura Humorului.
                            </p>
                            <div className="flex gap-4">
                                {[MessageSquare, Phone, Mail].map((Icon, i) => (
                                    <div key={i} className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center text-[#002851] dark:text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition-all cursor-pointer">
                                        <Icon size={18} />
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h5 className="font-bold mb-6 dark:text-white uppercase text-xs tracking-widest">Informații</h5>
                            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                                <li className="hover:text-[#D4AF37] transition-colors"><a href="#">Admitere</a></li>
                                <li className="hover:text-[#D4AF37] transition-colors"><a href="#">Consiliul de Administrație</a></li>
                                <li className="hover:text-[#D4AF37] transition-colors"><a href="#">Transparență Venituri</a></li>
                                <li className="hover:text-[#D4AF37] transition-colors"><a href="#">Programe Europene</a></li>
                            </ul>
                        </div>

                        <div>
                            <h5 className="font-bold mb-6 dark:text-white uppercase text-xs tracking-widest">Contact</h5>
                            <ul className="space-y-4 text-sm text-slate-500 dark:text-slate-400">
                                <li className="flex gap-3"><MapPin size={16} className="text-[#D4AF37]" /> Gura Humorului, Suceava</li>
                                <li className="flex gap-3"><Phone size={16} className="text-[#D4AF37]" /> +40 230 231 100</li>
                                <li className="flex gap-3"><Mail size={16} className="text-[#D4AF37]" /> contact@scoalacarol.ro</li>
                            </ul>
                        </div>
                    </div>

                    <div className="pt-8 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest">
                            © 2026 Școala Gimnazială Principele Carol. Toate drepturile rezervate.
                        </p>
                        <p className="text-[10px] text-slate-400 uppercase tracking-widest flex items-center gap-1">
                            Design de <span className="text-[#D4AF37] font-bold">Antigravity AI</span>
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
