'use client';

import React, { useState } from 'react';
import {
    Calendar, Clock, Video, MapPin, MoreHorizontal,
    FileText, XCircle, CheckCircle2, Search, Filter
} from 'lucide-react';

const MOCK_APPOINTMENTS = [
    { id: 1, name: 'Rahul Sharma', age: 34, gender: 'Male', time: '09:00 AM', date: 'Today', type: 'ONLINE', status: 'CONFIRMED', img: '/api/placeholder/100/100' },
    { id: 2, name: 'Anjali Desai', age: 28, gender: 'Female', time: '10:30 AM', date: 'Today', type: 'OFFLINE', status: 'CONFIRMED', img: '/api/placeholder/100/101' },
    { id: 3, name: 'Vikram Singh', age: 45, gender: 'Male', time: '02:00 PM', date: 'Today', type: 'ONLINE', status: 'PENDING', img: '/api/placeholder/100/102' },
    { id: 4, name: 'Suman Gupta', age: 52, gender: 'Female', time: '11:00 AM', date: 'Tomorrow', type: 'OFFLINE', status: 'CONFIRMED', img: '/api/placeholder/100/103' },
    { id: 5, name: 'Amit Verma', age: 24, gender: 'Male', time: '09:00 AM', date: '16 Feb', type: 'ONLINE', status: 'CANCELLED', img: '/api/placeholder/100/104' },
];

export default function DoctorAppointments() {
    const [activeTab, setActiveTab] = useState('TODAY');

    const filteredAppts = MOCK_APPOINTMENTS.filter(apt => {
        if (activeTab === 'TODAY') return apt.date === 'Today' && apt.status !== 'CANCELLED';
        if (activeTab === 'UPCOMING') return apt.date !== 'Today' && apt.status !== 'CANCELLED';
        if (activeTab === 'CANCELLED') return apt.status === 'CANCELLED';
        return true;
    });

    return (
        <div className="p-10 max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-4xl font-[950] text-slate-900 tracking-tighter uppercase italic mb-2">Clinical Schedule</h1>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em] flex items-center">
                        <Clock className="w-3 h-3 mr-2" />
                        Managing Patient Flow & Consultations
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search Patients..."
                            className="bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-blue-500 outline-none w-64 transition-all shadow-sm"
                        />
                    </div>
                    <button className="p-3 bg-white border border-slate-200 rounded-xl text-slate-500 hover:text-blue-600 hover:border-blue-200 shadow-sm transition-all">
                        <Filter className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-2 bg-slate-100 p-1.5 rounded-2xl w-fit">
                <TabButton label="Today's Queue" active={activeTab === 'TODAY'} onClick={() => setActiveTab('TODAY')} />
                <TabButton label="Upcoming" active={activeTab === 'UPCOMING'} onClick={() => setActiveTab('UPCOMING')} />
                <TabButton label="Completed" active={activeTab === 'COMPLETED'} onClick={() => setActiveTab('COMPLETED')} />
                <TabButton label="Cancelled" active={activeTab === 'CANCELLED'} onClick={() => setActiveTab('CANCELLED')} />
            </div>

            {/* List */}
            <div className="space-y-4">
                {filteredAppts.map(apt => (
                    <div key={apt.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-500/20 transition-all group flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            {/* Time Box */}
                            <div className="w-24 h-24 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors">
                                <span className="text-xl font-black text-slate-900 group-hover:text-white leading-none mb-1">{apt.time.split(' ')[0]}</span>
                                <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-200 uppercase tracking-widest">{apt.time.split(' ')[1]}</span>
                                {apt.date !== 'Today' && <span className="mt-2 text-[9px] font-bold text-slate-400 group-hover:text-blue-200 uppercase tracking-widest border-t border-slate-200 group-hover:border-blue-400/30 pt-1 w-full text-center">{apt.date}</span>}
                            </div>

                            {/* Info */}
                            <div>
                                <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2 group-hover:text-blue-600 transition-colors">{apt.name}</h3>
                                <div className="flex items-center space-x-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    <span>{apt.age} Yrs</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <span>{apt.gender}</span>
                                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                                    <div className="flex items-center space-x-1">
                                        {apt.type === 'ONLINE' ? <Video className="w-3 h-3 text-blue-500" /> : <MapPin className="w-3 h-3 text-rose-500" />}
                                        <span className={apt.type === 'ONLINE' ? 'text-blue-500' : 'text-rose-500'}>{apt.type} Consult</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-4">
                            {apt.type === 'ONLINE' && apt.status !== 'CANCELLED' && (
                                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 transition-all flex items-center space-x-2">
                                    <Video className="w-4 h-4" />
                                    <span>Start Call</span>
                                </button>
                            )}
                            <button className="px-6 py-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-slate-100 flex items-center space-x-2">
                                <FileText className="w-4 h-4" />
                                <span>Details</span>
                            </button>
                            <button className="p-3 text-slate-300 hover:text-slate-600 transition-colors">
                                <MoreHorizontal className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                ))}

                {filteredAppts.length === 0 && (
                    <div className="text-center py-20 text-slate-300">
                        <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p className="text-sm font-bold uppercase tracking-widest">No Appointments Found</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function TabButton({ label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
        >
            {label}
        </button>
    )
}
