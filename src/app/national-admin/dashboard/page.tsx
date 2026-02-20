'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    ShieldAlert,
    Map,
    Users,
    Activity,
    LogOut,
    Box,
    Zap,
    Globe,
    Server,
    BarChart3,
    Search,
    Bell,
    ArrowUpRight,
    Database,
    Lock,
    HeartPulse,
    Droplets,
    Layers,
    ChevronRight,
    TrendingDown,
    Sparkles,
    Brain
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import NotificationTray from '@/components/NotificationTray';

export default function NationalAdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<'LIST' | 'HEATMAP'>('LIST');

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/national-admin/statistics');
                const data = await res.json();
                if (data.success) {
                    setStats(data.data);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    if (loading) {
        return <div className="min-h-screen bg-[#0F172A] flex items-center justify-center font-black text-blue-500 uppercase tracking-widest">Synchronizing Strategic Core...</div>
    }

    return (
        <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans selection:bg-blue-500/30">
            {/* National Command Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-80 bg-slate-900 border-r border-white/5 p-10 z-[60]">
                <div className="flex items-center space-x-4 mb-16">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl shadow-2xl">N</div>
                    <div className="flex flex-col">
                        <span className="text-xl font-bold text-white tracking-tight uppercase">SwasthyaSetu</span>
                        <span className="text-[10px] font-bold text-blue-500 uppercase tracking-[0.4em] leading-none mt-1">Strategic Command</span>
                    </div>
                </div>

                <nav className="space-y-4">
                    <Link href="/national-admin/dashboard">
                        <SidebarItem icon={<Globe className="w-5 h-5" />} label="National Map" active />
                    </Link>
                    <Link href="/hospital-admin/infrastructure">
                        <SidebarItem icon={<Server className="w-5 h-5" />} label="Node Infrastructure" />
                    </Link>
                    <Link href="/patient/medical-records">
                        <SidebarItem icon={<Layers className="w-5 h-5" />} label="Identity Vault" />
                    </Link>
                    <Link href="/blood-bank">
                        <SidebarItem icon={<Droplets className="w-5 h-5" />} label="Life Resources" />
                    </Link>
                    <Link href="/emergency">
                        <SidebarItem icon={<Zap className="w-5 h-5" />} label="Emergency Hub" />
                    </Link>
                    <Link href="/ai-intelligence">
                        <SidebarItem icon={<Brain className="w-5 h-5" />} label="AI Intelligence Tracker" />
                    </Link>
                    <Link href="#" onClick={() => alert('Access Denied: Level 5 Clearance Required')}>
                        <SidebarItem icon={<Lock className="w-5 h-5" />} label="Security Protocol" />
                    </Link>
                </nav>

                <div className="absolute bottom-10 left-10 right-10">
                    <div className="p-6 bg-slate-800/50 rounded-xl border border-white/5 mb-6">
                        <span className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 leading-none">Status</span>
                        <div className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                            <span className="text-sm font-bold text-white">SYSTEM OPTIMAL</span>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="w-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-4 rounded-lg transition-all duration-300 font-bold text-xs uppercase tracking-widest border border-red-500/20">
                        Terminate Session
                    </button>
                </div>
            </aside>

            {/* Main Command Console */}
            <main className="ml-80 p-16">
                <header className="flex justify-between items-center mb-16">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight leading-none mb-4">Strategic Health Console</h1>
                        <div className="flex items-center space-x-6">
                            <p className="text-xl font-medium text-slate-500 tracking-tight">Real-time aggregate oversight of India's Digital Health Architecture.</p>
                            <Link href="/ai-intelligence" className="bg-blue-600/10 text-blue-500 px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-500/20 hover:bg-blue-600 hover:text-white transition-all flex items-center space-x-3">
                                <Brain className="w-4 h-4" />
                                <span>AI Intelligence Center</span>
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center space-x-8">
                        <div className="relative group hidden lg:block">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            <input type="text" placeholder="Search national assets..." className="w-64 bg-slate-900 border border-white/5 rounded-2xl py-4 pl-16 pr-6 outline-none focus:w-80 transition-all font-bold text-sm text-white focus:border-blue-500" />
                        </div>
                        <NotificationTray />
                    </div>
                </header>

                {/* Big Metric Matrix */}
                <div className="grid grid-cols-3 gap-10 mb-16">
                    <MetricCard onClick={() => router.push('/patient/dashboard')} label="Digital Identities Issued" value={stats?.activePatients?.toLocaleString() || '0'} trend="+12%" icon={<Layers className="text-blue-500" />} color="blue" />
                    <MetricCard onClick={() => router.push('/hospitals')} label="Active Medical Nodes" value={stats?.totalHospitals?.toLocaleString() || '0'} trend="+1.2%" icon={<Database className="text-indigo-500" />} color="indigo" />
                    <MetricCard onClick={() => router.push('/emergency')} label="Emergency Processing" value={stats?.emergencyCalls?.toLocaleString() || '0'} trend="+45% today" icon={<Zap className="text-emerald-500" />} color="emerald" />
                </div>

                <div className="grid lg:grid-cols-12 gap-10 mb-16">
                    {/* Live Heatmap Console */}
                    <div className="lg:col-span-8 bg-slate-900 rounded-xl border border-white/5 p-12 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                        <div className="flex justify-between items-center mb-10 relative z-10">
                            <h3 className="text-2xl font-bold text-white tracking-tight flex items-center">
                                <Map className="w-8 h-8 mr-4 text-blue-500" /> {viewMode === 'LIST' ? 'Regional Node Density' : 'Live Vector Heatmap'}
                            </h3>
                            <div className="flex bg-slate-800 p-1.5 rounded-lg">
                                <button
                                    onClick={() => setViewMode('HEATMAP')}
                                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'HEATMAP' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}
                                >
                                    Heatmap
                                </button>
                                <button
                                    onClick={() => setViewMode('LIST')}
                                    className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${viewMode === 'LIST' ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-white'}`}
                                >
                                    Topology
                                </button>
                            </div>
                        </div>
                        <div className="bg-slate-800/50 rounded-[2.5rem] aspect-[1.8/1] flex flex-col border border-white/5 relative overflow-hidden p-8">
                            <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-6">Active Medical Nodes Grid</h4>

                            {viewMode === 'LIST' ? (
                                <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                                    {stats?.topHospitals?.map((h: any, i: number) => (
                                        <div key={i} className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer group/item" onClick={() => router.push(`/hospitals/${h.id}`)}>
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500 font-black text-xs group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">{h.name[0]}</div>
                                                <div>
                                                    <div className="text-sm font-black text-white group-hover/item:text-blue-400 transition-colors">{h.name}</div>
                                                    <div className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{h.city} • {h.type}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xs font-black text-white">{h.totalBeds}</div>
                                                <div className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Total Capacity</div>
                                            </div>
                                        </div>
                                    ))}

                                    {/* AI Outbreak Prediction Card In-List */}
                                    <div className="p-6 bg-red-600/10 border border-red-500/20 rounded-2xl group/ai relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl -mr-12 -mt-12"></div>
                                        <div className="flex items-center space-x-4 mb-4">
                                            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white shadow-lg animate-pulse">
                                                <Brain className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-black text-red-400 uppercase tracking-widest">AI Outbreak Warning</h4>
                                                <p className="text-[10px] font-bold text-red-500/60 uppercase tracking-widest">Surveillance Node BH-09</p>
                                            </div>
                                        </div>
                                        <p className="text-xs font-bold text-slate-300 leading-relaxed mb-6">
                                            Unusual fever clusters (Viral Triage +42%) detected in Bhopal regional nodes. Predictive confidence: 88%.
                                        </p>
                                        <Link href="/ai-intelligence" className="text-[10px] font-black uppercase tracking-widest text-white bg-red-600 px-6 py-2.5 rounded-lg hover:bg-red-700 transition-all inline-block">
                                            Deploy National Protocol
                                        </Link>
                                    </div>

                                    {(!stats || !stats.topHospitals || stats.topHospitals.length === 0) && (
                                        <div className="flex flex-col items-center justify-center h-full opacity-20">
                                            <Map className="w-12 h-12 mb-4" />
                                            <p className="text-[10px] font-black uppercase tracking-widest">No active nodes detected</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-full">
                                    <div className="relative w-full h-full bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/78.9629,20.5937,3.5,0/800x400?access_token=none')] bg-cover opacity-50 rounded-2xl grayscale hover:grayscale-0 transition-all duration-1000">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="bg-slate-950/80 backdrop-blur-md px-8 py-4 rounded-2xl border border-white/10 text-center">
                                                <Activity className="w-6 h-6 text-blue-500 mx-auto mb-2 animate-pulse" />
                                                <p className="text-[10px] font-black text-white uppercase tracking-widest">Satellite Uplink Active</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Infrastructure Health */}
                    <div className="lg:col-span-4 bg-slate-900 rounded-xl border border-white/5 p-12 flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-10 uppercase tracking-[0.1em]">National Logistics</h3>
                            <div className="space-y-10">
                                <LogisticsProgress label="National Blood Reserve" value={85} color="red" />
                                <LogisticsProgress label="Critical Oxygen Level" value={92} color="blue" />
                                <LogisticsProgress label="ICU Bed Availability" value={45} color="orange" />
                                <LogisticsProgress label="Ambulance Up-time" value={78} color="emerald" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Real-time Threat & Security Log */}
                <div className="bg-slate-900 rounded-xl border border-white/5 p-12">
                    <div className="flex items-center justify-between mb-12">
                        <h3 className="text-2xl font-bold text-white tracking-tight flex items-center">
                            <ShieldAlert className="w-8 h-8 mr-4 text-red-500 animate-pulse" /> Global Security Logs
                        </h3>
                        <button onClick={() => alert('Vault Logs are classified. Request Authorization.')} className="text-[10px] font-bold uppercase tracking-widest text-blue-500 border border-blue-500/20 px-6 py-2 rounded-full hover:bg-blue-500 hover:text-white transition">View Vault Activity</button>
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <SystemLog icon={<Sparkles className="text-blue-500" />} type="SUCCESS" msg="Identity Vault Migration (Bhopal) Locked." time="2M AGO" />
                        <SystemLog icon={<ShieldAlert className="text-orange-500" />} type="ANOMALY" msg="Suspicious login pattern detected at Pune-Node-09" time="8M AGO" />
                        <SystemLog icon={<TrendingDown className="text-red-500" />} type="CRITICAL" msg="Asset shortage: O- Negative below threshold in Delhi-NCR" time="1H AGO" />
                        <SystemLog icon={<Lock className="text-emerald-500" />} type="AUTH" msg="New National Admin user identity authorized." time="3H AGO" />
                    </div>
                </div>

                {/* National Security Registry */}
                <div className="bg-slate-900 rounded-xl p-16 border border-white/5 relative overflow-hidden group mb-16">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                    <div className="flex items-center justify-between mb-16 relative z-10">
                        <div>
                            <h2 className="text-4xl font-black text-white tracking-tighter italic flex items-center mb-4">
                                <ShieldAlert className="w-10 h-10 mr-6 text-red-500" /> National Security Registry
                            </h2>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em] ml-16">Immutable Event Chain • Real-time Compliance Monitor</p>
                        </div>
                        <div className="flex space-x-4">
                            <div className="px-6 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center space-x-3">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Integrity: 100%</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-10 relative z-10">
                        <SystemLog
                            icon={<Lock className="w-6 h-6 text-blue-500" />}
                            type="IDENTITY_SYNC"
                            msg="Bulk Aadhaar-ID Hashing (SHA-256) completed for 1.2M identities in KL04."
                            time="14:02:11"
                        />
                        <SystemLog
                            icon={<Zap className="w-6 h-6 text-red-500" />}
                            type="EMERGENCY_OVERRIDE"
                            msg="Break-Glass access triggered at AIIMS Delhi ( trauma_ref: AD-9012 )"
                            time="13:58:45"
                        />
                        <SystemLog
                            icon={<Users className="w-6 h-6 text-emerald-500" />}
                            type="CONSENT_REVOKE"
                            msg="Patient #UHID-2026-0012 revoked full access from Apollo Greams Road."
                            time="13:45:02"
                        />
                        <SystemLog
                            icon={<ShieldAlert className="w-6 h-6 text-orange-500" />}
                            type="ANOMALY_LOG"
                            msg="Unusual access pattern detected in MH12 Registry - Auto-locking node."
                            time="13:30:11"
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}

function SidebarItem({ icon, label, active = false }: any) {
    return (
        <div className={`flex items-center justify-between p-5 rounded-lg cursor-pointer transition-all duration-300 group ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'hover:bg-white/5 text-slate-500 hover:text-white'}`}>
            <div className="flex items-center space-x-5">
                <span className={`${active ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} transition-colors`}>{icon}</span>
                <span className="font-bold text-xs uppercase tracking-widest">{label}</span>
            </div>
            {active && <ChevronRight className="w-4 h-4" />}
        </div>
    );
}

function MetricCard({ label, value, trend, icon, color, onClick }: any) {
    const glow = {
        blue: 'group-hover:bg-blue-500/10',
        indigo: 'group-hover:bg-indigo-500/10',
        emerald: 'group-hover:bg-emerald-500/10'
    }[color as 'blue' | 'indigo' | 'emerald'];

    return (
        <div onClick={onClick} className={`bg-slate-900 p-10 rounded-xl border border-white/5 group transition-all duration-500 hover:scale-[1.02] ${glow} hover:border-white/10 cursor-pointer`}>
            <div className="flex justify-between items-start mb-8">
                <div className="w-14 h-14 bg-slate-800 rounded-lg flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                    {icon}
                </div>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-4 py-1.5 rounded-full uppercase tracking-widest">{trend}</span>
            </div>
            <h4 className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em] mb-3">{label}</h4>
            <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
        </div>
    );
}

function LogisticsProgress({ label, value, color }: any) {
    const colors = {
        red: 'bg-red-500',
        blue: 'bg-blue-500',
        orange: 'bg-orange-500',
        emerald: 'bg-emerald-500'
    }[color as 'red' | 'blue' | 'orange' | 'emerald'];

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <span className="font-black text-xs uppercase tracking-[0.1em] text-slate-400">{label}</span>
                <span className="font-black text-sm text-white">{value}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div className={`h-full ${colors} rounded-full transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.5)]`} style={{ width: `${value}%` }}></div>
            </div>
        </div>
    );
}

function SystemLog({ icon, type, msg, time }: any) {
    return (
        <div className="flex items-center justify-between p-6 bg-slate-800/30 rounded-lg border border-white/5 hover:bg-slate-800/60 transition-colors">
            <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center border border-white/5 shadow-inner">
                    {icon}
                </div>
                <div>
                    <div className="flex items-center space-x-3 mb-1">
                        <span className="text-[9px] font-black uppercase tracking-widest opacity-40">{type}</span>
                        <span className="text-[10px] font-bold text-slate-600 font-mono tracking-tighter">TIMESTAMP: {time}</span>
                    </div>
                    <p className="font-bold text-white text-sm tracking-tight">{msg}</p>
                </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-700 hover:text-white transition-colors cursor-pointer" />
        </div>
    );
}
