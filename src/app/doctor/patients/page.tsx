'use client';

import React from 'react';
import { Search, FileText, ArrowUpRight, Activity } from 'lucide-react';

const MOCK_PATIENTS = [
    { id: 'UHID-8822', name: 'Rahul Sharma', age: 34, gender: 'M', lastVisit: '2 days ago', diagnosis: 'Acute Bronchitis' },
    { id: 'UHID-1299', name: 'Anjali Desai', age: 28, gender: 'F', lastVisit: '1 week ago', diagnosis: 'Migraine' },
    { id: 'UHID-3321', name: 'Vikram Singh', age: 45, gender: 'M', lastVisit: '10 Feb 2026', diagnosis: 'Hypertension' },
];

export default function DoctorPatients() {
    return (
        <div className="p-10 max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-500">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-[950] text-slate-900 tracking-tighter uppercase italic mb-2">My Patients</h1>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                        Clinical History & Records
                    </p>
                </div>
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search Name or UHID..."
                        className="bg-white border border-slate-200 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-blue-500 outline-none w-80 transition-all shadow-sm"
                    />
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[2.5rem] overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100">
                        <tr>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Patient Identity</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Visit</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Primary Diagnosis</th>
                            <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {MOCK_PATIENTS.map(pat => (
                            <tr key={pat.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-500 text-xs">
                                            {pat.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-slate-900">{pat.name}</div>
                                            <div className="text-[10px] font-bold text-slate-400">{pat.id} • {pat.age}y / {pat.gender}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6 text-sm font-bold text-slate-600">
                                    {pat.lastVisit}
                                </td>
                                <td className="p-6">
                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest border border-blue-100">
                                        <Activity className="w-3 h-3 mr-1" />
                                        {pat.diagnosis}
                                    </span>
                                </td>
                                <td className="p-6 text-right">
                                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
