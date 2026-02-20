'use client';

import React from 'react';
import {
    Users, Activity, DollarSign, Calendar, TrendingUp,
    ArrowUpRight, AlertCircle, CheckCircle2
} from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area
} from 'recharts';

const data = [
    { name: 'Mon', visits: 4000, revenue: 2400 },
    { name: 'Tue', visits: 3000, revenue: 1398 },
    { name: 'Wed', visits: 2000, revenue: 9800 },
    { name: 'Thu', visits: 2780, revenue: 3908 },
    { name: 'Fri', visits: 1890, revenue: 4800 },
    { name: 'Sat', visits: 2390, revenue: 3800 },
    { name: 'Sun', visits: 3490, revenue: 4300 },
];

export default function AdminDashboard() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Dashboard</h1>
                    <p className="text-sm font-medium text-slate-400">System Overview & Live Telemetry</p>
                </div>
                <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-500">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                        <span className="text-xs font-bold uppercase tracking-wide">System Optimal</span>
                    </span>
                    <span className="text-slate-500 text-xs font-mono">v4.2.0</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    label="Total Patients"
                    value="124,592"
                    trend="+12.5%"
                    icon={<Users className="w-5 h-5 text-blue-500" />}
                    color="blue"
                />
                <StatCard
                    label="Active Doctors"
                    value="1,402"
                    trend="+4.2%"
                    icon={<Activity className="w-5 h-5 text-emerald-500" />}
                    color="emerald"
                />
                <StatCard
                    label="Consultations"
                    value="8,942"
                    trend="+18.2%"
                    icon={<Calendar className="w-5 h-5 text-amber-500" />}
                    color="amber"
                />
                <StatCard
                    label="Total Revenue"
                    value="₹14.2M"
                    trend="+8.4%"
                    icon={<DollarSign className="w-5 h-5 text-rose-500" />}
                    color="rose"
                />
            </div>

            {/* Analytics Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wide">Traffic vs Revenue</h3>
                        <Activity className="w-4 h-4 text-slate-500" />
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dx={-10} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                                    itemStyle={{ color: '#e2e8f0', fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Recent Logs */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 flex flex-col">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wide mb-6">Live Action Log</h3>
                    <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
                        <LogItem action="Critical Alert" desc="ICU Capacity at 94% in Apollo Node" time="2m ago" type="CRITICAL" />
                        <LogItem action="New Registration" desc="Dr. Sarah Johnson joined the network" time="14m ago" type="INFO" />
                        <LogItem action="Payment Sync" desc="Processed ₹45,000 settlement batch" time="32m ago" type="SUCCESS" />
                        <LogItem action="Security Flag" desc="Multiple failed login attempts detected" time="1h ago" type="WARNING" />
                        <LogItem action="System Update" desc="Deployed patch v4.2.1 to core nodes" time="2h ago" type="INFO" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ label, value, trend, icon, color }: any) {
    const colors = {
        blue: 'bg-blue-500/10 border-blue-500/20 text-blue-500',
        emerald: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500',
        amber: 'bg-amber-500/10 border-amber-500/20 text-amber-500',
        rose: 'bg-rose-500/10 border-rose-500/20 text-rose-500',
    }[color as 'blue' | 'emerald' | 'amber' | 'rose'];

    return (
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-lg hover:bg-slate-800 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className={`p-2.5 rounded-lg ${colors} group-hover:scale-105 transition-transform`}>
                    {icon}
                </div>
                <div className="flex items-center space-x-1 text-emerald-500 bg-emerald-500/5 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-500/10">
                    <TrendingUp className="w-3 h-3" />
                    <span>{trend}</span>
                </div>
            </div>
            <div>
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{label}</span>
                <h3 className="text-2xl font-bold text-white tracking-tight">{value}</h3>
            </div>
        </div>
    );
}

function LogItem({ action, desc, time, type }: any) {
    const icon = {
        'CRITICAL': <AlertCircle className="w-4 h-4 text-rose-500" />,
        'WARNING': <AlertCircle className="w-4 h-4 text-amber-500" />,
        'SUCCESS': <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
        'INFO': <Activity className="w-4 h-4 text-blue-500" />
    }[type as 'CRITICAL' | 'WARNING' | 'SUCCESS' | 'INFO'];

    return (
        <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
            <div className={`mt-0.5`}>
                {icon}
            </div>
            <div>
                <div className="flex justify-between items-center mb-0.5">
                    <h4 className="text-xs font-bold text-slate-300">{action}</h4>
                    <span className="text-[10px] font-medium text-slate-500">{time}</span>
                </div>
                <p className="text-[11px] font-medium text-slate-400 leading-normal">{desc}</p>
            </div>
        </div>
    );
}
