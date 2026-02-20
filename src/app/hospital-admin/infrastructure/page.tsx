'use client';

import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Box,
    Activity,
    AlertTriangle,
    Plus,
    Search,
    Filter,
    MoreVertical,
    Thermometer,
    Zap,
    ShieldCheck,
    Clock,
    ChevronRight,
    ArrowUpRight,
    LogOut,
    Menu,
    Wind,
    Droplets,
    Stethoscope,
    HardDrive,
    Trash2,
    CheckCircle2,
    X,
    Flame,
    ClipboardCheck,
    Truck
} from 'lucide-react';
import Link from 'next/link';

type Tab = 'CAPACITY' | 'CRITICAL' | 'THEATRE' | 'ASSETS';

export default function InfrastructureConsole() {
    const [activeTab, setActiveTab] = useState<Tab>('CAPACITY');
    const [disasterMode, setDisasterMode] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => setLoading(false), 800);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center">
                <div className="w-16 h-16 border-4 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-6 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Booting Infrastructure Core...</p>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${disasterMode ? 'bg-[#1A0A0A]' : 'bg-[#F8FAFC]'} transition-colors duration-1000`}>
            {/* Command Header */}
            <header className={`fixed top-0 w-full z-50 border-b border-white/5 backdrop-blur-3xl ${disasterMode ? 'bg-red-950/20' : 'bg-slate-900/10'}`}>
                <div className="max-w-[1700px] mx-auto px-10 h-24 flex items-center justify-between">
                    <div className="flex items-center space-x-8">
                        <Link href="/hospital-admin/dashboard" className="flex items-center space-x-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-2xl ${disasterMode ? 'bg-red-600' : 'bg-slate-900'}`}>I</div>
                            <div className="flex flex-col">
                                <span className={`text-xl font-black tracking-tight ${disasterMode ? 'text-red-100' : 'text-slate-900'}`}>Node Infrastructure Hub</span>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mt-1">Apollo Indraprastha Node-62</span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-12">
                        <div className="flex bg-slate-950/5 p-1 rounded-2xl border border-white/10">
                            <TabTrigger label="Beds & Wards" active={activeTab === 'CAPACITY'} onClick={() => setActiveTab('CAPACITY')} icon={<Box className="w-4 h-4" />} />
                            <TabTrigger label="ICU & Telemetry" active={activeTab === 'CRITICAL'} onClick={() => setActiveTab('CRITICAL')} icon={<Activity className="w-4 h-4" />} />
                            <TabTrigger label="OT Hub" active={activeTab === 'THEATRE'} onClick={() => setActiveTab('THEATRE')} icon={<Wind className="w-4 h-4" />} />
                            <TabTrigger label="Resources" active={activeTab === 'ASSETS'} onClick={() => setActiveTab('ASSETS')} icon={<HardDrive className="w-4 h-4" />} />
                        </div>

                        <div className="h-10 w-px bg-slate-200/20"></div>

                        <button
                            onClick={() => setDisasterMode(!disasterMode)}
                            className={`flex items-center space-x-4 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${disasterMode ? 'bg-red-600 text-white animate-pulse' : 'bg-slate-900 text-white hover:bg-red-600'}`}
                        >
                            <Flame className="w-4 h-4" />
                            <span>{disasterMode ? 'EXIT EMERGENCY MODE' : 'DISASTER OVERRIDE'}</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="pt-36 pb-40 px-10 max-w-[1700px] mx-auto">
                <div className="flex justify-between items-end mb-16 px-4">
                    <div>
                        <h2 className={`text-5xl font-[900] tracking-tighter italic leading-none mb-4 ${disasterMode ? 'text-white' : 'text-slate-900'}`}>
                            {activeTab === 'CAPACITY' ? 'National Bed Inventory' :
                                activeTab === 'CRITICAL' ? 'Live ICU Telemetry' :
                                    activeTab === 'THEATRE' ? 'Operation Command' : 'Global Asset Vault'}
                        </h2>
                        <div className="flex items-center space-x-6">
                            <p className="text-xl font-medium text-slate-500 tracking-tight italic">Apollo Indraprastha • Integrated Command Console v4.2</p>
                            {disasterMode && (
                                <span className="px-4 py-1.5 bg-red-600/10 border border-red-500/20 rounded-full text-[10px] font-black uppercase text-red-500 animate-pulse">Emergency Directives Active</span>
                            )}
                        </div>
                    </div>
                    <div className="flex space-x-6">
                        <div className={`p-6 bg-white rounded-3xl border border-slate-100 shadow-sm flex items-center space-x-6 ${disasterMode ? 'opacity-20 pointer-events-none' : ''}`}>
                            <div className="text-right">
                                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Capacity</span>
                                <span className="text-2xl font-black text-slate-900">1,402 Beds</span>
                            </div>
                            <div className="w-px h-10 bg-slate-100"></div>
                            <div className="text-right">
                                <span className="block text-[8px] font-black text-emerald-500 uppercase tracking-widest mb-1">Available Units</span>
                                <span className="text-2xl font-black text-emerald-600">241</span>
                            </div>
                        </div>
                    </div>
                </div>

                {activeTab === 'CAPACITY' && <BedSection disasterMode={disasterMode} />}
                {activeTab === 'CRITICAL' && <ICUSection disasterMode={disasterMode} />}
                {activeTab === 'THEATRE' && <OTSection disasterMode={disasterMode} />}
                {activeTab === 'ASSETS' && <AssetSection disasterMode={disasterMode} />}
            </main>
        </div>
    );
}

