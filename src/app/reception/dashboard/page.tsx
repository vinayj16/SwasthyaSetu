'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Users, Bed, Activity, LogOut, Plus, Search, ChevronRight, Clock,
    Bell, ShieldCheck, Stethoscope, HeartPulse, Syringe, ArrowUpRight,
    SearchX, LayoutDashboard, ClipboardList, AlertCircle, UserPlus,
    MapPin, Calendar, Database, RefreshCw, Smartphone, Globe, Layers,
    ShieldAlert, Zap, Navigation, Maximize2, Terminal, HardDrive
} from 'lucide-react';
import NotificationTray from '@/components/NotificationTray';

export default function ReceptionDashboard() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalBeds: 500,
        availableBeds: 142,
        activeDoctors: 45,
        emergencyQueue: 4
    });

    const [selectedHospital, setSelectedHospital] = useState({
        id: 'h1',
        name: 'AIIMS Delhi',
        code: 'NHA-ND-001',
        type: 'GOVERNMENT'
    });

    const router = useRouter();
    const [availableHospitals, setAvailableHospitals] = useState<any[]>([]);
    const [processingId, setProcessingId] = useState<string | null>(null);

    useEffect(() => {
        async function loadHospitals() {
            try {
                const res = await fetch('/api/hospitals');
                const data = await res.json();
                if (data.success) {
                    setAvailableHospitals(data.data.slice(0, 10));
                    if (data.data.length > 0) {
                        const h = data.data[0];
                        setSelectedHospital({
                            id: h.id,
                            name: h.name,
                            code: h.registrationNo || 'NHA-Node-01',
                            type: h.type
                        });
                    }
                }
            } catch (e) {
                console.error(e);
            }
        }
        loadHospitals();
    }, []);

    useEffect(() => {
        async function loadHospitalData() {
            setLoading(true);
            try {
                const res = await fetch('/api/appointments');
                const data = await res.json();
                if (data.success) {
                    // Enrich mock data for demo if needed
                    const enriched = data.data.map((a: any) => ({
                        ...a,
                        priority: Math.random() > 0.8 ? 'CRITICAL' : 'ROUTINE',
                        arrivalMethod: Math.random() > 0.7 ? 'AMBULANCE' : 'WALK-IN',
                        uhid: `UHID-${Math.floor(Math.random() * 1000000)}`
                    }));
                    setAppointments(enriched);
                }
            } catch (e) { console.error(e); }
            finally {
                setLoading(false);
            }
        }
        loadHospitalData();
    }, [selectedHospital]);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    const handleProcessAdmission = async (id: string) => {
        setProcessingId(id);
        try {
            const res = await fetch(`/api/appointments/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'IN_PROGRESS' })
            });
            const data = await res.json();
            if (data.success) {
                setAppointments(appointments.map(a => a.id === id ? { ...a, status: 'IN_PROGRESS' } : a));
            }
        } catch (e) {
            console.error('Admission error:', e);
        } finally {
            setProcessingId(null);
        }
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-slate-950 font-sans selection:bg-blue-500/10">

            {/* Strategic Command Header */}
            <header className="fixed top-0 w-full z-[100] bg-white/80 backdrop-blur-2xl border-b border-slate-100 py-4 shadow-sm">
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <div className="w-12 h-12 bg-slate-950 text-white rounded-2xl flex items-center justify-center shadow-xl transition-transform hover:scale-110">
                            <ShieldCheck className="w-7 h-7" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-[950] tracking-tighter italic uppercase leading-none">{selectedHospital.name}.</span>
                            <div className="flex items-center space-x-2 mt-1">
                                <span className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em] italic">RECEPTION NODAL HUB</span>
                                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{selectedHospital.code}</span>
                            </div>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center space-x-8">
                        <div className="flex items-center space-x-4 bg-slate-50 border border-slate-100 px-6 py-2.5 rounded-full">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Grid Sync Active</span>
                            <div className="w-px h-3 bg-slate-200"></div>
                            <RefreshCw className="w-3 h-3 text-slate-400 hover:rotate-180 transition-transform cursor-pointer" />
                        </div>

                        <div className="flex items-center space-x-6">
                            <button onClick={() => router.push('/reception/register-patient')} className="px-6 py-2.5 bg-slate-950 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10 flex items-center space-x-2">
                                <Plus className="w-4 h-4" />
                                <span>Enroll Identity</span>
                            </button>
                            <button onClick={handleLogout} className="w-10 h-10 flex items-center justify-center bg-slate-50 border border-slate-100 rounded-xl text-slate-400 hover:text-rose-600 transition-colors">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="pt-32 pb-20 container mx-auto px-6">

                {/* 🚨 Tactical Load Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <NodalMetric label="TOTAL QUEUE" val={appointments.length.toString()} icon={<Users className="w-6 h-6" />} color="text-blue-600" bg="bg-blue-50" />
                    <NodalMetric label="AVAIL BEDS" val={stats.availableBeds.toString()} icon={<Bed className="w-6 h-6" />} color="text-emerald-600" bg="bg-emerald-50" />
                    <NodalMetric label="ER ARRIVALS" val={stats.emergencyQueue.toString()} icon={<Activity className="w-6 h-6" />} color="text-rose-600" bg="bg-rose-50" />
                    <NodalMetric label="ACTIVE DOCS" val={stats.activeDoctors.toString()} icon={<Stethoscope className="w-6 h-6" />} color="text-amber-600" bg="bg-amber-50" />
                </div>

                <div className="grid lg:grid-cols-[1fr,350px] gap-12">

                    {/* 📋 Central Admission Queue */}
                    <div className="space-y-8">
                        <div className="flex items-end justify-between mb-8">
                            <div>
                                <h2 className="text-4xl font-[950] text-slate-950 tracking-tighter uppercase italic leading-none mb-4">Strategic Queue.</h2>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] italic flex items-center">
                                    <Terminal className="w-3 h-3 mr-2 text-blue-500" />
                                    Monitoring Real-time Admission Matrix
                                </p>
                            </div>
                            <div className="flex bg-slate-100 rounded-2xl p-1.5 border border-slate-200 shadow-inner">
                                <button className="px-8 py-2.5 bg-white text-slate-950 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Live Admissions</button>
                                <button className="px-8 py-2.5 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-slate-600">Discharged</button>
                            </div>
                        </div>

                        {loading ? (
                            <div className="space-y-6">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-40 bg-slate-50 border border-slate-100 rounded-[2.5rem] animate-pulse"></div>
                                ))}
                            </div>
                        ) : appointments.length > 0 ? (
                            <div className="space-y-6">
                                {appointments.map((apt, idx) => (
                                    <AdmissionCard
                                        key={apt.id}
                                        apt={apt}
                                        onProcess={() => handleProcessAdmission(apt.id)}
                                        isProcessing={processingId === apt.id}
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState />
                        )}
                    </div>

                    {/* 🛠️ Rapid Ops Console */}
                    <div className="space-y-8">
                        <div className="bg-white border border-slate-100 rounded-[3rem] p-10 shadow-2xl shadow-slate-900/5 sticky top-32">
                            <h3 className="text-xl font-[950] text-slate-950 tracking-tighter uppercase italic leading-none mb-10">Command Ops.</h3>

                            <div className="space-y-4 mb-12">
                                <Link href="/reception/register-patient" className="block w-full">
                                    <OpButton icon={<UserPlus className="w-5 h-5" />} label="Quick Enrollment" />
                                </Link>
                                <OpButton icon={<HeartPulse className="w-5 h-5 text-rose-500" />} label="ER OVERRIDE" accent />
                                <OpButton icon={<Layers className="w-5 h-5" />} label="Bed Transfer" />
                                <OpButton icon={<ClipboardList className="w-5 h-5" />} label="Billing Audit" />
                            </div>

                            <div className="pt-10 border-t border-slate-50">
                                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-6">Nodal Diagnostics</h4>
                                <div className="space-y-6">
                                    <MetricRow label="GRID LATENCY" val="2.4ms" color="bg-emerald-500" />
                                    <MetricRow label="IDENT SYNC" val="99.2%" color="bg-blue-500" />
                                    <MetricRow label="TRAUMA LOAD" val="HIGH" color="bg-amber-500" />
                                </div>
                            </div>

                            <div className="mt-12 bg-slate-950 rounded-3xl p-6 text-white overflow-hidden relative group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl -mr-16 -mt-16"></div>
                                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] mb-4">Identity Search</h4>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                                    <input
                                        type="text"
                                        placeholder="Scan UHID..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-xs font-bold outline-none focus:bg-white/10 transition-all placeholder:text-slate-600"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            <style jsx global>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                .animate-float {
                    animation: float 3s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
}

function NodalMetric({ label, val, icon, color, bg }: any) {
    return (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-2xl shadow-slate-900/5 group hover:-translate-y-1 transition-all">
            <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 ${bg} ${color} rounded-[1.8rem] flex items-center justify-center transition-transform group-hover:rotate-12`}>
                    {icon}
                </div>
                <div className="w-8 h-8 bg-slate-50 rounded-full flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4 text-slate-300" />
                </div>
            </div>
            <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</span>
            <span className="text-3xl font-[950] text-slate-950 tracking-tighter">{val}</span>
        </div>
    );
}

