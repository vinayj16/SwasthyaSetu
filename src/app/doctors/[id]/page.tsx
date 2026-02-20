'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Star, Calendar, Clock, MapPin, Phone, Video, MessageSquare, User,
  Award, CheckCircle, Heart, Share2, ArrowLeft, DollarSign, Globe, X,
  Languages, GraduationCap, Briefcase, Users, TrendingUp, ShieldCheck,
  ChevronRight, Brain, Zap, Activity, Info, CreditCard, CheckCircle2,
  FileText, Download, Building
} from 'lucide-react';

type BookingStep = 1 | 2 | 3 | 4 | 5;

export default function DoctorProfileHub() {
  const params = useParams();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [bookingStep, setBookingStep] = useState<BookingStep>(1);
  const [showBooking, setShowBooking] = useState(false);

  // Selection States
  const [selectedDate, setSelectedDate] = useState('TODAY');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [consultationType, setConsultationType] = useState('VIDEO');
  const [patientDetails, setPatientDetails] = useState({ name: '', age: '', gender: 'MALE', reason: '' });

  const doctor = {
    id: params.id,
    name: 'Dr. Sarah Johnson',
    specialization: 'Senior Cardiologist',
    experience: '15+ Years',
    hospital: 'Apollo Indraprastha Hub',
    rating: 4.8,
    reviews: 234,
    fee: 1500,
    verified: true,
    bio: 'Dr. Sarah Johnson is a distinguished cardiologist specializing in interventional cardiology and structural heart diseases. With over 5,000 successful procedures, she leads the National Cardiac Research Node.',
    education: [
      { degree: 'MD - Cardiology', institute: 'AIIMS Delhi', year: '2010' },
      { degree: 'MBBS', institute: 'AFMC Pune', year: '2005' }
    ],
    experienceTimeline: [
      { role: 'Senior Consultant', org: 'Apollo Hospitals', period: '2018 - Present' },
      { role: 'Clinical Lead', org: 'Max Healthcare', period: '2014 - 2018' },
      { role: 'Cardiology Fellow', org: 'Cleveland Clinic', period: '2011 - 2014' }
    ],
    awards: [
      'National Medical Excellence 2023',
      'Distinguished Researcher Award 2022'
    ],
    languages: ['English', 'Hindi', 'French']
  };

  const nextStep = () => setBookingStep(prev => (prev < 5 ? (prev + 1) as BookingStep : prev));
  const prevStep = () => setBookingStep(prev => (prev > 1 ? (prev - 1) as BookingStep : prev));

  if (showBooking && bookingStep === 5) {
    return (
      <BookingConfirmation
        details={{ ...doctor, ...patientDetails, date: selectedDate, slot: selectedSlot, type: consultationType }}
        onExit={() => router.push('/patient/dashboard')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-950 font-sans selection:bg-blue-500/10">
      {/* Header HUD */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-3xl border-b border-slate-100 px-10 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <button onClick={() => router.back()} className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-950 hover:shadow-xl transition-all">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="h-10 w-px bg-slate-100"></div>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-2xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">National Clinician Profile #7284</span>
          </div>
        </div>

        <div className="flex items-center space-x-6">
          <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-rose-500 transition-colors"><Heart className="w-5 h-5" /></button>
          <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-blue-600 transition-colors"><Share2 className="w-5 h-5" /></button>
          <button onClick={() => setShowBooking(true)} className="bg-slate-950 text-white px-10 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-blue-600 transition-all flex items-center space-x-3">
            <Calendar className="w-4 h-4" />
            <span>Reserve Consultation</span>
          </button>
        </div>
      </header>

      <main className="pt-32 pb-40 px-10 max-w-[1700px] mx-auto">
        <div className="grid lg:grid-cols-12 gap-16">
          {/* Left: Clinician Dossier */}
          <div className="lg:col-span-8 space-y-12">
            <div className="flex flex-col md:flex-row items-end gap-12">
              <div className="relative w-64 h-64 shrink-0">
                <img src="/api/placeholder/400/400" className="w-full h-full object-cover rounded-[3.5rem] border-[6px] border-white shadow-2xl" alt={doctor.name} />
                <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white p-4 rounded-full shadow-2xl border-4 border-[#FDFCFB]">
                  <Zap className="w-6 h-6" />
                </div>
              </div>
              <div className="space-y-6 pb-6">
                <div className="flex items-center space-x-4">
                  <span className="bg-blue-50 text-blue-600 px-6 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-100">Distinguished Tier</span>
                  <div className="flex items-center space-x-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-xl font-black italic">{doctor.rating}</span>
                  </div>
                </div>
                <h1 className="text-6xl font-[950] tracking-tighter italic uppercase leading-tight mb-2">Dr. Sarah <br /> <span className="text-blue-600">Johnson.</span></h1>
                <div className="flex items-center space-x-12">
                  <InfoRow label="Experience" val={doctor.experience} icon={<Award />} />
                  <InfoRow label="Institution" val={doctor.hospital} icon={<Building />} />
                  <InfoRow label="Languages" val={doctor.languages.join(', ')} icon={<Globe />} />
                </div>
              </div>
            </div>

            {/* Dossier Tabs */}
            <div className="space-y-12">
              <div className="flex space-x-12 border-b border-slate-100">
                {['OVERVIEW', 'CLINICAL HISTORY', 'PUBLICATIONS', 'FEEDBACK'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-6 text-[10px] font-black uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-blue-600' : 'text-slate-400 hover:text-slate-900'}`}>
                    {tab}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-600 rounded-full animate-in slide-in-from-left duration-300"></div>}
                  </button>
                ))}
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                {activeTab === 'OVERVIEW' && (
                  <div className="space-y-16">
                    <div className="space-y-6">
                      <h3 className="text-2xl font-[950] tracking-tighter italic uppercase underline decoration-blue-500 underline-offset-8">Clinical Biography</h3>
                      <p className="text-xl font-medium text-slate-500 leading-relaxed max-w-4xl">{doctor.bio}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">
                      <SectionBox title="Education & Accreditation" icon={<GraduationCap />}>
                        <div className="space-y-6">
                          {doctor.education.map((edu, i) => (
                            <div key={i} className="flex justify-between items-center group">
                              <div>
                                <h5 className="text-[11px] font-black uppercase tracking-tight group-hover:text-blue-600 transition-colors">{edu.degree}</h5>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{edu.institute}</p>
                              </div>
                              <span className="text-[10px] font-black text-slate-300 italic">{edu.year}</span>
                            </div>
                          ))}
                        </div>
                      </SectionBox>

                      <SectionBox title="Professional Timeline" icon={<Briefcase />}>
                        <div className="space-y-6">
                          {doctor.experienceTimeline.map((exp, i) => (
                            <div key={i} className="flex justify-between items-center group">
                              <div>
                                <h5 className="text-[11px] font-black uppercase tracking-tight group-hover:text-blue-600 transition-colors">{exp.role}</h5>
                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{exp.org}</p>
                              </div>
                              <span className="text-[10px] font-black text-slate-300 italic">{exp.period}</span>
                            </div>
                          ))}
                        </div>
                      </SectionBox>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right: Booking Command Console */}
          <aside className="lg:col-span-4">
            <div className="sticky top-40 bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm space-y-10">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest">Nodal Command</h3>
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center border border-emerald-100"><Zap className="w-5 h-5" /></div>
              </div>

              <div className="space-y-8">
                <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 flex flex-col items-center text-center">
                  <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">CONSULTATION FEE</span>
                  <span className="text-5xl font-[950] tracking-tighter italic text-blue-600">₹{doctor.fee}</span>
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest mt-4 italic">GST INCLUDED • NATIONAL PRICING TIER</span>
                </div>

                <div className="space-y-4">
                  <BookingCheck label="Verified National Board Specialist" />
                  <BookingCheck label="Encrypted Digital Script Generation" />
                  <BookingCheck label="Identity Shield Integrated" />
                </div>

                <button onClick={() => setShowBooking(true)} className="w-full py-8 bg-slate-950 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-blue-600 transition-all flex items-center justify-center space-x-3">
                  <Calendar className="w-5 h-5" />
                  <span>Book Appointment Flow</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* MULTI-STEP BOOKING OVERLAY */}
      {showBooking && (
        <div className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-3xl flex items-center justify-center p-10 animate-in fade-in duration-500">
          <div className="bg-white rounded-[4rem] shadow-2xl max-w-4xl w-full p-20 relative overflow-hidden">
            <button onClick={() => setShowBooking(false)} className="absolute right-12 top-12 p-4 bg-slate-50 rounded-2xl text-slate-300 hover:text-rose-600 transition-all hover:rotate-90">
              <X className="w-8 h-8" />
            </button>

            {/* Step Indicator */}
            <div className="flex items-center space-x-4 mb-16">
              {[1, 2, 3, 4, 5].map(step => (
                <div key={step} className={`h-2 rounded-full transition-all duration-700 ${bookingStep >= step ? 'bg-blue-600 w-12' : 'bg-slate-100 w-6'}`}></div>
              ))}
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest ml-4">STEP 0{bookingStep} / 05</span>
            </div>

            <div className="animate-in slide-in-from-right-4 duration-500">
              {bookingStep === 1 && (
                <div className="space-y-12">
                  <StepHeader title="Select Clinical Date" desc="Choose a date for your medical nodal encounter." />
                  <div className="grid grid-cols-3 gap-6">
                    <DateCard label="TODAY" date="30 JAN" active={selectedDate === 'TODAY'} onClick={() => setSelectedDate('TODAY')} />
                    <DateCard label="TOMORROW" date="31 JAN" active={selectedDate === 'TOMORROW'} onClick={() => setSelectedDate('TOMORROW')} />
                    <DateCard label="UPCOMING" date="01 FEB" active={selectedDate === '01FEB'} onClick={() => setSelectedDate('01FEB')} />
                  </div>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-12">
                  <StepHeader title="Reserve Time Slot" desc="Specify the exact temporal window for consultation." />
                  <div className="grid grid-cols-3 gap-4">
                    {['10:00 AM', '11:00 AM', '02:00 PM', '04:00 PM', '05:30 PM', '06:00 PM'].map(slot => (
                      <button key={slot} onClick={() => setSelectedSlot(slot)} className={`py-6 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${selectedSlot === slot ? 'bg-blue-600 text-white shadow-xl' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}>
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {bookingStep === 3 && (
                <div className="space-y-12">
                  <StepHeader title="Select Consultation Mode" desc="Choose between virtual orbital link or in-clinic physical node." />
                  <div className="grid grid-cols-2 gap-8">
                    <ModeCard title="VIDEO LINK" icon={<Video />} active={consultationType === 'VIDEO'} onClick={() => setConsultationType('VIDEO')} desc="Secure point-to-point video transmission." />
                    <ModeCard title="IN-PERSON" icon={<User />} active={consultationType === 'CLINIC'} onClick={() => setConsultationType('CLINIC')} desc="Physical presence at Apollo Indraprastha." />
                  </div>
                </div>
              )}

              {bookingStep === 4 && (
                <div className="space-y-12">
                  <StepHeader title="Patient Clinical Details" desc="Provide basic identity and concern parameters for the clinician." />
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
                      <input
                        type="text"
                        value={patientDetails.name}
                        onChange={(e) => setPatientDetails({ ...patientDetails, name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 p-6 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold"
                        placeholder="Citizen Name"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Age / Gender</label>
                      <div className="flex space-x-4">
                        <input
                          type="number"
                          value={patientDetails.age}
                          onChange={(e) => setPatientDetails({ ...patientDetails, age: e.target.value })}
                          className="w-24 bg-slate-50 border border-slate-100 p-6 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold"
                          placeholder="25"
                        />
                        <select
                          value={patientDetails.gender}
                          onChange={(e) => setPatientDetails({ ...patientDetails, gender: e.target.value })}
                          className="flex-1 bg-slate-50 border border-slate-100 p-6 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold"
                        >
                          <option value="MALE">MALE</option>
                          <option value="FEMALE">FEMALE</option>
                          <option value="OTHER">OTHER</option>
                        </select>
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reason for Visit</label>
                      <textarea
                        value={patientDetails.reason}
                        onChange={(e) => setPatientDetails({ ...patientDetails, reason: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-100 p-6 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 font-bold min-h-[120px]"
                        placeholder="Describe clinical concerns..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {bookingStep === 5 && (
                <div className="space-y-12">
                  <StepHeader title="Integrity Confirmation" desc="Review your clinical requisition details before locking." />
                  <div className="bg-slate-50 p-10 rounded-[3rem] border border-slate-100 space-y-8">
                    <ReviewRow label="Target Clinician" val={doctor.name} />
                    <ReviewRow label="Temporal Slot" val={`${selectedDate}, ${selectedSlot}`} />
                    <ReviewRow label="Patient Identity" val={`${patientDetails.name} (${patientDetails.age}y, ${patientDetails.gender})`} />
                    <ReviewRow label="Mode" val={consultationType} />
                    <ReviewRow label="Financial Asset" val={`₹${doctor.fee}`} highlight />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-20 flex space-x-6">
              {bookingStep > 1 && (
                <button onClick={prevStep} className="flex-1 py-8 bg-slate-50 text-slate-400 rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-100 transition-all flex items-center justify-center space-x-3">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Previous Gate</span>
                </button>
              )}
              <button onClick={nextStep} disabled={(bookingStep === 1 && !selectedDate) || (bookingStep === 2 && !selectedSlot) || (bookingStep === 4 && !patientDetails.name)} className="flex-[2] py-8 bg-slate-950 text-white rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-blue-600 transition-all disabled:opacity-20 flex items-center justify-center space-x-3">
                <span>{bookingStep === 5 ? 'Authorize & Book' : 'Continue Transmission'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ label, val, icon }: any) {
  return (
    <div className="flex items-center space-x-4">
      <div className="p-3 bg-slate-50 rounded-xl text-slate-400">{icon}</div>
      <div>
        <span className="block text-[8px] font-black uppercase text-slate-300 tracking-widest leading-none mb-1">{label}</span>
        <span className="text-[11px] font-black uppercase tracking-tight leading-none italic">{val}</span>
      </div>
    </div>
  );
}

function SectionBox({ title, icon, children }: any) {
  return (
    <div className="bg-white rounded-[3rem] p-10 border border-slate-100 shadow-sm space-y-10 group">
      <div className="flex items-center space-x-4">
        <div className="p-4 bg-slate-50 rounded-2xl text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">{icon}</div>
        <h4 className="text-[11px] font-black uppercase tracking-widest italic">{title}</h4>
      </div>
      {children}
    </div>
  );
}

function BookingCheck({ label }: any) {
  return (
    <div className="flex items-center space-x-4">
      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
    </div>
  );
}

function StepHeader({ title, desc }: any) {
  return (
    <div>
      <h3 className="text-4xl font-[950] tracking-tighter italic uppercase leading-none mb-4">{title}</h3>
      <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.4em]">{desc}</p>
    </div>
  );
}

function DateCard({ label, date, active, onClick }: any) {
  return (
    <button onClick={onClick} className={`p-8 rounded-[2.5rem] border-2 text-center transition-all ${active ? 'bg-blue-600 border-blue-600 text-white shadow-2xl scale-105' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-slate-100'}`}>
      <span className="block text-[8px] font-black uppercase tracking-widest mb-2 opacity-60">{label}</span>
      <span className="text-2xl font-black italic">{date}</span>
    </button>
  );
}

function ModeCard({ title, icon, active, onClick, desc }: any) {
  return (
    <button onClick={onClick} className={`p-10 rounded-[3rem] border-2 text-left transition-all ${active ? 'bg-blue-600 border-blue-600 text-white shadow-2xl scale-105' : 'bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-slate-100'}`}>
      <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center mb-8 ${active ? 'bg-white/20' : 'bg-slate-100'}`}>
        {React.cloneElement(icon as React.ReactElement, { className: 'w-8 h-8' } as any)}
      </div>
      <h4 className="text-lg font-black italic uppercase tracking-tight mb-2">{title}</h4>
      <p className={`text-[9px] font-bold uppercase tracking-widest leading-relaxed ${active ? 'text-white/70' : 'text-slate-400'}`}>{desc}</p>
    </button>
  );
}

function ReviewRow({ label, val, highlight }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      <span className={`text-[11px] font-black uppercase italic ${highlight ? 'text-blue-600 text-lg' : 'text-slate-950'}`}>{val}</span>
    </div>
  );
}

function BookingConfirmation({ onExit }: any) {
  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-10 animate-in zoom-in-95 duration-700">
      <div className="bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden text-center p-24 max-w-2xl w-full relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
        <div className="w-32 h-32 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 shadow-inner border border-emerald-100">
          <CheckCircle className="w-16 h-16 text-emerald-600" />
        </div>
        <h1 className="text-5xl font-[950] tracking-tighter italic uppercase mb-6 leading-none">Appointment <br /> <span className="text-emerald-600">Successfully Locked.</span></h1>
        <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[9px] max-w-sm mx-auto mb-16 leading-relaxed">The clinical temporal window has been reserved and synced with your Digital Health Identity.</p>

        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 mb-12 flex items-center justify-between">
          <div className="text-left">
            <span className="block text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1">RESERVATION ID</span>
            <span className="text-[11px] font-black uppercase italic">#SS-APT-9283-X</span>
          </div>
          <button className="flex items-center space-x-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
            <Download className="w-4 h-4" />
            <span>RECEIPT</span>
          </button>
        </div>

        <button onClick={onExit} className="w-full py-10 bg-slate-950 text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-blue-600 transition-all">Command Hub Dashboard</button>
      </div>
    </div>
  );
}

function ArrowRight({ className }: any) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}
