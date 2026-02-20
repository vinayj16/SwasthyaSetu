'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    User, Stethoscope, ShieldAlert, BookOpen,
    LifeBuoy, Search, ArrowRight, Activity,
    Heart, ChevronRight, Lock, Globe
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate search or redirect
        console.log('Searching for:', searchQuery);
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100">
            {/* Hero Section */}
            <header className="relative bg-white border-b border-slate-200 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 skew-x-12 translate-x-32 z-0"></div>

                <div className="max-w-7xl mx-auto px-6 pt-10 pb-24 relative z-10">
                    <nav className="flex items-center justify-between mb-20">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                                <Activity className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-slate-900">SwasthyaSetu</span>
                        </div>
                        <div className="flex items-center space-x-6">
                            <Link href="/login" className="text-sm font-bold text-slate-500 hover:text-slate-900 uppercase tracking-widest transition-colors">Sign In</Link>
                            <Link href="/register" className="px-6 py-3 bg-slate-900 text-white rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl">
                                Join Network
                            </Link>
                        </div>
                    </nav>

                    <div className="max-w-3xl">
                        <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-8 border border-blue-100">
                            <Globe className="w-4 h-4 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-widest">National Digital Health Mission</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-[900] tracking-tighter text-slate-900 mb-8 leading-[1.1]">
                            Universal Health <br />
                            <span className="text-blue-600">Access for All.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 font-medium mb-10 max-w-2xl leading-relaxed">
                            A unified digital ecosystem connecting 1.4 Billion citizens with India's healthcare infrastructure. Secure, efficient, and accessible.
                        </p>

                        <form onSubmit={handleSearch} className="flex items-center max-w-lg bg-white p-2 rounded-2xl shadow-2xl shadow-slate-200/50 border border-slate-100">
                            <div className="p-4 text-slate-400">
                                <Search className="w-6 h-6" />
                            </div>
                            <input
                                type="text"
                                placeholder="Find doctors, hospitals, services..."
                                className="flex-1 bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-300"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="px-8 py-4 bg-blue-600 rounded-xl text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/30">
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </form>
                    </div>
                </div>
            </header>

            {/* Portal Gateways */}
            <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-20">
                <div className="grid md:grid-cols-3 gap-8">
                    <PortalCard
                        title="Patient Portal"
                        desc="Book appointments, view records, and manage your health profile."
                        icon={<User className="w-8 h-8" />}
                        href="/patient/dashboard"
                        color="blue"
                    />
                    <PortalCard
                        title="Doctor Console"
                        desc="Manage practice, consult patients online, and view clinical history."
                        icon={<Stethoscope className="w-8 h-8" />}
                        href="/doctor/dashboard"
                        color="emerald"
                    />
                    <PortalCard
                        title="Admin & Ops"
                        desc="System controls, analytic dashboards, and hospital management."
                        icon={<ShieldAlert className="w-8 h-8" />}
                        href="/admin/login"
                        color="slate"
                    />
                </div>
            </section>

            {/* Features & Services */}
            <section className="py-24 max-w-7xl mx-auto px-6">
                <div className="flex items-end justify-between mb-16">
                    <div>
                        <h2 className="text-3xl font-[950] text-slate-900 tracking-tight mb-2">Essential Services</h2>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Everything you need for better health</p>
                    </div>
                    <Link href="/services" className="flex items-center space-x-2 text-blue-600 font-bold text-sm uppercase tracking-widest hover:underline">
                        <span>View All</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ServiceCard title="Find Hospitals" icon={<Activity />} />
                    <ServiceCard title="Book Tests" icon={<Search />} />
                    <ServiceCard title="Health Library" icon={<BookOpen />} href="/resources" />
                    <ServiceCard title="24/7 Support" icon={<LifeBuoy />} href="/support" />
                </div>
            </section>

            {/* Security Banner */}
            <section className="bg-slate-900 text-white py-24">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
                    <div className="max-w-2xl">
                        <div className="inline-flex items-center space-x-2 bg-slate-800 text-emerald-400 px-4 py-2 rounded-full mb-6 border border-slate-700">
                            <Lock className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-widest">End-to-End Encrypted</span>
                        </div>
                        <h2 className="text-4xl font-[950] tracking-tight mb-6">Your Data. Secured.</h2>
                        <p className="text-slate-400 leading-relaxed text-lg font-medium">
                            We use advanced encryption standards (AES-256) to ensure your medical history remains private. access is restricted and fully audited.
                        </p>
                    </div>
                    <div className="mt-10 md:mt-0 flex space-x-4">
                        <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                            <div className="text-3xl font-[950] text-white">100%</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Data Privacy</div>
                        </div>
                        <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700">
                            <div className="text-3xl font-[950] text-white">ISO</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">27001 Certified</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

function PortalCard({ title, desc, icon, href, color }: any) {
    const colors = {
        blue: 'bg-blue-600 text-white shadow-blue-500/30',
        emerald: 'bg-emerald-600 text-white shadow-emerald-500/30',
        slate: 'bg-slate-900 text-white shadow-slate-900/30',
    }[color as 'blue' | 'emerald' | 'slate'];

    return (
        <Link href={href} className="group relative block p-8 bg-white rounded-[2rem] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100">
            <div className={`w-16 h-16 ${colors} rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform group-hover:scale-110`}>
                {icon}
            </div>
            <h3 className="text-2xl font-[950] text-slate-900 tracking-tight mb-3 group-hover:text-blue-600 transition-colors">{title}</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-6">{desc}</p>
            <div className="flex items-center text-xs font-black uppercase tracking-widest text-slate-300 group-hover:text-blue-600 transition-colors">
                <span>Access Portal</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </div>
        </Link>
    );
}

function ServiceCard({ title, icon, href = '#' }: any) {
    return (
        <Link href={href} className="flex items-center p-6 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all group">
            <div className="p-3 bg-slate-50 rounded-lg text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors mr-4">
                {React.cloneElement(icon, { className: "w-6 h-6" })}
            </div>
            <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{title}</span>
        </Link>
    );
}
