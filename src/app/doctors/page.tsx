'use client';

import React, { useState, useEffect } from 'react';
import {
  Search, Filter, MapPin, Star, Calendar, Clock, Video, Phone, User, Users,
  Award, CheckCircle, X, ChevronDown, Heart, MessageSquare, DollarSign,
  ShieldCheck, Activity, Zap, Building, ArrowRight, Sparkles, SlidersHorizontal,
  LayoutGrid, List, ThumbsUp, GraduationCap, Briefcase, Languages
} from 'lucide-react';
import Link from 'next/link';
import NotificationTray from '@/components/NotificationTray';

export default function DoctorDiscoveryHub() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSpecialization, setActiveSpecialization] = useState('All Specializations');
  const [viewMode, setViewMode] = useState<'GRID' | 'LIST'>('GRID');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      experience: '15+ Years',
      hospital: 'Apollo Indraprastha, Delhi',
      rating: 4.8,
      reviews: 234,
      fee: '₹1,500',
      availability: 'Available Today',
      types: ['VIDEO', 'IN-PERSON'],
      image: '/api/placeholder/400/400',
      verified: true
    },
    {
      id: 2,
      name: 'Dr. Rajesh Kumar',
      specialization: 'Neurologist',
      experience: '12+ Years',
      hospital: 'AIIMS Delhi Hub',
      rating: 4.9,
      reviews: 412,
      fee: '₹2,000',
      availability: 'Next: Tomorrow',
      types: ['VIDEO', 'CHAT', 'IN-PERSON'],
      image: '/api/placeholder/400/400',
      verified: true
    },
    {
      id: 3,
      name: 'Dr. Michael Chen',
      specialization: 'Orthopedic Surgeon',
      experience: '20+ Years',
      hospital: 'Max Healthcare, Saket',
      rating: 4.7,
      reviews: 189,
      fee: '₹1,800',
      availability: 'Available Today',
      types: ['IN-PERSON'],
      image: '/api/placeholder/400/400',
      verified: true
    },
    {
      id: 4,
      name: 'Dr. Priya Sharma',
      specialization: 'Gynecologist',
      experience: '10+ Years',
      hospital: 'Medanta Medicity, Gurugram',
      rating: 4.8,
      reviews: 256,
      fee: '₹1,200',
      availability: 'Available Today',
      types: ['VIDEO', 'IN-PERSON'],
      image: '/api/placeholder/400/400',
      verified: true
    },
    {
      id: 5,
      name: 'Dr. Ahmed Khan',
      specialization: 'Pediatrician',
      experience: '8+ Years',
      hospital: 'Sir Ganga Ram Node',
      rating: 4.6,
      reviews: 142,
      fee: '₹800',
      availability: 'Next: Wed',
      types: ['VIDEO', 'CHAT', 'IN-PERSON'],
      image: '/api/placeholder/400/400',
      verified: true
    },
    {
      id: 6,
      name: 'Dr. Lisa Anderson',
      specialization: 'Dermatologist',
      experience: '14+ Years',
      hospital: 'Fortis Memorial, Delhi',
      rating: 4.8,
      reviews: 298,
      fee: '₹1,000',
      availability: 'Available Today',
      types: ['VIDEO'],
      image: '/api/placeholder/400/400',
      verified: true
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-8 border-blue-50 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <Stethoscope className="absolute inset-0 m-auto w-8 h-8 text-blue-600 animate-pulse" />
        </div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Scanning National Nodal Registry...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-950 font-sans selection:bg-blue-500/10">
      {/* Strategic Command Header */}
      <header className="bg-slate-950 text-white pt-24 pb-48 px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] -mr-40 -mt-40 animate-pulse"></div>
        <div className="max-w-[1700px] mx-auto relative z-10 flex flex-col lg:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">National Clinician Directory Verified</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-[950] tracking-tighter leading-none italic">
              Doctor <br /> <span className="text-blue-500">Discovery.</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl italic tracking-tight opacity-70">
              Access the nation's most distinguished medical professionals across the hub network.
            </p>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-[2.5rem] border border-white/10 backdrop-blur-xl">
            <ViewTrigger label="Grid View" active={viewMode === 'GRID'} onClick={() => setViewMode('GRID')} icon={<LayoutGrid className="w-4 h-4" />} />
            <ViewTrigger label="List View" active={viewMode === 'LIST'} onClick={() => setViewMode('LIST')} icon={<List className="w-4 h-4" />} />
          </div>
        </div>
      </header>

      <main className="max-w-[1700px] mx-auto px-10 -mt-24 pb-40 relative z-20">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left: Filter HUD */}
          <aside className="lg:col-span-3 space-y-12">
            <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm space-y-12">
              <div>
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8">Search Parameters</h3>
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Name, Specialty, Node..."
                    className="w-full bg-slate-50 border-none rounded-2xl py-6 pl-16 pr-8 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-sm"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Specialization Hub</h3>
                <div className="space-y-3">
                  {['All Specializations', 'Cardiologist', 'Neurologist', 'Pediatrician', 'Dermatologist', 'Orthopedic'].map(spec => (
                    <FilterBtn key={spec} label={spec} active={activeSpecialization === spec} onClick={() => setActiveSpecialization(spec)} />
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Global Availability</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-4 bg-slate-50 hover:bg-slate-950 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Today</button>
                  <button className="py-4 bg-slate-50 hover:bg-slate-950 hover:text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">Tomorrow</button>
                </div>
              </div>

              <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-center space-x-6 relative overflow-hidden group">
                <Sparkles className="w-8 h-8 text-blue-600 shrink-0" />
                <p className="text-[9px] font-black text-blue-800 uppercase tracking-widest leading-relaxed">AI Matching Engine #091 is active to refine your search.</p>
              </div>
            </div>
          </aside>

          {/* Right: Discovery Grid */}
          <div className="lg:col-span-9 space-y-12">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-slate-950 text-white rounded-[1.8rem] flex items-center justify-center shadow-2xl">
                  <Users className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-[950] tracking-tighter italic uppercase underline decoration-blue-500 underline-offset-8">
                  {doctors.length} Distinguished Clinicians
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">Sorted by National Tier Index</span>
                <ChevronDown className="w-4 h-4 text-slate-300" />
              </div>
            </div>

            <div className={viewMode === 'GRID' ? "grid md:grid-cols-2 xl:grid-cols-3 gap-8" : "space-y-6"}>
              {doctors.map(doc => (
                <DoctorCard key={doc.id} doc={doc} horizontal={viewMode === 'LIST'} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ViewTrigger({ label, active, onClick, icon }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${active ? 'bg-white text-slate-950 shadow-2xl scale-105' : 'text-slate-400 hover:text-white'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function FilterBtn({ label, active, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${active ? 'bg-slate-950 text-white shadow-xl translate-x-1' : 'bg-slate-50 text-slate-400 hover:bg-white hover:shadow-lg border border-transparent hover:border-slate-100'}`}
    >
      {label}
    </button>
  );
}

function DoctorCard({ doc, horizontal }: any) {
  return (
    <Link href={`/doctors/${doc.id}`} className={`block bg-white rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-blue-500/20 transition-all duration-700 group overflow-hidden ${horizontal ? 'flex items-center p-8' : 'p-10'}`}>
      <div className={`relative ${horizontal ? 'w-48 h-48 shrink-0' : 'w-full aspect-square mb-10'}`}>
        <img src={doc.image} className="w-full h-full object-cover rounded-[2.5rem] border-4 border-slate-50 group-hover:border-blue-50 transition-all" alt={doc.name} />
        {doc.verified && (
          <div className="absolute -top-2 -right-2 bg-blue-600 text-white p-3 rounded-full shadow-2xl animate-pulse">
            <CheckCircle className="w-5 h-5" />
          </div>
        )}
        <div className="absolute bottom-4 left-4 bg-slate-950 text-white px-6 py-2 rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl border border-white/5">
          {doc.experience}
        </div>
      </div>

      <div className={horizontal ? 'ml-12 flex-1' : ''}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <h4 className="text-2xl font-[950] tracking-tighter italic uppercase group-hover:text-blue-600 transition-colors leading-none mb-2">{doc.name}</h4>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">{doc.specialization}</p>
          </div>
          <div className="bg-emerald-50 text-emerald-600 px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest border border-emerald-100">
            {doc.fee}
          </div>
        </div>

        <div className="flex items-center space-x-6 py-6 border-y border-slate-50 my-6">
          <div className="flex items-center space-x-2 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-xl font-black italic">{doc.rating}</span>
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">({doc.reviews})</span>
          </div>
          <div className="h-4 w-px bg-slate-100"></div>
          <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest italic flex items-center">
            <Building className="w-4 h-4 mr-2 text-blue-500" />
            {doc.hospital.split(',')[0]}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {doc.types.map((t: string) => (
              <span key={t} className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {t === 'VIDEO' ? <Video className="w-5 h-5" /> : t === 'CHAT' ? <MessageSquare className="w-5 h-5" /> : <User className="w-5 h-5" />}
              </span>
            ))}
          </div>
          <div className="text-right">
            <span className="block text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">NEXT SLOT</span>
            <span className="text-sm font-black italic text-blue-600">{doc.availability}</span>
          </div>
        </div>

        {!horizontal && (
          <div className="mt-8">
            <button className="w-full py-6 bg-slate-50 group-hover:bg-slate-950 text-slate-400 group-hover:text-white rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.4em] transition-all flex items-center justify-center space-x-3">
              <span>Examine Profile</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}

function Stethoscope({ className }: any) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 1 0 5 2.5a.3.3 0 0 0-.2-.2Z" /><path d="M10 2a2 2 0 1 0-4 0" /><path d="M7 12v-2a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v2" /><path d="M11 20H9a7 7 0 0 1-7-7V6" /><path d="M14 13v1a3 3 0 0 0 3 3h4a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a3 3 0 0 0-3 3Z" /><circle cx="11" cy="20" r="2" /><path d="M22 13a4 4 0 0 0-4-4H4" />
    </svg>
  );
}
