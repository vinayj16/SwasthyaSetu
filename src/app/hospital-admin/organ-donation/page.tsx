'use client';

import React, { useEffect, useState } from 'react';
import { Activity, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

export default function OrganDonationAdminPage() {
  const [pledges, setPledges] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPledges = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/organ-donation');
      const data = await res.json();
      if (data.success) setPledges(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPledges(); }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/organ-donation/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setPledges(prev => prev.map(p => p.id === id ? { ...p, status } : p));
    } catch (err) { console.error(err); }
  };

  const statusColors: Record<string,string> = { PLEDGED:'bg-blue-50 text-blue-600', MATCHED:'bg-emerald-50 text-emerald-600', TRANSPLANTED:'bg-slate-200 text-slate-500', EXPIRED:'bg-red-50 text-red-600' };
  const allowed = ['PLEDGED','MATCHED','TRANSPLANTED','EXPIRED'];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-10 font-sans">
      <div className="max-w-[1700px] mx-auto">
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-extrabold text-slate-900">Organ Donation Pledges</h1>
          <Link href="/hospital-admin/dashboard" className="flex items-center space-x-2 text-xs font-black uppercase text-slate-500 hover:text-slate-900">
            <span>Back</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
        {loading ? (
          <div className="flex items-center justify-center py-40"><Activity className="w-10 h-10 animate-spin text-slate-400" /></div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-3xl shadow-sm overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 uppercase text-[10px] font-black tracking-widest text-slate-500">
                <tr>
                  <th className="px-6 py-4">Donor Health ID</th>
                  <th className="px-6 py-4">Organ</th>
                  <th className="px-6 py-4">Pledge Date</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {pledges.map(p => (
                  <tr key={p.id} className="border-t border-slate-50 hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-mono text-xs">{p.donorHealthId}</td>
                    <td className="px-6 py-4">{p.organType}</td>
                    <td className="px-6 py-4">{new Date(p.pledgeDate).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${statusColors[p.status]}`}>{p.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <select value={p.status} onChange={e=>updateStatus(p.id, e.target.value)} className="border border-slate-200 rounded-xl p-2 text-xs">
                        {allowed.map(s=>(<option key={s}>{s}</option>))}
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {pledges.length===0 && <div className="p-20 text-center text-slate-400 font-black uppercase tracking-widest text-xs">No pledges yet.</div>}
          </div>
        )}
      </div>
    </div>
  );
}
