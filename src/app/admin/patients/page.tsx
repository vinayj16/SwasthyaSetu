'use client';

import React, { useState } from 'react';
import { Search, Users, FileText, Activity, Shield_Check, Lock } from 'lucide-react';

const MOCK_PATIENTS = [
    { id: 'PAT-8292', name: 'Vikram Singh', age: 45, gender: 'Male', lastVisit: '12 Jan 2026', condition: 'Hypertension', status: 'STABLE' },
    { id: 'PAT-9211', name: 'Anjali Desai', age: 28, gender: 'Female', lastVisit: '29 Jan 2026', condition: 'Pregnancy (Tri-2)', status: 'OBSERVATION' },
    { id: 'PAT-1022', name: 'Rahul Mehta', age: 62, gender: 'Male', lastVisit: '30 Jan 2026', condition: 'Cardiac Arrhythmia', status: 'CRITICAL' },
    { id: 'PAT-3321', name: 'Suman Gupta', age: 5, gender: 'Female', lastVisit: '15 Jan 2026', condition: 'Viral Fever', status: 'RECOVERED' },
];

export default function PatientRegistry() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-[950] text-white tracking-tighter uppercase italic mb-2">Citizen Health Registry</h1>
                    <div className="flex items-center space-x-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <Users className="w-4 h-4" />
                        <span>Total Records: 1.2M+ (Local Node)</span>
                    </div>
                </div>

                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                        type="text"
                        placeholder="Search UHID / Aadhaar..."
                        className="bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-white placeholder:text-slate-600 focus:border-blue-500 outline-none w-80 transition-all"
                    />
                </div>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/80">
                            <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">UHID Identity</th>
                            <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Demographics</th>
                            <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Last Encounter</th>
                            <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Clinical Status</th>
                            <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Access</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {MOCK_PATIENTS.map((pat) => (
                            <tr key={pat.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="p-6">
                                    <div className="flex items-center space-x-3">
                                        <div className="p-2 bg-slate-800 rounded-lg text-slate-400">
                                            <Shield_Check className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-white">{pat.name}</div>
                                            <div className="text-[10px] font-mono text-slate-500">{pat.id}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="text-xs font-bold text-slate-400">{pat.age} yrs • {pat.gender}</span>
                                </td>
                                <td className="p-6">
                                    <div className="text-xs font-bold text-slate-300">{pat.lastVisit}</div>
                                    <div className="text-[10px] font-bold text-slate-500 uppercase">{pat.condition}</div>
                                </td>
                                <td className="p-6">
                                    <StatusBadge status={pat.status} />
                                </td>
                                <td className="p-6 text-right">
                                    <button className="px-4 py-2 bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-400 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all inline-flex items-center space-x-2">
                                        <Lock className="w-3 h-3" />
                                        <span>Unlock Record</span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-center">
                <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest flex items-center">
                    <Lock className="w-3 h-3 mr-2" />
                    Patient Data is End-to-End Encrypted. Access is Audited per Session.
                </p>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const color = {
        'STABLE': 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        'CRITICAL': 'text-rose-500 bg-rose-500/10 border-rose-500/20',
        'OBSERVATION': 'text-amber-500 bg-amber-500/10 border-amber-500/20',
        'RECOVERED': 'text-blue-500 bg-blue-500/10 border-blue-500/20',
    }[status];

    return (
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${color}`}>
            {status}
        </span>
    );
}
