'use client';

import React, { useState, useEffect } from 'react';
import {
  Calendar, Clock, User, Search, Filter, MapPin, Phone, Star, Video, Building,
  Stethoscope, Users, ChevronRight, Plus, X, CheckCircle2, AlertTriangle, TrendingUp,
  Activity, Bell, Settings, Download, Eye, Edit, Trash2, RefreshCw, CalendarDays,
  Timer, UserCheck, Hospital, Ambulance, Heart, Brain, Bone, Baby, Shield,
  FileText, BarChart3, PieChart, Play, Pause, SkipForward, MessageSquare,
  Video as VideoIcon, CreditCard, ShieldCheck, Zap, Globe, Lock, ArrowUpRight
} from 'lucide-react';
import NotificationTray from '@/components/NotificationTray';

type ViewRole = 'PATIENT' | 'DOCTOR' | 'RECEPTION' | 'SURGERY' | 'ANALYTICS';

export default function NationalSchedulingMatrix() {
  const [activeRole, setActiveRole] = useState<ViewRole>('PATIENT');
  const [loading, setLoading] = useState(true);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTimeout(() => setLoading(false), 800);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-8 border-blue-50 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <Calendar className="absolute inset-0 m-auto w-8 h-8 text-blue-600 animate-pulse" />
        </div>
        <p className="mt-8 text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">Syncing National Scheduling Matrix...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-900 font-sans selection:bg-blue-500/10">
      {/* Strategic Command Header */}
      <header className="bg-slate-950 text-white pt-24 pb-48 px-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[150px] -mr-40 -mt-40 animate-pulse"></div>
        <div className="max-w-[1700px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">National Health Service Grid Connected</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-[950] tracking-tighter leading-none italic">
              Scheduling <br /> <span className="text-blue-500">Matrix.</span>
            </h1>
            <p className="text-slate-400 text-xl font-medium max-w-2xl italic tracking-tight opacity-70">
              Unified institutional scheduling for citizens, clinicians, and health command nodes.
            </p>
          </div>

          <div className="flex bg-white/5 p-1.5 rounded-[2rem] border border-white/10 backdrop-blur-xl">
            <RoleTrigger label="Patient" active={activeRole === 'PATIENT'} onClick={() => setActiveRole('PATIENT')} icon={<User className="w-4 h-4" />} />
            <RoleTrigger label="Doctor" active={activeRole === 'DOCTOR'} onClick={() => setActiveRole('DOCTOR')} icon={<Stethoscope className="w-4 h-4" />} />
            <RoleTrigger label="Reception" active={activeRole === 'RECEPTION'} onClick={() => setActiveRole('RECEPTION')} icon={<Hospital className="w-4 h-4" />} />
            <RoleTrigger label="Surgery" active={activeRole === 'SURGERY'} onClick={() => setActiveRole('SURGERY')} icon={<Activity className="w-4 h-4" />} />
            <RoleTrigger label="Analytics" active={activeRole === 'ANALYTICS'} onClick={() => setActiveRole('ANALYTICS')} icon={<BarChart3 className="w-4 h-4" />} />
          </div>
        </div>
      </header>

      <main className="max-w-[1700px] mx-auto px-10 -mt-24 pb-40 relative z-20">
        {activeRole === 'PATIENT' && <PatientSection onBook={(doc: any) => { setSelectedDoctor(doc); setShowBookingModal(true); }} />}
        {activeRole === 'DOCTOR' && <DoctorSection />}
        {activeRole === 'RECEPTION' && <ReceptionSection />}
        {activeRole === 'SURGERY' && <SurgerySection />}
        {activeRole === 'ANALYTICS' && <AnalyticsSection />}
      </main>

      {/* Modern Booking Modal */}
      {showBookingModal && (
        <BookingModal doctor={selectedDoctor} onClose={() => setShowBookingModal(false)} />
      )}
    </div>
  );
}

