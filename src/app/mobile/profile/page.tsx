'use client';

import { useState, useEffect } from 'react';
import {
    User,
    Shield,
    Lock,
    Heart,
    ChevronRight,
    LogOut,
    Key,
    Globe,
    Eye,
    Smartphone,
    Languages,
    Mic
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function MobileProfile() {
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const res = await fetch('/api/user/profile');
                const data = await res.json();
                if (data.success) setProfile(data.data);
            } catch (e) {
                console.error(e);
            }
        }
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-10">
            {/* Header */}
            <div className="px-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Identity Node v2.1</span>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Profile & Privacy</h1>
            </div>

            {/* Profile Glance */}
            <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-center space-x-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full blur-2xl -mr-12 -mt-12 group-hover:bg-blue-100 transition-colors"></div>
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-slate-900 border-4 border-slate-50 overflow-hidden shadow-xl">
                    <img
                        src={profile?.patientProfile?.[0]?.profilePhotoUrl || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                        className="w-full h-full object-cover"
                    />
                </div>
                <div className="relative z-10">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">{profile?.fullName || 'Citizen'}</h2>
                    <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest border border-blue-100 bg-blue-50 px-3 py-1 rounded-full mt-2 inline-block">
                        {profile?.role || 'Patient'} Tier
                    </p>
                </div>
            </div>

            {/* Inclusivity & Accessibility Section */}
            <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-[10px] uppercase tracking-[0.2em] px-2">Accessibility</h3>
                <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50 overflow-hidden shadow-sm">
                    <ProfileItem icon={Languages} label="Regional Language" value="English (Default)" />
                    <ProfileItem icon={Mic} label="Voice Commander" value="Inactive" />
                    <ProfileItem icon={Globe} label="Large Text Mode" value="Off" />
                </div>
            </div>

            {/* Security & Privacy Section */}
            <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-[10px] uppercase tracking-[0.2em] px-2">Privacy Control</h3>
                <div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-50 overflow-hidden shadow-sm">
                    <ProfileItem icon={Eye} label="Consent Management" value="3 Active" />
                    <ProfileItem icon={Lock} label="Emergency Data Unlock" value="Locked" toggle />
                    <ProfileItem icon={Smartphone} label="Manage Devices" value="1 Device" />
                    <ProfileItem icon={Key} label="Secure Enclave" value="Verified" />
                </div>
            </div>

            {/* Health Donor Status */}
            <div className="bg-rose-600 rounded-2xl p-6 text-white shadow-xl shadow-rose-200 group">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-2">
                        <Heart className="w-5 h-5 text-rose-200 fill-rose-200 group-hover:scale-125 transition-transform" />
                        <h3 className="text-sm font-bold tracking-tight">Organ Donor Registry</h3>
                    </div>
                    <span className="text-[8px] font-bold uppercase tracking-widest bg-white/10 px-2 py-1 rounded border border-white/20">Official Digitized</span>
                </div>
                <p className="text-xs text-rose-50 font-medium leading-relaxed opacity-90 mb-6">
                    Join the national registry. One donor can save up to 8 lives. Your status is pinned to your Health ID.
                </p>
                <button className="w-full bg-white text-rose-600 py-3 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-rose-50 transition-colors">
                    Register as Donor
                </button>
            </div>

            {/* Logout Action */}
            <button
                onClick={handleLogout}
                className="w-full py-4 text-red-500 font-bold text-[10px] uppercase tracking-[0.3em] flex items-center justify-center space-x-3 bg-red-50 rounded-2xl border border-red-100 hover:bg-red-500 hover:text-white transition-all shadow-sm"
            >
                <LogOut className="w-4 h-4" />
                <span>Terminate Session</span>
            </button>

            <div className="text-center">
                <p className="text-[8px] font-bold text-slate-300 uppercase tracking-widest">App Build v24.0.122 • National AI Unit</p>
            </div>
        </div>
    );
}

function ProfileItem({ icon: Icon, label, value, toggle }: any) {
    return (
        <div className="flex items-center justify-between p-4 px-5 hover:bg-slate-50 transition-colors cursor-pointer group">
            <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 group-hover:bg-white transition-colors">
                    <Icon className="w-5 h-5 text-slate-500" />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-slate-900 tracking-tight">{label}</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{value}</p>
                </div>
            </div>
            {toggle ? (
                <div className="w-10 h-6 bg-slate-200 rounded-full relative p-1 transition-colors group-hover:bg-blue-200">
                    <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
            ) : (
                <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-transform group-hover:translate-x-1" />
            )}
        </div>
    );
}
