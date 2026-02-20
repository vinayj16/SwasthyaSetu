'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function PatientProfilePage() {
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        async function loadProfile() {
            try {
                const res = await fetch('/api/user/profile');
                const data = await res.json();
                if (data.success) setProfile(data.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);

    const changePhoto = async () => {
        const newUrl = prompt('Enter premium image URL:');
        if (!newUrl) return;

        setUpdating(true);
        try {
            const res = await fetch('/api/patient/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ profilePhotoUrl: newUrl })
            });
            if (res.ok) {
                setProfile((prev: any) => ({
                    ...prev,
                    patientProfile: { ...prev.patientProfile, profilePhotoUrl: newUrl }
                }));
            }
        } catch (e) {
            alert('Network error');
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="min-h-screen flex items-center justify-center font-black tracking-tighter text-3xl animate-pulse">Decrypting Identity...</div>;

    const p = profile?.patientProfile;

    return (
        <div className="min-h-screen bg-[#F8FAFC] py-32 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Identity Card */}
                    <div className="lg:w-[400px]">
                        <div className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-30 -mr-20 -mt-20"></div>

                            <div className="relative z-10 text-center">
                                <div className="relative inline-block mb-10 group">
                                    <div className="w-48 h-48 rounded-[3rem] bg-white/10 p-2 overflow-hidden border border-white/20 transform group-hover:rotate-3 transition duration-500">
                                        <img
                                            src={p?.profilePhotoUrl || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                                            className="w-full h-full object-cover rounded-[2.5rem]"
                                        />
                                    </div>
                                    <button
                                        onClick={changePhoto}
                                        className="absolute -bottom-4 -right-4 bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl hover:bg-blue-500 transition active:scale-95 text-xl"
                                    >
                                        {updating ? '..' : '📸'}
                                    </button>
                                </div>

                                <h2 className="text-3xl font-black mb-2 tracking-tight">{profile.fullName}</h2>
                                <div className="flex items-center justify-center space-x-2 bg-blue-500/10 border border-blue-500/20 py-2 px-4 rounded-xl mb-12">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></span>
                                    <span className="text-[10px] uppercase font-black tracking-[0.2em] text-blue-300">Universal Health Pass</span>
                                </div>

                                <div className="space-y-6 text-left">
                                    <div className="grid grid-cols-2 gap-4">
                                        <IdentityStat label="Blood Group" value={p?.bloodGroup || 'O+'} />
                                        <IdentityStat label="ID Number" value={p?.healthId?.split('-').pop() || '0000'} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 bg-orange-50 rounded-[2.5rem] p-8 border border-orange-100">
                            <span className="text-[10px] font-black uppercase tracking-widest text-orange-600 block mb-3">Immutability Protocol</span>
                            <p className="text-orange-900/60 text-xs font-bold leading-relaxed">Identity fields are locked to the National Registry. Edits require physical verification at authorized hospitals.</p>
                        </div>
                    </div>

                    {/* Details & Records */}
                    <div className="flex-1">
                        <div className="bg-white rounded-[4rem] p-16 shadow-xl shadow-slate-200/50 border border-slate-50 relative overflow-hidden">
                            <h3 className="text-4xl font-black text-slate-900 mb-12 flex items-center tracking-tight">
                                Demographic Data
                            </h3>

                            <div className="grid md:grid-cols-2 gap-12 mb-16">
                                <ProfileField label="Full Legal Name" value={profile.fullName} />
                                <ProfileField label="Contact Identifier" value={profile.phone || 'No Mobile Assigned'} />
                                <ProfileField label="Health Registry Email" value={profile.email} />
                                <ProfileField label="Current Age / Gender" value={`${p?.age || '24'} Years / ${p?.gender || 'Male'}`} />
                                <ProfileField label="Registered Address" value={p?.address || 'Not available in local cache'} span />
                            </div>

                            <div className="pt-12 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                                <Link href="/patient/medical-records" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-[15px] flex items-center justify-center space-x-4 hover:shadow-2xl transition active:scale-95">
                                    <span>📂 View Medical Vault</span>
                                </Link>
                                <Link href="/patient/dashboard" className="bg-slate-100 text-slate-900 px-10 py-5 rounded-2xl font-black text-[15px] flex items-center justify-center hover:bg-slate-200 transition">
                                    Home
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function IdentityStat({ label, value }: any) {
    return (
        <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
            <span className="block text-[10px] font-black uppercase opacity-40 mb-1">{label}</span>
            <span className="text-xl font-black">{value}</span>
        </div>
    );
}

function ProfileField({ label, value, span }: any) {
    return (
        <div className={span ? 'md:col-span-2' : ''}>
            <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">{label}</label>
            <div className="bg-slate-50 border border-slate-100 rounded-2xl px-8 py-5 text-xl font-extrabold text-slate-900">
                {value}
            </div>
        </div>
    );
}