function AdmissionCard({ apt, onProcess, isProcessing }: any) {
    return (
        <div className="bg-white border border-slate-100 rounded-[2.5rem] p-10 hover:shadow-3xl transition-all duration-500 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full blur-[80px] -mr-32 -mt-32"></div>

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
                <div className="flex items-center space-x-10">
                    <div className="flex flex-col items-center">
                        <div className="w-20 h-20 bg-slate-950 text-white rounded-[2rem] flex flex-col items-center justify-center shadow-2xl transition-all group-hover:bg-blue-600 group-hover:rotate-6">
                            <span className="text-2xl font-[950] italic leading-none">
                                {apt.appointmentTime || (apt.appointmentAt ? new Date(apt.appointmentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--')}
                            </span>
                            <span className="text-[10px] font-black text-blue-400 group-hover:text-white uppercase tracking-widest mt-1">TIME</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex items-center space-x-4">
                            <h3 className="text-2xl font-[950] text-slate-950 tracking-tighter uppercase italic leading-none group-hover:text-blue-600 transition-colors">
                                {apt.patient?.name || 'Walk-in Admission'}
                            </h3>
                            {apt.priority === 'CRITICAL' && (
                                <span className="px-4 py-1.5 bg-rose-500 text-white rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">CRITICAL</span>
                            )}
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2 text-slate-400">
                                <Smartphone className="w-3 h-3" />
                                <span className="text-[10px] font-black uppercase tracking-widest">{apt.uhid}</span>
                            </div>
                            <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                            <div className="flex items-center space-x-2 text-slate-400">
                                <Stethoscope className="w-3 h-3 text-blue-500" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{apt.doctor?.name}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center space-x-6">
                    <div className="text-right hidden sm:block">
                        <span className="block text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] mb-1">Assigned Unit</span>
                        <span className="text-sm font-black text-slate-900 italic tracking-tighter uppercase">{apt.doctor?.specialization}</span>
                    </div>
                    <button
                        onClick={onProcess}
                        disabled={apt.status === 'IN_PROGRESS' || isProcessing}
                        className={`px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all flex items-center space-x-4 shadow-xl active:scale-95 ${apt.status === 'IN_PROGRESS'
                            ? 'bg-emerald-500 text-white border-none'
                            : 'bg-slate-950 text-white hover:bg-blue-600'
                            }`}
                    >
                        {isProcessing ? (
                            <RefreshCw className="w-4 h-4 animate-spin" />
                        ) : apt.status === 'IN_PROGRESS' ? (
                            <ShieldCheck className="w-4 h-4 text-white" />
                        ) : (
                            <Zap className="w-4 h-4" />
                        )}
                        <span>{isProcessing ? 'SYNCHRONIZING' : apt.status === 'IN_PROGRESS' ? 'ADMISSION ACTIVE' : 'PROCESS ADMISSION'}</span>
                    </button>
                </div>
            </div>

            <div className="mt-8 pt-8 border-t border-slate-50 grid grid-cols-2 md:grid-cols-4 gap-4">
                <AdmissionTag icon={<Navigation className="w-3 h-3" />} label="Arrival Mode" val={apt.arrivalMethod} />
                <AdmissionTag icon={<Clock className="w-3 h-3" />} label="Wait Period" val="02M" />
                <AdmissionTag icon={<ShieldAlert className="w-3 h-3" />} label="Insurance" val="VETTED" />
                <AdmissionTag icon={<Globe className="w-3 h-3" />} label="Region Node" val="NCR-01" />
            </div>
        </div>
    );
}

function AdmissionTag({ icon, label, val }: any) {
    return (
        <div className="flex items-center space-x-3 text-[9px] font-black">
            <span className="text-slate-300">{icon}</span>
            <span className="text-slate-400 uppercase tracking-widest">{label}:</span>
            <span className="text-slate-900 uppercase italic tracking-tighter bg-slate-50 px-2 py-0.5 rounded-md">{val}</span>
        </div>
    );
}

function OpButton({ icon, label, accent }: any) {
    return (
        <button className={`w-full flex items-center justify-between p-6 rounded-2xl border transition-all active:scale-95 ${accent ? 'bg-rose-50 border-rose-100 hover:bg-rose-100' : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-blue-600/30'}`}>
            <div className="flex items-center space-x-6">
                <div className={`w-10 h-10 ${accent ? 'bg-rose-100 text-rose-600' : 'bg-white text-slate-900'} rounded-xl flex items-center justify-center shadow-sm`}>
                    {icon}
                </div>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{label}</span>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300" />
        </button>
    );
}

function MetricRow({ label, val, color }: any) {
    return (
        <div className="flex items-center justify-between">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
            <div className="flex items-center space-x-3">
                <span className="text-[10px] font-black text-slate-950 italic">{val}</span>
                <div className={`w-2 h-2 ${color} rounded-full`}></div>
            </div>
        </div>
    );
}

function EmptyState() {
    return (
        <div className="py-40 text-center border-2 border-dashed border-slate-100 rounded-[3rem] bg-slate-50/20 backdrop-blur-xl">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl relative">
                <Activity className="w-10 h-10 text-slate-200" />
                <div className="absolute inset-0 border-2 border-slate-100 rounded-full animate-ping opacity-20"></div>
            </div>
            <h3 className="text-2xl font-[950] text-slate-950 tracking-tighter uppercase italic mb-4">Node Depleted.</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] max-w-sm mx-auto leading-loose italic">
                The Unified Admission Matrix is globally synchronized. No pending arrivals detected within the local perimeter.
            </p>
            <button className="mt-12 px-10 py-5 bg-slate-950 text-white rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl shadow-slate-900/10">Re-Sync Transmission Grid</button>
        </div>
    )
}

function ArrowRight(props: any) {
    return <ChevronRight {...props} />
}
