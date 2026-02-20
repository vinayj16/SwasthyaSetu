'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Video, VideoOff, Mic, MicOff, Phone, MessageSquare, Send, Paperclip,
  Download, Clock, Users, FileText, AlertCircle, CheckCircle, X,
  Monitor, Volume2, VolumeX, Settings, Star, Calendar, User,
  Stethoscope, Camera, CameraOff, ShieldCheck, Zap, Activity,
  ChevronRight, Brain, Pill, ClipboardList, Info, Maximize2,
  Minimize2, ExternalLink, Share2, Heart, HeartPulse, RefreshCw
} from 'lucide-react';
import NotificationTray from '@/components/NotificationTray';

type ConsultationState = 'CONNECTING' | 'ACTIVE' | 'SUMMARY';
type ViewMode = 'VIDEO' | 'CHAT';

export default function NationalTelemedicineHub() {
  const params = useParams();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('VIDEO');
  const [sessionState, setSessionState] = useState<ConsultationState>('CONNECTING');
  const [showMedicalData, setShowMedicalData] = useState(true);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const connTimer = setTimeout(() => setSessionState('ACTIVE'), 2000);
    const interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    return () => { clearTimeout(connTimer); clearInterval(interval); };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndConsultation = () => {
    setSessionState('SUMMARY');
  };

  if (sessionState === 'CONNECTING') {
    return (
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center">
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 border-8 border-blue-500/10 rounded-full"></div>
          <div className="absolute inset-0 border-8 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <ShieldCheck className="absolute inset-0 m-auto w-10 h-10 text-blue-500 animate-pulse" />
        </div>
        <p className="mt-12 text-[10px] font-black uppercase tracking-[0.5em] text-blue-400">establishing encrypted node link...</p>
        <div className="mt-4 flex space-x-2">
          {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }}></div>)}
        </div>
      </div>
    );
  }

  if (sessionState === 'SUMMARY') {
    return <SessionDebrief doctor="Dr. Sarah Johnson" onExit={() => router.push('/dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-slate-950 font-sans selection:bg-blue-500/10">
      {/* Telemedicine Command Header */}
      <header className="fixed top-0 w-full z-50 bg-slate-950 text-white px-8 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-8">
          <Link href="/dashboard" className="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-slate-400 hover:text-white transition">
            <X className="w-6 h-6" />
          </Link>
          <div className="h-10 w-px bg-white/10"></div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img src="/api/placeholder/100/100" className="w-12 h-12 rounded-2xl border-2 border-blue-500 shadow-2xl" alt="Dr" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-950 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight leading-none italic uppercase">Dr. Sarah Johnson</h2>
              <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mt-1">Senior Cardiologist • Hub Node DEL-01</p>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-4 bg-white/5 px-6 py-2.5 rounded-full border border-white/10">
            <Clock className="w-4 h-4 text-slate-500" />
            <span className="text-xl font-black tabular-nums tracking-tight">{formatTime(timer)}</span>
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-2">Elapsed</span>
          </div>
          <div className="flex items-center space-x-2 bg-emerald-500/10 px-6 py-2.5 rounded-full border border-emerald-500/20">
            <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Live Transmitting</span>
          </div>
          <button onClick={handleEndConsultation} className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center space-x-3 transition-all shadow-xl shadow-rose-600/20">
            <Phone className="w-4 h-4" />
            <span>End Session</span>
          </button>
        </div>
      </header>

      <main className="pt-32 pb-12 px-8 h-screen flex gap-8">
        {/* Left Aspect: The Focus Hub */}
        <div className="flex-1 flex flex-col gap-6">
          {/* View Mode Switcher */}
          <div className="flex bg-slate-100 p-1.5 rounded-[2rem] border border-slate-200 w-fit">
            <ViewTrigger label="Video Link" active={viewMode === 'VIDEO'} onClick={() => setViewMode('VIDEO')} icon={<Video className="w-4 h-4" />} />
            <ViewTrigger label="Clinical Chat" active={viewMode === 'CHAT'} onClick={() => setViewMode('CHAT')} icon={<MessageSquare className="w-4 h-4" />} />
          </div>

          <div className="flex-1 relative bg-slate-900 rounded-[3.5rem] overflow-hidden shadow-2xl group border-[6px] border-white ring-1 ring-slate-100">
            {viewMode === 'VIDEO' ? (
              <VideoInterface isMuted={isMuted} isCameraOn={isCameraOn} onToggleMic={() => setIsMuted(!isMuted)} onToggleCam={() => setIsCameraOn(!isCameraOn)} onPrescribe={() => setShowPrescriptionModal(true)} />
            ) : (
              <ChatInterface />
            )}
          </div>
        </div>

        {/* Right Aspect: Patient Intelligence Panel */}
        {showMedicalData && (
          <aside className="w-[450px] flex flex-col gap-6 animate-in slide-in-from-right-12 duration-700">
            <PatientIntelligence onPrescribe={() => setShowPrescriptionModal(true)} />
            <SessionLogCard />
            <EncryptionStatusCard />
          </aside>
        )}
      </main>

      {showPrescriptionModal && (
        <PrescriptionTerminal onClose={() => setShowPrescriptionModal(false)} />
      )}
    </div>
  );
}

function ViewTrigger({ label, active, onClick, icon }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center space-x-3 px-10 py-5 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest transition-all duration-500 ${active ? 'bg-white text-slate-950 shadow-xl scale-105' : 'text-slate-400 hover:text-slate-900'}`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

{/* --- VIDEO INTERFACE --- */ }
function VideoInterface({ isMuted, isCameraOn, onToggleMic, onToggleCam, onPrescribe }: any) {
  return (
    <div className="h-full relative flex flex-col justify-center items-center">
      {/* Main Video View (Doctor Placeholder) */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 flex flex-col items-center justify-center text-center p-12">
        <div className="w-48 h-48 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700 mb-8 shadow-2xl relative">
          <Users className="w-20 h-20 text-slate-600" />
          <div className="absolute top-4 right-4 text-blue-500 animate-pulse"><Zap className="w-6 h-6" /></div>
        </div>
        <h3 className="text-3xl font-[950] text-slate-200 tracking-tighter uppercase italic leading-none">Doctor Stream Active</h3>
        <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.5em] mt-6">Secure point-to-point orbital link enabled</p>
        <div className="mt-12 flex space-x-2">
          {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-2 h-8 bg-blue-500/20 rounded-full animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}></div>)}
        </div>
      </div>

      {/* Patient Overlay (PiP) */}
      <div className="absolute bottom-12 right-12 w-80 h-48 bg-slate-800 rounded-[2.5rem] border-4 border-slate-700 shadow-2xl overflow-hidden group">
        <div className="h-full flex flex-col items-center justify-center bg-slate-900 relative">
          {!isCameraOn ? <CameraOff className="w-10 h-10 text-slate-700" /> : <User className="w-10 h-10 text-blue-500/50" />}
          <div className="absolute bottom-4 left-4 flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${isCameraOn ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
            <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">PATIENT NODAL VIEW</span>
          </div>
        </div>
      </div>

      {/* Video Control HUD */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-6 bg-slate-950/80 backdrop-blur-3xl px-12 py-6 rounded-[3rem] border border-white/5 shadow-2xl hover:scale-105 transition-transform duration-500">
        <ControlBtn icon={isMuted ? <MicOff /> : <Mic />} onClick={onToggleMic} active={isMuted} red />
        <ControlBtn icon={isCameraOn ? <Camera /> : <CameraOff />} onClick={onToggleCam} active={!isCameraOn} red />
        <div className="w-px h-10 bg-white/10 mx-2"></div>
        <ControlBtn icon={<Monitor />} />
        <ControlBtn icon={<FileText />} onClick={onPrescribe} active={false} glow />
        <ControlBtn icon={<Settings />} />
      </div>
    </div>
  );
}

function ControlBtn({ icon, onClick, active, red, glow }: any) {
  return (
    <button onClick={onClick} className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${active ? (red ? 'bg-rose-600 text-white' : 'bg-white text-slate-950') : 'text-slate-400 hover:text-white hover:bg-white/10'} ${glow ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50' : ''}`}>
      {React.cloneElement(icon as React.ReactElement, { className: 'w-6 h-6' } as any)}
    </button>
  );
}

