'use client';

import {
    Droplet,
    Search,
    MapPin,
    Bell,
    History,
    Heart,
    ChevronRight,
    Filter,
    Activity
} from 'lucide-react';

export default function MobileBloodBank() {
    const bloodStocks = [
        { group: 'O+', status: 'Ample', color: 'text-emerald-500', bg: 'bg-emerald-50' },
        { group: 'A-', status: 'Low', color: 'text-orange-500', bg: 'bg-orange-50' },
        { group: 'B+', status: 'Critical', color: 'text-red-500', bg: 'bg-red-50' },
        { group: 'AB+', status: 'Normal', color: 'text-blue-500', bg: 'bg-blue-50' }
    ];

    const nearbyDrives = [
        {
            id: 1,
            title: 'National Mega Camp',
            location: 'Red Cross Society, Delhi',
            date: 'Feb 05, 2026',
            distance: '1.2 km'
        },
        {
            id: 2,
            title: 'Apollo Blood Drive',
            location: 'Apollo Hospitals, Sarita Vihar',
            date: 'Feb 12, 2026',
            distance: '4.5 km'
        }
    ];

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-10">
            {/* Header */}
            <div className="px-2">
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest flex items-center">
                    <Droplet className="w-3 h-3 mr-1 fill-rose-600" /> Life Flow Network
                </span>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Blood & Donation</h1>
            </div>

            {/* Quick Summary Grid */}
            <div className="grid grid-cols-4 gap-2 px-2">
                {bloodStocks.map((stock) => (
                    <div key={stock.group} className={`${stock.bg} p-3 rounded-xl border border-slate-100 flex flex-col items-center shadow-sm`}>
                        <span className="text-lg font-black text-slate-900">{stock.group}</span>
                        <span className={`text-[8px] font-black uppercase tracking-widest ${stock.color}`}>{stock.status}</span>
                    </div>
                ))}
            </div>

            {/* Donor Registration Card */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/30 rounded-full blur-2xl -mr-16 -mt-16 group-hover:bg-rose-600/50 transition-colors"></div>
                <div className="relative z-10 space-y-4">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center border border-white/20">
                            <Heart className="w-6 h-6 text-rose-400 fill-rose-400 animate-pulse" />
                        </div>
                        <span className="bg-white/10 text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded">E-Donor ID Ready</span>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold tracking-tight italic">Register as Life Saver</h3>
                        <p className="text-xs text-slate-400 font-medium">Get real-time emergency requests and earn national merit score points.</p>
                    </div>
                    <button className="w-full bg-rose-600 text-white py-3 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em] shadow-lg shadow-rose-900/20 active:scale-95 transition-transform">
                        Join Donor Registry
                    </button>
                </div>
            </div>

            {/* Search Bank */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Search blood group or bank..."
                    className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold shadow-sm"
                />
            </div>

            {/* Nearby Donation Drives */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="font-bold text-slate-800 text-[10px] uppercase tracking-[0.2em]">Nearby Drives</h3>
                    <button className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">View Map</button>
                </div>
                <div className="space-y-3">
                    {nearbyDrives.map((drive) => (
                        <div key={drive.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group">
                            <div className="flex items-center space-x-4">
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-blue-50 transition-colors">
                                    <MapPin className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm tracking-tight">{drive.title}</h4>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{drive.location} • {drive.distance}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-[8px] font-bold text-slate-300 uppercase tracking-widest">Date</span>
                                <span className="text-[10px] font-bold text-slate-900">{drive.date.split(',')[0]}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Donation History Link */}
            <button className="w-full bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-500/20 transition-all">
                <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-blue-50">
                        <History className="w-5 h-5 text-slate-400 group-hover:text-blue-600" />
                    </div>
                    <div className="text-left">
                        <h4 className="font-bold text-slate-900 text-xs tracking-tight uppercase">Donation History</h4>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">View past contributions</p>
                    </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
            </button>
        </div>
    );
}
