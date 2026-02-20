'use client';

import React, { useState, useEffect } from 'react';
import {
    FileText, Pill, Search, Activity, ArrowLeft, Download, ShieldCheck,
    Calendar, ExternalLink, Lock, ChevronRight, Filter, Layers, Sparkles,
    Award, Heart, AlertCircle, Clock, Zap, MapPin, Share2, Eye, Baby,
    Archive, Thermometer, User, ClipboardList, TrendingUp, BarChart3,
    CheckCircle2, X
} from 'lucide-react';
import Link from 'next/link';
import NotificationTray from '@/components/NotificationTray';

type RecordTab = 'TIMELINE' | 'LABS' | 'MEDS' | 'SURGERY' | 'CONSENT';

export default function DigitalHealthLocker() {
    const [activeTab, setActiveTab] = useState<RecordTab>('TIMELINE');
    const [loading, setLoading] = useState(true);
    const [showConsentModal, setShowConsentModal] = useState(false);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-0 border-8 border-blue-50 rounded-full"></div>
                    <div className="absolute inset-0 border-8 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <Lock className="absolute inset-0 m-auto w-8 h-8 text-blue-600 animate-pulse" />
                </div>
                <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Decrypting Health Vault...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-blue-500/10">
            {/* National Vault Header */}
            <header className="bg-slate-950 text-white pt-24 pb-48 px-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] -mr-40 -mt-40 animate-pulse"></div>

                <div className="max-w-[1700px] mx-auto relative z-10">
                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-12">
                        <div className="space-y-6">
                            <div className="inline-flex items-center space-x-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
                                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">National Health Locker Status: SECURE</span>
                            </div>
                            <h1 className="text-6xl md:text-8xl font-[950] tracking-tighter leading-none italic">
                                Health <br /> <span className="text-blue-500">Vault.</span>
                            </h1>
                            <div className="flex flex-wrap gap-8 pt-4">
                                <HeaderStat label="SWATHYASEYU ID" value="SS-9421-88" />
                                <HeaderStat label="AADHAAR LINKED" value="XXXX-XXXX-9012" />
                                <HeaderStat label="BLOOD GROUP" value="O- POSITIVE" />
                                <HeaderStat label="DOCUMENTS" value="42 ASSETS" />
                            </div>
                        </div>

                        <div className="flex bg-white/5 p-1.5 rounded-[2rem] border border-white/10 backdrop-blur-xl">
                            <RecordTrigger label="Timeline" active={activeTab === 'TIMELINE'} onClick={() => setActiveTab('TIMELINE')} icon={<Clock className="w-4 h-4" />} />
                            <RecordTrigger label="Diagnostics" active={activeTab === 'LABS'} onClick={() => setActiveTab('LABS')} icon={<BarChart3 className="w-4 h-4" />} />
                            <RecordTrigger label="Medications" active={activeTab === 'MEDS'} onClick={() => setActiveTab('MEDS')} icon={<Pill className="w-4 h-4" />} />
                            <RecordTrigger label="Surgeries" active={activeTab === 'SURGERY'} onClick={() => setActiveTab('SURGERY')} icon={<Activity className="w-4 h-4" />} />
                            <RecordTrigger label="Privacy" active={activeTab === 'CONSENT'} onClick={() => setActiveTab('CONSENT')} icon={<Lock className="w-4 h-4" />} />
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1700px] mx-auto px-10 -mt-24 pb-40 relative z-20">
                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Left Panel: Content Area */}
                    <div className="lg:col-span-8 space-y-12">
                        {activeTab === 'TIMELINE' && <TimelineSection />}
                        {activeTab === 'LABS' && <LabsSection />}
                        {activeTab === 'MEDS' && <MedsSection />}
                        {activeTab === 'SURGERY' && <SurgerySection />}
                        {activeTab === 'CONSENT' && <PrivacySection onGrant={() => setShowConsentModal(true)} />}
                    </div>

                    {/* Right Panel: Vital Summary & Risk Matrix */}
                    <div className="lg:col-span-4 space-y-12">
                        <HealthSummaryCard />
                        <QuickActionsCard onShare={() => setShowConsentModal(true)} />
                        <SecurityAuditCard />
                    </div>
                </div>
            </main>

            {/* Consent Modal */}
            {showConsentModal && (
                <ConsentGrantModal onClose={() => setShowConsentModal(false)} />
            )}
        </div>
    );
}

