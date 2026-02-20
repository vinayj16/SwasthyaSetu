'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Activity,
    MapPin,
    BookOpen,
    ShieldCheck,
    ArrowRight,
    Sparkles,
    Search,
    Zap,
    Leaf,
    Dumbbell,
    Beef,
    Scale,
    Bell,
    CheckCircle2,
    TrendingUp,
    Award,
    Database,
    Globe,
    Wind
} from 'lucide-react';
import NotificationTray from '@/components/NotificationTray';

export default function HealthHub() {
    const [content, setContent] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('ALL');

    useEffect(() => {
        async function loadContent() {
            setLoading(true);
            try {
                // Mock content for high-density demo
                const mock = [
                    { id: '1', category: 'POLICY', title: 'Ayushman Expansion 2026', content: 'Advanced cardiac procedures now synced across all certified nodes.', isOfficial: true, imageUrl: 'https://images.unsplash.com/photo-1576091160550-217359f4ecf8?auto=format&fit=crop&q=80&w=800' },
                    { id: '2', category: 'DIET', title: 'The Micronutrient Hub', content: 'Leveraging local Indian superfoods for daily longevity protocols.', isOfficial: false, imageUrl: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800' },
                    { id: '3', category: 'WELLNESS', title: 'Circadian Sync Logic', content: 'Digital synchronization of health sleep cycles adds 5+ years to life.', isOfficial: true, imageUrl: 'https://images.unsplash.com/photo-1512438248247-f0f2a5a8b7f0?auto=format&fit=crop&q=80&w=800' },
                    { id: '4', category: 'EXERCISE', title: 'Tactical Bio-Mechanics', content: 'Corrective postural protocols for the modern national workforce.', isOfficial: false, imageUrl: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800' }
                ];
                setContent(mock);
            } catch (e) { console.error(e); }
            finally { setTimeout(() => setLoading(false), 1000); }
        }
        loadContent();
    }, []);

    const categories = [
        { id: 'ALL', icon: <BookOpen />, label: 'Discover' },
        { id: 'POLICY', icon: <ShieldCheck />, label: 'Protocols' },
        { id: 'DIET', icon: <Beef />, label: 'Nutritional' },
        { id: 'WELLNESS', icon: <Leaf />, label: 'Mental' },
        { id: 'EXERCISE', icon: <Dumbbell />, label: 'Athletic' }
    ];

    const filtered = filter === 'ALL' ? content : content.filter(c => c.category === filter);

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-500/20">
            {/* National Wellness Nav */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-slate-100/50">
                <div className="max-w-[1700px] mx-auto px-10 h-24 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <Link href="/" className="flex items-center space-x-4 group">
                            <div className="w-14 h-14 bg-slate-900 rounded-[1.8rem] flex items-center justify-center text-white font-[950] shadow-2xl group-hover:rotate-12 transition-all duration-500">
                                <span className="text-3xl tracking-tighter italic">H</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-[950] text-slate-900 tracking-tighter leading-none italic uppercase">HealthHub Unit</span>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mt-2 ml-1">Verified Wellness Agency</span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-8">
                        <NotificationTray />
                        <Link href="/login" className="px-10 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-600 transition shadow-2xl">Member Access</Link>
                    </div>
                </div>
            </nav>

            {/* Hub Hero */}
            <section className="pt-48 pb-48 bg-slate-950 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-blue-600/10 rounded-full blur-[200px] -mr-[600px] -mt-[600px]"></div>
                <div className="max-w-[1700px] mx-auto px-10 text-center relative z-10 animate-slide-up">
                    <div className="inline-flex items-center space-x-4 bg-white/5 border border-white/10 px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.4em] mb-12 text-blue-500 shadow-2xl">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        <span>India's Premier Wellness Transmission Active</span>
                    </div>
                    <h1 className="text-8xl lg:text-[140px] font-[950] text-white tracking-tighter leading-[0.8] mb-12 italic">
                        Health <br />
                        <span className="text-blue-600">Intelligence.</span>
                    </h1>
                    <p className="text-3xl text-slate-500 max-w-4xl mx-auto font-bold leading-relaxed opacity-80 italic">
                        Verified medical mandates, government nutrition SOPs, and mental longevity protocols synchronized for the elite national health journey.
                    </p>
                </div>
            </section>

            <main className="max-w-[1700px] mx-auto px-10 -mt-24 pb-48">

                {/* Visual Category Matrix */}
                <div className="flex space-x-8 mb-24 overflow-x-auto pb-8 hide-scrollbar animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    {categories.map(c => (
                        <button
                            key={c.id}
                            onClick={() => setFilter(c.id)}
                            className={`px-12 py-8 rounded-[3rem] font-[950] text-xs uppercase tracking-[0.3em] transition-all flex items-center space-x-8 shadow-2xl shrink-0 group italic ${filter === c.id ? 'bg-blue-600 text-white translate-y-[-8px]' : 'bg-white text-slate-400 border border-slate-100 hover:text-slate-900'}`}
                        >
                            <div className={`w-14 h-14 rounded-[1.8rem] flex items-center justify-center transition-all ${filter === c.id ? 'bg-white/20' : 'bg-slate-50 group-hover:bg-blue-50 group-hover:scale-110 group-hover:rotate-12'}`}>
                                {c.icon && <span className="scale-125">{c.icon}</span>}
                            </div>
                            <span>{c.label} Matrix</span>
                        </button>
                    ))}
                </div>

                {/* Content Reservoir */}
                <div className="grid lg:grid-cols-12 gap-24">
                    <div className="lg:col-span-8 space-y-16">
                        {loading ? (
                            <div className="grid md:grid-cols-2 gap-16">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="h-[600px] bg-white rounded-[5rem] animate-shimmer border border-slate-100 overflow-hidden relative">
                                        <div className="absolute inset-0 bg-slate-50/50"></div>
                                        <div className="absolute inset-x-12 bottom-12 h-32 w-2/3 bg-slate-100 rounded-[2rem]"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid md:grid-cols-2 gap-16">
                                {filtered.map((item, idx) => (
                                    <div key={item.id} className="bg-white rounded-[5.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] hover:translate-y-[-15px] transition-all duration-1000 group flex flex-col animate-slide-up" style={{ animationDelay: `${idx * 0.15}s` }}>
                                        <div className="relative h-[450px] overflow-hidden bg-slate-950">
                                            {item.imageUrl && (
                                                <img src={item.imageUrl} className="w-full h-full object-cover group-hover:scale-125 group-hover:rotate-3 transition-all duration-[2000ms] opacity-60 group-hover:opacity-100" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                                            {item.isOfficial && (
                                                <div className="absolute top-10 right-10 bg-blue-600 text-white px-8 py-3 rounded-2xl text-[9px] font-[950] uppercase tracking-[0.3em] border border-white/20 flex items-center space-x-3 shadow-2xl">
                                                    <Award className="w-5 h-5" />
                                                    <span>NATIONAL MANDATE</span>
                                                </div>
                                            )}
                                            <div className="absolute bottom-12 left-12 right-12">
                                                <span className="text-[10px] font-[950] text-blue-500 uppercase tracking-[0.5em] mb-4 block animate-pulse">{item.category}</span>
                                                <h3 className="text-4xl xl:text-5xl font-[950] text-white tracking-tighter leading-[0.9] group-hover:text-blue-400 transition-colors uppercase italic">{item.title}.</h3>
                                            </div>
                                        </div>
                                        <div className="p-16 flex-1 flex flex-col justify-between">
                                            <p className="text-2xl text-slate-500 font-bold leading-relaxed mb-16 italic opacity-80 group-hover:opacity-100 transition-opacity">
                                                "{item.content}"
                                            </p>
                                            <div className="flex items-center justify-between pt-12 border-t border-slate-100">
                                                <div className="flex items-center -space-x-4">
                                                    {[1, 2, 3].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-100 transition-transform group-hover:scale-110"></div>)}
                                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-8">Source Verified</span>
                                                </div>
                                                <button className="w-20 h-20 bg-slate-950 text-white rounded-[2rem] flex items-center justify-center hover:bg-blue-600 transition-all shadow-2xl group-hover:rotate-[360deg] duration-1000">
                                                    <ArrowRight className="w-8 h-8" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Side Intelligence */}
                    <div className="lg:col-span-4 space-y-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                        <div className="bg-white rounded-[5rem] p-16 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-700">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-50 rounded-bl-[5rem] group-hover:scale-110 transition-transform"></div>
                            <h4 className="text-3xl font-[950] text-slate-900 mb-16 tracking-tighter flex items-center italic uppercase">
                                <TrendingUp className="w-8 h-8 mr-4 text-blue-600" /> Pulse Stats.
                            </h4>
                            <div className="space-y-12">
                                <TrendRow label="Sleep Correlation correction" shift="HIGH" points="+14.2%" icon={<Wind />} />
                                <TrendRow label="Nutritional SOP Adoption" shift="STABLE" points="+8.9%" icon={<Beef />} />
                                <TrendRow label="Sugar Hub reduction" shift="CRITICAL" points="-22.1%" icon={<Zap />} />
                            </div>
                        </div>

                        <div className="bg-slate-950 rounded-[5rem] p-16 text-white relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] group">
                            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] group-hover:scale-110 transition-all duration-1000"></div>
                            <div className="flex items-center space-x-8 mb-12">
                                <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center border border-white/10 backdrop-blur-3xl shadow-2xl">
                                    <Bell className="w-10 h-10 animate-float" />
                                </div>
                                <h4 className="text-3xl font-[950] tracking-tighter leading-none italic uppercase">Bio <br /> Alerts.</h4>
                            </div>
                            <p className="text-xl text-slate-500 font-bold leading-relaxed mb-16 italic opacity-80 group-hover:opacity-100 transition-opacity">
                                Synchronize your tactical wellness node or health monitor to receive official corrections directly to your hub.
                            </p>
                            <button className="w-full bg-blue-600 text-white py-8 rounded-[2.5rem] font-[950] uppercase text-[10px] tracking-[0.4em] hover:bg-white hover:text-slate-950 transition-all shadow-2xl shadow-blue-500/20 active:scale-95">
                                INITIATE NODE SYNC
                            </button>
                        </div>

                        <div className="p-16 bg-white rounded-[5rem] border border-slate-100 text-center shadow-sm hover:shadow-2xl transition-all duration-700 group">
                            <div className="w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center text-blue-600 mx-auto mb-10 font-black border border-blue-100 shadow-sm group-hover:rotate-12 group-hover:scale-110 transition-all">
                                <Award className="w-10 h-10" />
                            </div>
                            <h5 className="text-3xl font-[950] text-slate-900 mb-6 italic uppercase tracking-tighter">Hub Rewards.</h5>
                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] leading-relaxed italic">Participate in National Wellness Protocols <br /> and unlock tactical insurance credits.</p>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-slate-950 py-48 px-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[200px] -ml-[500px] -mt-[500px]"></div>
                <div className="max-w-[1000px] mx-auto text-center relative z-10 animate-slide-up">
                    <h2 className="text-7xl xl:text-[100px] font-[950] text-white mb-12 tracking-tighter italic uppercase leading-none">The Era of <br /> <span className="text-blue-600">Prosperity.</span></h2>
                    <p className="text-2xl text-slate-500 font-bold mb-20 italic">Join 2.4B clinical identities in India's official intelligence hub. Optimized for national longevity.</p>
                    <div className="flex max-w-2xl mx-auto bg-white/5 rounded-[3.5rem] p-4 border border-white/10 shadow-2xl focus-within:border-blue-500 transition-all group">
                        <input type="email" placeholder="SECURE_EMAIL_SEQUENCE" className="bg-transparent flex-1 px-12 outline-none font-[950] placeholder:text-slate-800 text-white text-lg italic" />
                        <button className="bg-blue-600 text-white px-16 py-8 rounded-[3rem] font-[950] text-[11px] uppercase tracking-[0.4em] hover:bg-white hover:text-slate-950 transition-all shadow-2xl">TRANSMIT HUB ACCESS</button>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function TrendRow({ label, shift, points, icon }: any) {
    return (
        <div className="flex items-center justify-between group/trend cursor-pointer hover:bg-slate-50 p-6 -m-6 rounded-[2.5rem] transition-all duration-500">
            <div className="flex items-center space-x-6">
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover/trend:bg-blue-600 group-hover/trend:text-white transition-all shadow-sm">
                    {React.cloneElement(icon, { className: 'w-6 h-6' })}
                </div>
                <div>
                    <span className="block text-[9px] font-[950] text-slate-400 uppercase tracking-[0.3em] mb-2 group-hover/trend:text-blue-500 transition-colors uppercase">{label}</span>
                    <span className="text-2xl font-[950] text-slate-900 tracking-tighter italic uppercase">{points}</span>
                </div>
            </div>
            <div className={`px-6 py-2 rounded-full text-[9px] font-[950] uppercase tracking-[0.3em] shadow-sm ${shift === 'CRITICAL' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'}`}>
                {shift}
            </div>
        </div>
    );
}
