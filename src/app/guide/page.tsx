'use client';

import React from 'react';
import { Book, ChevronRight, Search, Shield, User, Globe, Activity } from 'lucide-react';

export default function UserGuide() {
    return (
        <div className="p-8 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-300">
            <div className="border-b border-slate-300 pb-8">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="p-3 bg-blue-100 border border-blue-200 rounded-sm">
                        <Book className="w-8 h-8 text-blue-700" />
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">User Manual</h1>
                        <p className="text-lg text-slate-600 font-medium leading-relaxed">
                            Comprehensive guide to navigating the SwasthyaSetu ecosystem.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-4 gap-12">
                {/* TOC - Visible Sticky Sidebar */}
                <div className="hidden md:block col-span-1">
                    <div className="sticky top-8 space-y-1 border-l-2 border-slate-200 pl-4">
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Links</h3>
                        <TocLink label="Getting Started" href="#start" active />
                        <TocLink label="Booking Appointments" href="#booking" />
                        <TocLink label="Finding Services" href="#services" />
                        <TocLink label="Tele-Consultation" href="#tele" />
                        <TocLink label="Privacy & Security" href="#privacy" />
                    </div>
                </div>

                {/* Content */}
                <div className="col-span-3 space-y-16">
                    <Section
                        id="start"
                        title="Getting Started"
                        icon={<User className="w-6 h-6 text-blue-600" />}
                    >
                        <p className="mb-4">To fully utilize SwasthyaSetu, every citizen must generate a <strong>Universal Health ID (UHID)</strong>. This digital ID unifies your medical history across all government and private hospitals in India.</p>

                        <div className="bg-blue-50 border border-blue-200 p-6 rounded-sm">
                            <h4 className="font-bold text-blue-900 mb-2">Account Creation Steps:</h4>
                            <ol className="list-decimal pl-5 space-y-2 text-slate-700 font-medium">
                                <li>Navigate to the homepage and click <strong>"Join Network"</strong>.</li>
                                <li>Enter your Aadhaar Number for identity verification.</li>
                                <li>Authenticate via OTP sent to your registered mobile.</li>
                                <li>Create a secure, alphanumeric password.</li>
                            </ol>
                        </div>
                    </Section>

                    <Section
                        id="booking"
                        title="Booking Appointments"
                        icon={<Activity className="w-6 h-6 text-emerald-600" />}
                    >
                        <p className="mb-4">SwasthyaSetu allows you to book OPD slots at any registered hospital. You can choose between physical visits or video consultations.</p>
                        <div className="border border-slate-200 p-6 rounded-sm bg-white shadow-sm">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <h5 className="font-bold text-slate-900 mb-2 border-b border-slate-100 pb-2">Physical Visit</h5>
                                    <p className="text-sm text-slate-600">Best for general checkups, surgeries, and diagnostics. You will receive a digital token to skip hospital queues.</p>
                                </div>
                                <div>
                                    <h5 className="font-bold text-slate-900 mb-2 border-b border-slate-100 pb-2">Video Consult</h5>
                                    <p className="text-sm text-slate-600">Ideal for follow-ups and minor ailments. Connect securely from home using our encrypted video interface.</p>
                                </div>
                            </div>
                        </div>
                    </Section>

                    <Section
                        id="services"
                        title="Finding Nearby Services"
                        icon={<Search className="w-6 h-6 text-amber-600" />}
                    >
                        <p>Use the <strong>"Locate"</strong> feature to find:</p>
                        <ul className="list-disc pl-5 space-y-2 mt-4 text-slate-700">
                            <li><strong>Hospitals:</strong> Filter by specialization (Cardiology, Ortho, etc.).</li>
                            <li><strong>Pharmacies:</strong> Find 24/7 active medical stores.</li>
                            <li><strong>Path Labs:</strong> Book home collection for blood tests.</li>
                            <li><strong>Blood Banks:</strong> Check real-time blood unit availability.</li>
                        </ul>
                    </Section>

                    <Section
                        id="privacy"
                        title="Safety & Data Privacy"
                        icon={<Shield className="w-6 h-6 text-slate-900" />}
                    >
                        <p className="text-lg leading-relaxed text-slate-800 font-medium">
                            Your health data is your property. SwasthyaSetu is compliant with the <strong>DPDP Act 2023</strong>.
                        </p>
                        <div className="mt-6 grid md:grid-cols-2 gap-4">
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm">
                                <h5 className="font-bold text-slate-900 mb-1">Encrypted Storage</h5>
                                <p className="text-sm text-slate-600">All records are stored using AES-256 military-grade encryption.</p>
                            </div>
                            <div className="p-4 bg-slate-50 border border-slate-200 rounded-sm">
                                <h5 className="font-bold text-slate-900 mb-1">Consent-Based Access</h5>
                                <p className="text-sm text-slate-600">Doctors can ONLY view your history after you approve the OTP request.</p>
                            </div>
                        </div>
                    </Section>
                </div>
            </div>
        </div>
    );
}

function Section({ id, title, icon, children }: any) {
    return (
        <section id={id} className="scroll-mt-32">
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-200">
                <div className="p-2 bg-slate-100 rounded-sm">{icon}</div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h2>
            </div>
            <div className="text-slate-700 leading-relaxed text-base">
                {children}
            </div>
        </section>
    );
}

function TocLink({ label, href, active }: any) {
    return (
        <a href={href} className={`block text-sm font-semibold transition-colors py-2 ${active ? 'text-blue-700 border-l-2 border-blue-700 pl-3' : 'text-slate-500 hover:text-slate-900 pl-3.5 border-l-2 border-transparent hover:border-slate-300'}`}>
            {label}
        </a>
    );
}