function TabTrigger({ label, active, onClick, icon }: any) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center space-x-3 px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${active ? 'bg-white text-slate-900 shadow-xl scale-105' : 'text-slate-500 hover:text-slate-900'}`}
        >
            {icon}
            <span>{label}</span>
        </button>
    );
}

{/* --- BED MANAGEMENT SECTION --- */ }
function BedSection({ disasterMode }: { disasterMode: boolean }) {
    const wards = [
        { name: 'ICU TIER-1', total: 40, occupied: 38, type: 'CRITICAL', color: 'rose' },
        { name: 'GENERAL WARD A', total: 120, occupied: 104, type: 'ROUTINE', color: 'blue' },
        { name: 'GENERAL WARD B', total: 120, occupied: 92, type: 'ROUTINE', color: 'blue' },
        { name: 'CARDIO CARE', total: 30, occupied: 12, type: 'SPECIALTY', color: 'indigo' },
        { name: 'ISOLATION NODE', total: 24, occupied: 8, type: 'EMERGENCY', color: 'amber' },
        { name: 'NICU CORE', total: 15, occupied: 14, type: 'CRITICAL', color: 'rose' },
    ];

    return (
        <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
                <div className={`rounded-[4rem] p-12 border transition-all ${disasterMode ? 'bg-[#2A0F0F] border-red-900/40 text-white' : 'bg-white border-slate-100 shadow-sm text-slate-900'}`}>
                    <div className="flex items-center justify-between mb-16">
                        <h3 className="text-2xl font-black tracking-tight italic">Interactive Bed Matrix</h3>
                        <div className="flex bg-slate-950/10 p-1.5 rounded-2xl border border-white/5">
                            <button className="px-6 py-2.5 rounded-xl bg-white text-slate-900 shadow-sm text-[10px] font-black uppercase">Grid View</button>
                            <button className="px-6 py-2.5 rounded-xl text-slate-500 text-[10px] font-black uppercase">List View</button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                        {wards.map((ward, i) => (
                            <div key={i} className={`p-8 rounded-[3rem] border transition-all group cursor-pointer hover:scale-[1.02] ${disasterMode ? 'bg-white/5 border-white/5 hover:border-red-500/40' : 'bg-slate-50 border-slate-100 hover:border-blue-500/20 shadow-sm hover:shadow-2xl'}`}>
                                <div className="flex justify-between items-start mb-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xs ${ward.color === 'rose' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                        {ward.name[0]}
                                    </div>
                                    <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${disasterMode ? 'bg-white/10 text-white/40' : 'bg-white text-slate-400 border border-slate-100'}`}>
                                        {ward.type}
                                    </span>
                                </div>
                                <h4 className="text-lg font-black tracking-tight mb-2 group-hover:text-blue-500 transition-colors">{ward.name}</h4>
                                <div className="flex items-end justify-between">
                                    <div className="text-3xl font-black tabular-nums">{ward.total - ward.occupied}</div>
                                    <div className="text-right">
                                        <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest">Available</span>
                                        <span className="text-[10px] font-bold text-slate-300">Total {ward.total}</span>
                                    </div>
                                </div>
                                <div className="mt-8 h-1.5 bg-slate-950/10 rounded-full overflow-hidden">
                                    <div className={`h-full transition-all duration-1000 ${ward.color === 'rose' ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.4)]' : 'bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]'}`} style={{ width: `${(ward.occupied / ward.total) * 100}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
                <div className={`rounded-[3.5rem] p-12 transition-all ${disasterMode ? 'bg-red-600 text-white animate-alert' : 'bg-slate-900 text-white'}`}>
                    <div className="flex items-center space-x-4 mb-12">
                        <AlertTriangle className="w-8 h-8 animate-bounce" />
                        <h4 className="text-xl font-black tracking-tighter uppercase italic">Emergency Directive</h4>
                    </div>
                    <p className="text-sm font-bold opacity-80 leading-relaxed mb-12">
                        {disasterMode ? 'SYSTEM RED: Redirecting all non-critical staff to Emergency Isolation Node. Routine consultations locked.' : 'System Normal: Monitoring regional load clusters. Current occupancy within institutional thresholds.'}
                    </p>
                    <div className="space-y-6">
                        <div className="flex justify-between items-center py-4 border-b border-white/10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Oxygen Reserve</span>
                            <span className="text-xs font-black">94% (Stable)</span>
                        </div>
                        <div className="flex justify-between items-center py-4 border-b border-white/10">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Plasma Unit Lock</span>
                            <span className="text-xs font-black">VERIFIED</span>
                        </div>
                    </div>
                </div>

                <div className={`rounded-[3.5rem] p-10 border transition-all ${disasterMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <h4 className={`text-xs font-black uppercase tracking-[0.2em] mb-8 ${disasterMode ? 'text-white/40' : 'text-slate-400'}`}>Ward Efficiency</h4>
                    <div className="space-y-10">
                        <EfficiencyMetric label="Avg Stay Duration" value="4.2d" trend="STABLE" />
                        <EfficiencyMetric label="Nurse:Patient" value="1:4" trend="OPTIMAL" />
                        <EfficiencyMetric label="Sterile Status" value="98%" trend="ACTIVE" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function EfficiencyMetric({ label, value, trend }: any) {
    return (
        <div className="flex items-center justify-between">
            <div>
                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{label}</span>
                <span className="text-xl font-black italic">{value}</span>
            </div>
            <div className="text-[9px] font-black text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-full uppercase tracking-widest italic">{trend}</div>
        </div>
    );
}

{/* --- ICU SECTION --- */ }
function ICUSection({ disasterMode }: { disasterMode: boolean }) {
    const devices = [
        { id: 'V-101', name: 'Ventilator Core-X', status: 'ACTIVE', patient: 'HID-9012', o2: 98, hr: 72, temp: '36.8°C' },
        { id: 'V-102', name: 'Ventilator Core-X', status: 'STANDBY', patient: 'None', o2: 100, hr: 0, temp: '--' },
        { id: 'D-502', name: 'Dialysis Node P-4', status: 'ACTIVE', patient: 'HID-3341', o2: 96, hr: 84, temp: '37.1°C' },
        { id: 'E-901', name: 'ECMO Strategic Hub', status: 'OFFLINE', patient: 'None', o2: 0, hr: 0, temp: '--', warning: 'Maintenance Required' },
    ];

    return (
        <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-12 space-y-12">
                <div className={`rounded-[4rem] p-16 border transition-all ${disasterMode ? 'bg-[#2A0F0F] border-red-900/40' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className="flex items-center justify-between mb-16">
                        <div>
                            <h3 className={`text-3xl font-black tracking-tighter italic italic ${disasterMode ? 'text-white' : 'text-slate-900'}`}>Node Critical Device Stream</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em] mt-2">Live IoT Telemetry • NHA Command Certified</p>
                        </div>
                        <div className="px-10 py-5 bg-blue-600 rounded-[2rem] text-white text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-blue-500/40 active:scale-95 cursor-pointer">Sync Network Assets</div>
                    </div>

                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
                        {devices.map((device, i) => (
                            <div key={i} className={`p-10 rounded-[3.5rem] border transition-all relative overflow-hidden group ${device.status === 'OFFLINE' ? 'bg-slate-50 border-slate-100 opacity-60' : disasterMode ? 'bg-white/5 border-white/5 hover:border-red-500/40' : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-blue-500/20 shadow-sm hover:shadow-2xl'}`}>
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{device.id}</span>
                                        <h4 className={`text-lg font-[900] tracking-tight group-hover:text-blue-500 transition-colors ${disasterMode && device.status !== 'OFFLINE' ? 'text-white' : ''}`}>{device.name}</h4>
                                    </div>
                                    <div className={`w-3 h-3 rounded-full ${device.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse' : device.status === 'STANDBY' ? 'bg-blue-500' : 'bg-slate-300'}`}></div>
                                </div>

                                {device.status === 'OFFLINE' ? (
                                    <div className="py-8 text-center bg-slate-100 rounded-[2rem]">
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{device.warning}</p>
                                    </div>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="flex justify-between items-end border-b border-slate-950/5 pb-6">
                                            <div className="text-4xl font-black tabular-nums italic text-rose-500">{device.o2}%</div>
                                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">SPO2 Flow</span>
                                        </div>
                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Pulse</span>
                                                <span className={`text-lg font-black ${disasterMode ? 'text-white' : 'text-slate-900'}`}>{device.hr} BPM</span>
                                            </div>
                                            <div>
                                                <span className="block text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Patient</span>
                                                <span className="text-[10px] font-black text-blue-500">{device.patient}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

{/* --- OT SECTION --- */ }
function OTSection({ disasterMode }: { disasterMode: boolean }) {
    const theatres = [
        { id: 'OT-01', type: 'Neuro/Specialized', doctor: 'Dr. Vikram Seth', Case: 'Craniotomy', status: 'ACTIVE', checklist: 8 },
        { id: 'OT-02', type: 'Cardiac Care', doctor: 'Dr. Anjali Rao', Case: 'Bypass Sync', status: 'PREPPING', checklist: 4 },
        { id: 'OT-03', type: 'Emergency Trauma', doctor: 'Dr. Karan Singh', Case: 'Stabilization', status: 'EMERGENCY', checklist: 10 },
        { id: 'OT-04', type: 'General Surgery', doctor: 'Ready for Assign', Case: 'None', status: 'FREE', checklist: 0 },
    ];

    return (
        <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-12">
                <div className={`rounded-[4rem] border p-16 transition-all ${disasterMode ? 'bg-[#2A0F0F] border-red-900/40' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <h3 className={`text-3xl font-[900] tracking-tighter italic mb-16 ${disasterMode ? 'text-white' : 'text-slate-900'}`}>Theatre Command Console</h3>
                    <div className="space-y-6">
                        {theatres.map((ot, i) => (
                            <div key={i} className={`flex items-center justify-between p-10 rounded-[3rem] border transition-all cursor-pointer group ${ot.status === 'EMERGENCY' ? 'bg-red-600 text-white shadow-2xl' : disasterMode ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100 hover:bg-white hover:border-blue-500/20 hover:shadow-2xl'}`}>
                                <div className="flex items-center space-x-12 flex-1">
                                    <div className={`w-20 h-20 rounded-[2.2rem] flex items-center justify-center font-black text-lg italic ${ot.status === 'EMERGENCY' ? 'bg-white/20' : 'bg-slate-900 text-white'}`}>
                                        {ot.id.split('-')[1]}
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-4 mb-2">
                                            <h4 className="text-2xl font-black italic tracking-tighter uppercase">{ot.type}</h4>
                                            <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${ot.status === 'FREE' ? 'bg-emerald-500 text-white' : 'bg-white/10'}`}>{ot.status}</span>
                                        </div>
                                        <div className={`flex space-x-8 text-[10px] font-bold uppercase tracking-widest italic ${ot.status === 'EMERGENCY' ? 'text-red-100' : 'text-slate-400'}`}>
                                            <span>Staff: {ot.doctor}</span>
                                            <span>Case ID: {ot.Case}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-12">
                                    <div className="text-right">
                                        <span className={`block text-[8px] font-black uppercase tracking-widest mb-1 ${ot.status === 'EMERGENCY' ? 'text-red-200' : 'text-slate-300'}`}>CHECKLIST</span>
                                        <span className="text-2xl font-black italic">{ot.checklist}/10</span>
                                    </div>
                                    <button className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${ot.status === 'EMERGENCY' ? 'bg-white text-red-600' : 'bg-slate-900 text-white'}`}>
                                        <ArrowUpRight className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
                <div className={`rounded-[3.5rem] p-12 border transition-all ${disasterMode ? 'bg-white/5 border-white/5' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <h4 className={`text-xs font-black uppercase tracking-[0.3em] mb-12 italic ${disasterMode ? 'text-white/40' : 'text-slate-400'}`}>OT Safety Sync</h4>
                    <div className="space-y-8">
                        <SafetyCheckpoint icon={<Zap />} label="Stabilizer Node-4" status="OPTIMAL" />
                        <SafetyCheckpoint icon={<ShieldCheck />} label="NHA Consent Verifier" status="PASSED" />
                        <SafetyCheckpoint icon={<ClipboardCheck />} label="Equipment Sterile Chain" status="CERTIFIED" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SafetyCheckpoint({ icon, label, status }: any) {
    return (
        <div className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl border border-slate-50">
            <div className="flex items-center space-x-4">
                <div className="text-blue-500">{React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' } as any)}</div>
                <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{label}</span>
            </div>
            <span className="text-[9px] font-black text-emerald-500">{status}</span>
        </div>
    );
}

{/* --- ASSET SECTION --- */ }
function AssetSection({ disasterMode }: { disasterMode: boolean }) {
    return (
        <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm">
                <div className="flex items-center justify-between mb-16">
                    <h3 className="text-3xl font-[900] tracking-tighter italic italic">Infrastructure Inventory</h3>
                    <div className="flex space-x-6">
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                            <input type="text" placeholder="Filter national assets..." className="w-80 bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-16 pr-6 outline-none font-bold text-xs focus:ring-2 focus:ring-blue-500/20" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                    <AssetGridItem icon={<Wind />} label="Oxygen Main Tank" serial="OX-7712" stock="94%" color="blue" />
                    <AssetGridItem icon={<Droplets />} label="Critical Fluid Reserve" serial="BL-9011" stock="LOW" color="rose" />
                    <AssetGridItem icon={<HardDrive />} label="MRI Scanner (Node-A)" serial="MR-0012" status="OPERATIONAL" color="emerald" />
                    <AssetGridItem icon={<Activity />} label="Defibrillator Units" serial="DF-1212" stock="14/15" color="indigo" />
                    <AssetGridItem icon={<Truck />} label="Ambulance Node" serial="AM-04" status="IN-TRANSIT" color="amber" />
                </div>
            </div>

            <div className="lg:col-span-4 space-y-12">
                <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
                    <h4 className="text-sm font-black text-blue-500 uppercase tracking-[0.4em] mb-12 italic">Quick Audit</h4>
                    <div className="space-y-6">
                        <AuditLogItem date="22 JAN 2026" action="Fire Safety Verified" status="NABH" />
                        <AuditLogItem date="18 JAN 2026" action="Asset Calibration" status="ISO-14" />
                        <AuditLogItem date="12 JAN 2026" action="Biomedical Waste Log" status="SYNCED" />
                    </div>
                    <button className="w-full mt-12 py-6 bg-white/5 border border-white/10 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">Download Full Audit Pass</button>
                </div>
            </div>
        </div>
    );
}

function AssetGridItem({ icon, label, serial, stock, status, color }: any) {
    return (
        <div className="p-10 bg-slate-50 border border-slate-100 rounded-[3rem] group hover:bg-white hover:border-blue-500/20 hover:shadow-2xl transition-all duration-700 cursor-pointer">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${color === 'rose' ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'}`}>
                {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' } as any)}
            </div>
            <h5 className="text-lg font-black tracking-tight mb-2 group-hover:text-blue-600 transition-colors leading-none">{label}</h5>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-10">{serial}</p>
            <div className="flex items-end justify-between">
                <span className="text-2xl font-black italic italic">{stock || status}</span>
                <ChevronRight className="w-6 h-6 text-slate-200 group-hover:text-blue-500 transition-all group-hover:translate-x-2" />
            </div>
        </div>
    );
}

function AuditLogItem({ date, action, status }: any) {
    return (
        <div className="flex flex-col border-b border-white/5 pb-6">
            <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">{date}</span>
                <span className="text-[9px] font-black text-blue-500 bg-blue-500/10 px-4 py-1.5 rounded-full uppercase tracking-widest">{status}</span>
            </div>
            <div className="font-bold text-sm tracking-tight">{action}</div>
        </div>
    );
}
