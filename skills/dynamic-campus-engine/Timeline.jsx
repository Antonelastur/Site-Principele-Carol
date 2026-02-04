import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TimelineEvent = ({ event }) => (
    <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
        className="relative p-6 bg-white border border-slate-100 rounded-2xl shadow-sm transition-all cursor-pointer group"
    >
        <div className="flex items-start justify-between">
            <div className="flex flex-col">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full mb-3 w-fit ${event.category === 'Examene' ? 'bg-red-50 text-red-600' :
                        event.category === 'Sport' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                    {event.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {event.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">
                    {event.description}
                </p>
            </div>
            <div className="text-right">
                <div className="text-2xl font-black text-slate-200 group-hover:text-amber-400 transition-colors">
                    {new Date(event.date).getDate()}
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    {new Date(event.date).toLocaleString('ro-RO', { month: 'short' })}
                </div>
            </div>
        </div>

        {event.link && (
            <div className="mt-4 flex items-center text-xs font-semibold text-blue-600 group-hover:translate-x-1 transition-transform">
                Vezi detalii <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 5l7 7-7 7" /></svg>
            </div>
        )}
    </motion.div>
);

export const DynamicTimeline = ({ data }) => {
    const [filter, setFilter] = useState('Toate');
    const categories = ['Toate', ...new Set(data.events.map(e => e.category))];

    const filteredEvents = filter === 'Toate'
        ? data.events
        : data.events.filter(e => e.category === filter);

    return (
        <section className="w-full max-w-5xl mx-auto px-4 py-12 bg-slate-50/50 rounded-[40px]">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight">Timeline <span className="text-blue-600">Interactiv</span></h2>
                    <p className="mt-2 text-slate-500 font-medium">Explorează viitorul evenimentelor de la Principele Carol.</p>
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${filter === cat
                                    ? 'bg-slate-900 text-white shadow-lg shadow-slate-200'
                                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <AnimatePresence mode='popLayout'>
                    {filteredEvents.map(event => (
                        <TimelineEvent key={event.id} event={event} />
                    ))}
                </AnimatePresence>
            </div>

            {filteredEvents.length === 0 && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-400 font-medium italic">Niciun eveniment găsit în această categorie.</p>
                </motion.div>
            )}
        </section>
    );
};
