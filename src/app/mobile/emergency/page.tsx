'use client';

import { useState, useEffect } from 'react';
import {
    AlertTriangle,
    Navigation,
    Shield,
    Lock,
    Phone,
    User,
    Activity,
    Ambulance,
    WifiOff,
    HeartPulse
} from 'lucide-react';

export default function MobileEmergency() {
    const [sosActive, setSosActive] = useState(false);
    const [countdown, setCountdown] = useState(5);
    const [status, setStatus] = useState('Standby');

    useEffect(() => {
        let timer: any;
        if (sosActive && countdown > 0) {
            timer = setInterval(() => setCountdown(c => c - 1), 1000);
        } else if (sosActive && countdown === 0) {
            setStatus('ACTIVATED');
        }
        return () => clearInterval(timer);
    }, [sosActive, countdown]);

    const handleSOS = () => {
        setSosActive(true);
        setStatus('Initializing Protocol');
    };

    return (
        <div className="space-y-6 animate-in zoom-in-95 duration-500 min-h-[calc(100vh-16rem)] flex flex-col pb-10">
            {/* Header */}
            <div className="px-2">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest flex items-center">
                    <AlertTriangle className="w-3 h-3 mr-1" /> Critical Response Node
                </span>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Emergency SOS</h1>
                <p className="text-sm text-slate-500 font-medium">One-tap life-saving protocol</p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center space-y-12 py-10">
                {/* SOS Button Container */}
                <div className="relative">
                    {!sosActive ? (
                        <button
                            onClick={handleSOS}
                            className="w-48 h-48 bg-red-600 rounded-full flex flex-col items-center justify-center text-white shadow-2xl shadow-red-200 active:scale-90 transition-transform relative z-10 group"
                        >
                            <AlertTriangle className="w-12 h-12 mb-2 group-hover:scale-110 transition-transform" />
                            <span className="text-2xl font-black tracking-tighter italic">SOS</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-1">Press 3s</span>
                        </button>
                    ) : (
                        <div className={`w-48 h-48 rounded-full flex flex-col items-center justify-center text-white shadow-2xl relative z-10 ${status === 'ACTIVATED' ? 'bg-slate-900' : 'bg-red-600 animate-pulse'}`}>
                            {countdown > 0 ? (
                                <>
                                    <span className="text-5xl font-black italic">{countdown}</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-2">Cancelling...</span>
                                </>
                            ) : (
                                <>
                                    <HeartPulse className="w-12 h-12 mb-2 animate-bounce" />
                                    <span className="text-xl font-black tracking-tight italic">ACTIVE</span>
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 mt-1">Help is coming</span>
                                </>
                            )}
                        </div>
                    )}

                    {/* Animated Pulsing Rings */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-red-500/20 rounded-full animate-ping"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border-2 border-red-500/10 rounded-full animate-ping [animation-delay:500ms]"></div>
                </div>

                {/* Status Indicator */}
                <div className="text-center space-y-2">
                    <p className={`text-xs font-bold uppercase tracking-[0.3em] ${status === 'ACTIVATED' ? 'text-emerald-500' : 'text-slate-400'}`}>
                        Protocol: {status}
                    </p>
                    <div className="flex items-center justify-center space-x-6">
                        <StatusItem icon={Navigation} label="GPS" active={sosActive} />
                        <StatusItem icon={Shield} label="HID" active={sosActive} />
                        <StatusItem icon={Ambulance} label="EMS" active={status === 'ACTIVATED'} />
                    </div>
                </div>
            </div>

            {/* Emergency Info Cards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-slate-400" />
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Primary Contact</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900">Arjun Verma (Father)</p>
                        <p className="text-[10px] font-bold text-blue-600">+91 98765 43210</p>
                    </div>
                    <button className="w-full bg-slate-50 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-600 flex items-center justify-center space-x-2 border border-slate-100">
                        <Phone className="w-3 h-3" />
                        <span>Call Now</span>
                    </button>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                    <div className="flex items-center space-x-2">
                        <Lock className="w-4 h-4 text-red-400" />
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Emergency Vault</span>
                    </div>
                    <div>
                        <p className="text-sm font-bold text-slate-900">Blood: O+ Negative</p>
                        <p className="text-[10px] font-bold text-slate-500">Allergy: Penicillin</p>
                    </div>
                    <button className="w-full bg-red-50 py-2 rounded-lg text-[10px] font-bold uppercase tracking-widest text-red-600 flex items-center justify-center space-x-2 border border-red-100">
                        <Lock className="w-3 h-3" />
                        <span>Unlock Data</span>
                    </button>
                </div>
            </div>

            {/* Offline Capability Note */}
            <div className="p-4 bg-slate-100 rounded-xl flex items-center space-x-3 opacity-60">
                <WifiOff className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">Works via SMS/LoRa in low network zones</span>
            </div>
        </div>
    );
}

function StatusItem({ icon: Icon, label, active }: any) {
    return (
        <div className="flex flex-col items-center space-y-1">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center border transition-all ${active ? 'bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm' : 'bg-slate-50 border-slate-100 text-slate-300'
                }`}>
                <Icon className="w-4 h-4" />
            </div>
            <span className={`text-[8px] font-bold uppercase tracking-widest ${active ? 'text-emerald-600' : 'text-slate-300'}`}>{label}</span>
        </div>
    );
}
