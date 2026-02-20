'use client';

import React, { useState } from 'react';
import {
    Globe, Edit, Plus, Trash2, Image,
    Save, Eye, CheckCircle
} from 'lucide-react';

const MOCK_BANNERS = [
    { id: 1, title: 'Pulse Polio Drive 2026', status: 'ACTIVE', type: 'HERO', lastUpdated: '2 days ago' },
    { id: 2, title: 'New Tele-Medicine Guidelines', status: 'DRAFT', type: 'ANNOUNCEMENT', lastUpdated: '1 hour ago' },
    { id: 3, title: 'Blood Donation Camp - Delhi', status: 'SCHEDULED', type: 'EVENT', lastUpdated: '5 days ago' },
];

export default function AdminCMS() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-1">Website CMS</h1>
                    <p className="text-sm font-medium text-slate-400">Manage Content, Banners & Announcements</p>
                </div>
                <button className="flex items-center space-x-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-lg shadow-blue-900/40">
                    <Plus className="w-4 h-4" />
                    <span>Create New Post</span>
                </button>
            </div>

            {/* Live Preview Section */}
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-6">Active Content</h3>
                        <div className="space-y-4">
                            {MOCK_BANNERS.map((banner) => (
                                <div key={banner.id} className="flex items-center justify-between p-4 bg-slate-950/50 border border-slate-800 rounded-lg hover:border-slate-700 transition-all group">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center">
                                            <Image className="w-5 h-5 text-slate-500" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{banner.title}</h4>
                                            <div className="flex items-center space-x-2 text-[10px] font-bold text-slate-500 uppercase tracking-wide mt-1">
                                                <span>{banner.type}</span>
                                                <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                                                <span>{banner.lastUpdated}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <StatusBadge status={banner.status} />
                                        <div className="flex space-x-1 pl-3 border-l border-slate-800">
                                            <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 rounded transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Quick Editor */}
                <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 h-fit sticky top-6">
                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-6">Quick Announcement</h3>
                    <form className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Headline</label>
                            <input
                                type="text"
                                placeholder="Enter announcement title..."
                                className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-sm font-medium text-white outline-none focus:border-blue-500 transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Priority</label>
                            <select className="w-full bg-slate-950 border border-slate-800 rounded p-3 text-sm font-medium text-slate-300 outline-none focus:border-blue-500 transition-all">
                                <option>Normal</option>
                                <option>High Importance</option>
                                <option>Critical Alert</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Visibility</label>
                            <div className="flex items-center space-x-4">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="vis" className="accent-blue-600" defaultChecked />
                                    <span className="text-sm text-slate-300">Public</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input type="radio" name="vis" className="accent-blue-600" />
                                    <span className="text-sm text-slate-300">Doctors Only</span>
                                </label>
                            </div>
                        </div>
                        <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white rounded font-bold text-xs uppercase tracking-widest transition-all mt-4 flex items-center justify-center space-x-2">
                            <Save className="w-4 h-4" />
                            <span>Publish to Site</span>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function StatusBadge({ status }: { status: string }) {
    const styles = {
        'ACTIVE': 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20',
        'DRAFT': 'text-slate-400 bg-slate-500/10 border-slate-500/20',
        'SCHEDULED': 'text-amber-500 bg-amber-500/10 border-amber-500/20',
    }[status] || 'text-slate-500';

    return (
        <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-widest border ${styles}`}>
            {status}
        </span>
    );
}
