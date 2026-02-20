'use client';

import React, { useState } from 'react';
import {
    Search, UserCheck, RefreshCw, Power, ClipboardList,
    Building2, CalendarCheck, AlertTriangle
} from 'lucide-react';

const MOCK_RECEPTIONISTS = [
    { id: 'REC-001', name: 'Priya Sharma', hospital: 'Apollo Indraprastha', appointments: 1420, lastLogin: '2m ago', status: 'ONLINE' },
    { id: 'REC-002', name: 'Amit Verma', hospital: 'AIIMS Delhi', appointments: 3200, lastLogin: '1h ago', status: 'OFFLINE' },
    { id: 'REC-003', name: 'Sneha Gupta', hospital: 'Fortis Memorial', appointments: 890, lastLogin: '3d ago', status: 'INACTIVE' },
    { id: 'REC-004', name: 'Rahul Singh', hospital: 'Max Healthcare', appointments: 2100, lastLogin: '5m ago', status: 'ONLINE' },
];

export default function ReceptionistMonitor() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-[950] text-white tracking-tighter uppercase italic mb-2">Ops Command</h1>
                    <div className="flex items-center space-x-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <UserCheck className="w-4 h-4" />
                        <span>Active Personnel: {MOCK_RECEPTIONISTS.length}</span>
                    </div>
                </div>

                <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">Grid View</button>
                    <button className="px-6 py-2 text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest hover:text-white">Map View</button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {MOCK_RECEPTIONISTS.map(rec => (
                    <ReceptionistCard key={rec.id} data={rec} />
                ))}
            </div>
        </div>
    );
}

function ReceptionistCard({ data }: any) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8 hover:bg-slate-800/50 transition-all group relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center border border-slate-700">
                        <UserCheck className="w-6 h-6 text-slate-400 group-hover:text-blue-500 transition-colors" />
                    </div>
                    <div>
                        <h3 className="text-lg font-black text-white leading-none mb-1">{data.name}</h3>
                        <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                            <Building2 className="w-3 h-3" />
                            <span>{data.hospital}</span>
                        </div>
                    </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${data.status === 'ONLINE' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-slate-500/10 text-slate-500 border-slate-500/20'}`}>
                    {data.status}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center">
                        <CalendarCheck className="w-3 h-3 mr-1" />
                        Bookings
                    </div>
                    <div className="text-xl font-black text-white italic">{data.appointments}</div>
                </div>
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                    <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 flex items-center">
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Synced
                    </div>
                    <div className="text-xl font-black text-white italic">{data.lastLogin}</div>
                </div>
            </div>

            <div className="flex items-center space-x-3 pt-6 border-t border-slate-800">
                <button className="flex-1 py-3 bg-blue-600/10 text-blue-500 hover:bg-blue-600 hover:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Audit Logs</button>
                <button className="p-3 bg-slate-800 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded-xl transition-all">
                    <Power className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
