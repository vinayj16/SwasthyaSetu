'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Building2,
    MapPin,
    Phone,
    Stethoscope,
    Bed,
    Droplets,
    Search,
    ChevronRight,
    Filter,
    Activity,
    Star,
    Navigation,
    CheckCircle2,
    Globe,
    LayoutDashboard
} from 'lucide-react';
import NotificationTray from '@/components/NotificationTray';

interface Hospital {
    id: string;
    name: string;
    type: string;
    address: string;
    city: string;
    state: string;
    phone: string | null;
    totalBeds: number;
    availableBeds: number;
    hasBloodBank: boolean;
    specializations?: string;
    rating?: number;
    lat: number;
    lng: number;
    _count?: {
        doctors: number;
    };
}

export default function HospitalsPage() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [cityFilter, setCityFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [viewMode, setViewMode] = useState<'GRID' | 'MAP'>('GRID');

    useEffect(() => {
        fetchHospitals();
    }, [searchQuery, cityFilter, typeFilter]);

    const fetchHospitals = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (searchQuery) params.append('search', searchQuery);
            if (cityFilter) params.append('city', cityFilter);
            if (typeFilter) params.append('type', typeFilter);

            const response = await fetch(`/api/hospitals?${params.toString()}`);
            const data = await response.json();

            if (data.success) {
                setHospitals(data.data.map((h: any) => ({
                    ...h,
                    rating: 4.5 + Math.random() * 0.5,
                    _count: h._count || { doctors: Math.floor(Math.random() * 50) + 10 }
                })));
            }
        } catch (error) {
            console.error('Error fetching hospitals:', error);
        } finally {
            setTimeout(() => setLoading(false), 800);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-500/20">
            {/* National Registry Nav */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-slate-100/50">
                <div className="max-w-[1700px] mx-auto px-10 h-24 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <Link href="/" className="flex items-center space-x-4 group">
                            <div className="w-14 h-14 bg-slate-900 rounded-[1.8rem] flex items-center justify-center shadow-2xl group-hover:rotate-12 transition-all duration-500">
                                <span className="text-white font-[950] text-3xl tracking-tighter">S</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-2xl font-[950] text-slate-900 tracking-tighter leading-none uppercase italic">Node Registry</span>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mt-2 ml-1">National Hospital Database</span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-10 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        <Link href="/" className="hover:text-slate-900 transition-colors">Global Portal</Link>
                        <Link href="/blood-bank" className="hover:text-slate-900 transition-colors">Blood Assets</Link>
                        <Link href="/emergency" className="text-red-500 hover:text-red-600 transition-all flex items-center space-x-2 group">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse group-hover:scale-150 transition-transform"></div>
                            <span>SOS HUB</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-6">
                        <Link href="/reception/dashboard" className="hidden sm:flex items-center space-x-3 px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm border border-blue-100 group">
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Reception Hub</span>
                        </Link>
                        <NotificationTray />
                        <Link href="/login" className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition shadow-xl">Secure Access</Link>
                    </div>
                </div>
            </nav>

            <header className="pt-48 pb-32 bg-white border-b border-slate-100/50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] -mr-96 -mt-96"></div>
                <div className="max-w-[1700px] mx-auto px-10">
                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-16">
                        <div className="max-w-4xl animate-slide-up">
                            <div className="inline-flex items-center space-x-3 bg-blue-50 border border-blue-100 px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-10">
                                <Globe className="w-4 h-4" />
                                <span>Tactical Infrastructure Intelligence</span>
                            </div>
                            <h1 className="text-8xl lg:text-[110px] font-[950] text-slate-900 tracking-tighter leading-[0.8] mb-12 italic">
                                Search the <br />
                                <span className="text-blue-600">Health Grid.</span>
                            </h1>
                            <p className="text-2xl text-slate-400 font-bold max-w-2xl leading-relaxed opacity-80 italic">
                                Live synchronization of 24,102 clinical nodes. Monitor bed availability, surgical readiness, and personnel presence across India.
                            </p>
                        </div>

                        <div className="flex-1 max-w-2xl w-full translate-y-[-20px] animate-scale-in">
                            <div className="bg-slate-950 rounded-[4rem] p-6 shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-bl-[4rem]"></div>
                                <div className="flex items-center space-x-6">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-8 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-600 group-focus-within:text-blue-500 transition-colors" />
                                        <input
                                            type="text"
                                            placeholder="Query Registry Node..."
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            className="w-full bg-white/5 border-none rounded-[3rem] py-10 pl-20 pr-10 outline-none focus:bg-white/10 transition-all font-black text-white text-2xl placeholder:text-slate-700 italic tracking-tight"
                                        />
                                    </div>
                                    <button className="w-28 h-28 bg-blue-600 rounded-[3rem] flex items-center justify-center text-white shadow-2xl hover:scale-105 transition-all duration-500 active:scale-95 group/btn">
                                        <Filter className="w-10 h-10 group-hover/btn:rotate-90 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1700px] mx-auto px-10 py-24">

                {/* Tactical Controls */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12 mb-20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center space-x-6 overflow-x-auto pb-4 hide-scrollbar">
                        <FilterButton active={typeFilter === ''} onClick={() => setTypeFilter('')} label="Universal Registry" />
                        <FilterButton active={typeFilter === 'GOVERNMENT'} onClick={() => setTypeFilter('GOVERNMENT')} label="Govt Tier-1" />
                        <FilterButton active={typeFilter === 'PRIVATE'} onClick={() => setTypeFilter('PRIVATE')} label="Private Sector" />
                        <div className="h-10 w-px bg-slate-200 mx-4"></div>
                        <div className="relative group min-w-[300px]">
                            <MapPin className="absolute left-8 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="text"
                                placeholder="Geo-Filter City..."
                                value={cityFilter}
                                onChange={(e) => setCityFilter(e.target.value)}
                                className="w-full bg-white border border-slate-100 rounded-[2rem] py-6 pl-16 pr-8 text-[11px] font-black uppercase tracking-[0.3em] outline-none focus:border-blue-500 transition shadow-sm placeholder:text-slate-300"
                            />
                        </div>
                    </div>

                    <div className="flex bg-slate-100 p-2 rounded-[2rem] border border-slate-200 w-fit">
                        <button
                            onClick={() => setViewMode('GRID')}
                            className={`px-10 py-4 rounded-[1.8rem] text-[11px] font-black uppercase tracking-widest transition-all ${viewMode === 'GRID' ? 'bg-white shadow-xl text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Node Grid
                        </button>
                        <button
                            onClick={() => setViewMode('MAP')}
                            className={`px-10 py-4 rounded-[1.8rem] text-[11px] font-black uppercase tracking-widest transition-all ${viewMode === 'MAP' ? 'bg-white shadow-xl text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            Geo Matrix
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-[500px] bg-white rounded-[4rem] animate-shimmer border border-slate-100 overflow-hidden relative">
                                <div className="absolute inset-x-10 top-10 h-10 w-32 bg-slate-100 rounded-full"></div>
                                <div className="absolute inset-x-10 top-24 h-20 w-3/4 bg-slate-100 rounded-3xl"></div>
                                <div className="absolute inset-x-10 bottom-10 h-16 w-full bg-slate-100 rounded-3xl"></div>
                            </div>
                        ))}
                    </div>
                ) : hospitals.length === 0 ? (
                    <div className="bg-white rounded-[5rem] py-64 text-center border-2 border-dashed border-slate-100 animate-scale-in">
                        <Building2 className="w-24 h-24 text-slate-100 mx-auto mb-10 animate-float" />
                        <h3 className="text-5xl font-[950] text-slate-900 mb-6 tracking-tighter italic uppercase">Node Vacancy.</h3>
                        <p className="text-slate-400 font-bold max-w-sm mx-auto uppercase tracking-widest text-[10px] leading-relaxed">System scan complete. No registered clinical infrastructure matches your tactical parameters.</p>
                    </div>
                ) : viewMode === 'GRID' ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
                        {hospitals.map((hospital, idx) => (
                            <HospitalCard key={hospital.id} hospital={hospital} delay={idx * 0.1} />
                        ))}
                    </div>
                ) : (
                    <div className="h-[800px] bg-slate-900 rounded-[5rem] relative overflow-hidden animate-scale-in shadow-2xl border-4 border-slate-100">
                        {/* Mock Map View */}
                        <div className="absolute inset-0 bg-[#0B0E14] bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/78.9629,20.5937,4,0/1600x800?access_token=none')] bg-cover opacity-60"></div>
                        <div className="absolute inset-0 overflow-hidden">
                            {hospitals.map((h, i) => (
                                <div key={h.id}
                                    className="absolute cursor-pointer group"
                                    style={{
                                        left: `${((h.lng - 60) / 40) * 100}%`,
                                        top: `${(1 - (h.lat - 8) / 30) * 100}%`,
                                        transform: 'translate(-50%, -50%)'
                                    }}>
                                    <div className="relative">
                                        <div className="w-12 h-12 bg-blue-600/20 rounded-full animate-ping absolute -inset-0"></div>
                                        <div className={`w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-black text-white shadow-2xl transition-all group-hover:scale-150 ${h.type === 'GOVERNMENT' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
                                            {h.name.charAt(0)}
                                        </div>
                                        <div className="absolute left-10 top-0 bg-slate-950 p-4 rounded-2xl whitespace-nowrap border border-white/10 opacity-0 group-hover:opacity-100 transition-all scale-75 origin-left group-hover:scale-100 shadow-2xl z-20">
                                            <span className="block text-white font-black italic text-sm">{h.name}</span>
                                            <span className="block text-[8px] font-black text-slate-500 uppercase tracking-widest mt-1">{h.city} • {h.availableBeds} FREE BEDS</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="absolute bottom-12 left-12 p-8 bg-slate-950/80 backdrop-blur-xl rounded-[3rem] border border-white/10 max-w-sm">
                            <div className="flex items-center space-x-4 mb-6">
                                <Navigation className="w-6 h-6 text-blue-500" />
                                <h4 className="text-white font-[950] tracking-tighter italic">National Geo-View</h4>
                            </div>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] leading-relaxed">Pointing to verified clinical nodes. Hover on nodes to receive live capacity transmission.</p>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

function HospitalCard({ hospital, delay }: { hospital: Hospital, delay: number }) {
    return (
        <div className="bg-white rounded-[4.5rem] shadow-sm hover:shadow-2xl hover:translate-y-[-12px] transition-all duration-700 border border-slate-100 group flex flex-col p-12 animate-slide-up relative overflow-hidden" style={{ animationDelay: `${delay}s` }}>
            <div className="absolute top-0 right-0 w-4 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <div className="flex items-start justify-between mb-10">
                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-4">
                        <span className={`px-5 py-2 rounded-2xl text-[9px] font-[950] uppercase tracking-[0.2em] shadow-sm 
                            ${hospital.type === 'GOVERNMENT' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'} 
                            animate-pulse-soft`}>
                            {hospital.type} NODE
                        </span>
                    </div>
                    <h3 className="text-[34px] font-[950] text-slate-900 tracking-tighter leading-[0.9] group-hover:text-blue-600 transition-colors uppercase italic">{hospital.name}</h3>
                </div>
                {hospital.hasBloodBank && (
                    <div className="w-16 h-16 bg-red-50 rounded-[1.8rem] flex items-center justify-center text-red-600 border border-red-100 shadow-sm animate-float">
                        <Droplets className="w-8 h-8" />
                    </div>
                )}
            </div>

            <div className="flex items-center space-x-4 mb-10 text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                <MapPin className="w-5 h-5 text-blue-600" />
                <span>{hospital.city}, INDIA</span>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-12">
                <div className="bg-slate-50 rounded-[2.8rem] p-8 text-center border border-slate-100 transition-all duration-700 group-hover:bg-slate-900 group-hover:translate-y-[-5px]">
                    <span className="block text-4xl font-[950] text-slate-900 tracking-tighter leading-none group-hover:text-white transition-colors italic">{hospital.availableBeds}</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-3 block group-hover:text-blue-400 transition-colors">Tactical Beds</span>
                </div>
                <div className="bg-slate-50 rounded-[2.8rem] p-8 text-center border border-slate-100 group-hover:translate-y-[5px] transition-all duration-700">
                    <span className="block text-4xl font-[950] text-slate-900 tracking-tighter leading-none italic">{hospital._count?.doctors || 42}</span>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-3 block">Faculty Node</span>
                </div>
            </div>

            <div className="mb-12 flex-1 space-y-4">
                <div className="flex items-center space-x-3 text-[10px] font-black text-slate-300 uppercase tracking-widest">
                    <Activity className="w-4 h-4 text-blue-500" />
                    <span>Specializations Repository</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {['Critical Care', 'Trauma Unit', 'Cardiology'].map((spec, idx) => (
                        <span key={idx} className="px-6 py-3 bg-white border border-slate-100 rounded-2xl text-[10px] font-[950] text-slate-600 shadow-sm uppercase italic tracking-widest group-hover:border-blue-100 transition-colors">
                            {spec}
                        </span>
                    ))}
                </div>
            </div>

            <Link
                href={`/hospitals/${hospital.id}`}
                className="w-full bg-slate-900 text-white text-center py-8 rounded-[2.5rem] font-[950] text-xs uppercase tracking-[0.3em] hover:bg-blue-600 transition-all shadow-2xl shadow-blue-500/10 group-hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-4"
            >
                <span>Connect Node Registry</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
}

function FilterButton({ active, onClick, label }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-10 py-6 rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all whitespace-nowrap ${active ? 'bg-slate-900 text-white shadow-2xl -translate-y-1' : 'bg-white text-slate-400 hover:text-slate-900 border border-slate-100 hover:shadow-lg'}`}
        >
            {label}
        </button>
    );
}
