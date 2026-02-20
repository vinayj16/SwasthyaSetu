'use client';

import { useState } from 'react';
import {
    Search,
    FileText,
    Download,
    Share2,
    Filter,
    Clock,
    CheckCircle2,
    Lock,
    Sparkles,
    ChevronDown,
    FileImage,
    ClipboardList
} from 'lucide-react';

export default function RecordsVault() {
    const [activeTab, setActiveTab] = useState('all');

    const records = [
        {
            id: 'REC-001',
            type: 'Prescription',
            title: 'Post-Op Recovery Plan',
            doctor: 'Dr. Arpit Mishra',
            hospital: 'AIIMS Delhi',
            date: '28 Jan 2026',
            status: 'Verified',
            summary: 'Course of Amoxicillin and Ibuprofen for 7 days. Recommended rest.'
        },
        {
            id: 'REC-002',
            type: 'Lab Report',
            title: 'Comprehensive Blood Panel',
            doctor: 'Dr. Neha Sharma',
            hospital: 'Apollo Indraprastha',
            date: '15 Jan 2026',
            status: 'Verified',
            summary: 'All parameters within normal range. Vitamin D slightly low (22ng/mL).'
        },
        {
            id: 'REC-003',
            type: 'Scan Image',
            title: 'Chest X-Ray Digital',
            doctor: 'Dr. Vikram Malhotra',
            hospital: 'Medanta Medicity',
            date: '02 Jan 2026',
            status: 'Audit Logged',
            summary: 'Clear pulmonary fields. No signs of infection or congestion.'
        }
    ];

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-10">
            {/* Header */}
            <div className="px-2">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Medical Locker v2.0</span>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Health Records</h1>
                <p className="text-sm text-slate-500 font-medium">AES-256 Encrypted Vault</p>
            </div>

            {/* Search and Filters */}
            <div className="space-y-4">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500" />
                    <input
                        type="text"
                        placeholder="Search prescriptions, labs, scans..."
                        className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold"
                    />
                </div>

                <div className="flex space-x-2 overflow-x-auto pb-1 no-scrollbar">
                    {['All', 'Prescriptions', 'Labs', 'Scans', 'Vaccines'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase())}
                            className={`px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border ${activeTab === tab.toLowerCase()
                                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                                    : 'bg-white text-slate-400 border-slate-100'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* AI Summary Highlight */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-xl shadow-blue-200">
                <div className="flex items-center space-x-2 mb-4">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-sm font-bold tracking-tight">AI Health Chronology</h3>
                </div>
                <p className="text-xs text-blue-50 font-medium leading-relaxed opacity-90">
                    Your diagnostic data shows a positive trend in glycemic control over the last 3 months. Next screening recommended in April 2026.
                </p>
            </div>

            {/* Timeline */}
            <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-0 before:w-px before:bg-slate-100">
                {records.map((record, idx) => (
                    <div key={record.id} className="relative pl-12">
                        <div className="absolute left-0 top-1 w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center shadow-sm z-10">
                            {record.type === 'Prescription' && <FileText className="w-5 h-5 text-blue-600" />}
                            {record.type === 'Lab Report' && <ClipboardList className="w-5 h-5 text-emerald-600" />}
                            {record.type === 'Scan Image' && <FileImage className="w-5 h-5 text-indigo-600" />}
                        </div>

                        <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm space-y-4 hover:shadow-md transition-shadow group">
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.2em]">{record.date}</span>
                                    <h4 className="font-bold text-slate-900 text-sm tracking-tight group-hover:text-blue-600 transition-colors">{record.title}</h4>
                                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{record.doctor} • {record.hospital}</span>
                                </div>
                                <div className="flex items-center space-x-1 text-emerald-500">
                                    <CheckCircle2 className="w-3 h-3" />
                                    <span className="text-[8px] font-bold uppercase tracking-widest">{record.status}</span>
                                </div>
                            </div>

                            <div className="p-3 bg-slate-50 rounded-lg text-[10px] font-medium text-slate-600 leading-relaxed border border-slate-100 italic">
                                "{record.summary}"
                            </div>

                            <div className="flex items-center justify-between pt-2 border-t border-slate-50">
                                <div className="flex items-center space-x-4">
                                    <button className="flex items-center space-x-1 text-slate-400 hover:text-blue-600 transition-colors">
                                        <Download className="w-4 h-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">PDF</span>
                                    </button>
                                    <button className="flex items-center space-x-1 text-slate-400 hover:text-blue-600 transition-colors">
                                        <Share2 className="w-4 h-4" />
                                        <span className="text-[10px] font-bold uppercase tracking-widest">Consent</span>
                                    </button>
                                </div>
                                <div className="p-2 bg-slate-100 rounded-lg">
                                    <Lock className="w-3 h-3 text-slate-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Offline Mode Indicator */}
            <div className="p-4 bg-slate-100 rounded-xl flex items-center justify-center space-x-3 opacity-60">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Showing Last Cached Data • Go Online to Sync</span>
            </div>
        </div>
    );
}