function HeaderStat({ label, value }: any) {
    return (
        <div className="space-y-1">
            <span className="block text-[8px] font-black uppercase tracking-widest text-slate-500">{label}</span>
            <span className="text-xl font-black tabular-nums">{value}</span>
        </div>
    );
}

function RecordTrigger({ label, active, onClick, icon }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center space-x-3 px-10 py-5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${active ? 'bg-white text-slate-900 shadow-2xl scale-105' : 'text-slate-400 hover:text-white'}`}
        >
            {icon && <span>{icon}</span>}
            <span>{label}</span>
        </button>
    );
}

{/* --- TIMELINE SECTION --- */ }
function TimelineSection() {
    const events = [
        { id: '1', date: 'Oct 12, 2025', type: 'SURGERY', title: 'Laparoscopic Appendectomy', hospital: 'Apollo Hub', doctor: 'Dr. Vikram Seth', status: 'COMPLETED' },
        { id: '2', date: 'Aug 24, 2025', type: 'OPD', title: 'Cardiology Consultation', hospital: 'AIIMS Delhi', doctor: 'Dr. Sarah J.', status: 'FOLLOW_UP' },
        { id: '3', date: 'Jul 15, 2025', type: 'LAB', title: 'Full Body Diagnostic Scan', hospital: 'Max Healthcare', doctor: 'Dr. Arun G.', status: 'NORMAL' },
        { id: '4', date: 'May 02, 2025', type: 'EMERGENCY', title: 'Acute Trauma Response', hospital: 'Metro City Hospital', doctor: 'ER Team Node 4', status: 'RESOLVED' },
    ];

    return (
        <div className="bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm space-y-12 animate-in slide-in-from-bottom-12 duration-700">
            <div className="flex items-center justify-between">
                <h3 className="text-3xl font-[950] tracking-tighter italic uppercase">Clinical Journey</h3>
                <div className="flex space-x-4">
                    <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-blue-600 transition-all"><Filter className="w-5 h-5" /></button>
                    <button className="px-8 py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest">Download Full PDF</button>
                </div>
            </div>

            <div className="space-y-10 relative before:content-[''] before:absolute before:left-[47px] before:top-10 before:bottom-10 before:w-px before:bg-slate-100">
                {events.map((e, idx) => (
                    <div key={e.id} className="flex items-start space-x-12 group">
                        <div className={`w-24 h-24 rounded-3xl flex items-center justify-center border-4 border-white shadow-xl relative z-10 transition-transform group-hover:scale-110 ${e.type === 'SURGERY' ? 'bg-rose-50 text-rose-600' : e.type === 'LAB' ? 'bg-blue-50 text-blue-600' : e.type === 'EMERGENCY' ? 'bg-slate-950 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
                            {e.type === 'SURGERY' ? <Activity className="w-8 h-8" /> : e.type === 'LAB' ? <ClipboardList className="w-8 h-8" /> : e.type === 'EMERGENCY' ? <Zap className="w-8 h-8" /> : <User className="w-8 h-8" />}
                        </div>
                        <div className="flex-1 pt-4">
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">{e.date}</span>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-blue-600 transition-colors">{e.title}</h4>
                                    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">Verified Node: {e.hospital} • {e.doctor}</p>
                                </div>
                                <div className="text-right flex items-center space-x-6">
                                    <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${e.status === 'COMPLETED' ? 'bg-emerald-50 text-emerald-600' : e.status === 'NORMAL' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                                        {e.status}
                                    </div>
                                    <button className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 hover:bg-slate-900 hover:text-white transition-all"><ChevronRight className="w-6 h-6" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

{/* --- LABS SECTION --- */ }
function LabsSection() {
    return (
        <div className="space-y-12 animate-in slide-in-from-bottom-12 duration-700">
            <div className="grid md:grid-cols-2 gap-8">
                <LabReportCard title="Complete Blood Count" date="15 Jul 2025" hospital="Max Labs" abnormal={false} />
                <LabReportCard title="HbA1c - Glycated Hemoglobin" date="12 Jul 2025" hospital="AIIMS Diagnostic" abnormal={true} value="7.4%" refRange="4.0 - 5.6%" />
                <LabReportCard title="Lipid Profile" date="10 Jul 2025" hospital="Apollo Diagnostics" abnormal={true} value="240 mg/dL" refRange="< 200 mg/dL" />
                <LabReportCard title="Chest X-Ray Digital" date="05 Jul 2025" hospital="Metro Radiology" abnormal={false} />
            </div>

            <div className="bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-16">
                    <div>
                        <h3 className="text-3xl font-[950] tracking-tighter italic uppercase leading-none">Vital Trends</h3>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">Historical Pulse Analysis</p>
                    </div>
                    <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                        <button className="px-8 py-3 bg-white shadow-xl rounded-xl text-[10px] font-black uppercase tracking-widest">Blood Sugar</button>
                        <button className="px-8 py-3 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest">Cholesterol</button>
                    </div>
                </div>

                <div className="h-64 flex items-end space-x-6">
                    <TrendBar height="60%" label="May" color="bg-slate-200" />
                    <TrendBar height="75%" label="Jun" color="bg-slate-200" />
                    <TrendBar height="95%" label="Jul" color="bg-rose-500" warning />
                    <TrendBar height="85%" label="Aug" color="bg-amber-500" />
                    <TrendBar height="70%" label="Sep" color="bg-blue-500" />
                    <TrendBar height="65%" label="Oct" color="bg-blue-500" />
                </div>
            </div>
        </div>
    );
}

function LabReportCard({ title, date, hospital, abnormal, value, refRange }: any) {
    return (
        <div className={`p-10 rounded-[3.5rem] border transition-all duration-700 cursor-pointer group hover:shadow-2xl ${abnormal ? 'bg-rose-50/30 border-rose-100' : 'bg-white border-slate-100'}`}>
            <div className="flex justify-between items-start mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12 ${abnormal ? 'bg-rose-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                    <ClipboardList className="w-8 h-8" />
                </div>
                {abnormal && <span className="bg-rose-600 text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest animate-pulse">ABNORMAL</span>}
            </div>
            <h4 className="text-2xl font-[950] tracking-tighter italic uppercase mb-2 group-hover:text-blue-600 transition-colors leading-none">{title}</h4>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{hospital} • {date}</p>

            {(value || refRange) && (
                <div className="mt-8 pt-8 border-t border-slate-100/50 flex justify-between">
                    <div>
                        <span className="block text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">MEASURED</span>
                        <span className={`text-xl font-black ${abnormal ? 'text-rose-600' : 'text-slate-900'}`}>{value}</span>
                    </div>
                    <div className="text-right">
                        <span className="block text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">REF RANGE</span>
                        <span className="text-sm font-black text-slate-500">{refRange}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

function TrendBar({ height, label, color, warning }: any) {
    return (
        <div className="flex-1 flex flex-col items-center group">
            <div className={`w-full ${color} rounded-t-2xl transition-all duration-1000 group-hover:opacity-80 relative`} style={{ height }}>
                {warning && <AlertCircle className="absolute -top-10 left-0 right-0 mx-auto w-5 h-5 text-rose-600 animate-bounce" />}
            </div>
            <span className="mt-6 text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</span>
        </div>
    );
}

{/* --- MEDS SECTION --- */ }
function MedsSection() {
    const meds = [
        { id: '1', name: 'Metformin 500mg', dose: '1-0-1 (After Food)', duration: 'Active (Ongoing)', doctor: 'Dr. Sarah J.', type: 'Chronic' },
        { id: '2', name: 'Atorvastatin 10mg', dose: '0-0-1 (Night)', duration: 'Active (Ongoing)', doctor: 'Dr. Sarah J.', type: 'Chronic' },
        { id: '3', name: 'Augmentin 625 DUO', dose: '1-0-1 (5 Days)', duration: 'Completed (Oct 2025)', doctor: 'Dr. Rahul M.', type: 'Acute' },
    ];

    return (
        <div className="bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm space-y-12 animate-in slide-in-from-bottom-12 duration-700">
            <div className="flex items-center justify-between mb-12">
                <h3 className="text-3xl font-[950] tracking-tighter italic uppercase">Medication Ledger</h3>
                <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-6 py-2 rounded-full uppercase tracking-widest border border-blue-100 italic">SYNCED WITH CLINICAL PHARMACY GRID</span>
            </div>

            <div className="space-y-6">
                {meds.map(m => (
                    <div key={m.id} className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] group hover:bg-white hover:shadow-2xl hover:border-blue-500/20 transition-all duration-700 flex items-center justify-between">
                        <div className="flex items-center space-x-10">
                            <div className="w-20 h-20 bg-white border border-slate-100 rounded-[2.5rem] flex items-center justify-center text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                                <Pill className="w-10 h-10" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-[950] tracking-tighter italic uppercase leading-none mb-2">{m.name}</h4>
                                <div className="flex space-x-8 text-[11px] font-bold text-slate-400 uppercase tracking-widest italic pt-2">
                                    <span>{m.doctor}</span>
                                    <span className="text-blue-500">{m.type}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-12">
                            <div className="text-right">
                                <span className="block text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">DOSAGE GRID</span>
                                <span className="text-sm font-black text-slate-900">{m.dose}</span>
                            </div>
                            <div className="px-6 py-2 bg-white rounded-full border border-slate-100 text-[10px] font-black uppercase tracking-widest">
                                {m.duration}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-10 bg-slate-950 rounded-[3rem] text-white flex items-center justify-between shadow-2xl">
                <div className="flex items-center space-x-8">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center"><AlertCircle className="w-8 h-8 text-amber-500" /></div>
                    <div>
                        <h4 className="text-lg font-black uppercase tracking-tight leading-none">Refill Required</h4>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2">Metformin 500mg supply depleting in 3 days.</p>
                    </div>
                </div>
                <button className="px-10 py-5 bg-white text-slate-950 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">Order Refill Hub</button>
            </div>
        </div>
    );
}

{/* --- SURGERY SECTION --- */ }
function SurgerySection() {
    return (
        <div className="bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm space-y-12 animate-in slide-in-from-bottom-12 duration-700">
            <div className="flex items-center justify-between mb-16">
                <h3 className="text-4xl font-[950] tracking-tighter italic uppercase leading-none">Surgical Registry</h3>
                <div className="w-20 h-20 bg-rose-50 rounded-3xl flex items-center justify-center text-rose-600 border border-rose-100"><Activity className="w-10 h-10" /></div>
            </div>

            <div className="p-12 bg-slate-50 border border-slate-100 rounded-[4rem] group hover:bg-white hover:border-rose-500/20 hover:shadow-2xl transition-all duration-700">
                <div className="flex justify-between items-start mb-12">
                    <div>
                        <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-4 py-1 rounded-full uppercase tracking-widest block w-fit mb-4">CRITICAL CARE NODE #12</span>
                        <h4 className="text-4xl font-[950] tracking-tighter italic uppercase leading-none group-hover:text-rose-600 transition-colors">Laparoscopic Appendectomy</h4>
                    </div>
                    <div className="text-right">
                        <span className="block text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">DATE OF OPERATION</span>
                        <span className="text-xl font-black italic">12 OCT 2025</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-12 py-10 border-y border-slate-100">
                    <SurgeryInfo label="Lead Surgeon" val="Dr. Vikram Seth" />
                    <SurgeryInfo label="Anesthesia" val="General (Verified)" />
                    <SurgeryInfo label="OT Node" val="BLK-OT-4" />
                    <SurgeryInfo label="ICU Stay" val="24 Hours" />
                </div>

                <div className="mt-12 flex justify-between items-center">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">All operation notes and digital histopathology are archived in your health locker.</p>
                    <div className="flex space-x-4">
                        <button className="p-5 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 shadow-sm"><Download className="w-6 h-6" /></button>
                        <button className="px-10 py-5 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all">View Op-Notes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SurgeryInfo({ label, val }: any) {
    return (
        <div>
            <span className="block text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">{label}</span>
            <span className="text-sm font-black italic">{val}</span>
        </div>
    );
}

{/* --- PRIVACY SECTION --- */ }
function PrivacySection({ onGrant }: any) {
    return (
        <div className="bg-slate-950 rounded-[4rem] p-16 text-white shadow-2xl relative overflow-hidden animate-in slide-in-from-bottom-12 duration-700">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>

            <div className="flex items-center justify-between mb-20 relative z-10">
                <div className="flex items-center space-x-8">
                    <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center"><Lock className="w-10 h-10" /></div>
                    <div>
                        <h3 className="text-4xl font-[950] tracking-tighter italic uppercase leading-none">Privacy Guard</h3>
                        <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mt-2">Unified Consent & Access Hub</p>
                    </div>
                </div>
                <button onClick={onGrant} className="px-12 py-6 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-blue-500 transition-all">Grant Temporary Access</button>
            </div>

            <div className="space-y-10 relative z-10">
                <AccessLogItem node="Apollo Indraprastha" purpose="Clinical Followup" date="JUST NOW" duration="48 Hours" status="ACTIVE" />
                <AccessLogItem node="National Lab Network" purpose="Diagnostic Sync" date="2H AGO" duration="Permanent" status="ACTIVE" />
                <AccessLogItem node="AIIMS Delhi Hub" purpose="ER Record Request" date="YESTERDAY" duration="EXPIRED" status="CLOSED" />
            </div>

            <div className="mt-20 p-12 bg-white/5 border border-white/10 rounded-[3rem] flex items-center justify-between relative z-10">
                <div className="flex items-center space-x-8">
                    <Eye className="w-10 h-10 text-slate-500" />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 max-w-sm leading-relaxed">System maintains an immutable audit log of all identity data transmissions across national sector nodes.</p>
                </div>
                <button className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:underline underline-offset-8">View Compliance Logs</button>
            </div>
        </div>
    );
}

function AccessLogItem({ node, purpose, date, duration, status }: any) {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between p-10 bg-white/5 border border-white/5 rounded-[2.5rem] group hover:bg-white/10 transition-all">
            <div className="flex items-center space-x-10 flex-1">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-500/10 text-slate-500'}`}>
                    <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                    <h4 className="text-xl font-black italic uppercase tracking-tighter group-hover:text-blue-400 transition-colors leading-none mb-1">{node}</h4>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic">{purpose} • {date}</p>
                </div>
            </div>
            <div className="flex items-center space-x-12 mt-8 md:mt-0">
                <div className="text-right">
                    <span className="block text-[8px] font-black text-slate-600 uppercase tracking-widest mb-1">GRANT PERIOD</span>
                    <span className="text-sm font-black italic">{duration}</span>
                </div>
                <button className={`px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border ${status === 'ACTIVE' ? 'bg-rose-600/10 border-rose-500/20 text-rose-500' : 'bg-slate-700/50 border-white/10 text-slate-500'}`}>
                    {status === 'ACTIVE' ? 'REVOKE ACCESS' : 'RE-GRANT'}
                </button>
            </div>
        </div>
    );
}

{/* --- SIDEBAR CARDS --- */ }
function HealthSummaryCard() {
    return (
        <div className="bg-slate-900 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-12 italic">Vitals Intelligence</h4>
            <div className="space-y-10">
                <SidebarVital label="CHRONIC STATUS" val="HYPERTENSION STAGE 1" color="text-amber-500" />
                <SidebarVital label="ACTIVE ALLERGIES" val="PENICILLIN, LATEX" color="text-rose-500" />
                <SidebarVital label="LAST OPD NODE" val="APOLLO CHENNAI" color="text-blue-500" />
                <SidebarVital label="NEXT TEST DUE" val="LIPID PROFILE (JAN)" color="text-emerald-500" />
            </div>
            <div className="mt-12 h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-blue-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            </div>
            <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mt-4 text-center">Syncing with Health Satellite Cluster #B-04</p>
        </div>
    );
}

function SidebarVital({ label, val, color }: any) {
    return (
        <div className="group cursor-default">
            <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mb-2 opacity-60">{label}</span>
            <span className={`text-lg font-black italic tracking-tight group-hover:translate-x-2 transition-transform block ${color}`}>{val}</span>
        </div>
    );
}

function QuickActionsCard({ onShare }: any) {
    return (
        <div className="bg-white rounded-[4rem] p-12 border border-slate-100 shadow-sm space-y-4">
            <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-8 italic">Rapid Record Ops.</h4>
            <button onClick={onShare} className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-900 hover:text-white rounded-3xl transition-all duration-500 group">
                <span className="text-[11px] font-black uppercase tracking-widest">Generate Share Link</span>
                <Share2 className="w-5 h-5 group-hover:rotate-45 transition-transform" />
            </button>
            <button className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-blue-600 hover:text-white rounded-3xl transition-all duration-500 group">
                <span className="text-[11px] font-black uppercase tracking-widest">Download Identity PDF</span>
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </button>
            <button className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-emerald-600 hover:text-white rounded-3xl transition-all duration-500 group">
                <span className="text-[11px] font-black uppercase tracking-widest">Sync Wearable Node</span>
                <Activity className="w-5 h-5 group-hover:scale-125 transition-transform" />
            </button>
        </div>
    );
}

function SecurityAuditCard() {
    return (
        <div className="p-10 bg-blue-50 rounded-[3.5rem] border border-blue-100 flex items-center space-x-6 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl group-hover:scale-150 transition-transform"></div>
            <ShieldCheck className="w-12 h-12 text-blue-600 shrink-0" />
            <p className="text-[10px] font-black text-blue-800 uppercase tracking-widest leading-relaxed">All record access events are logged via National Distributed Ledger (Blockchain Logic).</p>
        </div>
    );
}

{/* --- MODALS --- */ }
function ConsentGrantModal({ onClose }: any) {
    return (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-2xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
            <div className="bg-white rounded-[4rem] shadow-2xl max-w-2xl w-full p-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                <button onClick={onClose} className="absolute right-12 top-12 p-4 bg-slate-50 rounded-2xl text-slate-300 hover:text-blue-600 transition-all hover:rotate-90">
                    <X className="w-8 h-8" />
                </button>

                <div className="relative z-10 mb-16">
                    <div className="flex items-center space-x-8 mb-4">
                        <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className="text-4xl font-[950] tracking-tighter italic leading-none">Record Sharing.</h3>
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mt-2 block">Consent-Based Data Transmission Hub</span>
                        </div>
                    </div>
                </div>

                <form className="space-y-12 relative z-10">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Authorized Institution ID</label>
                        <input type="text" placeholder="HOSP-NODE-XXXX" className="w-full bg-slate-50 border-none rounded-[2rem] py-8 px-10 text-2xl font-black outline-none focus:ring-4 focus:ring-blue-500/5 transition-all uppercase" />
                    </div>
                    <div className="grid grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Access Duration</label>
                            <select className="w-full bg-slate-50 border-none rounded-[2rem] py-8 px-10 text-xl font-black outline-none focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none cursor-pointer">
                                <option>24 Hours</option>
                                <option>7 Days</option>
                                <option>Permanent</option>
                            </select>
                        </div>
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Data Level</label>
                            <select className="w-full bg-slate-50 border-none rounded-[2rem] py-8 px-10 text-xl font-black outline-none focus:ring-4 focus:ring-blue-500/5 transition-all appearance-none cursor-pointer">
                                <option>FULL HEALTH LOCKER</option>
                                <option>RECORDS ONLY</option>
                                <option>VITALS ONLY</option>
                            </select>
                        </div>
                    </div>
                    <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-center space-x-8 text-blue-600">
                        <AlertCircle className="w-10 h-10 shrink-0" />
                        <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">By granting access, you authorize the node to fetch and process your vital records for clinical evaluation under NHA privacy law #241.</p>
                    </div>
                    <button onClick={(e) => { e.preventDefault(); alert('Identity Access Granted to Registered Node.'); onClose(); }} className="w-full py-10 bg-slate-950 text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.5em] shadow-2xl hover:bg-blue-600 transition-all">Authenticate Transmission</button>
                </form>
            </div>
        </div>
    );
}
