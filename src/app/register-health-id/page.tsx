'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ShieldCheck,
    ArrowRight,
    ArrowLeft,
    Fingerprint,
    Smartphone,
    CheckCircle2,
    Lock,
    Zap,
    Activity,
    Award,
    Globe,
    Database,
    QrCode
} from 'lucide-react';

export default function RegisterHealthIdPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        aadhaarNumber: '',
        otp: '',
        bloodGroup: '',
        emergencyContact: '',
    });
    const [txnId, setTxnId] = useState('');
    const [demoOTP, setDemoOTP] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [healthId, setHealthId] = useState('');

    const handleVerifyAadhaar = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/health-id/verify-aadhaar', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ aadhaarNumber: formData.aadhaarNumber }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Aadhaar verification failed');
                setLoading(false);
                return;
            }

            setTxnId(data.data.txnId);
            setDemoOTP(data.data._demoOTP || '');
            setTimeout(() => {
                setStep(2);
                setLoading(false);
            }, 800);
        } catch (err) {
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('/api/health-id/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    txnId,
                    otp: formData.otp,
                    bloodGroup: formData.bloodGroup,
                    emergencyContact: formData.emergencyContact,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'OTP verification failed');
                setLoading(false);
                return;
            }

            setHealthId(data.data.healthId);
            setTimeout(() => {
                setStep(3);
                setLoading(false);
            }, 1200);
        } catch (err) {
            setError('An error occurred. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-500/20">
            {/* Header */}
            <nav className="fixed top-0 w-full z-50 glass border-b border-slate-100/50">
                <div className="max-w-[1700px] mx-auto px-10 h-24 flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-slate-900 rounded-3xl flex items-center justify-center text-white font-black text-xl shadow-xl">S</div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black text-slate-900 tracking-tight leading-none">SwasthyaSetu Hub</span>
                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-1">National Registry Protocol</span>
                        </div>
                    </Link>

                    <div className="flex items-center space-x-6">
                        <div className="hidden lg:flex items-center space-x-3 px-6 py-2 bg-slate-50 border border-slate-100 rounded-2xl">
                            <Lock className="w-4 h-4 text-slate-400" />
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantum Encryption Active</span>
                        </div>
                        <Link href="/login" className="px-8 py-3.5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 transition shadow-xl">Existing ID Login</Link>
                    </div>
                </div>
            </nav>

            <main className="pt-48 pb-32 px-10 flex flex-col items-center">

                {/* Progress Visualizer */}
                <div className="w-full max-w-xl mb-24 grid grid-cols-3 gap-4">
                    <ProgressStep active={step === 1} completed={step > 1} label="Identity" sub="UIDAI Auth" />
                    <ProgressStep active={step === 2} completed={step > 2} label="Verification" sub="Mobile Sync" />
                    <ProgressStep active={step === 3} completed={step > 3} label="Issuance" sub="Registry Node" />
                </div>

                <div className="w-full max-w-2xl">
                    {step === 1 && (
                        <div className="bg-white rounded-[4rem] p-16 shadow-2xl shadow-blue-500/5 border border-slate-50 animate-in fade-in slide-in-from-bottom-5 duration-700">
                            <div className="flex items-center justify-between mb-16">
                                <div>
                                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4 italic">Registry Entry.</h2>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Authorized Aadhaar Initialization</p>
                                </div>
                                <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 transition-transform hover:rotate-12">
                                    <Fingerprint className="w-10 h-10" />
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-600 px-8 py-4 rounded-3xl font-bold text-sm mb-12 flex items-center">
                                    <Activity className="w-4 h-4 mr-3" />
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleVerifyAadhaar} className="space-y-12">
                                <div className="relative group">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 block ml-4">National ID (Aadhaar)</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={12}
                                        value={formData.aadhaarNumber}
                                        onChange={(e) => setFormData({ ...formData, aadhaarNumber: e.target.value.replace(/\D/g, '') })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-[2.5rem] py-10 px-12 text-4xl font-black tracking-[0.4em] outline-none focus:bg-white focus:border-blue-500 transition-all text-slate-900 placeholder:text-slate-200"
                                        placeholder="0000 0000 0000"
                                    />
                                    <div className="mt-6 flex items-center space-x-3 text-emerald-500 text-[10px] font-black uppercase tracking-widest ml-4">
                                        <ShieldCheck className="w-4 h-4" />
                                        <span>Security Protocol: Encrypted Stream Active</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FeatureBox icon={<Globe className="w-4 h-4 text-blue-500" />} label="Universal Coverage" />
                                    <FeatureBox icon={<Database className="w-4 h-4 text-indigo-500" />} label="Verified Node" />
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || formData.aadhaarNumber.length !== 12}
                                    className="w-full bg-slate-900 text-white py-10 rounded-[3rem] font-black text-xl hover:bg-blue-600 transition-all active:scale-[0.98] shadow-2xl flex items-center justify-center space-x-4 disabled:opacity-50"
                                >
                                    {loading ? <Activity className="w-6 h-6 animate-spin" /> : <ArrowRight className="w-6 h-6" />}
                                    <span>{loading ? 'Initializing Interface...' : 'Authorize UIDAI'}</span>
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="bg-white rounded-[4rem] p-16 shadow-2xl shadow-blue-500/5 border border-slate-50 animate-in fade-in zoom-in-95 duration-700">
                            <div className="flex items-center justify-between mb-16">
                                <div>
                                    <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4 italic">Device Sync.</h2>
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed">Quantum Sync with Registered Mobile</p>
                                </div>
                                <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600">
                                    <Smartphone className="w-10 h-10" />
                                </div>
                            </div>

                            {demoOTP && (
                                <div className="bg-blue-600 text-white px-8 py-6 rounded-[2.5rem] mb-12 flex items-center justify-between shadow-xl shadow-blue-600/20">
                                    <div className="flex items-center space-x-4">
                                        <Zap className="w-5 h-5 text-yellow-400" />
                                        <span className="text-xs font-black uppercase tracking-widest">Network Intercepted OTP</span>
                                    </div>
                                    <strong className="text-3xl font-black tracking-[0.2em] italic">{demoOTP}</strong>
                                </div>
                            )}

                            <form onSubmit={handleVerifyOTP} className="space-y-12">
                                <div className="relative group text-center">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4 block">Access Token</label>
                                    <input
                                        type="text"
                                        required
                                        maxLength={6}
                                        value={formData.otp}
                                        onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '') })}
                                        className="w-full bg-slate-50 border border-slate-100 rounded-[2.5rem] py-10 px-8 text-5xl font-black tracking-[0.8em] outline-none focus:bg-white focus:border-emerald-500 transition-all text-center text-slate-900 placeholder:text-slate-100"
                                        placeholder="000000"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Blood Index</label>
                                        <select
                                            value={formData.bloodGroup}
                                            onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-6 px-8 font-black text-slate-900 outline-none focus:border-blue-500"
                                        >
                                            <option value="">N/A</option>
                                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(t => <option key={t} value={t}>{t}</option>)}
                                        </select>
                                    </div>
                                    <div className="space-y-4">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Trauma Hub Phone</label>
                                        <input
                                            type="tel"
                                            maxLength={10}
                                            value={formData.emergencyContact}
                                            onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value.replace(/\D/g, '') })}
                                            className="w-full bg-slate-50 border border-slate-100 rounded-3xl py-6 px-8 font-black text-slate-900 outline-none focus:border-blue-500"
                                            placeholder="XXXXXXXXXX"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading || formData.otp.length !== 6}
                                    className="w-full bg-slate-900 text-white py-10 rounded-[3rem] font-black text-xl hover:bg-emerald-600 transition-all active:scale-[0.98] shadow-2xl flex items-center justify-center space-x-4 disabled:opacity-50"
                                >
                                    {loading ? <Activity className="w-6 h-6 animate-spin" /> : <Award className="w-6 h-6" />}
                                    <span>{loading ? 'Issuing Certificate...' : 'Verify & Generate Identity'}</span>
                                </button>
                            </form>
                        </div>
                    )}

                    {step === 3 && (
                        <div className="bg-white rounded-[4rem] p-16 shadow-2xl shadow-emerald-500/5 border border-emerald-50 animate-in fade-in scale-95 duration-1000">
                            <div className="text-center mb-16">
                                <div className="w-32 h-32 bg-emerald-50 rounded-[4rem] flex items-center justify-center mx-auto mb-10 text-emerald-600 animate-pulse">
                                    <CheckCircle2 className="w-16 h-16" />
                                </div>
                                <h2 className="text-5xl font-black text-slate-900 tracking-tighter leading-none mb-4 italic">Protocol Success.</h2>
                                <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">National Health ID Generated in Ledger</p>
                            </div>

                            <div className="bg-slate-900 rounded-[4rem] p-16 text-center relative overflow-hidden mb-16 shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
                                <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4 block">Assigned UID</span>
                                <h3 className="text-4xl font-black text-white italic tracking-widest mb-10 group-hover:scale-105 transition-transform">
                                    {healthId}
                                </h3>
                                <div className="w-48 h-48 bg-white/5 border border-white/10 rounded-[3rem] mx-auto flex items-center justify-center">
                                    <QrCode className="w-32 h-32 text-white/20" />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <button
                                    onClick={() => router.push('/login')}
                                    className="w-full bg-blue-600 text-white py-8 rounded-[2.5rem] font-black text-xl hover:bg-blue-700 transition shadow-2xl shadow-blue-500/20"
                                >
                                    Enter National Portal
                                </button>
                                <button
                                    onClick={() => router.push('/')}
                                    className="w-full bg-slate-50 text-slate-400 py-8 rounded-[2.5rem] font-black text-xs uppercase tracking-widest hover:text-slate-900 transition"
                                >
                                    Back to Global Portal
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-16 flex items-center space-x-2 text-slate-400 font-bold text-sm">
                    <Lock className="w-4 h-4" />
                    <span>Protected by National Cryptographic Standard 4.8</span>
                </div>
            </main>
        </div>
    );
}

function ProgressStep({ active, completed, label, sub }: any) {
    return (
        <div className={`flex flex-col items-center text-center p-6 rounded-[2.5rem] transition-all duration-700 ${active ? 'bg-white shadow-xl shadow-blue-500/5' : ''}`}>
            <div className={`w-3 h-3 rounded-full mb-4 transition-all duration-700 ${completed ? 'bg-emerald-500' : active ? 'bg-blue-500 animate-pulse' : 'bg-slate-200'}`}></div>
            <span className={`text-[11px] font-black uppercase tracking-widest mb-1 ${active ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
            <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{sub}</span>
        </div>
    );
}

function FeatureBox({ icon, label }: any) {
    return (
        <div className="flex items-center space-x-3 bg-slate-50 border border-slate-100 p-5 rounded-3xl transition-all hover:bg-white hover:shadow-lg">
            {icon}
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
        </div>
    );
}
