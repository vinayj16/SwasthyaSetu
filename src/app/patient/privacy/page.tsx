'use client';

import { useState, useEffect } from 'react';
import {
    Shield,
    Lock,
    Eye,
    Clock,
    UserCheck,
    AlertCircle,
    FileKey,
    ChevronRight,
    Search,
    RefreshCcw,
    ShieldOff,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';

export default function PrivacyHub() {
    const [loading, setLoading] = useState(true);
    const [activeConsents, setActiveConsents] = useState([
        { id: '1', role: 'Doctor', name: 'Dr. Vikram Aditya', facility: 'Apollo Indraprastha', expires: '24h', access: 'Full History' },
        { id: '2', role: 'Hospital', name: 'AIIMS Delhi', facility: 'Emergency Unit', expires: '3d', access: 'Lab Results' },
    ]);

    const [accessLogs, setAccessLogs] = useState([
        { id: 'L1', actor: 'Dr. Vikram Aditya', action: 'Data Retrieval', purpose: 'Consultation', time: '10m ago', status: 'SUCCESS' },
        { id: 'L2', actor: 'System Monitor', action: 'Integrity Check', purpose: 'Auto-Audit', time: '2h ago', status: 'SUCCESS' },
        { id: 'L3', actor: 'Emergency Override', action: 'Break-Glass Access', purpose: 'Life-Threatening', time: 'Yesterday', status: 'AUDITED' },
    ]);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    const revokeConsent = (id: string) => {
        if (!confirm('Are you sure you want to revoke this clinical access token?')) return;
        setActiveConsents(activeConsents.filter(c => c.id !== id));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Loading Privacy Vault...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Header: Security Protocol */}
            <header className="bg-slate-900 text-white py-16 px-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] -mr-60 -mt-60"></div>
                <div className="max-w-[1400px] mx-auto relative z-10">
                    <div className="flex items-center space-x-4 mb-8">
                        <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                            <Shield className="w-8 h-8 text-blue-500" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter italic">Privacy & Consent Hub</h1>
                    </div>
                    <div className="flex flex-col md:flex-row gap-8 items-start md:items-end">
                        <div className="max-w-2xl">
                            <p className="text-xl font-medium text-slate-400 leading-relaxed italic">
                                "Your data, your control." Manage access permissions, audit logs, and security protocols for your National Health Identity.
                            </p>
                        </div>
                        <div className="flex space-x-4">
                            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center space-x-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">E-KYC Verified</span>
                            </div>
                            <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center space-x-3">
                                <RefreshCcw className="w-4 h-4 text-blue-400" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Auth Sync: Real-time</span>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto p-10 py-16">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Left: Active Consent Manager */}
                    <div className="lg:col-span-12 xl:col-span-8 space-y-12">

                        {/* Summary Cards */}
                        <div className="grid md:grid-cols-3 gap-8">
                            <SummaryCard icon={<UserCheck className="text-blue-500" />} label="Active Consents" value={activeConsents.length.toString()} sub="Authorized Nodes" />
                            <SummaryCard icon={<Eye className="text-indigo-500" />} label="Total Accesses" value="142" sub="Last 30 Days" />
                            <SummaryCard icon={<Lock className="text-emerald-500" />} label="Vault Security" value="Level 4" sub="Quantum Shield" />
                        </div>

                        {/* Active Consent List */}
                        <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm">
                            <div className="flex justify-between items-center mb-12">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">Active Access Tokens</h3>
                                <button className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-6 py-2.5 rounded-full hover:bg-blue-600 hover:text-white transition-all">Revoke All Tokens</button>
                            </div>

                            <div className="space-y-6">
                                {activeConsents.map((consent) => (
                                    <div key={consent.id} className="flex flex-col md:flex-row items-center justify-between p-8 bg-slate-50 border border-slate-100 rounded-3xl group hover:border-blue-500/20 transition-all">
                                        <div className="flex items-center space-x-8 w-full">
                                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 group-hover:scale-110 transition-transform">
                                                <FileKey className="w-8 h-8 text-blue-500" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-1">
                                                    <span className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{consent.name}</span>
                                                    <span className="text-[9px] font-bold bg-white px-3 py-1 rounded-full border border-slate-200 text-slate-400 uppercase tracking-widest">{consent.role}</span>
                                                </div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{consent.facility} • {consent.access}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-8 mt-6 md:mt-0 w-full md:w-auto">
                                            <div className="text-right whitespace-nowrap">
                                                <span className="block text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-1">Expires in</span>
                                                <span className="text-sm font-black text-orange-500 italic italic">{consent.expires}</span>
                                            </div>
                                            <button
                                                onClick={() => revokeConsent(consent.id)}
                                                className="w-14 h-14 bg-white border border-red-100 text-red-500 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm active:scale-95"
                                            >
                                                <ShieldOff className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detailed Access Logs */}
                        <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden">
                            <div className="flex items-center justify-between mb-12">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center">
                                    <Clock className="w-8 h-8 mr-4 text-slate-300" /> Immutable Access Journal
                                </h3>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input type="text" placeholder="Filter logs..." className="bg-slate-50 border border-slate-100 rounded-xl py-3 pl-12 pr-6 text-xs font-bold outline-none focus:border-blue-500" />
                                </div>
                            </div>

                            <div className="bg-slate-900 rounded-[2.5rem] p-10 space-y-4">
                                {accessLogs.map((log) => (
                                    <div key={log.id} className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                                        <div className="flex items-center space-x-6">
                                            <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-blue-400 font-black italic italic">
                                                {log.action[0]}
                                            </div>
                                            <div>
                                                <div className="flex items-center space-x-3 mb-1">
                                                    <span className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">{log.actor}</span>
                                                    <span className={`text-[8px] font-bold px-3 py-1 rounded-full border ${log.status === 'AUDITED' ? 'bg-orange-500/10 border-orange-500/20 text-orange-500' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'} uppercase tracking-widest`}>
                                                        {log.status}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{log.action} • {log.purpose}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] font-bold text-slate-600 block mb-1">TIMESTAMP</span>
                                            <span className="text-xs font-black text-white/50 group-hover:text-white transition-colors">{log.time}</span>
                                        </div>
                                    </div>
                                ))}
                                <button className="w-full py-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-blue-500 hover:tracking-[0.4em] transition-all">
                                    Load Secure History Vault
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right: Security Parameters */}
                    <div className="lg:col-span-12 xl:col-span-4 space-y-12">

                        {/* Emergency Overrides (Break-Glass) */}
                        <div className="bg-red-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-red-500/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
                            <h3 className="text-xl font-black tracking-tighter italic mb-6">Emergency Overrides</h3>
                            <p className="text-sm font-bold text-red-100 opacity-80 leading-relaxed mb-10">
                                In life-threatening emergencies, doctors can trigger "Break-Glass" access to your essential medical data.
                            </p>
                            <div className="space-y-6">
                                <div className="p-6 bg-white/10 border border-white/10 rounded-3xl flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <AlertCircle className="w-6 h-6" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Override Status</span>
                                    </div>
                                    <span className="text-xs font-black tracking-widest uppercase">STBY</span>
                                </div>
                                <Link href="/mobile/emergency" className="block w-full text-center bg-white text-red-600 py-6 rounded-[2rem] font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition active:scale-95 shadow-xl">
                                    Configure Emergency Triage
                                </Link>
                            </div>
                        </div>

                        {/* Transparency Report */}
                        <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm">
                            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] mb-10">Compliance Integrity</h3>
                            <div className="space-y-10">
                                <ComplianceCheck label="DPDP Act Compliance" status="VERIFIED" />
                                <ComplianceCheck label="NDHM Registry Sync" status="OPTIMAL" />
                                <ComplianceCheck label="AES-256 Data Lock" status="LOCKED" />
                                <ComplianceCheck label="HSM Identity Key" status="SECURE" />
                            </div>
                            <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                                <div className="flex items-center space-x-3 mb-4">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                    <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none">Legal Traceability</h4>
                                </div>
                                <p className="text-[10px] font-bold text-slate-500 leading-relaxed uppercase tracking-widest">
                                    Every byte of your data access is legally traceable. Misuse reports are automatically escalated to the National Health Authority.
                                </p>
                            </div>
                        </div>

                        {/* Security Footer Notice */}
                        <div className="p-8 bg-slate-100/50 rounded-3xl flex items-start space-x-4">
                            <Lock className="w-6 h-6 text-slate-400 shrink-0 mt-1" />
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                SwasthyaSetu adheres to the highest global standards for medical privacy. Your Aadhaar details are hashed and salted using FIPS-compliant algorithms.
                            </p>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}

function SummaryCard({ icon, label, value, sub }: any) {
    return (
        <div className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm group hover:border-blue-500/20 transition-all">
            <div className="flex items-center space-x-3 text-slate-400 mb-8 border-b border-slate-50 pb-6">
                {icon}
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{label}</span>
            </div>
            <div className="text-5xl font-black text-slate-900 tracking-tighter italic mb-2">{value}</div>
            <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{sub}</p>
        </div>
    );
}

function ComplianceCheck({ label, status }: any) {
    return (
        <div className="flex items-center justify-between group">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest border-l-2 border-slate-100 pl-4 group-hover:border-blue-500 transition-colors">{label}</span>
            <span className="text-[9px] font-black text-emerald-500 opacity-60 group-hover:opacity-100 transition-opacity">{status}</span>
        </div>
    );
}
