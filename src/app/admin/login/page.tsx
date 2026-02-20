'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, Lock, ArrowRight, Loader2, Fingerprint } from 'lucide-react';

export default function AdminLoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            const data = await res.json();

            if (data.success) {
                if (data.data.user.role !== 'ADMIN') {
                    setError('ACCESS DENIED: Insufficient Security Clearance.');
                    setLoading(false);
                    return;
                }
                router.push('/admin/dashboard');
            } else {
                setError(data.error || 'Authentication Failed');
            }
        } catch (e) {
            setError('System Error: Secure Link Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0F172A] text-white flex items-center justify-center relative overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/20 rounded-full blur-[120px]"></div>

            <div className="relative z-10 w-full max-w-md p-4">
                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700 p-8 rounded-[2rem] shadow-2xl">
                    <div className="text-center mb-10">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                            <ShieldAlert className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-[950] uppercase tracking-widest italic mb-2">SwasthyaSetu</h1>
                        <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.4em]">Central Command Access</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Admin Identifier</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="admin@swasthyasetu.gov.in"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-sm font-bold placeholder:text-slate-600 focus:border-blue-500 outline-none transition-all"
                                />
                                <Fingerprint className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Security Key</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="••••••••••••"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-4 pl-12 pr-4 text-sm font-bold placeholder:text-slate-600 focus:border-blue-500 outline-none transition-all"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center space-x-3">
                                <ShieldAlert className="w-4 h-4 text-red-500" />
                                <span className="text-xs font-bold text-red-400 uppercase tracking-wide">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-blue-900/20 transition-all flex items-center justify-center space-x-3 disabled:opacity-50 disabled:cursor-not-allowed group"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                            <span>{loading ? 'Authenticating...' : 'Authorize Session'}</span>
                            {!loading && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                            Restricted Area • Level 5 Clearance Required
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
