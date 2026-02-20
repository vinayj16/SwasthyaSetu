'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ShieldCheck,
    ArrowLeft,
    Download,
    Printer,
    QrCode,
    Fingerprint,
    Heart,
    Activity,
    Clock,
    Navigation,
    CheckCircle2,
    Lock,
    Zap,
    MoreHorizontal
} from 'lucide-react';
import NotificationTray from '@/components/NotificationTray';

export default function HealthIdCardPage() {
    const [loading, setLoading] = useState(true);
    const [patientData, setPatientData] = useState<any>(null);

    useEffect(() => {
        // Mock patient data fetch
        setTimeout(() => {
            setPatientData({
                name: 'Virender Sehwag',
                healthId: 'IND-HID-2024-VJX8W41',
                dob: '20 OCT, 1978',
                gender: 'MALE',
                bloodGroup: 'O+',
                mobile: '+91 91XXX XXX10'
            });
            setLoading(false);
        }, 1200);
    }, []);

    if (loading) return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Generating Encrypted ID...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans">
            {/* Premium Header */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-slate-100/50">
                <div className="max-w-[1700px] mx-auto px-10 h-24 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <Link href="/patient/dashboard" className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition shadow-sm">
                            <ArrowLeft className="w-6 h-6" />
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none">Health Identity Pass</h1>
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Authorized Digital Document</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-8">
                        <NotificationTray />
                        <div className="h-10 w-px bg-slate-100"></div>
                        <button className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition shadow-xl flex items-center space-x-3">
                            <Download className="w-4 h-4" />
                            <span>Secure Offline PDF</span>
                        </button>
                    </div>
                </div>
            </nav>

            <main className="pt-48 pb-32 px-10 max-w-[1400px] mx-auto">
                <div className="grid lg:grid-cols-12 gap-20 items-center">

                    {/* The Card - Ultra Premium Glass Representation */}
                    <div className="lg:col-span-7 flex justify-center">
                        <div className="relative group perspective-1000 w-full max-w-2xl">
                            <div className="bg-gradient-to-br from-[#0F172A] to-[#1E293B] rounded-[4rem] p-16 text-white relative overflow-hidden aspect-[1.58/1] shadow-2xl premium-shadow group-hover:rotate-1 transition-all duration-700">
                                {/* Artistic Overlays */}
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-red-500/5 rounded-full blur-[80px] -ml-20 -mb-20"></div>
                                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>

                                <div className="flex justify-between items-start relative z-10 mb-16">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                                            <Activity className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black tracking-[0.4em] opacity-40 uppercase">Republic of India</p>
                                            <h2 className="text-xl font-black tracking-tight uppercase">Swasthya Setu Pass</h2>
                                        </div>
                                    </div>
                                    <div className="w-14 h-14 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl flex items-center justify-center text-white font-black text-2xl">
                                        S
                                    </div>
                                </div>

                                <div className="flex items-end justify-between relative z-10">
                                    <div className="space-y-10">
                                        <div>
                                            <h3 className="text-5xl font-black tracking-tighter italic mb-4 group-hover:translate-x-2 transition-transform">{patientData.name}</h3>
                                            <div className="flex items-center space-x-4">
                                                <span className="text-sm font-mono tracking-[0.3em] uppercase text-blue-400 bg-blue-500/10 px-4 py-1.5 rounded-full border border-blue-500/20">{patientData.healthId}</span>
                                                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                                            </div>
                                        </div>
                                        <div className="flex space-x-12">
                                            <div>
                                                <p className="uppercase text-[9px] font-black opacity-30 tracking-[0.2em] mb-1">Birth Epoch</p>
                                                <p className="font-black text-sm">{patientData.dob}</p>
                                            </div>
                                            <div>
                                                <p className="uppercase text-[9px] font-black opacity-30 tracking-[0.2em] mb-1">Blood Index</p>
                                                <p className="font-black text-sm text-red-500">{patientData.bloodGroup}</p>
                                            </div>
                                            <div>
                                                <p className="uppercase text-[9px] font-black opacity-30 tracking-[0.2em] mb-1">Biometrics</p>
                                                <p className="font-black text-sm text-emerald-500">VERIFIED</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-5 rounded-[2.5rem] shadow-2xl relative group-hover:scale-105 transition-transform">
                                        <QrCode className="w-24 h-24 text-slate-900" />
                                        <div className="absolute inset-0 bg-blue-500/10 rounded-[2.5rem] animate-pulse"></div>
                                    </div>
                                </div>

                                <div className="absolute bottom-8 right-12 text-[9px] font-black uppercase tracking-[0.34em] opacity-20">
                                    National Health Authority Cryptographic Standard
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meta Controls */}
                    <div className="lg:col-span-5 space-y-10">
                        <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm">
                            <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight flex items-center">
                                <Fingerprint className="w-8 h-8 mr-4 text-blue-600" /> Universal Node Access
                            </h3>
                            <div className="space-y-6">
                                <FeatureItem
                                    icon={<CheckCircle2 className="text-emerald-500" />}
                                    title="Unified Profile Sync"
                                    desc="Instant medical record synchronization across all tier-1 and tier-2 hospital nodes."
                                />
                                <FeatureItem
                                    icon={<Heart className="text-red-500" />}
                                    title="Trauma Priority"
                                    desc="Priority queue status at emergency centers upon contactless QR detection."
                                />
                                <FeatureItem
                                    icon={<Lock className="text-blue-500" />}
                                    title="Encryption Standard"
                                    desc="Your health data is protected by 256-bit AES cryptographic protocols."
                                />
                            </div>

                            <div className="mt-12 flex space-x-4">
                                <button className="flex-1 bg-slate-900 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition shadow-xl flex items-center justify-center space-x-3">
                                    <Download className="w-4 h-4" />
                                    <span>Get Digital PDF</span>
                                </button>
                                <button className="w-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition">
                                    <Printer className="w-5 h-5" />
                                </button>
                                <button className="w-20 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        <div className="p-8 bg-blue-600 rounded-[3rem] text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[4rem]"></div>
                            <div className="flex items-center space-x-4 mb-6 relative z-10">
                                <Zap className="w-6 h-6 text-yellow-400 animate-pulse" />
                                <h4 className="font-black text-lg">National Health Pool</h4>
                            </div>
                            <p className="text-blue-50 font-bold text-sm leading-relaxed mb-8 opacity-80 relative z-10">
                                Your Health ID pass is linked with AB-PMJAY benefits. You have a verified insurance cover of ₹5,00,000 active for this cycle.
                            </p>
                            <button className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 hover:bg-white/20 transition px-8 py-4 rounded-2xl border border-white/20">View Benefit Ledger</button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

function FeatureItem({ icon, title, desc }: any) {
    return (
        <div className="flex items-start space-x-6 group">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center shrink-0 border border-slate-100 group-hover:bg-blue-50 transition-colors">
                {icon}
            </div>
            <div>
                <h4 className="font-black text-slate-900 text-lg tracking-tight mb-1">{title}</h4>
                <p className="text-sm font-medium text-slate-400 leading-relaxed italic">{desc}</p>
            </div>
        </div>
    );
}
