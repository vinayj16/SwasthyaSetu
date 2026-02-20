'use client';

import { useState } from 'react';
import {
    MapPin,
    Navigation,
    Phone,
    Clock,
    Search,
    ChevronRight,
    Droplet,
    Activity,
    Bed,
    Filter
} from 'lucide-react';

export default function MobileHospitals() {
    const hospitals = [
        {
            id: 'HOS-001',
            name: 'AIIMS - National Center',
            distance: '2.4 km',
            address: 'Ansari Nagar, New Delhi',
            beds: 12,
            icu: 0,
            blood: 'A+, B-, O+',
            status: 'Operational',
            color: 'emerald'
        },
        {
            id: 'HOS-002',
            name: 'Apollo Hospital',
            distance: '4.8 km',
            address: 'Sarita Vihar, Delhi',
            beds: 45,
            icu: 8,
            blood: 'All Groups',
            status: 'High Load',
            color: 'orange'
        },
        {
            id: 'HOS-003',
            name: 'Max Super Specialty',
            distance: '6.1 km',
            address: 'Saket, New Delhi',
            beds: 22,
            icu: 5,
            blood: 'O-, B+',
            status: 'Operational',
            color: 'emerald'
        }
    ];

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-10">
            {/* Header */}
            <div className="px-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Network Locator v4.0</span>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Nearby Facilities</h1>
                <p className="text-sm text-slate-500 font-medium">Real-time availability tracking</p>
            </div>

            {/* Simulated Map View Toggle */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-200">
                        <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Your Location</p>
                        <p className="text-xs font-bold text-slate-900">South Delhi Cluster</p>
                    </div>
                </div>
                <button className="bg-white px-4 py-2 rounded-lg border border-slate-200 text-[10px] font-bold uppercase tracking-widest hover:bg-slate-100 transition-colors">
                    Map View
                </button>
            </div>

            {/* Search and Quick Filters */}
            <div className="space-y-4">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search hospital or specialty..."
                        className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold shadow-sm"
                    />
                </div>
                <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
                    {['Public', 'Private', '24/7', 'ICU Avail', 'Blood Bank'].map((f) => (
                        <button key={f} className="px-4 py-2 bg-white border border-slate-200 rounded-full text-[9px] font-bold uppercase tracking-widest whitespace-nowrap text-slate-500">
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Hospital List */}
            <div className="space-y-4">
                {hospitals.map((hospital) => (
                    <div key={hospital.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                        <div className="p-5 space-y-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-slate-900 text-base tracking-tight group-hover:text-blue-600 transition-colors">{hospital.name}</h4>
                                    <div className="flex items-center space-x-2 mt-1">
                                        <MapPin className="w-3 h-3 text-slate-400" />
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{hospital.distance} • {hospital.address}</span>
                                    </div>
                                </div>
                                <div className={`px-2.5 py-1 rounded-full text-[8px] font-bold uppercase tracking-[0.2em] border ${hospital.color === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-orange-50 text-orange-600 border-orange-100'
                                    }`}>
                                    {hospital.status}
                                </div>
                            </div>

                            {/* Live Stats */}
                            <div className="grid grid-cols-3 gap-3">
                                <StatBox icon={Bed} label="BEDS" value={hospital.beds} color="text-blue-600" />
                                <StatBox icon={Activity} label="ICU" value={hospital.icu} color="text-red-500" />
                                <StatBox icon={Droplet} label="BLOOD" value={hospital.blood.includes('All') ? 'YES' : hospital.blood.split(',')[0]} color="text-rose-500" />
                            </div>

                            {/* Actions */}
                            <div className="flex items-center space-x-3 pt-2">
                                <button className="flex-1 bg-slate-900 text-white py-3 rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] flex items-center justify-center space-x-2 shadow-lg shadow-slate-200 hover:bg-blue-600 transition-colors">
                                    <Navigation className="w-3 h-3" />
                                    <span>Navigate</span>
                                </button>
                                <button className="w-12 h-12 bg-slate-50 border border-slate-100 text-slate-900 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors">
                                    <Phone className="w-5 h-5" />
                                </button>
                                <button className="w-12 h-12 bg-slate-50 border border-slate-100 text-slate-900 rounded-xl flex items-center justify-center hover:bg-slate-100 transition-colors">
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StatBox({ icon: Icon, label, value, color }: any) {
    return (
        <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 flex flex-col items-center">
            <Icon className={`w-4 h-4 ${color} mb-1`} />
            <span className="text-xs font-bold text-slate-900">{value}</span>
            <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        </div>
    );
}
