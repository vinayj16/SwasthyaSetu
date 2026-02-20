'use client';

import React from 'react';
import Link from 'next/link';
import {
    Calendar, MapPin, Bell, Activity, Plus,
    ChevronRight, Clock, FileText, X
} from 'lucide-react';

export default function PatientDashboard() {
    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex items-end justify-between border-b border-slate-300 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome, Rahul</h1>
                    <p className="text-base text-slate-600 font-medium">UHID: 8821-9921-0012 • +91 98765 43210</p>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="relative p-3 bg-white border border-slate-300 hover:bg-slate-50 transition-colors rounded-sm shadow-sm group">
                        <Bell className="w-5 h-5 text-slate-700 group-hover:text-blue-600" />
                        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-600 rounded-full border border-white"></span>
                    </button>
                    <Link href="/patient/book" className="flex items-center space-x-2 px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm transition-colors shadow-sm rounded-sm">
                        <Plus className="w-4 h-4" />
                        <span>Book Appointment</span>
                    </Link>
                </div>
            </div>

            {/* Quick Actions Grid - Sharp Edges */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <ActionCard
                    title="Find Nearby Services"
                    desc="Locate hospitals, pharmacies & labs"
                    icon={<MapPin className="w-6 h-6 text-white" />}
                    bg="bg-emerald-700"
                    href="/patient/locate"
                />
                <ActionCard
                    title="Health Wiki & Guide"
                    desc="Symptom checker & medical advice"
                    icon={<Activity className="w-6 h-6 text-white" />}
                    bg="bg-indigo-700"
                    href="/health-wiki"
                />
                <ActionCard
                    title="My Medical Records"
                    desc="View lab results, scans & prescriptions"
                    icon={<FileText className="w-6 h-6 text-white" />}
                    bg="bg-slate-800"
                    href="/patient/records"
                />
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Appointments */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-slate-900">Your Schedule</h3>
                        <Link href="/patient/appointments" className="text-sm font-semibold text-blue-700 hover:underline">View All Appointments</Link>
                    </div>

                    <div className="border border-slate-300 bg-white shadow-sm rounded-sm">
                        <AppointmentItem
                            date="14 Feb"
                            time="09:00 AM"
                            doctor="Dr. Vikram Aditya"
                            hospital="Apollo Indraprastha"
                            status="CONFIRMED"
                        />
                        <AppointmentItem
                            date="20 Feb"
                            time="11:30 AM"
                            doctor="Dr. Sarah Johnson"
                            hospital="Max Healthcare"
                            status="PENDING"
                        />
                        <div className="p-8 text-center bg-slate-50 border-t border-slate-200">
                            <p className="text-base text-slate-600 font-medium mb-4">Feeling unwell right now?</p>
                            <Link href="/patient/book" className="inline-block px-8 py-3 border border-slate-300 bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm transition-colors rounded-sm shadow-sm">
                                Find Immediate Care
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Notifications & Tips */}
                <div className="space-y-6">
                    <div className="border border-slate-300 bg-white p-6 shadow-sm rounded-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-base font-bold text-slate-900 flex items-center">
                                <Bell className="w-4 h-4 mr-2 text-blue-700" />
                                Notifications
                            </h3>
                            <button className="text-xs font-semibold text-slate-500 hover:text-blue-700">Clear All</button>
                        </div>
                        <div className="space-y-0 divide-y divide-slate-100">
                            <Notification
                                text="Your lab report for Blood Test is ready for download."
                                time="2 hours ago"
                                urgent
                            />
                            <Notification
                                text="Appointment confirmed with Dr. Vikram Aditya."
                                time="5 hours ago"
                            />
                            <Notification
                                text="Polio vaccination drive near your location tomorrow."
                                time="1 day ago"
                            />
                        </div>
                    </div>

                    <div className="bg-blue-700 p-6 text-white rounded-sm shadow-md">
                        <h3 className="text-lg font-bold mb-2">Health Tip of the Day</h3>
                        <p className="text-blue-50 text-base leading-relaxed mb-4">
                            Staying hydrated is crucial for heart health. Aim for at least 8 glasses of water daily to maintain optimal blood flow.
                        </p>
                        <Link href="/health-wiki" className="text-sm font-semibold border-b border-blue-400 pb-0.5 hover:text-blue-100 hover:border-blue-200 transition-colors">
                            Read More in Health Guide
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ActionCard({ title, desc, icon, bg, href }: any) {
    return (
        <Link href={href} className={`${bg} p-6 flex flex-col justify-between h-40 hover:opacity-90 hover:translate-y-[-2px] transition-all shadow-md rounded-sm group`}>
            <div className="flex justify-between items-start">
                <div className="p-2 bg-white/10 rounded-sm">{icon}</div>
                <ChevronRight className="w-5 h-5 text-white/70 group-hover:translate-x-1 transition-transform" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{title}</h3>
                <p className="text-white/80 text-sm font-medium mt-1">{desc}</p>
            </div>
        </Link>
    );
}

function AppointmentItem({ date, time, doctor, hospital, status }: any) {
    return (
        <div className="flex items-center justify-between p-6 border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
            <div className="flex items-center space-x-6">
                <div className="text-center w-16 bg-slate-100 py-2 rounded-sm border border-slate-200">
                    <div className="text-lg font-bold text-slate-900 leading-none mb-1">{date.split(' ')[0]}</div>
                    <div className="text-xs font-semibold text-slate-600 uppercase">{date.split(' ')[1]}</div>
                </div>
                <div>
                    <h4 className="text-lg font-bold text-slate-900">{doctor}</h4>
                    <p className="text-sm text-slate-600 font-medium">{hospital}</p>
                    <div className="flex items-center text-xs font-bold text-slate-500 mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {time}
                    </div>
                </div>
            </div>
            <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wide border rounded-sm ${status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                {status}
            </span>
        </div>
    );
}

function Notification({ text, time, urgent }: any) {
    return (
        <div className="flex items-start space-x-3 py-4 hover:bg-slate-50 transition-colors px-2 -mx-2 rounded-sm group cursor-pointer relative">
            <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${urgent ? 'bg-red-500' : 'bg-blue-500'}`}></div>
            <div className="flex-1">
                <p className="text-sm text-slate-800 font-medium leading-snug">{text}</p>
                <span className="text-xs font-semibold text-slate-500 mt-1 block">{time}</span>
            </div>
            <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-slate-600 transition-opacity absolute right-2 top-4">
                <X className="w-4 h-4" />
            </button>
        </div>
    );
}
