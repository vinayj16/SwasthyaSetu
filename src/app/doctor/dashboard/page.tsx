'use client';

import React from 'react';
import {
    Users, Calendar, Activity, DollarSign, Star,
    ArrowUpRight, Clock, Video, MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function DoctorDashboard() {
    return (
        <div className="p-10 max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-[950] text-slate-900 tracking-tighter uppercase italic mb-2">Dr. Vikram Aditya</h1>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">Senior Cardiologist • Apollo Indraprastha</p>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-2 px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-600">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Online & Available</span>
                    </span>
                    <span className="text-slate-400 text-xs font-mono">14 Feb, 2026</span>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                <StatCard
                    label="Today's Appointments"
                    value="12"
                    icon={<Calendar className="w-5 h-5 text-blue-500" />}
                    trend="+2"
                    bg="bg-blue-50"
                />
                <StatCard
                    label="Upcoming"
                    value="42"
                    icon={<Clock className="w-5 h-5 text-indigo-500" />}
                    trend="Next 7 Days"
                    bg="bg-indigo-50"
                />
                <StatCard
                    label="Total Patients"
                    value="1,294"
                    icon={<Users className="w-5 h-5 text-emerald-500" />}
                    trend="+18% MoM"
                    bg="bg-emerald-50"
                />
                <StatCard
                    label="Monthly Earnings"
                    value="₹1.4L"
                    icon={<DollarSign className="w-5 h-5 text-amber-500" />}
                    trend="+5%"
                    bg="bg-amber-50"
                />
                <StatCard
                    label="Rating"
                    value="4.9"
                    icon={<Star className="w-5 h-5 text-rose-500" />}
                    trend="240 Reviews"
                    bg="bg-rose-50"
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Left: Appointments Feed */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight italic">Today's Schedule</h3>
                        <Link href="/doctor/appointments" className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">View All</Link>
                    </div>

                    <div className="space-y-4">
                        <AppointmentCard
                            time="09:00 AM"
                            name="Rahul Sharma"
                            type="Video Consult"
                            status="DUE SOON"
                            img="/api/placeholder/100/100"
                        />
                        <AppointmentCard
                            time="10:30 AM"
                            name="Anjali Mehta"
                            type="Hospital Visit"
                            status="CONFIRMED"
                            img="/api/placeholder/100/101"
                        />
                        <AppointmentCard
                            time="11:45 AM"
                            name="Vikram Singh"
                            type="Video Consult"
                            status="PENDING"
                            img="/api/placeholder/100/102"
                        />
                    </div>
                </div>

                {/* Right: Quick Actions & Notifications */}
                <div className="space-y-8">
                    <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 rounded-full blur-[50px] -mr-10 -mt-10"></div>
                        <h3 className="text-lg font-black text-white uppercase tracking-tight italic mb-6">Quick Actions</h3>

                        <div className="space-y-4 relative z-10">
                            <button className="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center space-x-3 transition-all shadow-lg shadow-blue-900/40">
                                <Video className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Start Instant Meet</span>
                            </button>
                            <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-xl flex items-center justify-center space-x-3 transition-all border border-slate-700">
                                <Clock className="w-4 h-4" />
                                <span className="text-[10px] font-black uppercase tracking-widest">Manage Slots</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 shadow-sm">
                        <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Notifications</h3>
                        <div className="space-y-6">
                            <NotificationItem
                                text="New appointment booked by Sarah J."
                                time="2m ago"
                                active
                            />
                            <NotificationItem
                                text="Payment of ₹15,000 credited."
                                time="1h ago"
                            />
                            <NotificationItem
                                text="Dr. Shah requested a case transfer."
                                time="3h ago"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, icon, trend, bg }: any) {
    return (
        <div className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-xl ${bg} group-hover:scale-110 transition-transform`}>{icon}</div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg">{trend}</span>
            </div>
            <div>
                <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</span>
                <h3 className="text-2xl font-[950] text-slate-900 italic tracking-tighter">{value}</h3>
            </div>
        </div>
    );
}

function AppointmentCard({ time, name, type, status, img }: any) {
    return (
        <div className="flex items-center justify-between p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all group cursor-pointer">
            <div className="flex items-center space-x-5">
                <div className="flex flex-col items-center justify-center w-16 h-16 bg-slate-50 rounded-2xl border border-slate-100">
                    <span className="text-sm font-black text-slate-900">{time.split(' ')[0]}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase">{time.split(' ')[1]}</span>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 text-lg tracking-tight group-hover:text-blue-600 transition-colors">{name}</h4>
                    <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {type === 'Video Consult' ? <Video className="w-3 h-3 text-blue-500" /> : <MapPin className="w-3 h-3 text-rose-500" />}
                        <span>{type}</span>
                    </div>
                </div>
            </div>
            <div className="text-right">
                <span className={`block text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-2 ${status === 'DUE SOON' ? 'bg-amber-100 text-amber-600' : status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    {status}
                </span>
                <button className="text-[10px] font-bold text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">Details →</button>
            </div>
        </div>
    );
}

function NotificationItem({ text, time, active }: any) {
    return (
        <div className="flex items-start space-x-3">
            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${active ? 'bg-blue-500 animate-pulse' : 'bg-slate-200'}`}></div>
            <div>
                <p className={`text-xs font-bold leading-relaxed ${active ? 'text-slate-900' : 'text-slate-400'}`}>{text}</p>
                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{time}</span>
            </div>
        </div>
    )
}