{/* --- CHAT INTERFACE --- */ }
function ChatInterface() {
  const [msgs, setMsgs] = useState([
    { id: 1, sender: 'Doctor', val: 'Hello Vinay, I see your latest ECG report has some variations.', time: '15:01', type: 'text' },
    { id: 2, sender: 'Patient', val: 'Yes doctor, I was feeling some mild palpitations last night.', time: '15:02', type: 'text' },
    { id: 3, sender: 'Doctor', val: 'Understood. Are you taking your 5mg Lisinopril regularly?', time: '15:03', type: 'text' },
  ]);
  const [inp, setInp] = useState('');

  const send = () => {
    if (!inp) return;
    setMsgs([...msgs, { id: Date.now(), sender: 'Patient', val: inp, time: '15:04', type: 'text' }]);
    setInp('');
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="flex-1 p-12 overflow-y-auto space-y-8">
        {msgs.map(m => (
          <div key={m.id} className={`flex ${m.sender === 'Patient' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] p-8 rounded-[2.5rem] ${m.sender === 'Patient' ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-900 border border-slate-100'}`}>
              <span className="block text-[8px] font-black uppercase tracking-widest opacity-60 mb-2">{m.sender} • {m.time}</span>
              <p className="text-sm font-bold leading-relaxed">{m.val}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="p-8 border-t border-slate-100 flex items-center space-x-6">
        <button className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all"><Paperclip className="w-6 h-6" /></button>
        <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} placeholder="Transmit message to doctor..." className="flex-1 bg-slate-50 border-none rounded-[1.8rem] py-6 px-10 text-sm font-bold outline-none ring-0" />
        <button onClick={send} className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center shadow-xl hover:bg-blue-700 transition-all"><Send className="w-6 h-6" /></button>
      </div>
    </div>
  );
}

{/* --- PATIENT INTELLIGENCE PANEL --- */ }
function PatientIntelligence({ onPrescribe }: any) {
  return (
    <div className="bg-white rounded-[3.5rem] p-12 border border-slate-100 shadow-sm space-y-12">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-[950] tracking-tighter italic uppercase underline decoration-blue-500 underline-offset-8">Patient Deep-Dive</h3>
        <button className="p-3 bg-slate-50 rounded-xl text-slate-400"><Maximize2 className="w-5 h-5" /></button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <MiniStats label="HEART RATE" val="78 BPM" color="text-rose-500" icon={<HeartPulse />} />
        <MiniStats label="BP LEVEL" val="138/84" color="text-amber-500" icon={<Activity />} />
      </div>

      <div className="space-y-6">
        <h4 className="text-[10px] font-black text-slate-300 uppercase tracking-widest italic">Clinical History Feed</h4>
        <div className="space-y-4">
          <HistoryItem title="Vitamin D correction" date="2025-12-15" node="AIIMS HUB" />
          <HistoryItem title="General OPD Review" date="2025-10-20" node="MAX NODE" />
        </div>
      </div>

      <button onClick={onPrescribe} className="w-full py-6 bg-slate-950 text-white rounded-[1.8rem] text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center space-x-3 shadow-2xl hover:bg-blue-600 transition-all">
        <ClipboardList className="w-5 h-5" />
        <span>Initialize Prescription</span>
      </button>
    </div>
  );
}

function MiniStats({ label, val, color, icon }: any) {
  return (
    <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
      <div className="flex items-center space-x-3 opacity-30 mb-2">
        {React.cloneElement(icon as React.ReactElement, { className: 'w-3 h-3' } as any)}
        <span className="text-[8px] font-black uppercase tracking-widest">{label}</span>
      </div>
      <span className={`text-xl font-black italic tracking-tight ${color}`}>{val}</span>
    </div>
  );
}

function HistoryItem({ title, date, node }: any) {
  return (
    <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all cursor-pointer group">
      <div>
        <h5 className="text-[11px] font-black uppercase tracking-tight group-hover:text-blue-600 transition-colors">{title}</h5>
        <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">{node} • {date}</p>
      </div>
      <ChevronRight className="w-4 h-4 text-slate-200" />
    </div>
  );
}

function SessionLogCard() {
  return (
    <div className="bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl">
      <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">Real-time Session Logs</h4>
      <div className="space-y-3 font-mono text-[9px] text-slate-400">
        <div className="flex items-center space-x-4"><span className="text-emerald-500">[15:01]</span> <span>Uplink Established DEL-22</span></div>
        <div className="flex items-center space-x-4"><span className="text-blue-500">[15:04]</span> <span>Vitals Stream Sync Complete</span></div>
        <div className="flex items-center space-x-4"><span className="text-amber-500">[15:10]</span> <span>Prescription Terminal Standby</span></div>
      </div>
    </div>
  );
}

function EncryptionStatusCard() {
  return (
    <div className="p-10 bg-emerald-50 rounded-[3rem] border border-emerald-100 flex items-center space-x-6">
      <ShieldCheck className="w-12 h-12 text-emerald-600 shrink-0" />
      <p className="text-[9px] font-black text-emerald-800 uppercase tracking-widest leading-relaxed">This consultation is encrypted via AES-256 and compliant with the National Digital Health Protocol.</p>
    </div>
  );
}

{/* --- PRESCRIPTION TERMINAL --- */ }
function PrescriptionTerminal({ onClose }: any) {
  const [items, setItems] = useState([{ name: 'Lisinopril 5mg', dose: '1-0-1', dur: '30 Days' }]);

  return (
    <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-2xl z-[100] flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="bg-white rounded-[4rem] shadow-2xl max-w-4xl w-full p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-[100px] -mr-40 -mt-40"></div>
        <button onClick={onClose} className="absolute right-12 top-12 p-4 bg-slate-50 rounded-2xl text-slate-300 hover:text-blue-600 transition-all hover:rotate-90">
          <X className="w-8 h-8" />
        </button>

        <div className="relative z-10 mb-16">
          <div className="flex items-center space-x-8 mb-4">
            <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl">
              <ClipboardList className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-4xl font-[950] tracking-tighter italic leading-none uppercase">Prescription Terminal.</h3>
              <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest leading-none mt-2 block">Direct E-Prescription Node Generation</span>
            </div>
          </div>
        </div>

        <div className="space-y-12 relative z-10">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4 mb-4 block">Clinical Diagnosis</label>
            <textarea placeholder="e.g. Stage 1 Hypertension with mild cardiovascular strain..." className="w-full bg-slate-50 border-none rounded-[2.5rem] py-8 px-10 text-xl font-bold outline-none focus:ring-4 focus:ring-blue-500/5 transition-all min-h-[120px]" />
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between ml-4">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Medication Inventory Grid</label>
              <button onClick={() => setItems([...items, { name: '', dose: '', dur: '' }])} className="text-blue-600 font-bold text-[10px] uppercase tracking-widest hover:underline">+ Add Medicine Asset</button>
            </div>
            <div className="space-y-4">
              {items.map((item, id) => (
                <div key={id} className="grid grid-cols-12 gap-6 items-center">
                  <input placeholder="Medicine Name" value={item.name} className="col-span-6 bg-slate-50 border-none rounded-2xl py-6 px-8 text-sm font-bold" />
                  <input placeholder="Dosage" value={item.dose} className="col-span-3 bg-slate-50 border-none rounded-2xl py-6 px-8 text-sm font-bold" />
                  <input placeholder="Duration" value={item.dur} className="col-span-2 bg-slate-50 border-none rounded-2xl py-6 px-8 text-sm font-bold" />
                  <button onClick={() => setItems(items.filter((_, i) => i !== id))} className="col-span-1 text-slate-300 hover:text-rose-600 transition-colors"><X className="w-6 h-6" /></button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex bg-blue-50 p-10 rounded-[3rem] border border-blue-100 items-center justify-between">
            <div className="flex items-center space-x-6">
              <Brain className="w-10 h-10 text-blue-600" />
              <p className="text-[10px] font-black uppercase text-blue-800 tracking-widest max-w-sm">Generating authorized QR identifier for pharmacy fulfillment node verification.</p>
            </div>
            <div className="w-16 h-16 bg-white border border-blue-200 rounded-2xl flex items-center justify-center"><Zap className="w-8 h-8 text-blue-600" /></div>
          </div>

          <div className="flex space-x-6 pt-4">
            <button className="flex-1 py-10 bg-slate-100 text-slate-900 rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.4em] hover:bg-slate-200 transition-all">Download Draft</button>
            <button onClick={onClose} className="flex-[2] py-10 bg-slate-950 text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-blue-600 transition-all">Submit Final & Sync</button>
          </div>
        </div>
      </div>
    </div>
  );
}

{/* --- SESSION DEBRIEF --- */ }
function SessionDebrief({ doctor, onExit }: any) {
  return (
    <div className="min-h-screen bg-[#FDFCFB] flex items-center justify-center p-8 animate-in zoom-in-95 duration-500">
      <div className="w-full max-w-4xl bg-white rounded-[4rem] shadow-2xl border border-slate-100 overflow-hidden text-center p-24 relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
        <div className="w-32 h-32 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-12 shadow-inner border border-emerald-100">
          <CheckCircle className="w-16 h-16 text-emerald-600" />
        </div>
        <h1 className="text-6xl font-[950] tracking-tighter italic uppercase mb-6 leading-none">Consultation <br /> <span className="text-emerald-600">Concluded.</span></h1>
        <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-xs max-w-sm mx-auto mb-16 leading-relaxed">The clinical orbital link has been successfully terminated and archived.</p>

        <div className="grid grid-cols-3 gap-8 mb-20 text-center">
          <DebriefStat icon={<Clock />} label="DURATION" val="24m 42s" />
          <DebriefStat icon={<ClipboardList />} label="SCRIPTS" val="02 ASSETS" />
          <DebriefStat icon={<ShieldCheck />} label="INTEGRITY" val="100% OK" />
        </div>

        <div className="flex flex-col gap-6">
          <button onClick={onExit} className="w-full py-10 bg-slate-950 text-white rounded-[2.5rem] text-[12px] font-black uppercase tracking-[0.4em] shadow-2xl hover:bg-blue-600 transition-all">Return to Command Hub</button>
          <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-950 transition-colors">Download Session Transcript</button>
        </div>
      </div>
    </div>
  );
}

function DebriefStat({ icon, label, val }: any) {
  return (
    <div className="space-y-4">
      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto text-slate-400 border border-slate-100">{icon}</div>
      <div>
        <span className="block text-[8px] font-black uppercase text-slate-400 tracking-widest mb-1">{label}</span>
        <span className="text-lg font-black italic">{val}</span>
      </div>
    </div>
  );
}
