'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    QrCode,
    Calendar,
    MapPin,
    AlertTriangle,
    Droplet,
    Zap,
    ArrowRight,
    Search,
    ChevronRight,
    Activity,
    Clock,
    Heart,
    Brain,
    Globe
} from 'lucide-react';

export default function MobileHome() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch('/api/user/profile');
                const data = await res.json();
                if (data.success) {
                    const user = data.data;
                    setProfile({
                        ...user,
                        patientProfile: user.patientProfile?.[0] || null
                    });
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    const actions = [
        { icon: Calendar, label: 'Book Appointment', desc: 'Secure slot', color: 'bg-blue-500', href: '/mobile/appointments' },
        { icon: Brain, label: 'AI Risk Scan', desc: 'Check health odds', color: 'bg-indigo-600', href: '/patient/dashboard' },
        { icon: Globe, label: 'Disease Map', desc: 'Regional outbreaks', color: 'bg-emerald-600', href: '/ai-intelligence' },
        { icon: AlertTriangle, label: 'Emergency SOS', desc: 'Direct EMS link', color: 'bg-red-500', href: '/mobile/emergency' },
    ];

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* Greeting */}
            <div className="px-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-[0.2em]">National Digital Health Node</span>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                    Namaste, {profile?.fullName?.split(' ')[0] || 'Citizen'} 👋
                </h1>
                <p className="text-sm text-slate-500 font-medium">Your health grid is synchronized.</p>
            </div>

            {/* Health ID Quick Card */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white relative overflow-hidden shadow-xl shadow-slate-200">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <div className="relative z-10 flex justify-between items-center">
                    <div className="space-y-4">
                        <div>
                            <span className="text-[8px] font-bold uppercase tracking-widest opacity-50 block">Health ID Card</span>
                            <span className="text-lg font-bold tracking-tight font-mono">{profile?.patientProfile?.healthId || 'HID-PENDING'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-[10px] font-bold bg-white/10 px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">E-KYC Verified</span>
                        </div>
                    </div>
                    <div className="bg-white p-2 rounded-xl">
                        <QrCode className="w-12 h-12 text-slate-900" />
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-2 gap-4">
                {actions.map((action) => (
                    <Link
                        key={action.label}
                        href={action.href}
                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all active:scale-95 group"
                    >
                        <div className={`w-12 h-12 ${action.color} rounded-xl flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                            <action.icon className="w-6 h-6" />
                        </div>
                        <h3 className="font-bold text-slate-800 text-sm tracking-tight">{action.label}</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{action.desc}</p>
                    </Link>
                ))}
            </div>

            {/* AI Health Tip */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start space-x-4">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-blue-200">
                    <Zap className="w-5 h-5 text-white animate-pulse" />
                </div>
                <div>
                    <h4 className="text-sm font-bold text-blue-900">AI Wellness Insight</h4>
                    <p className="text-xs text-blue-700 font-medium leading-relaxed mt-1">
                        Your heart rate variability index is optimal. Engaging in a 10-minute mindfulness session could boost focus by 20%.
                    </p>
                </div>
            </div>

            {/* Recent Vitals */}
            <div className="space-y-3">
                <div className="flex items-center justify-between px-2">
                    <h3 className="font-bold text-slate-800 text-sm uppercase tracking-widest">Recent Vitals</h3>
                    <Link href="/mobile/records" className="text-[10px] font-bold text-blue-600 uppercase tracking-widest flex items-center">
                        View More <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                </div>
                <div className="flex space-x-4 overflow-x-auto pb-4 no-scrollbar">
                    <VitalCard icon={Heart} label="BPM" value="72" trend="stable" color="text-rose-500" />
                    <VitalCard icon={Activity} label="SpO2" value="98%" trend="normal" color="text-blue-500" />
                    <VitalCard icon={Clock} label="Sleep" value="7.5h" trend="improving" color="text-indigo-500" />
                </div>
            </div>
        </div>
    );
}

function VitalCard({ icon: Icon, label, value, trend, color }: any) {
    return (
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm min-w-[120px] flex flex-col items-center">
            <Icon className={`w-5 h-5 ${color} mb-2`} />
            <span className="text-xl font-bold text-slate-900 tracking-tight">{value}</span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
            <div className="mt-2 text-[8px] font-bold bg-slate-50 px-2 py-0.5 rounded-full border border-slate-100 uppercase text-slate-500">
                {trend}
            </div>
        </div>
    );
}
