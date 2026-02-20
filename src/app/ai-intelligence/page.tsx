'use client';

import { useState } from 'react';
import {
    Activity,
    Brain,
    Globe,
    ShieldAlert,
    TrendingUp,
    MapPin,
    Users,
    Server,
    Zap,
    AlertCircle,
    BarChart3,
    ArrowUpRight,
    Search,
    ShieldCheck
} from 'lucide-react';
import Link from 'next/link';

export default function AIIntelligenceHub() {
    const [view, setView] = useState<'NATIONAL' | 'REGIONAL'>('NATIONAL');

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* National AI Header */}
            <header className="bg-slate-900 text-white py-12 px-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] -mr-40 -mt-40"></div>
                <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-2xl">
                                <Brain className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.4em]">National AI Surveillance Unit</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic">AI Intelligence Hub</h1>
                        <p className="text-slate-400 max-w-xl font-medium">Predicting, optimizing, and protecting India's health infrastructure through real-time ML-driven oversight.</p>
                    </div>
                    <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 backdrop-blur-md">
                        <button
                            onClick={() => setView('NATIONAL')}
                            className={`px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${view === 'NATIONAL' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            National View
                        </button>
                        <button
                            onClick={() => setView('REGIONAL')}
                            className={`px-8 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${view === 'REGIONAL' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-500 hover:text-white'}`}
                        >
                            Regional Clusters
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-8 py-16">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Left: Surveillance & Prediction */}
                    <div className="lg:col-span-8 space-y-12">

                        {/* Outbreak Prediction Map Mockup */}
                        <div className="bg-white rounded-3xl border border-slate-100 p-10 shadow-sm relative overflow-hidden group">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Disease Outbreak Prediction</h3>
                                    <p className="text-sm text-slate-500 font-medium">Early Warning System (EWS) Analysis</p>
                                </div>
                                <div className="px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100 flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span>Scanning Active</span>
                                </div>
                            </div>

                            <div className="bg-slate-900 rounded-[2rem] aspect-video relative overflow-hidden">
                                {/* Simulated Heatmap Overlay */}
                                <div className="absolute inset-0 opacity-40 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/78.9629,20.5937,3.5,0/1200x600?access_token=none')] bg-cover"></div>

                                {/* AI Prediction Clusters */}
                                <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-red-500/30 rounded-full blur-3xl animate-pulse"></div>
                                <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-orange-500/20 rounded-full blur-[60px] animate-pulse [animation-delay:1000ms]"></div>

                                <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                                    <div className="bg-black/60 backdrop-blur-md p-6 rounded-2xl border border-white/10 max-w-sm">
                                        <div className="flex items-center space-x-3 text-red-400 mb-2">
                                            <AlertCircle className="w-4 h-4" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Potential Cluster Detected</span>
                                        </div>
                                        <p className="text-white text-sm font-bold">Fever spikes detected in Bhopal and Ujjain districts. +32% above seasonal average.</p>
                                        <div className="mt-4 flex items-center space-x-4">
                                            <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest">Deploy Triage</button>
                                            <button className="text-white/60 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Dismiss</button>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end space-y-2">
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                            <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">High Risk (80%+)</span>
                                        </div>
                                        <div className="flex space-x-2">
                                            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                            <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em]">Emerging (40%+)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Population Health Analytics Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            <InsightCard
                                icon={<TrendingUp className="text-blue-500" />}
                                label="Chronic Disease Prevalence"
                                title="Diabetes Mapping"
                                desc="22% growth in Type-2 cases across urban clusters. Correlates with lifestyle shifts."
                                stat="22%"
                                trend="up"
                            />
                            <InsightCard
                                icon={<Users className="text-emerald-500" />}
                                label="Maternal Health Index"
                                title="Institutional Delivery"
                                desc="85% of rural births are now digitally tracked. 12% reduction in postpartum risk."
                                stat="85%"
                                trend="up"
                            />
                        </div>
                    </div>

                    {/* Right: Resources & Safety */}
                    <div className="lg:col-span-4 space-y-12">

                        {/* Resource Forecasting */}
                        <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-[80px] -mr-16 -mt-16"></div>
                            <h3 className="text-xl font-bold tracking-tight mb-8">Resource Forecasting</h3>

                            <div className="space-y-8">
                                <ResourceMeter label="ICU Demand (Next 7d)" value={68} color="blue" />
                                <ResourceMeter label="Oxygen Buffer Capacity" value={92} color="emerald" />
                                <ResourceMeter label="Blood Reserve (Rare Types)" value={34} color="red" />
                            </div>

                            <div className="mt-12 p-6 bg-white/5 rounded-2xl border border-white/5">
                                <div className="flex items-center space-x-3 mb-2 text-blue-400">
                                    <Zap className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">AI Recommendation</span>
                                </div>
                                <p className="text-xs text-slate-400 leading-relaxed font-medium">Reallocate 500 units of O- from Jaipur Hub to Mumbai Central. Predicted demand surge on Friday.</p>
                            </div>
                        </div>

                        {/* Fraud & Anomaly Monitoring */}
                        <div className="bg-white rounded-3xl border border-slate-100 p-10 shadow-sm">
                            <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-10 flex items-center">
                                <ShieldAlert className="w-6 h-6 mr-3 text-red-500" /> Security Logs
                            </h3>
                            <div className="space-y-6">
                                <AnomalyEntry type="Fraud" msg="Suspicious insurance claim: Node HP-209" time="2m ago" risk="High" />
                                <AnomalyEntry type="Auth" msg="Predictive block: Bot-like ID generation" time="15m ago" risk="Medium" />
                                <AnomalyEntry type="Record" msg="Duplicate UHID pattern found in Odisha" time="1h ago" risk="Low" />
                            </div>
                        </div>

                        {/* AI Ethics & Transparency */}
                        <div className="bg-blue-600 rounded-3xl p-10 text-white shadow-xl shadow-blue-200">
                            <div className="flex items-center space-x-3 mb-6">
                                <ShieldCheck className="w-6 h-6 text-white" />
                                <h3 className="text-lg font-bold tracking-tight">AI Transparency Protocol</h3>
                            </div>
                            <ul className="space-y-3 text-xs font-medium text-blue-100 opacity-90">
                                <li className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mt-1"></div>
                                    <span>All AI decisions are explainable and audited.</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mt-1"></div>
                                    <span>Human-in-the-loop: Doctors have final override.</span>
                                </li>
                                <li className="flex items-start space-x-2">
                                    <div className="w-1.5 h-1.5 bg-blue-300 rounded-full mt-1"></div>
                                    <span>Federated learning ensures patient data privacy.</span>
                                </li>
                            </ul>
                            <button className="w-full bg-white text-blue-600 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest mt-8 hover:bg-blue-50 transition-colors">
                                Review AI Ethics Charter
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

function InsightCard({ icon, label, title, desc, stat, trend }: any) {
    return (
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
            <div className="flex justify-between items-start mb-6">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors shadow-inner">
                    {icon}
                </div>
                <div className={`text-xl font-bold tracking-tighter ${trend === 'up' ? 'text-red-500' : 'text-emerald-500'}`}>
                    {stat}
                </div>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">{label}</span>
            <h4 className="text-xl font-bold text-slate-900 tracking-tight mb-2 underline decoration-blue-500/10 decoration-4">{title}</h4>
            <p className="text-sm text-slate-500 font-medium leading-relaxed">{desc}</p>
        </div>
    );
}

function ResourceMeter({ label, value, color }: any) {
    const colors = {
        blue: 'bg-blue-500 shadow-blue-500/50',
        emerald: 'bg-emerald-500 shadow-emerald-500/50',
        red: 'bg-red-500 shadow-red-500/50'
    }[color as 'blue' | 'emerald' | 'red'];

    return (
        <div>
            <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
                <span className="text-sm font-bold text-white">{value}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                    className={`h-full ${colors} rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(255,255,255,0.2)]`}
                    style={{ width: `${value}%` }}
                ></div>
            </div>
        </div>
    );
}

function AnomalyEntry({ type, msg, time, risk }: any) {
    const riskColor = {
        High: 'text-red-500 bg-red-50 border-red-100',
        Medium: 'text-orange-500 bg-orange-50 border-orange-100',
        Low: 'text-blue-500 bg-blue-50 border-blue-100'
    }[risk as 'High' | 'Medium' | 'Low'];

    return (
        <div className="flex items-center bg-slate-50 p-4 rounded-2xl border border-slate-100 hover:border-slate-300 transition-all cursor-pointer group">
            <div className="flex-1 space-y-1">
                <div className="flex items-center space-x-2">
                    <span className={`text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border ${riskColor}`}>
                        {type} • {risk} Risk
                    </span>
                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">{time}</span>
                </div>
                <p className="text-xs font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{msg}</p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors" />
        </div>
    );
}
