'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AnalyticsDashboard() {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-12">
            <header className="flex justify-between items-center mb-16 px-4">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter mb-2">National Health Command</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">Real-time Digital Infrastructure Monitoring</p>
                </div>
                <div className="flex space-x-4">
                    <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center space-x-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-xs font-black uppercase tracking-widest">Network Online</span>
                    </div>
                </div>
            </header>

            <div className="grid lg:grid-cols-4 gap-8 mb-12">
                <StatsCard label="Active Hospitals" value="12,482" trend="+12 today" color="blue" />
                <StatsCard label="Verified Health IDs" value="4.2M" trend="+45% MoM" color="indigo" />
                <StatsCard label="ICU Beds (Nationwide)" value="142,900" trend="84% Occupied" color="red" />
                <StatsCard label="Live Blood Stock" value="842K Units" trend="Critical: O-" color="orange" />
            </div>

            <div className="grid lg:grid-cols-2 gap-12">
                {/* National Inflow Heatmap MOCK */}
                <div className="bg-white/5 border border-white/10 rounded-[3rem] p-10 h-[500px] relative overflow-hidden">
                    <h3 className="text-2xl font-black mb-8">Patient Activity Heatmap</h3>
                    <div className="w-full h-64 bg-slate-800/50 rounded-3xl flex items-center justify-center border border-white/5 relative">
                        <div className="absolute top-10 left-20 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full"></div>
                        <div className="absolute bottom-10 right-20 w-48 h-48 bg-red-500/20 blur-3xl rounded-full"></div>
                        <span className="text-slate-500 font-black uppercase tracking-widest text-xs">Geospatial Data Stream Active</span>
                    </div>
                    <div className="mt-8 grid grid-cols-3 gap-6">
                        <HeatStat city="Delhi" level="High" color="red" />
                        <HeatStat city="Mumbai" level="Medium" color="orange" />
                        <HeatStat city="Bangalore" level="Low" color="emerald" />
                    </div>
                </div>

                {/* Predictive Trends */}
                <div className="bg-gradient-to-br from-indigo-900 to-slate-900 border border-white/10 rounded-[3rem] p-10">
                    <h3 className="text-2xl font-black mb-8 flex items-center">
                        <span className="mr-3">🧠</span> AI Trend Prediction
                    </h3>
                    <div className="space-y-6">
                        <PredictiveItem
                            title="Seasonal Influenza Surge"
                            probability="88%"
                            region="North India"
                            action="Prepare ICU Reserves"
                        />
                        <PredictiveItem
                            title="Blood Shortage Risk"
                            probability="62%"
                            region="West Bengal"
                            action="Initiate Donation Drives"
                        />
                        <PredictiveItem
                            title="New Hospital Adoption"
                            probability="94%"
                            region="Rural Expansion"
                            action="Provision Bandwidth"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatsCard({ label, value, trend, color }: any) {
    const colors = {
        blue: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
        indigo: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
        red: 'bg-red-500/10 border-red-500/20 text-red-400',
        orange: 'bg-orange-500/10 border-orange-500/20 text-orange-400'
    }[color as 'blue' | 'indigo' | 'red' | 'orange'];

    return (
        <div className={`p-8 rounded-[2.5rem] border ${colors} shadow-2xl`}>
            <span className="block text-[10px] font-black uppercase tracking-[0.2em] mb-4 opacity-60">{label}</span>
            <span className="text-4xl font-black tracking-tighter block mb-2">{value}</span>
            <span className="text-[10px] font-black opacity-80">{trend}</span>
        </div>
    );
}

function HeatStat({ city, level, color }: any) {
    const dots = { red: 'bg-red-500', orange: 'bg-orange-500', emerald: 'bg-emerald-500' }[color as 'red' | 'orange' | 'emerald'];
    return (
        <div className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center space-x-4">
            <div className={`w-3 h-3 rounded-full ${dots} shadow-lg shadow-${color}-500/50`}></div>
            <div>
                <p className="text-xs font-black">{city}</p>
                <p className="text-[10px] text-slate-500 font-bold uppercase">{level} load</p>
            </div>
        </div>
    );
}

function PredictiveItem({ title, probability, region, action }: any) {
    return (
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition group">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h4 className="font-black text-lg group-hover:text-indigo-400 transition">{title}</h4>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{region}</span>
                </div>
                <span className="text-2xl font-black text-indigo-400">{probability}</span>
            </div>
            <div className="bg-indigo-500/10 text-indigo-300 text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border border-indigo-500/20">
                Recommended Action: {action}
            </div>
        </div>
    );
}
