'use client';

import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function OrganDonationPledgePage() {
  const router = useRouter();
  const [form, setForm] = useState({ donorHealthId: '', organType: 'KIDNEY', hospitalId: '' });
  const [loading, setLoading] = useState(false);
  const organs = ['KIDNEY', 'LIVER', 'HEART', 'EYES', 'SKIN', 'BONE_MARROW'];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/organ-donation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      alert(data.message || 'Pledge recorded');
      router.push('/');
    } catch (err) {
      console.error(err);
      alert('Submission failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-8">
      <form onSubmit={submit} className="w-full max-w-xl bg-white p-12 rounded-3xl border border-slate-100 shadow-md space-y-8">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Organ Donation Pledge</h1>
        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Health ID</label>
          <input required className="w-full border border-slate-200 rounded-xl p-4" value={form.donorHealthId} onChange={e=>setForm({...form, donorHealthId:e.target.value})} placeholder="IND-HID-XXXX" />
        </div>
        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Organ</label>
          <select className="w-full border border-slate-200 rounded-xl p-4" value={form.organType} onChange={e=>setForm({...form, organType:e.target.value})}>
            {organs.map(o=><option key={o}>{o}</option>)}
          </select>
        </div>
        <div className="space-y-4">
          <label className="text-xs font-black uppercase tracking-widest text-slate-500">Hospital ID</label>
          <input required className="w-full border border-slate-200 rounded-xl p-4" value={form.hospitalId} onChange={e=>setForm({...form, hospitalId:e.target.value})} placeholder="hospital uuid" />
        </div>
        <button disabled={loading} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 disabled:opacity-50">
          {loading ? <Activity className="w-5 h-5 animate-spin" /> : null}
          <span>{loading ? 'Submitting' : 'Submit Pledge'}</span>
        </button>
      </form>
    </div>
  );
}
