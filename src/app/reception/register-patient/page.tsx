'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    ShieldCheck,
    Smartphone,
    CreditCard,
    User,
    ChevronRight,
    Search,
    Sparkles,
    CheckCircle2,
    Calendar,
    Phone,
    MapPin,
    Activity,
    AlertCircle,
    UserPlus,
    Contact,
    Plus
} from 'lucide-react';

export default function RegisterPatient() {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const [formData, setFormData] = useState({
        uhid: '',
        name: '',
        age: '',
        gender: '',
        phone: '',
        address: '',
        bloodGroup: '',
        emergencyContact: ''
    });

    const handleSearchUHID = async () => {
        if (!formData.uhid) return;
        setLoading(true);
        try {
            const res = await fetch('/api/auth/verify-aadhaar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aadhaarNumber: formData.uhid }),
            });
            const data = await res.json();
            if (data.success) {
                setFormData({
                    ...formData,
                    name: 'Vikram Singh', // In real world, this would come from the verified Aadhaar data
                    age: '32',
                    gender: 'MALE',
                    phone: '+91 9876543210',
                });
                setStep(2);
            } else {
                alert(data.message || 'National Grid lookup failed');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/reception/register-patient', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    fullName: formData.name,
                    email: `${formData.name.toLowerCase().replace(' ', '.')}@example.com`,
                    password: 'Password@123',
                    aadhaarNumber: formData.uhid,
                    dob: new Date(new Date().getFullYear() - parseInt(formData.age), 0, 1).toISOString(),
                    gender: formData.gender,
                    bloodGroup: formData.bloodGroup,
                    address: formData.address,
                    emergencyContact: formData.emergencyContact
                }),
            });
            const data = await res.json();
            if (data.success) {
                setStep(3);
            } else {
                alert(data.message || 'Registration failed');
            }
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-blue-600/10 overflow-hidden">
            {/* National Command Header */}
            <nav className="fixed top-0 w-full z-50 px-12 h-24 flex items-center justify-between border-b border-slate-100 bg-white/80 backdrop-blur-xl">
                <button
                    onClick={() => router.back()}
                    className="flex items-center space-x-4 text-slate-400 hover:text-slate-900 transition-all font-black"
                >
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100">
                        <ArrowLeft className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] italic">Back to Command Hub</span>
                </button>
                <div className="flex items-center space-x-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-[950] text-slate-900 leading-none tracking-tighter italic uppercase">Identity Issuance Unit</h2>
                        <span className="text-[9px] text-blue-600 font-[950] uppercase tracking-[0.3em] mt-2 block">SECURE_VERIFICATION_ACTIVE</span>
                    </div>
                </div>
            </nav>

            <main className="pt-24 min-h-screen flex items-center justify-center relative">
                {/* Background Aesthetics */}
                <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[200px] -mr-[500px] -mt-[500px]"></div>
                <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-600/5 rounded-full blur-[150px] -ml-[400px] -mb-[400px]"></div>

                <div className="max-w-7xl w-full px-10 grid lg:grid-cols-12 gap-24 relative z-10">

                    {/* Left: Progress Sidebar */}
                    <div className="lg:col-span-4 space-y-12 py-12 animate-slide-up">
                        <div className="space-y-8">
                            <h1 className="text-7xl font-[950] text-slate-950 tracking-tighter leading-none italic uppercase">Register <br /> <span className="text-blue-600">Patient.</span></h1>
                            <p className="text-2xl text-slate-400 font-bold italic leading-relaxed">Fetch identities from the National Grid or create a local node profile with high-density data verification.</p>
                        </div>

                        <div className="space-y-6 pt-12">
                            <StepIndicator active={step >= 1} current={step === 1} number="01" label="ID VERIFICATION" sub="Query National Grid via UHID" />
                            <StepIndicator active={step >= 2} current={step === 2} number="02" label="CLINICAL VETTING" sub="Validate Vital Parameters" />
                            <StepIndicator active={step >= 3} current={step === 3} number="03" label="NODE LINKAGE" sub="Finalize Admission Protocol" />
                        </div>

                        <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl mt-12 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-bl-full"></div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 mb-6">Security Context</h4>
                            <p className="text-sm font-bold opacity-70 leading-relaxed italic">"All clinical transmissions are AES-256 encrypted and synced with NHA directives for citizen data sovereignty."</p>
                        </div>
                    </div>

                    {/* Right: Functional Workspace */}
                    <div className="lg:col-span-8 bg-white/50 backdrop-blur-3xl rounded-[5rem] p-16 border border-slate-100 shadow-[0_80px_150px_-30px_rgba(0,0,0,0.08)] animate-scale-in relative">

                        {step === 1 && (
                            <div className="space-y-16 animate-slide-up">
                                <div className="space-y-6">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em] ml-2 italic">Search National Repository</label>
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            value={formData.uhid}
                                            onChange={(e) => setFormData({ ...formData, uhid: e.target.value })}
                                            placeholder="ENTER 14-DIGIT UHID OR PHONE..."
                                            className="w-full bg-slate-50 border-2 border-slate-100/50 rounded-[2.5rem] py-10 px-12 outline-none focus:ring-8 focus:ring-blue-600/5 focus:bg-white focus:border-blue-600 transition-all font-[950] text-3xl tracking-tighter placeholder:text-slate-200 uppercase"
                                        />
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2">
                                            <div className="w-16 h-16 bg-slate-950 text-white rounded-[1.8rem] flex items-center justify-center shadow-xl">
                                                <Contact className="w-8 h-8" />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-slate-400 italic px-6 uppercase tracking-widest leading-relaxed">Identity retrieval allows zero-form-filling for verified citizens. Authenticate using centralized records.</p>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-10 pt-12">
                                    <button
                                        onClick={handleSearchUHID}
                                        disabled={loading}
                                        className="bg-blue-600 text-white py-8 rounded-[2.5rem] font-[950] uppercase text-[11px] tracking-[0.4em] shadow-2xl shadow-blue-500/30 hover:bg-slate-950 transition-all flex items-center justify-center space-x-6 active:scale-95 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <Search className="w-5 h-5" />
                                                <span>Search Grid</span>
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setStep(2)}
                                        className="bg-white border-2 border-slate-100 text-slate-900 py-8 rounded-[2.5rem] font-[950] uppercase text-[11px] tracking-[0.4em] hover:bg-slate-50 transition-all flex items-center justify-center space-x-6"
                                    >
                                        <Plus className="w-5 h-5 text-blue-600" />
                                        <span>Manual Entry</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-12 animate-slide-up">
                                <div className="flex items-center space-x-6 mb-8 text-emerald-600 p-8 bg-emerald-50 rounded-[3rem] border border-emerald-100">
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm">
                                        <CheckCircle2 className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-[950] tracking-tighter italic uppercase">Identity Verified.</h3>
                                        <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Citizen Profile Synced with Central Repository</p>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-12">
                                    <ValidatedField label="Full Name" value={formData.name} icon={<User className="w-4 h-4" />} />
                                    <ValidatedField label="UHID ID" value={formData.uhid || 'AUTO_SYNCED'} icon={<CreditCard className="w-4 h-4" />} />
                                    <ValidatedField label="Age / Gender" value={`${formData.age} / ${formData.gender}`} icon={<Calendar className="w-4 h-4" />} />
                                    <ValidatedField label="Primary Contact" value={formData.phone} icon={<Phone className="w-4 h-4" />} />
                                </div>

                                <div className="pt-12 flex items-center justify-between border-t border-slate-100">
                                    <button onClick={() => setStep(1)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 transition-colors italic underline underline-offset-8">Invalid Response? Re-Query</button>
                                    <button
                                        onClick={handleRegister}
                                        disabled={loading}
                                        className="bg-blue-600 text-white px-16 py-8 rounded-[2.5rem] font-[950] uppercase text-[11px] tracking-[0.4em] shadow-2xl hover:bg-slate-950 transition-all flex items-center space-x-6 active:scale-95 disabled:opacity-50"
                                    >
                                        {loading ? (
                                            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <span>Proceed Admission</span>
                                                <ChevronRight className="w-5 h-5" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === 3 && (
                            <div className="text-center py-20 animate-slide-up">
                                <div className="w-32 h-32 bg-emerald-500 text-white rounded-[3rem] flex items-center justify-center mx-auto mb-12 shadow-2xl shadow-emerald-500/30">
                                    <Sparkles className="w-16 h-16 animate-float" />
                                </div>
                                <h2 className="text-6xl font-[950] text-slate-950 tracking-tighter italic uppercase leading-tight mb-8">Node <br /> Synchronized.</h2>
                                <p className="text-2xl text-slate-400 font-bold max-w-lg mx-auto italic mb-16">The patient profile has been successfully ingested into the hospital command grid. Identity #AP-241-NK active.</p>
                                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                                    <button onClick={() => router.push('/reception/dashboard')} className="px-16 py-8 bg-slate-950 text-white rounded-[2.5rem] font-[950] text-[11px] uppercase tracking-[0.4em] shadow-2xl hover:scale-105 transition-all">Command Overview</button>
                                    <button onClick={() => setStep(1)} className="px-16 py-8 bg-white border border-slate-100 text-slate-950 rounded-[2.5rem] font-[950] text-[11px] uppercase tracking-[0.4em] hover:bg-slate-50 transition-all italic">New Registration</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

function StepIndicator({ active, current, number, label, sub }: any) {
    return (
        <div className={`flex items-start space-x-6 transition-all duration-500 ${active ? 'opacity-100 translate-x-4' : 'opacity-30'}`}>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border-2 font-black text-lg transition-all duration-500 ${current ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-500/20 rotate-12' : active ? 'bg-white border-blue-600 text-blue-600' : 'bg-slate-50 border-slate-200 text-slate-300'}`}>
                {number}
            </div>
            <div>
                <p className={`text-[10px] font-black uppercase tracking-[0.3em] mb-1 ${current ? 'text-blue-600' : 'text-slate-400'}`}>{label}</p>
                <p className="text-sm font-bold text-slate-300 uppercase italic tracking-widest">{sub}</p>
            </div>
        </div>
    );
}

function ValidatedField({ label, value, icon }: any) {
    return (
        <div className="space-y-4 group">
            <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] ml-6 group-hover:text-blue-500 transition-colors uppercase italic">{label}</span>
            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[2.5rem] flex items-center justify-between group-hover:bg-white group-hover:border-blue-100 group-hover:shadow-lg transition-all">
                <div className="flex items-center space-x-6">
                    <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-600 transition-colors">
                        {icon}
                    </div>
                    <span className="text-xl font-[950] text-slate-900 tracking-tighter italic uppercase">{value}</span>
                </div>
                <CheckCircle2 className="w-6 h-6 text-emerald-500 opacity-40" />
            </div>
        </div>
    );
}
