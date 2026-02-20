'use client';

import React, { useState } from 'react';
import {
    Search, Filter, MoreVertical, ShieldCheck, Ban, Eye,
    FileText, CheckCircle2, XCircle, Stethoscope
} from 'lucide-react';
import Link from 'next/link';

const MOCK_DOCTORS = [
    { id: 'DOC-001', name: 'Dr. Sarah Johnson', email: 'sarah.j@apollo.com', spec: 'Cardiology', hospital: 'Apollo Indraprastha', status: 'ACTIVE', rating: 4.8, earnings: '₹145,000' },
    { id: 'DOC-002', name: 'Dr. Rajesh Kumar', email: 'r.kumar@aiims.edu', spec: 'Neurology', hospital: 'AIIMS Delhi', status: 'ACTIVE', rating: 4.9, earnings: '₹210,000' },
    { id: 'DOC-003', name: 'Dr. Emily Chen', email: 'chen.em@fortis.com', spec: 'Pediatrics', hospital: 'Fortis Memorial', status: 'SUSPENDED', rating: 3.2, earnings: '₹45,000' },
    { id: 'DOC-004', name: 'Dr. Aman Verma', email: 'aman.v@max.com', spec: 'Orthopedics', hospital: 'Max Healthcare', status: 'ACTIVE', rating: 4.7, earnings: '₹180,000' },
    { id: 'DOC-005', name: 'Dr. Lisa Ray', email: 'lisa.ray@medanta.com', spec: 'Dermatology', hospital: 'Medanta Medicity', status: 'PENDING', rating: 0.0, earnings: '₹0' },
];

export default function DoctorMonitor() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('ALL');

    const filteredDocs = MOCK_DOCTORS.filter(doc =>
        (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterStatus === 'ALL' || doc.status === filterStatus)
    );

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-[950] text-white tracking-tighter uppercase italic mb-2">Network Clinicians</h1>
                    <div className="flex items-center space-x-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                        <Stethoscope className="w-4 h-4" />
                        <span>Registered Nodes: {MOCK_DOCTORS.length}</span>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Find Doctor / ID..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-slate-900 border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-sm font-bold text-white placeholder:text-slate-600 focus:border-blue-500 outline-none w-64 transition-all"
                        />
                    </div>
                    <FilterButton active={filterStatus === 'ALL'} onClick={() => setFilterStatus('ALL')} label="All" />
                    <FilterButton active={filterStatus === 'ACTIVE'} onClick={() => setFilterStatus('ACTIVE')} label="Active" />
                    <FilterButton active={filterStatus === 'SUSPENDED'} onClick={() => setFilterStatus('SUSPENDED')} label="Flagged" />
                </div>
            </div>

            {/* Data Table */}
            <div className="bg-slate-900/50 border border-slate-800 rounded-[2.5rem] overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-slate-800 bg-slate-900/80">
                            <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Identity</th>
                            <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Specialization</th>
                            <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Hospital Node</th>
                            <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                            <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest">Metrics</th>
                            <th className="p-6 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {filteredDocs.map((doc) => (
                            <tr key={doc.id} className="hover:bg-slate-800/30 transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-slate-400">
                                            {doc.name[0]}
                                        </div>
                                        <div>
                                            <div className="text-sm font-black text-white">{doc.name}</div>
                                            <div className="text-[10px] font-bold text-slate-500">{doc.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="text-xs font-bold text-slate-300 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">{doc.spec}</span>
                                </td>
                                <td className="p-6">
                                    <span className="text-xs font-medium text-slate-400">{doc.hospital}</span>
                                </td>
                                <td className="p-6">
                                    <StatusBadge status={doc.status} />
                                </td>
                                <td className="p-6">
                                    <div className="space-y-1">
                                        <div className="flex items-center space-x-1 text-amber-500 text-xs font-black">
                                            <span>⭐ {doc.rating}</span>
                                        </div>
                                        <div className="text-[10px] font-mono text-emerald-500">{doc.earnings}</div>
                                    </div>
                                </td>
                                <td className="p-6 text-right">
                                    <div className="flex justify-end space-x-2">
                                        <ActionBtn icon={<Eye className="w-4 h-4" />} tooltip="View Profile" />
                                        <ActionBtn icon={<FileText className="w-4 h-4" />} tooltip="Logs" />
                                        <ActionBtn icon={<Ban className="w-4 h-4" />} danger tooltip="Suspend" />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        ACTIVE: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        SUSPENDED: 'bg-rose-500/10 text-rose-500 border-rose-500/20',
        PENDING: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
    }[status] || 'bg-slate-500/10 text-slate-500';

    const icon = {
        ACTIVE: <CheckCircle2 className="w-3 h-3 mr-1" />,
        SUSPENDED: <Ban className="w-3 h-3 mr-1" />,
        PENDING: <ShieldCheck className="w-3 h-3 mr-1" />
    }[status];

    return (
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${styles}`}>
            {icon}
            {status}
        </span>
    );
}

function ActionBtn({ icon, danger, tooltip }: any) {
    return (
        <button
            className={`p-2 rounded-lg border transition-all ${danger ? 'bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white' : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white hover:border-slate-500'}`}
            title={tooltip}
        >
            {icon}
        </button>
    );
}

function FilterButton({ label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/40' : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'}`}
        >
            {label}
        </button>
    )
}
