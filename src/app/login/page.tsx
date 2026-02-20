'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    Lock, Mail, ArrowRight, Loader2,
    ShieldCheck, AlertTriangle
} from 'lucide-react';
import { encryptData } from '@/lib/crypto';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Client-side encryption of sensitive credentials before transmission
            const encryptedPayload = encryptData(form);

            // Simulate API call
            console.log('Sending Encrypted Payload:', encryptedPayload);

            // Mock delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Hardcoded mock success for demo
            if (form.email === 'doctor@demo.com') {
                router.push('/doctor/dashboard');
            } else if (form.email === 'admin@demo.com') {
                router.push('/admin/dashboard');
            } else if (form.email) {
                router.push('/patient/dashboard');
            } else {
                throw new Error('Invalid credentials');
            }
        } catch (err) {
            setError('Authentication Failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        // In a real app, this would redirect to Google OAuth flow
        // window.location.href = '/api/auth/signin/google';
        alert('Redirecting to Google Secure Authentication...');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute inset-0 z-0 opacity-40">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-100 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>
            </div>

            <div className="w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 p-10 relative z-10 border border-slate-100">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-blue-600/30">
                        <Lock className="w-8 h-8" />
                    </div>
                    <h1 className="text-3xl font-[950] text-slate-900 tracking-tight mb-2">Welcome Back</h1>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Secure Access Portal</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Email Identity</label>
                        <div className="relative">
                            <input
                                type="email"
                                required
                                placeholder="name@example.com"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                            />
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Passcode</label>
                        <div className="relative">
                            <input
                                type="password"
                                required
                                placeholder="••••••••••••"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-sm font-bold text-slate-900 outline-none focus:border-blue-500 focus:bg-white transition-all placeholder:text-slate-400"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                            />
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-bold flex items-center space-x-2 border border-red-100">
                            <AlertTriangle className="w-4 h-4 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-slate-900 text-white rounded-xl py-4 font-black text-xs uppercase tracking-[0.2em] hover:bg-slate-800 transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Secure Login</span>}
                        {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </button>
                </form>

                <div className="relative my-8">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                    <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white px-2 text-slate-300 font-bold">Or Continue With</span></div>
                </div>

                <button
                    onClick={handleGoogleLogin}
                    className="w-full bg-white border border-slate-200 text-slate-700 rounded-xl py-4 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center space-x-3"
                >
                    <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                    <span>Google Account</span>
                </button>

                <div className="mt-8 text-center space-y-4">
                    <Link href="/register" className="block text-xs font-bold text-slate-400 hover:text-blue-600 uppercase tracking-widest transition-colors">
                        Create New Account
                    </Link>

                    <div className="flex items-center justify-center space-x-2 text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 py-2 px-4 rounded-full w-fit mx-auto border border-emerald-100">
                        <ShieldCheck className="w-3 h-3" />
                        <span>AES-256 Encrypted Connection</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