function RoleTrigger({ label, active, onClick, icon }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-4 px-10 py-5 rounded-[1.6rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${active ? 'bg-white text-slate-900 shadow-2xl scale-105' : 'text-slate-400 hover:text-white'}`}
    >
      {React.cloneElement(icon as React.ReactElement, { className: 'w-5 h-5' } as any)}
      <span>{label}</span>
    </button>
  );
}

{/* --- PATIENT SECTION --- */ }
function PatientSection({ onBook }: any) {
  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', spec: 'Cardiology', hospital: 'Apollo Indraprastha', exp: 12, fee: 1200, rating: 4.9, slots: ['10:00 AM', '11:30 AM', '14:00 PM'] },
    { id: 2, name: 'Dr. Michael Chen', spec: 'Orthopedics', hospital: 'Fortis Gurgaon', exp: 15, fee: 1500, rating: 4.8, slots: ['09:00 AM', '12:00 PM', '16:30 PM'] },
    { id: 3, name: 'Dr. Aman Verma', spec: 'Neurology', hospital: 'AIIMS Delhi', exp: 8, fee: 1200, rating: 4.7, slots: ['11:00 AM', '13:30 PM', '15:00 PM'] },
  ];

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-12 duration-700">
      <div className="bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-[100px] -mr-80 -mt-80 opacity-50"></div>
        <div className="flex flex-col md:flex-row items-center justify-between mb-16 gap-8 relative z-10">
          <div>
            <h3 className="text-3xl font-[950] tracking-tighter italic leading-none mb-3">Institutional Resource Network</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Search 142k+ verified national specialists</p>
          </div>
          <div className="flex items-center space-x-6 w-full md:w-auto">
            <div className="relative group flex-1 md:w-96">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input type="text" placeholder="Consultation by spec, name, or node..." className="w-full bg-slate-50 border-none rounded-[2rem] py-6 pl-16 pr-8 outline-none font-bold text-sm focus:ring-4 focus:ring-blue-500/5" />
            </div>
            <button className="p-6 bg-slate-900 text-white rounded-[2rem] shadow-xl hover:bg-blue-600 transition-all active:scale-90">
              <Filter className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 relative z-10">
          {doctors.map(doc => (
            <DoctorCard key={doc.id} doc={doc} onBook={() => onBook(doc)} />
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
          <h4 className="text-sm font-black text-blue-400 uppercase tracking-[0.4em] mb-12 italic">Your Pro-Health Timeline</h4>
          <div className="space-y-8">
            <TimelineItem date="TOMORROW 14:00" type="CARDIO" status="SYNCED" doctor="Dr. Johnson" node="Apollo" />
            <TimelineItem date="02 FEB 2026" type="VACCINE" status="PENDING" doctor="Automated Unit" node="Safdarjung" />
          </div>
        </div>
        <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm relative overflow-hidden">
          <div className="flex items-center space-x-4 mb-12">
            <Zap className="w-8 h-8 text-amber-500" />
            <h4 className="text-2xl font-[950] tracking-tighter italic uppercase">Tele-Consult Portal</h4>
          </div>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest leading-relaxed mb-10">Secure, E2E encrypted virtual rooms for instant national-tier consultations.</p>
          <button className="w-full py-8 bg-blue-600 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all">Launch Virtual Command</button>
        </div>
      </div>
    </div>
  );
}

function DoctorCard({ doc, onBook }: any) {
  return (
    <div className="bg-slate-50/50 border border-slate-100 rounded-[3.5rem] p-10 hover:bg-white hover:border-blue-500/20 hover:shadow-2xl transition-all duration-700 group cursor-pointer">
      <div className="flex items-start justify-between mb-10">
        <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center border border-slate-100 shadow-sm group-hover:scale-110 transition-transform">
          <Stethoscope className="w-10 h-10 text-blue-600" />
        </div>
        <div className="text-right">
          <div className="flex items-center space-x-2 text-amber-500 mb-1">
            <Star className="w-4 h-4 fill-amber-500" />
            <span className="text-lg font-black italic">{doc.rating}</span>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{doc.exp}Y EXPERIENCE</span>
        </div>
      </div>
      <div>
        <h4 className="text-3xl font-[950] tracking-tighter italic leading-none mb-2 group-hover:text-blue-600 transition-colors uppercase">{doc.name}</h4>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-10">{doc.spec} • {doc.hospital}</p>
      </div>
      <div className="flex items-center justify-between pt-8 border-t border-slate-100">
        <div>
          <span className="block text-[8px] font-black text-slate-300 uppercase tracking-widest mb-1 leading-none">CONSULTATION</span>
          <span className="text-2xl font-black text-slate-900">₹{doc.fee}</span>
        </div>
        <button onClick={onBook} className="w-16 h-16 bg-slate-900 text-white rounded-[1.8rem] flex items-center justify-center hover:bg-blue-600 transition-all active:scale-90 shadow-2xl">
          <Plus className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}

function TimelineItem({ date, type, status, doctor, node }: any) {
  return (
    <div className="flex items-center justify-between p-6 bg-white/5 border border-white/5 rounded-3xl group hover:bg-white/10 transition-all">
      <div className="flex items-center space-x-8">
        <div className="text-right">
          <span className="block text-xl font-black tabular-nums leading-none mb-1">{date.split(' ')[0]}</span>
          <span className="text-[10px] font-bold text-slate-400 leading-none">{date.split(' ')[1]}</span>
        </div>
        <div className="w-px h-10 bg-white/10"></div>
        <div>
          <h5 className="font-bold text-sm tracking-tight">{type} CONSULT</h5>
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{doctor} • {node}</p>
        </div>
      </div>
      <div className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${status === 'SYNCED' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-blue-500/10 text-blue-400'}`}>
        {status}
      </div>
    </div>
  );
}

