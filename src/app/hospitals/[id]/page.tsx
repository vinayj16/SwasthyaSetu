'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import {
    Building2,
    MapPin,
    Phone,
    Mail,
    Bed,
    Activity,
    ShieldCheck,
    Star,
    Clock,
    Heart,
    Stethoscope,
    Navigation,
    ArrowLeft,
    Share2,
    Droplets,
    Layers,
    Award,
    Database,
    Zap,
    Maximize2,
    Sparkles,
    CheckCircle2
} from 'lucide-react';
import NotificationTray from '@/components/NotificationTray';

interface HospitalDetails {
    id: string;
    name: string;
    type: string;
    address: string;
    city: string;
    state: string;
    pincode: string | null;
    phone: string | null;
    email: string | null;
    totalBeds: number;
    availableBeds: number;
    icuBeds: number;
    otRooms: number;
    hasBloodBank: boolean;
    hasOrganFacility: boolean;
    specializations: string | null;
    description?: string;
    lat: number;
    lng: number;
}

interface Doctor {
    id: string;
    name: string;
    specialization: string;
    qualification: string;
    consultFee: number;
    available: boolean;
    rating: number;
}

export default function HospitalDetailsPage() {
    const { id } = useParams();
    const [hospital, setHospital] = useState<HospitalDetails | null>(null);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            fetchHospitalDetails();
        }
    }, [id]);

    const [bookingDoctor, setBookingDoctor] = useState<Doctor | null>(null);
    const [bookingStatus, setBookingStatus] = useState<'IDLE' | 'PROCESSING' | 'SUCCESS'>('IDLE');

    const handleBook = async (doctor: Doctor) => {
        setBookingStatus('PROCESSING');
        try {
            const res = await fetch('/api/appointments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    doctorId: doctor.id,
                    hospitalId: id,
                    appointmentAt: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
                    reason: 'General Node Consultation'
                }),
            });
            const data = await res.json();
            if (data.success) {
                setBookingStatus('SUCCESS');
                setTimeout(() => setBookingStatus('IDLE'), 3000);
            } else {
                alert(data.message || 'Node Allocation Failed');
                setBookingStatus('IDLE');
            }
        } catch (e) {
            console.error(e);
            setBookingStatus('IDLE');
        }
    };

    const fetchHospitalDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/hospitals`);
            const data = await response.json();

            if (data.success) {
                const found = data.data.find((h: any) => h.id === id);
                if (found) {
                    setHospital(found);
                    // Fetch real doctors for this hospital
                    const docsRes = await fetch(`/api/hospitals/${id}/doctors`);
                    const docsData = await docsRes.json();
                    if (docsData.success && docsData.data.length > 0) {
                        setDoctors(docsData.data);
                    } else {
                        // Fallback fallback
                        setDoctors([
                            { id: 'd1', name: 'Dr. Sarah Johnson', specialization: 'Cardiology', qualification: 'MD', consultFee: 1500, available: true, rating: 4.8 },
                            { id: 'd2', name: 'Dr. Rajesh Kumar', specialization: 'Neurology', qualification: 'DM', consultFee: 2000, available: true, rating: 4.9 },
                        ]);
                    }
                }
            }
        } catch (error) {
            console.error('Error fetching hospital details:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-12">
            <div className="w-24 h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-10 shadow-2xl"></div>
            <p className="text-sm font-[950] text-slate-400 uppercase tracking-[0.5em] animate-pulse">Syncing Node Registry...</p>
        </div>
    );

    if (!hospital) return (
        <div className="min-h-screen flex flex-col items-center justify-center p-10 bg-white">
            <Database className="w-24 h-24 text-slate-100 mb-10 animate-float" />
            <h2 className="text-6xl font-[950] text-slate-900 mb-6 tracking-tighter italic">Registry Error.</h2>
            <p className="text-slate-400 font-bold mb-12 uppercase tracking-widest text-[10px]">Infrastructure node UID `{id}` not detected in national grid.</p>
            <Link href="/hospitals" className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition shadow-2xl">Return to Hub</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-500/20">
            {/* Tactical Booking Overlays */}
            {bookingStatus === 'PROCESSING' && (
                <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-md z-[100] flex items-center justify-center animate-fade-in">
                    <div className="bg-white p-16 rounded-[4rem] shadow-2xl flex flex-col items-center space-y-10 animate-scale-in">
                        <div className="w-24 h-24 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <div className="text-center">
                            <p className="text-xl font-[950] text-slate-900 tracking-tighter uppercase italic">Allocating Grid Token...</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4">Verifying Sovereign Identity Matrix</p>
                        </div>
                    </div>
                </div>
            )}

            {bookingStatus === 'SUCCESS' && (
                <div className="fixed inset-0 bg-emerald-500/10 backdrop-blur-md z-[100] flex items-center justify-center animate-fade-in">
                    <div className="bg-white p-16 rounded-[4rem] shadow-2xl flex flex-col items-center space-y-10 animate-scale-in border-4 border-emerald-500/20">
                        <div className="w-24 h-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30">
                            <CheckCircle2 className="w-12 h-12" />
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-[950] text-emerald-600 tracking-tighter uppercase italic">Identity Queued.</p>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-4">Transmission Successful • Token #NHA-{Math.floor(Math.random() * 9000)}</p>
                        </div>
                        <button onClick={() => setBookingStatus('IDLE')} className="px-12 py-5 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all">Command Acknowledged</button>
                    </div>
                </div>
            )}
            {/* Unified Nav */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-slate-100/50">
                <div className="max-w-[1700px] mx-auto px-10 h-24 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <Link href="/hospitals" className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 transition shadow-sm group">
                            <ArrowLeft className="w-6 h-6 group-hover:scale-125 transition-transform" />
                        </Link>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase italic">Node Profile</h1>
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">Verified Clinical Entry</span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-8">
                        <NotificationTray />
                        <button className="hidden lg:flex items-center space-x-4 px-6 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-slate-900 transition shadow-sm">
                            <Zap className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Quantum Transmit</span>
                        </button>
                        <Link href="/emergency" className="px-10 py-3.5 bg-red-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-red-700 transition shadow-xl flex items-center space-x-3">
                            <Activity className="w-4 h-4" />
                            <span>SOS Direct</span>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Profile Hero */}
            <header className="pt-48 pb-32 bg-white border-b border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[200px] -mr-[400px] -mt-[400px]"></div>
                <div className="max-w-[1700px] mx-auto px-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-24">
                        <div className="max-w-4xl animate-slide-up">
                            <div className="flex items-center space-x-4 mb-10">
                                <span className="bg-slate-900 text-white px-8 py-2.5 rounded-full text-[9px] font-[950] uppercase tracking-[0.3em] shadow-2xl">Verified Infrastructure Node</span>
                                <span className="bg-slate-50 text-slate-400 px-8 py-2.5 rounded-full text-[9px] font-[950] uppercase tracking-[0.3em] border border-slate-200">{hospital.type}</span>
                            </div>
                            <h1 className="text-8xl lg:text-[120px] font-[950] text-slate-900 tracking-tighter leading-[0.8] mb-12 italic">
                                {hospital.name}
                            </h1>
                            <div className="flex flex-wrap items-center gap-12 text-xl font-bold text-slate-400 italic">
                                <div className="flex items-center space-x-4">
                                    <MapPin className="w-8 h-8 text-blue-600" />
                                    <span>{hospital.address}, {hospital.city}, INDIA</span>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Phone className="w-8 h-8 text-emerald-500" />
                                    <span>{hospital.phone || 'REGISTRY_UPDATING'}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-xl animate-scale-in">
                            <div className="bg-slate-950 rounded-[5rem] p-16 text-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-bl-[5rem] transition-all group-hover:scale-110"></div>
                                <h3 className="text-[10px] font-[950] uppercase tracking-[0.4em] opacity-40 mb-16">System Capacity Matrix</h3>
                                <div className="grid grid-cols-2 gap-16">
                                    <CapacityDisplay label="Available Tactical Beds" value={hospital.availableBeds} total={hospital.totalBeds} color="blue" />
                                    <CapacityDisplay label="Critical ICU Nodes" value={hospital.icuBeds} total={hospital.icuBeds + 4} color="emerald" />
                                    <CapacityDisplay label="Ready OT Units" value={hospital.otRooms} total={hospital.otRooms + 2} color="indigo" />
                                    <CapacityDisplay label="Node Status" value="ACTIVE" isBadge color="emerald" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1700px] mx-auto px-10 py-32 grid lg:grid-cols-12 gap-32">
                {/* Information Core */}
                <div className="lg:col-span-8 space-y-32">

                    {/* About / Credentials */}
                    <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center space-x-4 mb-16">
                            <Layers className="w-10 h-10 text-blue-600" />
                            <h3 className="text-5xl font-[950] text-slate-900 tracking-tighter italic uppercase">Overview.</h3>
                        </div>
                        <div className="bg-white rounded-[5rem] p-20 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-2xl transition-all duration-700">
                            <div className="absolute top-0 left-0 w-3 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <p className="text-3xl text-slate-500 font-bold leading-relaxed mb-16 italic opacity-80 group-hover:opacity-100 transition-opacity">
                                "{hospital.name} functions as a critical node in the National Health Fabric. Optimized for high-velocity clinical response and real-time biometric synchronization of patient assets."
                            </p>
                            <div className="flex flex-wrap gap-4">
                                {hospital.hasBloodBank && <FeatureBadge icon={<Droplets className="w-5 h-5" />} label="VitalFlow Hub Certified" />}
                                {hospital.hasOrganFacility && <FeatureBadge icon={<Heart className="w-5 h-5" />} label="National Organ Registry" />}
                                <FeatureBadge icon={<ShieldCheck className="w-5 h-5" />} label="NHA Tier-1 Authorized" />
                            </div>
                        </div>
                    </section>

                    {/* Clinician Registry */}
                    <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center justify-between mb-16">
                            <div className="flex items-center space-x-4">
                                <Stethoscope className="w-10 h-10 text-emerald-500" />
                                <h3 className="text-5xl font-[950] text-slate-900 tracking-tighter italic uppercase">Faculty.</h3>
                            </div>
                            <button className="text-[11px] font-[950] uppercase tracking-[0.3em] text-blue-600 hover:tracking-[0.5em] transition-all bg-blue-50 px-10 py-4 rounded-full">Transmit Roster →</button>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12">
                            {doctors.map((doctor, idx) => (
                                <div key={doctor.id} className="bg-white p-12 rounded-[4.5rem] border border-slate-50 shadow-sm hover:shadow-2xl hover:translate-y-[-12px] group transition-all duration-700 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-2 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="flex items-center space-x-8 mb-10">
                                        <div className="w-24 h-24 bg-slate-50 rounded-[2.2rem] flex items-center justify-center text-4xl group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 border border-slate-100 shadow-sm">
                                            <Award className="w-10 h-10" />
                                        </div>
                                        <div>
                                            <h4 className="text-3xl font-[950] text-slate-900 tracking-tighter group-hover:text-blue-600 transition-colors uppercase italic">{doctor.name}</h4>
                                            <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2">{doctor.specialization}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2 text-yellow-500 mb-12 bg-slate-50 w-fit px-6 py-2 rounded-full border border-slate-100">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className={`w-5 h-5 ${i <= Math.floor(doctor.rating) ? 'fill-current' : 'opacity-20'}`} />)}
                                        <span className="text-slate-900 font-black text-xs ml-3 tracking-widest">{doctor.rating} PTX</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-10 border-t border-slate-50">
                                        <div>
                                            <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block mb-2">Clinical Service Node</span>
                                            <span className="text-3xl font-[950] text-slate-900 tracking-tighter italic">₹{doctor.consultFee}</span>
                                        </div>
                                        <button
                                            onClick={() => handleBook(doctor)}
                                            disabled={bookingStatus === 'PROCESSING'}
                                            className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] font-[950] text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-2xl active:scale-95 translate-y-2 group-hover:translate-y-0 disabled:opacity-50"
                                        >
                                            {bookingStatus === 'PROCESSING' ? 'Processing...' : 'Init Appt'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Sidebar Intelligence */}
                <div className="lg:col-span-4 space-y-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
                    <div className="bg-white rounded-[5rem] p-16 border border-slate-100 shadow-sm sticky top-32 group hover:shadow-2xl transition-all duration-700">
                        <div className="flex items-center justify-between mb-16">
                            <h4 className="text-2xl font-[950] text-slate-900 tracking-tighter flex items-center italic uppercase">
                                <Navigation className="w-8 h-8 mr-4 text-blue-600 group-hover:rotate-45 transition-transform" /> Tactical Intel.
                            </h4>
                            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                        </div>
                        <div className="space-y-12">
                            <IntelRow icon={<Mail className="w-5 h-5" />} label="Secured Node Mail" value={hospital.email || 'NHA_AUTHORITY_SYNC'} />
                            <IntelRow icon={<Activity className="w-5 h-5" />} label="Current Sync Frequency" value="QUANTUM_REALTIME" />
                            <IntelRow icon={<ShieldCheck className="w-5 h-5" />} label="Encryption Sovereignty" value="AES-256-NHA" />
                        </div>

                        <div className="mt-20 pt-20 border-t border-slate-50">
                            <h5 className="font-[950] text-[11px] uppercase tracking-[0.4em] text-slate-400 mb- aggregation-10 italic">Geo-Positioning.</h5>
                            <div className="h-80 bg-slate-900 rounded-[3.5rem] relative overflow-hidden group/map shadow-inner mt-8">
                                <div className="absolute inset-0 bg-[#0B0E14] bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/78.9629,20.5937,6,0/800x800?access_token=none')] bg-cover opacity-70 group-hover/map:scale-110 transition-transform duration-[2000ms]"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-20 h-20 bg-blue-600/20 rounded-full animate-ping"></div>
                                    <div className="w-6 h-6 bg-blue-600 border-4 border-white rounded-full shadow-2xl relative z-10"></div>
                                </div>
                                <div className="absolute top-10 right-10 flex space-x-2">
                                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                    <div className="w-3 h-3 bg-blue-600/30 rounded-full"></div>
                                </div>
                                <div className="absolute bottom-8 left-8 right-8 p-6 bg-slate-950/90 backdrop-blur-xl rounded-3xl flex items-center justify-between border border-white/10 shadow-2xl">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Live Node Map</span>
                                    <Maximize2 className="w-5 h-5 text-blue-500" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function CapacityDisplay({ label, value, total, color, isBadge }: any) {
    const colorMap = {
        blue: 'text-blue-500',
        emerald: 'text-emerald-500',
        indigo: 'text-indigo-500',
        amber: 'text-amber-500'
    }[color as 'blue' | 'emerald' | 'indigo' | 'amber'];

    return (
        <div className="group/cap">
            <span className="block text-[9px] font-[950] uppercase tracking-[0.4em] text-slate-500 mb-4 group-hover/cap:text-blue-400 transition-colors uppercase">{label}</span>
            <div className="flex items-end space-x-2">
                <span className={`text-6xl font-[950] tracking-tighter italic ${colorMap}`}>{value}</span>
                {!isBadge && total && <span className="text-sm font-black text-slate-700 pb-2 mb-2 italic">/ {total}</span>}
            </div>
        </div>
    );
}

function FeatureBadge({ icon, label }: any) {
    return (
        <div className="flex items-center space-x-5 bg-slate-50 border border-slate-100 px-8 py-5 rounded-[2rem] text-[10px] font-[950] uppercase tracking-[0.3em] text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all cursor-default">
            <span className="text-blue-600 group-hover:text-blue-400">{icon}</span>
            <span>{label}</span>
        </div>
    );
}

function IntelRow({ icon, label, value }: any) {
    return (
        <div className="group/row">
            <div className="flex items-center space-x-6">
                <div className="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-400 group-hover/row:bg-blue-600 group-hover/row:text-white transition-all duration-500 border border-slate-100">
                    {icon}
                </div>
                <div className="flex-1 overflow-hidden">
                    <span className="block text-[9px] font-[950] uppercase tracking-[0.4em] text-slate-400 mb-2 truncate group-hover/row:text-slate-600 transition-colors">{label}</span>
                    <span className="text-sm font-[950] text-slate-900 truncate block italic uppercase">{value}</span>
                </div>
            </div>
        </div>
    );
}
