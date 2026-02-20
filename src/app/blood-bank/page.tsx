'use client';

import React, { useState, useEffect } from 'react';
import {
    Droplets,
    Heart,
    Activity,
    ActivitySquare,
    Users,
    MapPin,
    Search,
    AlertCircle,
    ArrowRightLeft,
    Thermometer,
    Clock,
    Download,
    ShieldCheck,
    Zap,
    ChevronRight,
    Filter,
    Stethoscope,
    Baby,
    Archive,
    History,
    Navigation,
    Truck,
    Globe,
    Lock,
    Eye,
    CheckCircle2,
    X,
    FileText,
    Map as MapIcon,
    AlertTriangle
} from 'lucide-react';
import Link from 'next/link';

type Tab = 'BLOOD' | 'ORGAN' | 'MORTUARY' | 'DONOR_RELO';

export default function LifeResourceHub() {
    const [activeTab, setActiveTab] = useState<Tab>('BLOOD');
    const [loading, setLoading] = useState(true);
    const [showEmergencyModal, setShowEmergencyModal] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-8 border-rose-50 rounded-full"></div>
                    <div className="absolute inset-0 border-8 border-rose-600 border-t-transparent rounded-full animate-spin"></div>
                    <Droplets className="absolute inset-0 m-auto w-8 h-8 text-rose-600 animate-pulse" />
                </div>
                <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-rose-400">Syncing National Life-Bank...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-rose-500/10">
            {/* National SOS HUD */}
            <header className="bg-rose-700 text-white pt-24 pb-48 px-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/5 rounded-full blur-[140px] -mr-40 -mt-40 animate-pulse"></div>
                <div className="max-w-[1700px] mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                        <div className="space-y-6">
                            <div className="inline-flex items-center space-x-4 bg-white/10 backdrop-blur-3xl border border-white/20 px-6 py-2 rounded-full">
                                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest">National Life-Grid Sync Active</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-[950] tracking-tighter leading-none italic italic">LifeHub.</h1>
                            <p className="text-rose-100 text-xl font-medium max-w-2xl italic tracking-tight opacity-80">
                                Integrated resource discovery for blood reserves, organ registries, and vital legacies.
                            </p>
                            <div className="flex space-x-8 pt-4">
                                <LiveCounter label="BLOOD UNITS" value="4.2M" />
                                <LiveCounter label="ORGAN PLEDGES" value="842K" />
                                <LiveCounter label="LIVES SAVED" value="1.8M" />
                            </div>
                        </div>

                        <div className="flex bg-rose-950/40 backdrop-blur-3xl p-1.5 rounded-[2rem] border border-white/10 shadow-2xl">
                            <TabTrigger label="Hemosphere" active={activeTab === 'BLOOD'} onClick={() => setActiveTab('BLOOD')} icon={<Droplets className="w-4 h-4" />} />
                            <TabTrigger label="VitalShare" active={activeTab === 'ORGAN'} onClick={() => setActiveTab('ORGAN')} icon={<Heart className="w-4 h-4" />} />
                            <TabTrigger label="Legacy Registry" active={activeTab === 'MORTUARY'} onClick={() => setActiveTab('MORTUARY')} icon={<Archive className="w-4 h-4" />} />
                            <TabTrigger label="Donor Profile" active={activeTab === 'DONOR_RELO'} onClick={() => setActiveTab('DONOR_RELO')} icon={<Users className="w-4 h-4" />} />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1700px] mx-auto px-10 -mt-24 pb-40 relative z-20">
                {activeTab === 'BLOOD' && <BloodSection onEmergency={() => setShowEmergencyModal(true)} />}
                {activeTab === 'ORGAN' && <OrganSection />}
                {activeTab === 'MORTUARY' && <MortuarySection />}
                {activeTab === 'DONOR_RELO' && <DonorSection />}
            </main>

            {/* Emergency Request Modal */}
            {showEmergencyModal && (
                <EmergencyRequestModal onClose={() => setShowEmergencyModal(false)} />
            )}
        </div>
    );
}