{/* --- DOCTOR SECTION --- */ }
function DoctorSection() {
  const appointments = [
    { id: 101, time: '10:00 AM', patient: 'Rajesh Kumar', healthId: 'IND-HID-9012', reason: 'High Blood Pressure', status: 'CONFIRMED' },
    { id: 102, time: '11:15 AM', patient: 'Anita Sharma', healthId: 'IND-HID-3341', reason: 'Routine Checkup', status: 'PENDING' },
    { id: 103, time: '12:30 PM', patient: 'Vikram Singh', healthId: 'IND-HID-1212', reason: 'Post-Surgery Followup', status: 'CONFIRMED' },
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-12 animate-in slide-in-from-bottom-12 duration-700">
      <div className="lg:col-span-8 bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm relative overflow-hidden">
        <h3 className="text-4xl font-[950] tracking-tighter italic mb-16 uppercase">Clinical Schedule</h3>
        <div className="space-y-6">
          {appointments.map(apt => (
            <div key={apt.id} className="flex flex-col md:flex-row items-center justify-between p-10 bg-slate-50/50 border border-slate-100/50 rounded-[3rem] hover:bg-white hover:border-blue-500/30 hover:shadow-2xl transition-all duration-700 group cursor-pointer group">
              <div className="flex items-center space-x-12 flex-1">
                <div className="w-24 h-24 bg-slate-900 text-white rounded-[2.2rem] flex flex-col items-center justify-center font-black italic shadow-2xl group-hover:bg-blue-600 transition-colors">
                  <span className="text-xl leading-none mb-1">{apt.time.split(' ')[0]}</span>
                  <span className="text-[10px] opacity-40 leading-none">{apt.time.split(' ')[1]}</span>
                </div>
                <div>
                  <div className="flex items-center space-x-4 mb-2">
                    <h4 className="text-2xl font-[950] italic tracking-tighter uppercase group-hover:text-blue-600 transition-colors">{apt.patient}</h4>
                    <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest ${apt.status === 'CONFIRMED' ? 'bg-emerald-500 text-white' : 'bg-slate-950 text-white'}`}>{apt.status}</span>
                  </div>
                  <div className="flex space-x-8 text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                    <span>{apt.healthId}</span>
                    <span>{apt.reason}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-6 mt-8 md:mt-0">
                <button className="w-14 h-14 bg-white border border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all shadow-sm"><CheckCircle2 className="w-6 h-6" /></button>
                <button className="w-14 h-14 bg-white border border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"><X className="w-6 h-6" /></button>
                <button className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-blue-600 transition-all shadow-xl"><ArrowUpRight className="w-6 h-6" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 space-y-12">
        <div className="bg-slate-900 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
          <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-12 italic">Utilization Metrics</h4>
          <div className="space-y-12">
            <CapacityStat label="Patient Capacity" value="84%" trend="HIGH LOAD" color="orange" />
            <CapacityStat label="Avg Consultation" value="18m" trend="NOMINAL" color="emerald" />
            <CapacityStat label="Revenue Today" value="₹18.4k" trend="+12.2%" color="blue" />
          </div>
        </div>
      </div>
    </div>
  );
}

function CapacityStat({ label, value, trend, color }: any) {
  const colors = { blue: 'text-blue-500', orange: 'text-orange-500', emerald: 'text-emerald-500' }[color as 'blue' | 'orange' | 'emerald'];
  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="block text-[10px] font-black uppercase tracking-widest opacity-30 mb-2">{label}</span>
        <span className="text-3xl font-black tracking-tighter leading-none">{value}</span>
      </div>
      <div className={`text-[8px] font-black px-4 py-1.5 bg-white/5 rounded-full uppercase tracking-widest ${colors}`}>
        {trend}
      </div>
    </div>
  );
}

{/* --- RECEPTION SECTION --- */ }
function ReceptionSection() {
  const queue = [
    { token: 'A-01', name: 'Rajesh Kumar', doctor: 'Dr. Johnson', status: 'WAITING', time: '5m ago' },
    { token: 'A-02', name: 'Anita Sharma', doctor: 'Dr. V. Aditya', status: 'CALLED', time: '1m ago' },
    { token: 'B-09', name: 'Vikram Singh', doctor: 'Dr. Chen', status: 'IN-CLINIC', time: '12m ago' },
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-12 animate-in slide-in-from-bottom-12 duration-700">
      <div className="lg:col-span-8 bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h3 className="text-4xl font-[950] tracking-tighter italic uppercase">Live Queue Monitor</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Integrated Institutional Token Stream</p>
          </div>
          <button className="bg-slate-900 text-white px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-blue-600 transition-all flex items-center space-x-4">
            <Plus className="w-5 h-5" />
            <span>Walk-in Registry</span>
          </button>
        </div>

        <div className="space-y-6">
          {queue.map(q => (
            <div key={q.token} className="flex items-center justify-between p-10 bg-slate-50/50 border border-slate-100/50 rounded-[3rem] group hover:bg-white hover:shadow-xl transition-all">
              <div className="flex items-center space-x-12">
                <div className="w-20 h-20 bg-white border border-slate-100 rounded-[2rem] flex items-center justify-center text-2xl font-black italic shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all">
                  {q.token}
                </div>
                <div>
                  <h4 className="text-2xl font-[950] italic tracking-tighter uppercase">{q.name}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{q.doctor} • {q.time}</p>
                </div>
              </div>
              <div className="flex items-center space-x-12">
                <span className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest ${q.status === 'CALLED' ? 'bg-amber-500 text-white animate-pulse' : q.status === 'IN-CLINIC' ? 'bg-emerald-500 text-white' : 'bg-slate-900 text-white'}`}>{q.status}</span>
                <button className="w-14 h-14 bg-white border border-slate-100 text-slate-400 rounded-2xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                  <Bell className="w-6 h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 space-y-12">
        <div className="bg-blue-600 rounded-[3.5rem] p-12 text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
          <h4 className="text-[10px] font-black text-blue-200 uppercase tracking-[0.4em] mb-12 italic">Queue Analytics</h4>
          <div className="space-y-10">
            <div className="text-center py-10 border-b border-white/10">
              <span className="block text-6xl font-[950] italic italic tabular-nums">14m</span>
              <span className="text-[10px] font-black uppercase text-blue-200 tracking-widest">Avg Waiting Time</span>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="text-center">
                <span className="block text-2xl font-black italic">84</span>
                <span className="text-[8px] font-black uppercase opacity-60">Tokens Today</span>
              </div>
              <div className="text-center">
                <span className="block text-2xl font-black italic text-emerald-300"> 2</span>
                <span className="text-[8px] font-black uppercase opacity-60">Avg Dr Delay</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* --- SURGERY SECTION --- */ }
function SurgerySection() {
  const surgeries = [
    { id: 'OT-01', patient: 'Deepak Hooda', type: 'Angioplasty', surgeon: 'Dr. V. Aditya', time: '14:00 PM', conflict: false },
    { id: 'OT-02', patient: 'Meena Kumari', type: 'Bypass Sync', surgeon: 'Dr. S. Johnson', time: '14:30 PM', conflict: true },
  ];

  return (
    <div className="grid lg:grid-cols-12 gap-12 animate-in slide-in-from-bottom-12 duration-700">
      <div className="lg:col-span-12 bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between mb-16">
          <div>
            <h3 className="text-4xl font-[950] tracking-tighter italic uppercase">Surgical Command Matrix</h3>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">Institutional OT & Surgeon Resource Grid</p>
          </div>
          <button className="bg-slate-900 text-white px-10 py-5 rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-rose-600 transition-all flex items-center space-x-4">
            <Plus className="w-5 h-5" />
            <span>Schedule Surgery</span>
          </button>
        </div>

        <div className="space-y-6">
          {surgeries.map(s => (
            <div key={s.id} className={`flex flex-col md:flex-row items-center justify-between p-12 rounded-[4rem] border transition-all ${s.conflict ? 'bg-rose-50 border-rose-100 shadow-xl' : 'bg-slate-50 border-slate-50 hover:bg-white hover:shadow-2xl'}`}>
              <div className="flex items-center space-x-12 flex-1">
                <div className={`w-24 h-24 rounded-[2.5rem] flex flex-col items-center justify-center text-white font-[950] italic italic shadow-2xl ${s.conflict ? 'bg-rose-600' : 'bg-slate-900'}`}>
                  {s.id.split('-')[1]}
                </div>
                <div>
                  <div className="flex items-center space-x-6 mb-3">
                    <h4 className="text-3xl font-[950] italic tracking-tighter uppercase leading-none">{s.patient}</h4>
                    {s.conflict && (
                      <span className="flex items-center space-x-2 bg-rose-600 text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase animate-pulse">
                        <AlertTriangle className="w-3 h-3" />
                        <span>OT CONFLICT DETECTED</span>
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-10 text-[11px] font-bold text-slate-400 uppercase tracking-widest italic">
                    <span>{s.type}</span>
                    <span>Surgeon: {s.surgeon}</span>
                    <span>Clock: {s.time}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-10 mt-10 md:mt-0">
                <button className={`px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg transition active:scale-95 ${s.conflict ? 'bg-rose-600 text-white hover:bg-rose-700' : 'bg-white text-slate-900 hover:bg-slate-900 hover:text-white'}`}>Resolve & Sync</button>
                <button className="w-16 h-16 bg-white border border-slate-100 rounded-[1.8rem] flex items-center justify-center text-slate-400 hover:text-blue-600 transition-all shadow-sm">
                  <ArrowUpRight className="w-7 h-7" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

{/* --- ANALYTICS SECTION --- */ }
function AnalyticsSection() {
  return (
    <div className="grid lg:grid-cols-12 gap-12 animate-in slide-in-from-bottom-12 duration-700">
      <div className="lg:col-span-12 bg-white rounded-[4rem] p-16 border border-slate-100 shadow-sm text-center">
        <h3 className="text-5xl font-[950] tracking-tighter italic mb-8 uppercase">Institutional Performance Stream</h3>
        <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.4em] mb-20 leading-relaxed max-w-2xl mx-auto italic italic">Live visualization of doctor utilization, average wait times, and national booking density.</p>
        <div className="grid md:grid-cols-3 gap-12">
          <AnalyticsPlot label="Booking Density" value={82} color="bg-blue-600" />
          <AnalyticsPlot label="Staff Efficiency" value={94} color="bg-emerald-500" />
          <AnalyticsPlot label="Queue Optimization" value={76} color="bg-indigo-600" />
        </div>
      </div>
    </div>
  );
}

function AnalyticsPlot({ label, value, color }: any) {
  return (
    <div className="space-y-8 p-10 bg-slate-50 rounded-[3rem] border border-slate-100">
      <div className="relative w-40 h-40 mx-auto">
        <div className="absolute inset-0 border-[12px] border-slate-200 rounded-full"></div>
        <div className={`absolute inset-0 border-[12px] ${color} border-t-transparent rounded-full`} style={{ transform: `rotate(${value * 3.6}deg)` }}></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-black italic tracking-tighter leading-none">{value}%</span>
        </div>
      </div>
      <span className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] italic">{label}</span>
    </div>
  );
}

{/* --- MODALS --- */ }
function BookingModal({ doctor, onClose }: any) {
  const [step, setStep] = useState(1);
  const slots = ['10:00 AM', '11:30 AM', '14:00 PM', '15:30 PM'];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-3xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[4rem] shadow-[0_0_100px_rgba(0,0,0,0.1)] max-w-2xl w-full p-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50 rounded-full blur-[100px] -mr-40 -mt-40 opacity-50"></div>
        <button onClick={onClose} className="absolute right-12 top-12 p-4 bg-slate-50 rounded-2xl text-slate-300 hover:text-slate-900 transition-all hover:rotate-90">
          <X className="w-8 h-8" />
        </button>

        <div className="relative z-10 mb-16">
          <div className="flex items-center space-x-8 mb-4">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl">
              <Lock className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-4xl font-[950] tracking-tighter italic leading-none">Security Matrix</h3>
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest leading-none mt-2 block">Identity Verified Slot Booking</span>
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="space-y-12 animate-in slide-in-from-right-12 duration-500">
            <div>
              <h4 className="text-lg font-black tracking-tight mb-4 group-hover:text-blue-600 transition-colors uppercase">Select Strategic Slot</h4>
              <div className="grid grid-cols-2 gap-6">
                {slots.map(s => (
                  <button key={s} onClick={() => setStep(2)} className="py-6 px-10 bg-slate-50 border border-slate-100 rounded-[2rem] font-black italic hover:bg-blue-600 hover:text-white transition-all shadow-sm hover:shadow-2xl">{s}</button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase text-blue-600 tracking-widest">In-Person</span>
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <div className="p-8 bg-slate-50/50 rounded-[2.5rem] border border-slate-100 flex items-center justify-between opacity-50 grayscale">
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Video Hub</span>
                <VideoIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12 animate-in slide-in-from-right-12 duration-500">
            <div className="p-10 bg-blue-600 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-[4rem] group-hover:scale-110 transition-transform"></div>
              <h4 className="text-[10px] font-black text-blue-200 uppercase tracking-[0.4em] mb-12 italic">Identity Verification</h4>
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black text-blue-200 uppercase tracking-widest italic ml-4">Enter Health-ID OTP</label>
                  <input type="text" placeholder="× × ×  × × ×" className="w-full bg-white/10 border border-white/20 rounded-2xl py-6 px-10 text-center tracking-[1em] text-2xl font-black outline-none focus:bg-white/20 transition-all font-mono" />
                </div>
              </div>
            </div>
            <button onClick={() => { alert('Identity Verified. Booking Synchronized.'); onClose(); }} className="w-full py-8 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-blue-600 active:scale-95 transition-all">Finalize Security Matrix</button>
          </div>
        )}
      </div>
    </div>
  );
}
