'use client';

import React, { useState } from 'react';
import {
    Mic, Video, PhoneOff, MessageSquare,
    FileText, User, Clock, ShieldCheck, Upload, X
} from 'lucide-react';

export default function OnlineConsultation() {
    const [notes, setNotes] = useState('');

    return (
        <div className="h-[calc(100vh-64px)] bg-slate-950 text-white flex overflow-hidden">
            {/* Main Video Area */}
            <div className="flex-1 relative flex flex-col">
                {/* Header Overlay */}
                <div className="absolute top-0 left-0 w-full p-6 z-10 bg-gradient-to-b from-black/60 to-transparent flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center font-bold text-xl">RS</div>
                        <div>
                            <h2 className="text-lg font-black tracking-tight shadow-black drop-shadow-md">Rahul Sharma</h2>
                            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-slate-300">
                                <span className="bg-red-500/80 px-2 py-0.5 rounded text-white">Live</span>
                                <span>00:14:23</span>
                            </div>
                        </div>
                    </div>
                    <div className="bg-black/40 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center">
                            <ShieldCheck className="w-3 h-3 mr-2" /> Encrypted (AES-256)
                        </span>
                    </div>
                </div>

                {/* Simulated Video Feed */}
                <div className="flex-1 bg-slate-800 relative flex items-center justify-center">
                    <div className="text-center opacity-30">
                        <User className="w-32 h-32 mx-auto mb-4" />
                        <p className="text-xl font-bold uppercase tracking-widest">Patient Video Feed</p>
                    </div>

                    {/* Self View */}
                    <div className="absolute bottom-24 right-6 w-48 h-36 bg-slate-900 rounded-2xl border border-slate-700 shadow-2xl flex items-center justify-center overflow-hidden">
                        <div className="text-center opacity-50">
                            <p className="text-[10px] font-bold uppercase tracking-widest">Your Camera</p>
                        </div>
                    </div>
                </div>

                {/* Controls */}
                <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-center space-x-6">
                    <ControlButton icon={<Mic className="w-6 h-6" />} active />
                    <ControlButton icon={<Video className="w-6 h-6" />} active />
                    <button className="w-14 h-14 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white shadow-lg shadow-red-900/50 transition-all scale-110">
                        <PhoneOff className="w-6 h-6" />
                    </button>
                    <ControlButton icon={<MessageSquare className="w-6 h-6" />} badge="2" />
                </div>
            </div>

            {/* Side Panel: Clinical Tools */}
            <div className="w-96 bg-white border-l border-slate-200 text-slate-900 flex flex-col z-20 shadow-2xl">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                    <h3 className="font-black uppercase tracking-widest text-xs flex items-center">
                        <FileText className="w-4 h-4 mr-2 text-blue-600" />
                        Clinical Notes
                    </h3>
                    <span className="text-[10px] font-bold text-slate-400">Autosaved</span>
                </div>

                <div className="flex-1 p-6 overflow-y-auto space-y-6">
                    {/* Patient Summary */}
                    <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100">
                        <div className="flex justify-between mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Age / Gender</span>
                            <span className="text-[10px] font-bold text-slate-900">34 / M</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Complaints</span>
                            <span className="text-[10px] font-bold text-slate-900">Fever, Cough</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Observation Notes</label>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="Type clinical observations here..."
                            className="w-full h-40 bg-white border border-slate-200 rounded-xl p-4 text-sm font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 resize-none outline-none transition-all placeholder:text-slate-300"
                        ></textarea>
                    </div>

                    <div className="space-y-4 pt-4 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Prescription</label>
                            <button className="text-[10px] font-bold text-blue-600 hover:underline uppercase tracking-widest">+ Add Meds</button>
                        </div>
                        <div className="p-4 border border-slate-200 border-dashed rounded-xl text-center cursor-pointer hover:bg-slate-50 transition-colors">
                            <Upload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                            <p className="text-xs font-bold text-slate-500">Upload Reports / Rx</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-100">
                    <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-600 transition-colors shadow-xl">
                        Finalize Consult
                    </button>
                </div>
            </div>
        </div>
    );
}

function ControlButton({ icon, active, badge }: any) {
    return (
        <button className={`w-12 h-12 rounded-full flex items-center justify-center transition-all relative ${active ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-900 text-slate-500 hover:text-white'}`}>
            {icon}
            {badge && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 rounded-full text-[10px] font-bold flex items-center justify-center border-2 border-slate-900">
                    {badge}
                </span>
            )}
        </button>
    );
}
