'use client';

import React, { useState } from 'react';
import {
    Phone, Mail, MapPin, MessageSquare,
    ChevronDown, Send, LifeBuoy
} from 'lucide-react';

export default function SupportPage() {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 py-16">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-lg mb-6">
                        <LifeBuoy className="w-8 h-8 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 mb-4">How can we help you?</h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                        Search our knowledge base or contact our 24/7 support team for assistance with appointments, technical issues, or emergencies.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
                {/* Contact Options */}
                <div className="lg:col-span-1 space-y-8">
                    <h3 className="text-lg font-bold uppercase tracking-widest border-b border-slate-200 pb-4">Contact Us</h3>

                    <ContactCard
                        icon={<Phone className="w-5 h-5" />}
                        title="Emergency Hotline"
                        info="108 / 112"
                        desc="24/7 Ambulance & Emergency"
                        cta="Call Now"
                        href="tel:108"
                        urgent
                    />

                    <ContactCard
                        icon={<MessageSquare className="w-5 h-5" />}
                        title="Live Chat Support"
                        info="Available 9 AM - 8 PM"
                        desc="Chat with our support agents"
                        cta="Start Chat"
                        href="#"
                    />

                    <ContactCard
                        icon={<Mail className="w-5 h-5" />}
                        title="Email Support"
                        info="help@swasthyasetu.gov.in"
                        desc="Response within 24 hours"
                        cta="Send Email"
                        href="mailto:help@swasthyasetu.gov.in"
                    />

                    <div className="p-6 bg-white border border-slate-200 rounded-lg">
                        <div className="flex items-start space-x-4">
                            <MapPin className="w-5 h-5 text-slate-400 mt-1" />
                            <div>
                                <h4 className="font-bold text-slate-900">Registered Office</h4>
                                <p className="text-sm text-slate-500 mt-1 leading-relaxed">
                                    Ministry of Health & Family Welfare,<br />
                                    Nirman Bhawan, New Delhi - 110011
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQs & Form */}
                <div className="lg:col-span-2 space-y-12">
                    <section>
                        <h3 className="text-lg font-bold uppercase tracking-widest border-b border-slate-200 pb-4 mb-6">Frequently Asked Questions</h3>
                        <div className="space-y-4">
                            <FaqItem
                                id={1}
                                question="How do I link my Aadhaar for UHID?"
                                answer="To link your Aadhaar, go to your Profile Settings > Identity > Link Aadhaar. You will receive an OTP on your registered mobile number for verification."
                                isOpen={openFaq === 1}
                                toggle={() => setOpenFaq(openFaq === 1 ? null : 1)}
                            />
                            <FaqItem
                                id={2}
                                question="Can I cancel an appointment?"
                                answer="Yes, appointments can be cancelled up to 2 hours before the scheduled time. Go to 'My Appointments', select the booking, and click 'Cancel'. Refunds are processed within 3-5 working days."
                                isOpen={openFaq === 2}
                                toggle={() => setOpenFaq(openFaq === 2 ? null : 2)}
                            />
                            <FaqItem
                                id={3}
                                question="Are my medical records secure?"
                                answer="SwasthyaSetu uses military-grade AES-256 encryption. Your records are only accessible to doctors you explicitly authorize via OTP consent."
                                isOpen={openFaq === 3}
                                toggle={() => setOpenFaq(openFaq === 3 ? null : 3)}
                            />
                        </div>
                    </section>

                    <section className="bg-white border border-slate-200 rounded-lg p-8">
                        <h3 className="text-lg font-bold text-slate-900 mb-6">Send us a Message</h3>
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                                    <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-md outline-none focus:border-blue-500 transition-colors font-medium" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                                    <input type="email" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-md outline-none focus:border-blue-500 transition-colors font-medium" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Subject</label>
                                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-md outline-none focus:border-blue-500 transition-colors font-medium text-slate-700">
                                    <option>Technical Issue</option>
                                    <option>Billing Query</option>
                                    <option>Feedback</option>
                                    <option>Report a Bug</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                                <textarea rows={5} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-md outline-none focus:border-blue-500 transition-colors font-medium resize-none"></textarea>
                            </div>
                            <button type="button" className="inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-bold text-sm uppercase tracking-widest transition-colors">
                                <Send className="w-4 h-4" />
                                <span>Submit Ticket</span>
                            </button>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}

function ContactCard({ icon, title, info, desc, cta, href, urgent }: any) {
    return (
        <div className={`p-6 rounded-lg border ${urgent ? 'bg-red-50 border-red-100' : 'bg-white border-slate-200'} transition-all hover:shadow-md`}>
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-md ${urgent ? 'bg-red-100 text-red-600' : 'bg-blue-50 text-blue-600'}`}>
                    {icon}
                </div>
                {urgent && <span className="text-[10px] font-bold bg-red-200 text-red-700 px-2 py-1 rounded uppercase tracking-widest">Urgent</span>}
            </div>
            <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">{title}</h4>
            <p className={`text-xl font-bold mb-2 ${urgent ? 'text-red-700' : 'text-slate-900'}`}>{info}</p>
            <p className="text-sm text-slate-500 mb-6">{desc}</p>
            <a href={href} className={`block w-full text-center py-3 rounded-md text-xs font-bold uppercase tracking-widest transition-colors ${urgent ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-slate-900 text-white hover:bg-slate-800'}`}>
                {cta}
            </a>
        </div>
    );
}

function FaqItem({ question, answer, isOpen, toggle }: any) {
    return (
        <div className="border border-slate-200 rounded-lg bg-white overflow-hidden">
            <button onClick={toggle} className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors">
                <span className="font-bold text-slate-900">{question}</span>
                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48' : 'max-h-0'}`}>
                <div className="p-6 pt-0 text-slate-600 leading-relaxed text-sm">
                    {answer}
                </div>
            </div>
        </div>
    );
}
