'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Building2,
    Droplets,
    Activity,
    LogOut,
    Plus,
    Search,
    ArrowUpRight,
    Zap,
    ShieldCheck,
    TrendingDown,
    BarChart4,
    LayoutDashboard,
    Box,
    Layers,
    Bell,
    CheckCircle2,
    AlertTriangle,
    Settings,
    MoreVertical,
    Brain
} from 'lucide-react';
import NotificationTray from '@/components/NotificationTray';

export default function HospitalAdminDashboard() {
    const router = useRouter();
    const [stats, setStats] = useState<any>(null);
    const [bloodStock, setBloodStock] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch('/api/hospital-admin/statistics');
                const data = await res.json();
                if (data.success) {
                    setStats(data.data.stats);
                    setBloodStock(data.data.bloodStock);
                } else {
                    // Fallback to mocks if data is empty
                    setBloodStock([
                        { id: '1', bloodGroup: 'O+', unitsAvailable: 142 },
                        { id: '2', bloodGroup: 'O-', unitsAvailable: 12 },
                        { id: '3', bloodGroup: 'A+', unitsAvailable: 89 },
                        { id: '4', bloodGroup: 'B-', unitsAvailable: 24 },
                        { id: '5', bloodGroup: 'AB+', unitsAvailable: 56 },
                    ]);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const updateUnits = async (id: string, delta: number) => {
        const stock = bloodStock.find(b => b.id === id);
        if (!stock) return;
        const newUnits = Math.max(0, stock.unitsAvailable + delta);
        setBloodStock(prev => prev.map(b => b.id === id ? { ...b, unitsAvailable: newUnits } : b));
        try {
            await fetch('/api/blood-bank/update', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ bloodGroupId: id, unitsAvailable: newUnits })
            });
        } catch (err) {
            console.error('Stock update failed', err);
        }
    };

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-slate-900 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                    <p className="text-slate-400 font-black uppercase tracking-widest text-xs">Accessing Command Hub...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans">
            {/* National Command Nav */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-slate-100/50">
                <div className="max-w-[1700px] mx-auto px-10 h-24 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                        <Link href="/" className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center text-white font-black shadow-xl">A</div>
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-slate-900 tracking-tight">SwasthyaSetu Admin</span>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mt-1">Institutional Node Control</span>
                            </div>
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-10 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        <Link href="#" className="text-slate-900 bg-slate-50 px-6 py-3 rounded-2xl border border-slate-100 flex items-center space-x-2">
                            <LayoutDashboard className="w-4 h-4" />
                            <span>Command Center</span>
                        </Link>
                        <Link href="/hospital-admin/infrastructure" className="hover:text-slate-900 transition flex items-center space-x-2">
                            <Box className="w-4 h-4" />
                            <span>Resources</span>
                        </Link>
                        <Link href="#" className="hover:text-slate-900 transition flex items-center space-x-2">
                            <BarChart4 className="w-4 h-4" />
                            <span>Stat Engine</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-8">
                        <NotificationTray />
                        <div className="h-10 w-px bg-slate-100"></div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right hidden sm:block">
                                <span className="block text-sm font-black text-slate-900">Apollo Indraprastha</span>
                                <span className="block text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center space-x-2">
                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span>Node Verified</span>
                                </span>
                            </div>
                            <button onClick={handleLogout} className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-red-500 transition border border-slate-100">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-36 pb-24 px-10 max-w-[1700px] mx-auto">
                <div className="grid lg:grid-cols-12 gap-12">

                    {/* Left: Global Hub Stats */}
                    <div className="lg:col-span-3 space-y-10">
                        <div className="bg-slate-900 rounded-[3.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
                            <h3 className="text-xs font-black uppercase tracking-[0.3em] opacity-40 mb-10">Capacity Index</h3>
                            <div className="space-y-12">
                                <CapacityStat
                                    label="Bed Occupancy"
                                    value={stats ? `${Math.round(((stats.totalBeds - stats.availableBeds) / stats.totalBeds) * 100) || 0}%` : "84%"}
                                    trend={stats && (stats.totalBeds - stats.availableBeds) / stats.totalBeds > 0.8 ? "HIGH" : "NORMAL"}
                                    color="blue"
                                />
                                <CapacityStat
                                    label="OT Rooms"
                                    value={stats?.otRooms?.toString() || "0"}
                                    trend="ACTIVE"
                                    color="orange"
                                />
                                <CapacityStat
                                    label="Medical Staff"
                                    value={((stats?.doctors || 0) + (stats?.staff || 0)).toString()}
                                    trend="OPTIMAL"
                                    color="emerald"
                                />
                            </div>
                        </div>

                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                            <h4 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Node Safety Protocols</h4>
                            <div className="space-y-6">
                                <ProtocolItem label="Encryption Shield" status="ACTIVE" icon={<ShieldCheck className="text-emerald-500" />} />
                                <ProtocolItem label="Data Synchronizer" status="SYNCED" icon={<Activity className="text-blue-500" />} />
                            </div>
                        </div>

                        <div className="p-8 bg-blue-600 rounded-[3rem] text-white shadow-xl shadow-blue-500/20">
                            <div className="flex items-center space-x-4 mb-6">
                                <Bell className="w-6 h-6 animate-bounce" />
                                <h4 className="font-extrabold text-lg tracking-tight">Network Broadcast</h4>
                            </div>
                            <p className="text-sm font-bold text-blue-100 opacity-80 leading-relaxed mb-6">
                                New national health insurance integration (Phase 4) is now live across all 291 nodes.
                            </p>
                            <button className="w-full bg-white/10 hover:bg-white/20 transition py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest">Read Protocol</button>
                        </div>
                    </div>

                    {/* Center: Live Asset Management (Blood Bank) */}
                    <div className="lg:col-span-6 space-y-10">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-4xl font-[900] text-slate-900 tracking-tight leading-none mb-2">Institutional Command</h2>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Live Asset and Resource Control Console</p>
                            </div>
                            <div className="flex space-x-4">
                                <button className="p-5 bg-white border border-slate-100 rounded-[2rem] shadow-sm hover:shadow-lg transition">
                                    <Settings className="w-6 h-6 text-slate-400" />
                                </button>
                                <button className="btn-primary flex items-center space-x-3 !rounded-[2rem] !px-10 !py-5">
                                    <Plus className="w-5 h-5 shadow-sm" />
                                    <span>Add Inventory</span>
                                </button>
                            </div>
                        </div>

                        <div className="bg-white rounded-[4rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="px-12 py-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center">
                                    <Droplets className="w-6 h-6 mr-4 text-red-500" />
                                    Live Blood Repository
                                </h3>
                                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Auto-Updating Stream</span>
                            </div>
                            <div className="p-12">
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                                    {bloodStock.map(item => (
                                        <div key={item.id} className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 flex flex-col items-center group hover:bg-white hover:border-red-500/20 hover:shadow-2xl transition-all duration-500">
                                            <span className="text-4xl font-black text-slate-900 group-hover:text-red-500 transition-colors mb-4 italic italic">{item.bloodGroup}</span>
                                            <div className="w-12 h-1 text-slate-200 bg-slate-100 rounded-full mb-6"></div>
                                            <span className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{item.unitsAvailable}</span>
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Units</span>

                                            <div className="flex items-center space-x-3 mt-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => updateUnits(item.id, -1)} className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-lg active:scale-90">-</button>
                                                <button onClick={() => updateUnits(item.id, 1)} className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold shadow-lg active:scale-90">+</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8">
                            <AssetTile label="Emergency OT #1" status="IN-USE" tech="Dr. Vikram" />
                            <AssetTile label="Emergency OT #2" status="AVAILABLE" tech="Ready" />
                        </div>
                    </div>

                    {/* Right: Critical Alerts & Supply Log */}
                    <div className="lg:col-span-3 space-y-10">
                        <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm">
                            <h4 className="text-lg font-black text-slate-900 mb-8 uppercase tracking-widest flex items-center">
                                <AlertTriangle className="w-5 h-5 mr-3 text-orange-500" /> Operations Alert
                            </h4>
                            <div className="space-y-6">
                                <AdminAlert severity="HIGH" msg="O- Inventory critically low (12 Units)" />
                                <AdminAlert severity="MED" msg="Oxygen Plant Pressure Drop: Tank 4" />
                                <AdminAlert severity="LOW" msg="Supply Run Expected: 14:00 IST" />
                            </div>
                        </div>

                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
                            <div className="flex items-center space-x-4 mb-10">
                                <Brain className="w-6 h-6 text-blue-400" />
                                <h4 className="font-[900] text-sm uppercase tracking-[0.2em] opacity-60">AI Capacity Forecast</h4>
                            </div>
                            <div className="space-y-10">
                                <ForecastItem label="Bed Demand (7d)" value={85} trend="INCREASING" color="orange" />
                                <ForecastItem label="ICU Probability" value={62} trend="STABLE" color="blue" />
                                <ForecastItem label="Staff Workload" value={94} trend="CRITICAL" color="red" />
                            </div>
                            <div className="mt-12 p-6 bg-white/5 rounded-[2rem] border border-white/5">
                                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">Institutional Insight</p>
                                <p className="text-xs text-slate-400 font-medium leading-relaxed">AI predicts a 15% surge in respiratory cases this weekend. Reallocate General Ward Staff to Emergency Nodes.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

function ForecastItem({ label, value, trend, color }: any) {
    const colors = {
        blue: 'bg-blue-500',
        orange: 'bg-orange-500',
        red: 'bg-red-500'
    }[color as 'blue' | 'orange' | 'red'];

    return (
        <div>
            <div className="flex justify-between items-center mb-3 font-bold">
                <span className="text-[10px] uppercase tracking-widest opacity-40">{label}</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400">{trend}</span>
            </div>
            <div className="flex items-center space-x-4">
                <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className={`h-full ${colors} rounded-full transition-all duration-1000`} style={{ width: `${value}%` }}></div>
                </div>
                <span className="text-xs font-black w-8">{value}%</span>
            </div>
        </div>
    );
}

function CapacityStat({ label, value, trend, color }: any) {
    const colors = { blue: 'text-blue-500', orange: 'text-orange-500', emerald: 'text-emerald-500' }[color as 'blue' | 'orange' | 'emerald'];
    return (
        <div className="flex items-center justify-between">
            <div>
                <span className="block text-[10px] font-black uppercase tracking-widest opacity-30 mb-2">{label}</span>
                <span className="text-3xl font-black tracking-tighter leading-none">{value}</span>
            </div>
            <div className={`text-[9px] font-black px-3 py-1 bg-white/10 rounded-full uppercase tracking-widest ${colors}`}>
                {trend}
            </div>
        </div>
    );
}

function ProtocolItem({ label, status, icon }: any) {
    return (
        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-slate-50">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100">{icon}</div>
                <span className="text-xs font-black text-slate-900 tracking-tight">{label}</span>
            </div>
            <span className="text-[9px] font-black opacity-40">{status}</span>
        </div>
    );
}

function AdminAlert({ severity, msg }: any) {
    const colors = { HIGH: 'bg-red-500', MED: 'bg-orange-400', LOW: 'bg-blue-500' }[severity as 'HIGH' | 'MED' | 'LOW'];
    return (
        <div className="flex items-start space-x-4">
            <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${colors}`}></div>
            <p className="text-sm font-bold text-slate-800 leading-tight">{msg}</p>
        </div>
    );
}

function AssetTile({ label, status, tech }: any) {
    return (
        <div className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-blue-500/20 transition-all">
            <div>
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</span>
                <span className="text-xl font-black text-slate-900 tracking-tight">{status}</span>
                <div className="flex items-center space-x-2 mt-4">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-[10px] font-black uppercase tracking-[0.1em] opacity-40">{tech}</span>
                </div>
            </div>
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                <ArrowUpRight className="w-6 h-6" />
            </div>
        </div>
    );
}
