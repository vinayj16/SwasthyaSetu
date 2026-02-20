'use client';

import React from 'react';
import {
    User, MapPin, Award, Stethoscope, Mail, Phone,
    Upload, Save, ShieldCheck
} from 'lucide-react';

export default function DoctorProfile() {
    return (
        <div className="p-10 max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
            <div className="flex items-end justify-between border-b border-slate-200 pb-8">
                <div>
                    <h1 className="text-3xl font-[950] text-slate-900 tracking-tighter uppercase italic mb-2">Profile Configuration</h1>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-[0.3em]">
                        Public Registry Information
                    </p>
                </div>
                <button className="px-8 py-3 bg-blue-600 text-white rounded-xl text-[11px] font-black uppercase tracking-widest shadow-lg shadow-blue-500/20 hover:bg-blue-500 transition-all flex items-center space-x-2">
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                </button>
            </div>

            <div className="grid grid-cols-12 gap-10">
                {/* Left: Avatar & Status */}
                <div className="col-span-4 space-y-6">
                    <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm text-center">
                        <div className="relative w-32 h-32 mx-auto mb-6">
                            <div className="w-full h-full bg-slate-100 rounded-full flex items-center justify-center text-slate-300 border-4 border-white shadow-xl">
                                <User className="w-12 h-12" />
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-slate-900 text-white rounded-full hover:bg-blue-600 transition-colors shadow-lg">
                                <Upload className="w-4 h-4" />
                            </button>
                        </div>
                        <h3 className="font-black text-lg text-slate-900">Dr. Vikram Aditya</h3>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">ID: DOC-8921</p>

                        <div className="mt-6 pt-6 border-t border-slate-50">
                            <div className="flex items-center justify-between text-left p-3 rounded-xl bg-slate-50 mb-2">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</span>
                                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest flex items-center">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2 animate-pulse"></div> Active
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-left p-3 rounded-xl bg-slate-50">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Verification</span>
                                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center">
                                    <ShieldCheck className="w-3 h-3 mr-1" /> Verified
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Form */}
                <div className="col-span-8 space-y-8">
                    <Section title="Basic Details">
                        <div className="grid grid-cols-2 gap-6">
                            <InputGroup label="Full Name" value="Dr. Vikram Aditya" icon={<User />} />
                            <InputGroup label="Specialization" value="Cardiologist" icon={<Stethoscope />} />
                            <InputGroup label="Email" value="dr.vikram@apollo.com" icon={<Mail />} />
                            <InputGroup label="Phone" value="+91 98765 43210" icon={<Phone />} />
                        </div>
                    </Section>

                    <Section title="Professional Info">
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Bio / About</label>
                                <textarea
                                    className="w-full bg-white border border-slate-200 rounded-xl p-4 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all h-32 resize-none"
                                    defaultValue="Senior Cardiologist with 15+ years of experience in interventional cardiology. Specialized in angioplasty and heart failure management."
                                ></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <InputGroup label="Qualifications" value="MBBS, MD (Cardiology)" icon={<Award />} />
                                <InputGroup label="Experience" value="15 Years" />
                            </div>
                        </div>
                    </Section>

                    <Section title="Clinic & Fees">
                        <div className="grid grid-cols-2 gap-6">
                            <InputGroup label="Hospital / Clinic" value="Apollo Indraprastha" icon={<MapPin />} />
                            <InputGroup label="Consultation Fee (₹)" value="1500" />
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
}

function Section({ title, children }: any) {
    return (
        <div className="space-y-6">
            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest border-l-4 border-blue-600 pl-3">{title}</h3>
            {children}
        </div>
    );
}

function InputGroup({ label, value, icon }: any) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">{label}</label>
            <div className="relative">
                <input
                    type="text"
                    defaultValue={value}
                    className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-4 pr-10 text-sm font-bold text-slate-900 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                {icon && <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4">{icon}</div>}
            </div>
        </div>
    );
}
