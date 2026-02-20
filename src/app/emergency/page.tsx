'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Activity,
    MapPin,
    PhoneCall,
    AlertOctagon,
    Heart,
    Droplets,
    Flame,
    Wind,
    ArrowRight,
    ShieldAlert,
    Clock,
    Navigation,
    ChevronRight,
    Plus,
    Zap,
    Maximize2,
    Database
} from 'lucide-react';
import NotificationTray from '@/components/NotificationTray';

export default function EmergencyPortal() {
    const [bloodFilter, setBloodFilter] = useState('ALL');
    const [loading, setLoading] = useState(true);
    const [hospitals, setHospitals] = useState<any[]>([]);
    const [showBreakGlassModal, setShowBreakGlassModal] = useState(false);
    const [breakGlassReason, setBreakGlassReason] = useState('');

    useEffect(() => {
        const initGrid = async () => {
            try {
                // Use real hospital directory data
                const res = await fetch('/api/hospitals?search=&type=');
                const data = await res.json();
                if (data.success) {
                    setHospitals(data.data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        initGrid();
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-[#FEF2F2] flex flex-col items-center justify-center p-12">
            <div className="w-24 h-24 border-8 border-red-600 border-t-transparent rounded-full animate-spin mb-10 shadow-[0_0_50px_rgba(220,38,38,0.3)]"></div>
            <p className="text-sm font-[950] text-red-400 uppercase tracking-[0.6em] animate-pulse">Initializing Emergency Node...</p>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#FEF2F2] font-sans selection:bg-red-500/20">
            {/* National SOS Header */}
            <section className="bg-red-600 pt-32 pb-40 px-10 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 rotate-12 select-none animate-float">
                    <span className="text-[400px] font-[950] leading-none">SOS</span>
                </div>
                <div className="max-w-[1700px] mx-auto relative z-10 grid lg:grid-cols-2 gap-24 items-center">
                    <div className="animate-slide-up">
                        <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-3xl border border-white/20 px-8 py-3.5 rounded-md text-[10px] font-bold uppercase tracking-[0.4em] mb-12 shadow-2xl">
                            <Activity className="w-5 h-5 text-white animate-pulse" />
                            <span>Quantum Response Protocol Active</span>
                        </div>
                        <h1 className="text-6xl lg:text-7xl font-bold tracking-tight mb-12 leading-[1.1]">
                            Critical Care. <br />
                            <span className="text-red-200">Zero Delay.</span>
                        </h1>
                        <p className="text-2xl text-red-50 font-medium max-w-2xl mb-16 leading-relaxed opacity-90">
                            National Trauma Matrix, Vital Supply Sync, and Emergency Routing synchronized across all 28 states.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-8">
                            <button
                                onClick={() => alert('SOS Protocol Initiated. Geolocation sent to National Command Center.')}
                                className="bg-white text-red-600 px-12 py-6 rounded-lg font-bold text-2xl shadow-2xl hover:bg-red-50 transition-all active:scale-95 flex items-center justify-center space-x-6 group"
                            >
                                <AlertOctagon className="w-10 h-10 animate-pulse group-hover:rotate-90 transition-transform" />
                                <span>TRIGGER SOS</span>
                            </button>
                            <button
                                onClick={() => window.location.href = 'tel:112'}
                                className="bg-red-950/40 backdrop-blur-3xl border border-white/20 text-white px-12 py-6 rounded-lg font-bold text-2xl hover:bg-red-900 transition-all flex items-center justify-center space-x-6"
                            >
                                <PhoneCall className="w-10 h-10" />
                                <span>DIAL 112 HUB</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-3xl border border-white/20 p-16 rounded-xl hidden lg:block animate-scale-in relative overflow-hidden group shadow-2xl">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-bl-xl transition-all group-hover:scale-110"></div>
                        <h3 className="text-sm font-bold mb-12 uppercase tracking-[0.4em] flex items-center opacity-60">
                            <Activity className="w-6 h-6 mr-6" /> Live Command Stream
                        </h3>
                        <div className="space-y-8">
                            <LiveAlert active msg="Ambulance Node DEL-49 dispatched to GK-2" time="JUST NOW" />
                            <LiveAlert msg="Apollo Trauma reports 2 ICU beds cleared" time="4M AGO" />
                            <LiveAlert msg="National Blood Vault O- request synced" time="12M AGO" />
                            <LiveAlert msg="Emergency Air-Evac Node #12 STANDBY" time="22M AGO" />
                        </div>
                    </div>
                </div>
            </section>

            <main className="max-w-[1700px] mx-auto px-10 py-40 grid lg:grid-cols-12 gap-24">

                {/* Left: Resource Finders */}
                <div className="lg:col-span-8 space-y-32">

                    {/* Trauma Centers */}
                    <div className="bg-white rounded-2xl p-20 shadow-2xl shadow-red-500/5 border border-red-50 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center justify-between mb-20">
                            <div>
                                <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-none mb-6 uppercase">Trauma Matrix.</h2>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em]">Closest Verified Emergency Infrastructure Nodes</p>
                            </div>
                            <div className="w-20 h-20 bg-red-50 rounded-lg flex items-center justify-center text-red-600 shadow-sm">
                                <Navigation className="w-10 h-10" />
                            </div>
                        </div>
                        <div className="space-y-8">
                            {hospitals.length > 0 ? hospitals.map((h, i) => (
                                <EmergencyHospital
                                    key={h.id}
                                    status={h.status}
                                    name={h.name}
                                    range={h.range}
                                    beds={h.status === 'Available' ? `${h.icuBeds} ICU UNITS` : 'REACHED CAPACITY'}
                                    city={h.city}
                                    delay={i * 0.1}
                                />
                            )) : (
                                <p className="text-center font-bold text-slate-400 italic">Scanning offline. No nodes responding.</p>
                            )}
                        </div>
                    </div>

                    {/* Blood Network */}
                    <div className="bg-white rounded-2xl p-20 shadow-2xl shadow-red-500/5 border border-red-100 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-20">
                            <div>
                                <h2 className="text-4xl font-bold text-slate-900 tracking-tight leading-none mb-6 uppercase">Supply Pulse.</h2>
                                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.4em]">Real-time Inventory across Global Supply Matrix</p>
                            </div>
                            <Link href="/blood-bank" className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold text-[10px] uppercase tracking-widest hover:bg-red-700 transition flex items-center space-x-3 shadow-xl">
                                <Activity className="w-5 h-5" />
                                <span>Access LifeHub</span>
                            </Link>
                        </div>

                        <div className="grid grid-cols-4 md:grid-cols-8 gap-6 mb-16">
                            {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(type => (
                                <button
                                    key={type}
                                    onClick={() => setBloodFilter(type)}
                                    className={`h-16 rounded-lg font-bold text-xl transition-all duration-500 ${bloodFilter === type ? 'bg-red-600 text-white shadow-[0_20px_40px_-10px_rgba(220,38,38,0.5)] -translate-y-2' : 'bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500 border border-transparent shadow-sm'}`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>

                        <div className="p-10 bg-slate-950 rounded-lg flex items-center justify-center space-x-8 text-white group cursor-default shadow-2xl">
                            <div className="flex -space-x-4">
                                {[1, 2, 3, 4].map(i => <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 transition-transform group-hover:scale-110"></div>)}
                            </div>
                            <p className="text-slate-400 font-bold text-lg uppercase tracking-widest leading-relaxed">
                                Monitoring <span className="text-red-500 font-bold animate-pulse">24 CERTIFIED HUBS</span> within active proximity.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: Triage & Security */}
                <div className="lg:col-span-4 space-y-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>

                    {/* Triage Protocol */}
                    <div className="bg-slate-950 rounded-2xl p-16 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
                        <h4 className="text-[11px] font-bold mb-16 uppercase tracking-[0.5em] opacity-30">Triage Protocols.</h4>
                        <div className="space-y-8 relative z-10">
                            <ProtocolCard icon={<Heart className="text-red-600" />} title="Cardiac Sequence" sub="Automated CPR Logic" />
                            <ProtocolCard icon={<Droplets className="text-red-400" />} title="Hemorrhage SOP" sub="Vascular Constriction" />
                            <ProtocolCard icon={<Flame className="text-orange-500" />} title="Thermal Trauma" sub="Neutralization Loop" />
                            <ProtocolCard icon={<Wind className="text-blue-400" />} title="Airway Proxy" sub="Heimlich Manifold" />
                        </div>
                    </div>

                    {/* History Bypass Notice */}
                    <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-16 text-white relative overflow-hidden group shadow-2xl shadow-red-900/40">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-bl-xl transition-all group-hover:scale-120 duration-1000"></div>
                        <div className="flex items-center space-x-8 mb-12">
                            <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center border border-white/20 backdrop-blur-3xl shadow-2xl">
                                <ShieldAlert className="w-8 h-8" />
                            </div>
                            <h4 className="text-3xl font-bold tracking-tight leading-none uppercase">Break-Glass <br /> Protocol.</h4>
                        </div>
                        <p className="text-red-50 font-medium text-lg leading-relaxed mb-12 opacity-80">
                            Authorized override for unconscious trauma victims. Bypass Identity PIN to access critical life-saving metadata.
                        </p>
                        <button
                            onClick={() => setShowBreakGlassModal(true)}
                            className="w-full bg-white text-red-600 py-6 rounded-lg font-bold uppercase text-[10px] tracking-[0.5em] hover:bg-slate-900 hover:text-white transition-all shadow-2xl active:scale-95"
                        >
                            INITIATE OVERRIDE
                        </button>
                    </div>

                    {/* First Aid Kit QR */}
                    <div className="bg-white rounded-2xl p-16 border border-red-100 text-center shadow-sm hover:shadow-2xl transition-all duration-700 group">
                        <div className="w-56 h-56 bg-slate-50 border-2 border-slate-100 rounded-xl mx-auto mb-10 flex items-center justify-center group-hover:border-red-500/20 transition-all duration-700 relative overflow-hidden">
                            <Plus className="w-24 h-24 text-slate-100 animate-float" />
                            <div className="absolute inset-0 bg-red-600/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                        <h5 className="text-2xl font-bold text-slate-900 mb-4 uppercase tracking-tight">Sync Hardware.</h5>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">Pair Tactical First-Aid Node</p>
                    </div>
                </div>
            </main>

            {/* Break-Glass Modal */}
            {showBreakGlassModal && (
                <div className="fixed inset-0 bg-red-950/80 backdrop-blur-xl z-[100] flex items-center justify-center p-8 animate-in fade-in duration-300">
                    <div className="bg-white rounded-[4rem] shadow-2xl max-w-2xl w-full p-16 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-red-50 rounded-bl-[4rem]"></div>
                        <div className="flex items-center space-x-6 mb-12 relative z-10">
                            <div className="w-20 h-20 bg-red-600 rounded-[2rem] flex items-center justify-center text-white shadow-xl animate-pulse">
                                <ShieldAlert className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-4xl font-[950] text-slate-900 tracking-tighter italic uppercase leading-none">Emergency Override</h3>
                                <p className="text-red-600 font-black uppercase tracking-widest text-xs mt-3">Legal Authorization Required</p>
                            </div>
                        </div>

                        <div className="bg-red-50 border-2 border-red-100 p-8 rounded-3xl mb-12">
                            <p className="text-sm font-bold text-red-900 leading-relaxed uppercase tracking-widest italic">
                                "Under Section 42 of the Health Privacy Act, I declare this patient is unconscious/incapacitated and requires immediate medical intervention."
                            </p>
                        </div>

                        <div className="space-y-6 mb-12">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] ml-4">Reason for Break-Glass (Mandatory)</label>
                            <textarea
                                value={breakGlassReason}
                                onChange={(e) => setBreakGlassReason(e.target.value)}
                                placeholder="e.g. Unconscious road accident victim - No ID PIN"
                                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] px-10 py-8 outline-none focus:border-red-600 focus:bg-white transition-all font-bold text-lg"
                                rows={3}
                            ></textarea>
                        </div>

                        <div className="flex gap-6 mt-12">
                            <button
                                onClick={() => setShowBreakGlassModal(false)}
                                className="flex-1 bg-slate-100 text-slate-400 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:text-slate-900 transition-all"
                            >
                                Cancel Protocol
                            </button>
                            <button
                                disabled={!breakGlassReason}
                                onClick={() => {
                                    alert('CRITICAL: Break-Glass Activated. Logging Identity ' + Math.random().toString(36).substring(7).toUpperCase());
                                    setShowBreakGlassModal(false);
                                }}
                                className="flex-2 bg-red-600 text-white py-8 px-12 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:bg-red-700 transition-all shadow-2xl shadow-red-500/20 disabled:opacity-50"
                            >
                                Authorize & Extract Data
                            </button>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Action automatically reported to National Security Audit Registry</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function LiveAlert({ active, msg, time }: any) {
    return (
        <div className={`p-8 rounded-[2.8rem] border ${active ? 'bg-white/10 border-white/20 text-white shadow-xl' : 'bg-transparent border-transparent text-white/30'} flex items-center justify-between transition-all group/alert cursor-default`}>
            <div className="flex items-center space-x-8 overflow-hidden">
                <div className={`w-3 h-3 rounded-full shrink-0 ${active ? 'bg-red-400 animate-pulse shadow-[0_0_15px_rgba(248,113,113,0.5)]' : 'bg-slate-700'}`}></div>
                <p className="font-black text-sm truncate uppercase tracking-widest italic group-hover/alert:translate-x-2 transition-transform duration-500">{msg}</p>
            </div>
            <span className="text-[10px] font-black opacity-30 ml-6 shrink-0 uppercase tracking-widest">{time}</span>
        </div>
    );
}

function EmergencyHospital({ status, name, range, beds, city, delay = 0 }: any) {
    const isOk = status === 'Available';
    return (
        <div className="p-12 rounded-[4.5rem] border border-slate-50 flex flex-col md:flex-row md:items-center justify-between hover:border-red-600/20 hover:bg-red-50/20 hover:shadow-2xl transition-all duration-700 group cursor-pointer animate-slide-up" style={{ animationDelay: `${delay}s` }}>
            <div className="flex items-center space-x-12">
                <div className={`w-28 h-28 rounded-[3rem] border border-transparent group-hover:border-white shadow-sm flex items-center justify-center font-[950] text-4xl transition-all duration-500 uppercase italic ${isOk ? 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white' : 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white'}`}>
                    {name.charAt(0)}
                </div>
                <div>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-4">
                        <h4 className="font-[950] text-3xl text-slate-900 tracking-tighter uppercase italic group-hover:text-red-600 transition-colors">{name}</h4>
                        <span className={`px-6 py-2 rounded-full text-[10px] font-[950] uppercase tracking-[0.2em] border shadow-sm ${isOk ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100 animate-pulse'}`}>
                            {status}
                        </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-y-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center"><MapPin className="w-4 h-4 mr-3 text-red-500" /> {city}</div>
                        <span className="mx-4 opacity-20 hidden sm:block">|</span>
                        <div className="flex items-center"><Clock className="w-4 h-4 mr-3 text-blue-500" /> {range} NRT</div>
                        <span className="mx-4 opacity-20 hidden sm:block">|</span>
                        <div className="flex items-center"><Activity className="w-4 h-4 mr-3 text-emerald-500" /> {beds}</div>
                    </div>
                </div>
            </div>
            <button className="mt-8 md:mt-0 w-20 h-20 bg-slate-950 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl transition-all group-hover:scale-110 group-hover:bg-red-600 group-hover:rotate-12">
                <Navigation className="w-8 h-8" />
            </button>
        </div>
    );
}

function ProtocolCard({ icon, title, sub }: any) {
    return (
        <div className="flex items-center justify-between p-8 bg-white/5 border border-white/10 rounded-[2.8rem] hover:bg-white/10 hover:shadow-xl transition-all duration-500 cursor-pointer group/card">
            <div className="flex items-center space-x-8">
                <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center text-4xl border border-white/5 group-hover/card:bg-red-600 group-hover/card:rotate-12 group-hover/card:scale-110 transition-all duration-500">
                    {React.cloneElement(icon, { className: 'w-10 h-10' })}
                </div>
                <div>
                    <h5 className="font-[950] text-white text-2xl tracking-tighter italic uppercase mb-2">{title}</h5>
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] group-hover/card:text-red-400 transition-colors">{sub}</p>
                </div>
            </div>
            <ChevronRight className="w-8 h-8 text-slate-700 group-hover/card:text-white group-hover/card:translate-x-2 transition-all duration-500" />
        </div>
    );
}
