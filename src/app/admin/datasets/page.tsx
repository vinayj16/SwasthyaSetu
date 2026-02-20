'use client';

import React from 'react';
import {
    Database, Download, Share2, FileJson, FileSpreadsheet,
    Brain, Cpu, Layers, Microscope
} from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';

const DISEASE_DATA = [
    { name: 'Cardio', cases: 4000, severe: 2400 },
    { name: 'Resp', cases: 3000, severe: 1398 },
    { name: 'Infect', cases: 9800, severe: 6800 },
    { name: 'Neuro', cases: 2780, severe: 1908 },
    { name: 'Ortho', cases: 1890, severe: 480 },
];

const AGE_DISTRIBUTION = [
    { name: '0-18', value: 400 },
    { name: '19-35', value: 300 },
    { name: '36-60', value: 300 },
    { name: '60+', value: 200 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#F43F5E'];

export default function DatasetsHub() {
    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-[950] text-white tracking-tighter uppercase italic mb-2">National Health Grid</h1>
                    <div className="flex items-center space-x-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <Database className="w-4 h-4" />
                        <span>Authorized Data Access • Level 5 Encryption</span>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <button className="flex items-center space-x-3 px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-all">
                        <Download className="w-4 h-4" />
                        <span>Export CSV</span>
                    </button>
                    <button className="flex items-center space-x-3 px-6 py-3 bg-slate-800 text-slate-300 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-700 transition-all">
                        <FileJson className="w-4 h-4" />
                        <span>API Access</span>
                    </button>
                </div>
            </div>

            {/* AI Insights Banner */}
            <div className="bg-gradient-to-r from-violet-600/20 to-indigo-600/20 border border-violet-500/30 rounded-[3rem] p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/20 rounded-full blur-[100px] -mr-20 -mt-20"></div>
                <div className="flex items-start space-x-6 relative z-10">
                    <div className="p-4 bg-violet-600 rounded-2xl shadow-xl shadow-violet-900/40 animate-pulse">
                        <Brain className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-[950] text-white uppercase italic tracking-tight mb-2">Predictive Analysis Node</h3>
                        <p className="text-indigo-200/80 font-medium max-w-2xl leading-relaxed text-sm">
                            AI Models indicate a <span className="text-white font-bold">14% rise</span> in respiratory anomalies in the Northern Grid. Recommendation: Allocate 500 additional ICU units to Sector 4 hospitals.
                        </p>
                    </div>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Disease Trends */}
                <ChartCard title="Pathology Frequency">
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={DISEASE_DATA}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                            <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                            <YAxis stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                            <Tooltip
                                cursor={{ fill: '#334155', opacity: 0.2 }}
                                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                            />
                            <Bar dataKey="cases" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="severe" fill="#F43F5E" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </ChartCard>

                {/* Demographics */}
                <ChartCard title="Demographic Split">
                    <div className="flex items-center">
                        <div className="h-[300px] w-1/2">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={AGE_DISTRIBUTION}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {AGE_DISTRIBUTION.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="w-1/2 space-y-4">
                            {AGE_DISTRIBUTION.map((item, i) => (
                                <div key={item.name} className="flex items-center justify-between pr-8">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                                        <span className="text-xs font-bold text-slate-400">{item.name} yrs</span>
                                    </div>
                                    <span className="text-xs font-black text-white">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </ChartCard>
            </div>

            {/* Raw Datasets */}
            <div className="space-y-6">
                <h3 className="text-sm font-black text-slate-500 uppercase tracking-widest pl-2">Available Datasets</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DatasetCard name="OPD_Traffic_2025_Q1" size="2.4 GB" updated="2h ago" />
                    <DatasetCard name="Pharma_Inventory_Logs" size="450 MB" updated="5m ago" />
                    <DatasetCard name="Biometric_Auth_Failures" size="12 MB" updated="Live" alert />
                </div>
            </div>
        </div>
    );
}

function ChartCard({ title, children }: any) {
    return (
        <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] p-8">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-8 flex items-center">
                <Microscope className="w-4 h-4 mr-2 text-blue-500" />
                {title}
            </h3>
            {children}
        </div>
    );
}

function DatasetCard({ name, size, updated, alert }: any) {
    return (
        <div className="group bg-slate-900 border border-slate-800 hover:border-blue-500/30 p-6 rounded-3xl transition-all hover:bg-slate-800 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-blue-500 group-hover:text-white group-hover:bg-blue-600 transition-colors">
                    <FileSpreadsheet className="w-5 h-5" />
                </div>
                {alert && <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></div>}
            </div>
            <h4 className="font-bold text-slate-200 mb-1 group-hover:text-blue-400 transition-colors">{name}</h4>
            <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                <span>{size}</span>
                <span>{updated}</span>
            </div>
        </div>
    );
}