function TabTrigger({ label, active, onClick, icon }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center space-x-4 px-10 py-5 rounded-[1.6rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${active ? 'bg-white text-rose-700 shadow-2xl scale-105' : 'text-rose-100 hover:text-white'}`}
        >
            {icon && <span>{icon}</span>}
            <span>{label}</span>
        </button>
    );
}

function LiveCounter({ label, value }: any) {
    return (
        <div className="space-y-1">
            <span className="block text-[8px] font-black uppercase tracking-widest text-rose-300">{label}</span>
            <span className="text-2xl font-black tabular-nums">{value}</span>
        </div>
    );
}

{/* --- BLOOD SECTION --- */ }
function BloodSection({ onEmergency }: any) {
    const [view, setView] = useState<'LIST' | 'MAP'>('LIST');

    return (
        <div className="space-y-12 animate-in slide-in-from-bottom-12 duration-700">
            {/* Search & Requisition HUD */}
            <div className="flex flex-col xl:flex-row gap-8">
                <div className="flex-1 bg-white rounded-[3rem] p-4 border border-slate-100 shadow-sm flex items-center">
                    <div className="flex items-center flex-1 px-8 space-x-6 border-r border-slate-100">
                        <Search className="w-5 h-5 text-rose-600" />
                        <input type="text" placeholder="Search by Blood Group, Component (Plasma, WBC), or Node location..." className="w-full py-4 text-sm font-bold outline-none placeholder:text-slate-300" />
                    </div>
                    <div className="flex items-center px-8 space-x-4">
                        <div className="flex bg-slate-100 p-1 rounded-full">
                            <button onClick={() => setView('LIST')} className={`p-3 rounded-full transition-all ${view === 'LIST' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'}`}><Archive className="w-4 h-4" /></button>
                            <button onClick={() => setView('MAP')} className={`p-3 rounded-full transition-all ${view === 'MAP' ? 'bg-white text-rose-600 shadow-sm' : 'text-slate-400'}`}><MapIcon className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
                <button onClick={onEmergency} className="bg-rose-600 text-white px-12 py-7 rounded-[2.5rem] font-black uppercase text-xs tracking-[0.3em] hover:bg-rose-700 transition shadow-2xl shadow-rose-600/20 active:scale-95 flex items-center space-x-4">
                    <AlertTriangle className="w-5 h-5 animate-pulse" />
                    <span>Post Emergency SOS</span>
                </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Inventory / Availability Map Area */}
                <div className="lg:col-span-8">
                    {view === 'LIST' ? <BloodInventoryList /> : <BloodAvailabilityMap />}
                </div>

                {/* Logistics Radar */}
                <div className="lg:col-span-4 space-y-12">
                    <div className="bg-[#1A1A1A] rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/20 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
                        <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.5em] mb-10 italic">Rare Type Monitor</h4>
                        <div className="space-y-8">
                            <SOSCard group="Bombay Phenotype" units="1" node="Rare Blood Registry" dist="84km" />
                            <SOSCard group="O-Negative" units="4" node="Metro Trauma Center" dist="2km" />
                        </div>
                    </div>

                    <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm">
                        <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-10">Regional Supply Trends</h4>
                        <div className="space-y-10">
                            <SupplyTrend label="Whole Blood" value={82} color="bg-rose-500" />
                            <SupplyTrend label="Platelets" value={42} color="bg-amber-500" />
                            <SupplyTrend label="Plasma" value={65} color="bg-blue-500" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function BloodInventoryList() {
    const stocks = [
        { id: '1', node: 'Apollo Indraprastha', group: 'O+', units: 42, status: 'OPTIMAL', updated: '2m' },
        { id: '2', node: 'AIIMS Delhi Hub', group: 'O-', units: 4, status: 'CRITICAL', updated: 'Just Now' },
        { id: '3', node: 'Fortis Memorial', group: 'A+', units: 12, status: 'LOW', updated: '1h' },
        { id: '4', node: 'Max Healthcare', group: 'B+', units: 84, status: 'OPTIMAL', updated: '15m' },
    ];

    return (
        <div className="bg-white rounded-[4rem] p-12 border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-[950] tracking-tighter italic uppercase">Stock Matrix</h3>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Auto-Updating Stream (15m Interval)</span>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
                {stocks.map(s => (
                    <div key={s.id} className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] group hover:bg-white hover:shadow-2xl hover:border-rose-500/20 transition-all duration-700 cursor-pointer">
                        <div className="flex items-start justify-between mb-8">
                            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center border border-slate-100 text-3xl font-black italic text-rose-600 shadow-sm group-hover:scale-110 transition-transform">
                                {s.group}
                            </div>
                            <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${s.status === 'CRITICAL' ? 'bg-rose-600 text-white animate-pulse' : s.status === 'LOW' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white'}`}>
                                {s.status}
                            </span>
                        </div>
                        <h4 className="text-2xl font-[950] tracking-tighter italic uppercase mb-2 group-hover:text-rose-600 transition-colors leading-none">{s.node}</h4>
                        <div className="flex items-center justify-between mt-8 pt-8 border-t border-slate-100">
                            <div>
                                <span className="block text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">AVAILABLE UNITS</span>
                                <span className="text-3xl font-black italic">{s.units}</span>
                            </div>
                            <div className="text-right">
                                <span className="block text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">LAST SYNC</span>
                                <span className="text-xs font-black text-slate-500">{s.updated}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function BloodAvailabilityMap() {
    return (
        <div className="bg-white rounded-[4rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden h-[800px] flex flex-col items-center justify-center text-center">
            <div className="absolute inset-0 bg-slate-50/50 flex flex-col items-center justify-center">
                <div className="relative w-96 h-96">
                    <div className="absolute inset-0 border-2 border-rose-500/20 rounded-full animate-ping"></div>
                    <div className="absolute inset-0 border border-rose-500/40 rounded-full scale-75 animate-pulse"></div>
                    <Globe className="absolute inset-0 m-auto w-24 h-24 text-rose-600/10" />

                    {/* Floating Node Indicators */}
                    <span className="absolute top-10 left-20 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full shadow-lg"></span>
                    <span className="absolute bottom-20 right-10 w-4 h-4 bg-rose-600 border-4 border-white rounded-full shadow-lg animate-pulse"></span>
                    <span className="absolute top-40 right-40 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full shadow-lg"></span>
                </div>
                <div className="mt-12 space-y-4 relative z-10">
                    <h3 className="text-4xl font-[950] tracking-tighter italic uppercase leading-none">Geo-Spatial Pulse</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mb-12 italic italic">Real-time national blood density heat-map active.</p>
                    <div className="flex justify-center space-x-8">
                        <div className="flex items-center space-x-3"><div className="w-3 h-3 bg-emerald-500 rounded-full"></div> <span className="text-[10px] font-black uppercase tracking-widest">Available</span></div>
                        <div className="flex items-center space-x-3"><div className="w-3 h-3 bg-amber-500 rounded-full"></div> <span className="text-[10px] font-black uppercase tracking-widest">Limited</span></div>
                        <div className="flex items-center space-x-3"><div className="w-3 h-3 bg-rose-600 rounded-full"></div> <span className="text-[10px] font-black uppercase tracking-widest">Critical</span></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SOSCard({ group, units, node, dist }: any) {
    return (
        <div className="p-8 bg-white/5 border border-white/5 rounded-3xl group/sos hover:bg-white/10 transition-all cursor-crosshair">
            <div className="flex items-center justify-between mb-6">
                <span className="text-3xl font-black italic text-rose-500 group-hover/sos:scale-110 transition-transform">{group}</span>
                <span className="text-[8px] font-black bg-rose-600 text-white px-3 py-1 rounded-full uppercase tracking-widest animate-pulse">URGENT</span>
            </div>
            <h5 className="text-sm font-bold uppercase tracking-widest mb-2 italic">{node}</h5>
            <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{units} UNITS REQ</span>
                <span className="text-[10px] font-black text-rose-500 italic italic">{dist}</span>
            </div>
        </div>
    );
}

function SupplyTrend({ label, value, color }: any) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
                <span>{label}</span>
                <span className="text-slate-900 italic italic">{value}%</span>
            </div>
            <div className="h-1 bg-slate-50 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(244,63,94,0.3)]`} style={{ width: `${value}%` }}></div>
            </div>
        </div>
    );
}

{/* --- ORGAN SECTION --- */ }
function OrganSection() {
    return (
        <div className="grid lg:grid-cols-12 gap-12 animate-in slide-in-from-bottom-12 duration-700">
            <div className="lg:col-span-8 bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                <div className="flex items-center justify-between mb-20 relative z-10">
                    <div>
                        <h3 className="text-4xl font-[950] tracking-tighter italic uppercase">VitalShare Matrix</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">AI-Assisted Precision Matching Node</p>
                    </div>
                    <div className="px-8 py-4 bg-slate-950 text-white rounded-[1.5rem] flex items-center space-x-4 shadow-2xl">
                        <Zap className="w-5 h-5 text-blue-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Zero-Bias Allocation Active</span>
                    </div>
                </div>

                <div className="space-y-6 relative z-10">
                    <OrganAllocationCard organ="Heart" score={98.2} urgency="CRITICAL" node="Fortis Memorial" wait="14d" status="VERIFIED" />
                    <OrganAllocationCard organ="Liver" score={91.4} urgency="HIGH" node="Apollo Indra" wait="3m" status="MATCHED" />
                    <OrganAllocationCard organ="Kidney" score={88.9} urgency="STABLE" node="AIIMS Delhi" wait="2y" status="WAITLIST" />
                </div>

                <div className="mt-20 p-12 bg-slate-50 border border-slate-100 rounded-[3rem] flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Lock className="w-10 h-10 text-blue-600" />
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-widest italic italic">Blockchain Audit Chain</h4>
                            <p className="text-[10px] font-black opacity-30 uppercase tracking-widest mt-1">Immutable proof of ethical resource allocation.</p>
                        </div>
                    </div>
                    <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline underline-offset-8">View Signed Chain</button>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
                <div className="bg-blue-600 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-tr-[4rem] group-hover:scale-110 transition-transform"></div>
                    <h4 className="text-[10px] font-black text-blue-200 uppercase tracking-[0.4em] mb-12 italic">Pledge Enrollment</h4>
                    <div className="space-y-10 group-hover:opacity-80 transition-opacity">
                        <PledgeInput label="Aadhaar Linked ID" val="IND-HID-9421" />
                        <PledgeInput label="Consent Protocol" val="PLEDGE_ALL_VITAL" />
                        <PledgeInput label="Successor Verified" val="YES (E-VETTED)" />
                    </div>
                    <button className="w-full mt-16 py-8 bg-white text-blue-600 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl hover:scale-105 transition-all">Enroll Life Pledge</button>
                </div>

                <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm">
                    <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-10 italic">Waiting Index Dynamics</h4>
                    <div className="space-y-8">
                        <WaitingIndex label="Kidney" count="42.1K" color="blue" />
                        <WaitingIndex label="Liver" count="12.4K" color="indigo" />
                        <WaitingIndex label="Heart" count="2.8K" color="rose" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function OrganAllocationCard({ organ, score, urgency, node, wait, status }: any) {
    return (
        <div className="flex flex-col xl:flex-row items-center justify-between p-12 bg-slate-50/50 border border-slate-100/50 rounded-[4rem] group hover:bg-white hover:border-blue-500/30 hover:shadow-2xl transition-all duration-700 cursor-pointer">
            <div className="flex items-center space-x-12 flex-1">
                <div className="w-24 h-24 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-center text-4xl font-black italic italic text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                    {organ[0]}
                </div>
                <div>
                    <div className="flex items-center space-x-6 mb-3">
                        <h4 className="text-3xl font-[950] tracking-tighter italic uppercase underline decoration-blue-500/20 underline-offset-8 group-hover:text-blue-600 transition-colors">{organ}</h4>
                        <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${urgency === 'CRITICAL' ? 'bg-rose-600 text-white animate-pulse' : 'bg-blue-600 text-white'}`}>{urgency}</span>
                    </div>
                    <div className="flex space-x-10 text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">
                        <span>Node: {node}</span>
                        <span>Wait: {wait}</span>
                        <span className="text-blue-500">{status}</span>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-12 mt-10 xl:mt-0">
                <div className="text-right">
                    <span className="block text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 italic">MATCH SCORE</span>
                    <span className="text-4xl font-[950] tabular-nums underline decoration-blue-500/10 group-hover:text-blue-600 transition-colors">{score}%</span>
                </div>
                <button className="w-16 h-16 bg-slate-900 text-white rounded-[2rem] flex items-center justify-center hover:bg-blue-600 transition-all active:scale-90 shadow-2xl">
                    <ChevronRight className="w-8 h-8" />
                </button>
            </div>
        </div>
    );
}

function PledgeInput({ label, val }: any) {
    return (
        <div className="border-b border-white/10 pb-4">
            <span className="block text-[8px] font-black text-blue-200 uppercase tracking-widest mb-2 opacity-60">{label}</span>
            <span className="text-lg font-black italic">{val}</span>
        </div>
    );
}

function WaitingIndex({ label, count, color }: any) {
    const colors = { blue: 'bg-blue-500', indigo: 'bg-indigo-500', rose: 'bg-rose-500' }[color as 'blue' | 'indigo' | 'rose'];
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full ${colors}`}></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
            </div>
            <span className="text-xl font-black italic">{count}</span>
        </div>
    );
}

{/* --- MORTUARY SECTION --- */ }
function MortuarySection() {
    return (
        <div className="space-y-12 animate-in slide-in-from-bottom-12 duration-700">
            <div className="bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-20">
                    <div>
                        <h3 className="text-4xl font-[950] tracking-tighter italic uppercase">Legacy Registry</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Official Vital Identity Stream (Civil Registration Hub)</p>
                    </div>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                        <button className="px-10 py-5 bg-white text-slate-900 shadow-2xl rounded-xl text-[10px] font-black uppercase tracking-widest">Departures</button>
                        <button className="px-10 py-5 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-emerald-600 transition-colors">Arrivals</button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <DeathRecord name="Rajesh Kumar" hid="IND-HID-9012" cause="Cardiac Arrest" status="CERTIFIED" node="Apollo Node 12" />
                    <DeathRecord name="Anita Sharma" hid="IND-HID-3341" cause="Natural Causes" status="PENDING_PM" node="AIIMS Hub" />
                    <DeathRecord name="Vikram Singh" hid="IND-HID-1212" cause="Trauma Logic" status="RELEASED" node="Fortis Memorial" />
                    <DeathRecord name="Meena Kumari" hid="IND-HID-5562" cause="Acute Failure" status="ARCHIVED" node="Safdarjung" />
                </div>
            </div>

            <div className="bg-slate-950 rounded-[4rem] p-16 text-white shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rose-600/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                <h4 className="text-[10px] font-black text-rose-500 uppercase tracking-[0.4em] mb-12 italic">Cadaver Research Eligibility</h4>
                <div className="grid md:grid-cols-3 gap-12">
                    <ResearchUnit label="Cornea Eligible" val="YES" />
                    <ResearchUnit label="Skin Graft Ready" val="PENDING CONSENT" />
                    <ResearchUnit label="Bone Matrix" val="VERIFIED (ARCHIVED)" />
                </div>
            </div>
        </div>
    );
}

function DeathRecord({ name, hid, cause, status, node }: any) {
    return (
        <div className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] group hover:bg-white hover:border-slate-900/10 hover:shadow-2xl transition-all duration-700 cursor-pointer">
            <div className="flex items-center justify-between mb-8">
                <div className="w-16 h-16 bg-white border border-slate-100 rounded-2xl flex items-center justify-center text-slate-200 group-hover:text-slate-900 transition-colors">
                    <Archive className="w-8 h-8" />
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${status === 'CERTIFIED' ? 'bg-emerald-500 text-white' : status === 'PENDING_PM' ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white'}`}>{status}</span>
            </div>
            <h4 className="text-3xl font-[950] tracking-tighter italic uppercase group-hover:text-slate-900 transition-colors leading-none mb-3 underline decoration-slate-900/10 underline-offset-8">{name}</h4>
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest italic pt-6 border-t border-slate-100 mt-6">
                <span>HID: {hid}</span>
                <span>{node}</span>
                <span className="text-slate-900">CAUSE: {cause}</span>
            </div>
        </div>
    );
}

function ResearchUnit({ label, val }: any) {
    return (
        <div className="p-10 bg-white/5 border border-white/5 rounded-[2.5rem] group hover:bg-white/10 transition-all">
            <span className="block text-[8px] font-black text-blue-400 uppercase tracking-widest mb-4 opacity-60 italic">{label}</span>
            <span className="text-3xl font-[950] italic tracking-tighter opacity-80 group-hover:opacity-100 transition-opacity">{val}</span>
        </div>
    );
}

{/* --- DONOR SECTION --- */ }
function DonorSection() {
    return (
        <div className="grid lg:grid-cols-12 gap-12 animate-in slide-in-from-bottom-12 duration-700">
            <div className="lg:col-span-12 bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-rose-50/50 rounded-full blur-[100px] -ml-40 -mt-40"></div>
                <div className="max-w-2xl mx-auto relative z-10">
                    <div className="w-32 h-32 bg-rose-600 rounded-[3rem] text-white flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-rose-600/30">
                        <Users className="w-12 h-12" />
                    </div>
                    <h3 className="text-5xl font-[950] tracking-tighter italic uppercase mb-6 leading-none">Your Life Identity.</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mb-16 italic italic">Unified portal to manage your health pledges and donation legacy.</p>

                    <div className="grid md:grid-cols-2 gap-8 text-left">
                        <DonorIdentityCard label="PLEDGE STATUS" val="ACTIVE ENROLLED" icon={<ShieldCheck className="w-5 h-5 text-emerald-500" />} />
                        <DonorIdentityCard label="BLOOD GROUP" val="O NEGATIVE - RARE" icon={<Droplets className="w-5 h-5 text-rose-600" />} />
                        <DonorIdentityCard label="VITAL ORGANS" val="8 REGISTERED" icon={<Heart className="w-5 h-5 text-rose-600" />} />
                        <DonorIdentityCard label="AVAILABILITY" val="INSTANT (NATIONWIDE)" icon={<Zap className="w-5 h-5 text-amber-500" />} />
                    </div>

                    <div className="mt-20 flex flex-col md:flex-row gap-8 justify-center">
                        <button className="px-16 py-8 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-rose-600 transition-all flex items-center justify-center space-x-6">
                            <Download className="w-6 h-6" />
                            <span>Download Life Certificate</span>
                        </button>
                        <button className="px-16 py-8 border-2 border-slate-100 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-50 transition-all">
                            Update Successor Consent
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DonorIdentityCard({ label, val, icon }: any) {
    return (
        <div className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] hover:bg-white hover:shadow-2xl transition-all duration-700">
            <div className="flex items-center space-x-4 mb-3">
                {icon}
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-2xl font-[950] italic tracking-tighter uppercase">{val}</span>
        </div>
    );
}

{/* --- MODALS --- */ }
function EmergencyRequestModal({ onClose }: any) {
    return (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-2xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
            <div className="bg-white rounded-[4rem] shadow-[0_0_100px_rgba(244,63,94,0.15)] max-w-2xl w-full p-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-rose-50 rounded-full blur-[100px] -mr-40 -mt-40 opacity-50"></div>
                <button onClick={onClose} className="absolute right-12 top-12 p-4 bg-slate-50 rounded-2xl text-slate-300 hover:text-rose-600 transition-all hover:rotate-90">
                    <X className="w-8 h-8" />
                </button>

                <div className="relative z-10 mb-16">
                    <div className="flex items-center space-x-8 mb-4">
                        <div className="w-16 h-16 bg-rose-600 text-white rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
                            <AlertCircle className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-4xl font-[950] tracking-tighter italic leading-none">Emergency SOS.</h3>
                            <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest leading-none mt-2 block">Priority National Requisition Hub</span>
                        </div>
                    </div>
                </div>

                <form className="space-y-12 relative z-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Patient Health-ID (UHID)</label>
                        <input type="text" placeholder="IND-HID-XXXX" className="w-full bg-slate-50 border-none rounded-[2rem] py-8 px-10 text-2xl font-black outline-none focus:ring-4 focus:ring-rose-500/5 transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Blood Group Req</label>
                            <select className="w-full bg-slate-50 border-none rounded-[2rem] py-8 px-10 text-2xl font-black outline-none focus:ring-4 focus:ring-rose-500/5 transition-all appearance-none cursor-pointer">
                                <option>O-</option>
                                <option>A+</option>
                                <option>B+</option>
                                <option>Bombay Pheno</option>
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Units Needed</label>
                            <input type="number" placeholder="2" className="w-full bg-slate-50 border-none rounded-[2rem] py-8 px-10 text-2xl font-black outline-none focus:ring-4 focus:ring-rose-500/5 transition-all" />
                        </div>
                    </div>
                    <div className="p-8 bg-rose-50 rounded-[2.5rem] border border-rose-100 flex items-center space-x-8 text-rose-600">
                        <ShieldCheck className="w-10 h-10 shrink-0" />
                        <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">By triggering SOS, you confirm doctor authorization. False alerts are subject to NHA penalty protocols.</p>
                    </div>
                    <button onClick={(e) => { e.preventDefault(); alert('Emergency Transmission Broadcasted to National Nodes.'); onClose(); }} className="w-full py-10 bg-slate-950 text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.5em] shadow-2xl hover:bg-rose-600 transition-all active:scale-95">Trigger National Broadcast</button>
                </form>
            </div>
        </div>
    );
}
