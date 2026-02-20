'use client';

import { useState, useEffect } from 'react';
import {
    Calendar,
    Video,
    User,
    Clock,
    ChevronRight,
    Plus,
    Search,
    MapPin,
    Star,
    MessageSquare,
    Phone
} from 'lucide-react';
import Link from 'next/link';

export default function MobileAppointments() {
    const [appointments, setAppointments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchAppointments() {
            try {
                const res = await fetch('/api/appointments');
                const data = await res.json();
                if (data.success) {
                    setAppointments(data.data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchAppointments();
    }, []);

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-10">
            {/* Header */}
            <div className="px-2 flex justify-between items-end">
                <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Clinical Care Node</span>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Appointments</h1>
                </div>
                <Link href="/hospitals" className="bg-slate-900 text-white p-3 rounded-full shadow-xl shadow-slate-200">
                    <Plus className="w-6 h-6" />
                </Link>
            </div>

            {/* Quick Consultation Search */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search doctor or specialty..."
                    className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold"
                />
            </div>

            {/* Upcoming Session Highlight */}
            {appointments.length > 0 && (
                <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/30 rounded-full blur-3xl -mr-20 -mt-20"></div>
                    <div className="relative z-10 space-y-4">
                        <div className="flex justify-between items-start">
                            <span className="bg-blue-600 text-[8px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-blue-400/30">Next Session</span>
                            <div className="flex items-center space-x-2 text-[10px] font-bold opacity-60">
                                <Video className="w-3 h-3" />
                                <span>ONLINE CARE</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 bg-white/10 rounded-xl border border-white/20 p-1">
                                <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" className="w-full h-full object-cover rounded-lg" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold tracking-tight">Dr. {appointments[0].doctor?.name || 'Care Specialist'}</h3>
                                <p className="text-xs text-blue-200 font-medium">Neurology • {appointments[0].appointmentTime} Today</p>
                            </div>
                        </div>
                        <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-blue-50 transition-colors">
                            <Video className="w-4 h-4" />
                            <span>Join Digital Room</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Appointment Tabs */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest">History & Upcoming</h3>
                    <FilterTabs />
                </div>

                <div className="space-y-4">
                    {appointments.map((apt) => (
                        <div key={apt.id} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm flex items-center justify-between hover:border-blue-500/20 transition-all group">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                                    <Calendar className="w-6 h-6 text-slate-400 group-hover:text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm tracking-tight">{apt.doctor?.name || 'Awaiting Allocation'}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{new Date(apt.appointmentDate).toLocaleDateString()} • {apt.status}</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
                        </div>
                    ))}

                    {appointments.length === 0 && !loading && (
                        <div className="py-20 text-center bg-slate-50/50 rounded-2xl border-2 border-dashed border-slate-200">
                            <div className="text-4xl mb-4 opacity-40">🗓️</div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">No scheduled sessions found</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Recommended Specialists */}
            <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-xs uppercase tracking-widest px-2">Suggested Specialists</h3>
                <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
                    <DoctorCard name="Naveen Sahni" specialty="Cardiologist" rating="4.9" />
                    <DoctorCard name="Ananya Iyer" specialty="Pediatrician" rating="4.8" />
                    <DoctorCard name="Rahul Mehta" specialty="Dermatologist" rating="4.7" />
                </div>
            </div>
        </div>
    );
}

function FilterTabs() {
    return (
        <div className="flex bg-slate-100 p-1 rounded-lg">
            <button className="px-3 py-1 bg-white rounded-md text-[8px] font-bold uppercase tracking-widest shadow-sm">Upcoming</button>
            <button className="px-3 py-1 text-[8px] font-bold text-slate-500 uppercase tracking-widest">Past</button>
        </div>
    );
}

function DoctorCard({ name, specialty, rating }: any) {
    return (
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm min-w-[160px] space-y-3">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
            </div>
            <div>
                <h4 className="font-bold text-slate-900 text-xs tracking-tight">Dr. {name}</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{specialty}</p>
            </div>
            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-bold text-slate-900">{rating}</span>
                </div>
                <button className="text-blue-600">
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
