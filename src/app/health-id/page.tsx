'use client';

import { useState } from 'react';
import {
  Shield, Lock, Fingerprint, CreditCard, UserCheck, Eye, EyeOff,
  AlertTriangle, CheckCircle, X, Download, RefreshCw, Bell, Settings,
  QrCode, Camera, Scan, CreditCard as IdCard, Users, UserPlus, Heart, Activity,
  Calendar, Clock, MapPin, FileText, Award, Star, ChevronRight,
  Menu, Home, Globe, Flag, ShieldCheck, Key, Hash, Brain,
  Package as Kidney, Wind as Lungs, Stethoscope, TestTube, Baby, Thermometer, Wind,
  Droplets, Server, Wifi, Battery, Smartphone, MessageSquare, Mail,
  Phone, TrendingUp, TrendingDown, BarChart3, PieChart, Timer,
  Play, Pause, Volume2, Sun, Moon, Cloud, CloudRain, Flame,
  Snowflake, ThermometerSun, ActivitySquare, HeartPulse, Crown,
  Zap, BrainCircuit, Cpu, HardDrive, Cpu as CpuChip, Monitor,
  Tablet, Laptop, Monitor as Desktop, Router, Signal, SignalHigh, SignalLow,
  SignalZero, BatteryCharging, BatteryLow, BatteryFull, BatteryMedium,
  BatteryWarning, Plus
} from 'lucide-react';

export default function HealthIDPage() {
  const [activeTab, setActiveTab] = useState<'registration' | 'verification' | 'card' | 'consent' | 'emergency' | 'security'>('registration');
  const [registrationStep, setRegistrationStep] = useState(1);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [aadhaarNumber, setAadhaarNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [generatedHealthID, setGeneratedHealthID] = useState('');
  const [emergencyMode, setEmergencyMode] = useState(false);

  const healthIDData = {
    uhid: 'UHID-2026-0012345678',
    name: 'Rajesh Kumar',
    dob: '1985-06-15',
    gender: 'Male',
    bloodGroup: 'O+',
    mobile: '+91-9876543210',
    email: 'rajesh.kumar@email.com',
    emergencyContact: '+91-9876543211',
    organDonor: true,
    registrationDate: '2026-01-15',
    lastUpdated: '2026-01-30',
    status: 'active'
  };

  const consentData = [
    {
      id: 1,
      requester: 'Dr. Sarah Johnson',
      organization: 'Apollo Hospital',
      purpose: 'Medical Consultation',
      accessLevel: 'episode',
      grantedAt: '2026-01-30T10:30:00',
      expiresAt: '2026-01-30T18:30:00',
      status: 'active',
      dataAccessed: ['vitals', 'prescriptions', 'lab_results']
    },
    {
      id: 2,
      requester: 'Max Healthcare',
      organization: 'Max Healthcare',
      purpose: 'Insurance Claim',
      accessLevel: 'claim_specific',
      grantedAt: '2026-01-28T14:00:00',
      expiresAt: '2026-02-05T14:00:00',
      status: 'expired',
      dataAccessed: ['diagnosis', 'treatment_summary']
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-300';
      case 'expired': return 'text-slate-600 bg-slate-50 border-slate-300';
      case 'revoked': return 'text-red-600 bg-red-50 border-red-300';
      case 'pending': return 'text-amber-600 bg-amber-50 border-amber-300';
      default: return 'text-slate-600 bg-slate-50 border-slate-300';
    }
  };

  const handleAadhaarVerification = () => {
    if (aadhaarNumber.length === 12) {
      setShowOTPModal(true);
    } else {
      alert('Please enter a valid 12-digit Aadhaar number');
    }
  };

  const handleOTPVerification = () => {
    if (otp.length === 6) {
      setShowOTPModal(false);
      setGeneratedHealthID('UHID-2026-0012345678');
      setRegistrationStep(2);
    } else {
      alert('Please enter a valid 6-digit OTP');
    }
  };

  const handleGenerateQRCode = () => {
    setShowQRModal(true);
  };

  const handleRevokeConsent = (consentId: number) => {
    alert(`Consent revoked for request ${consentId}`);
  };

  const handleEmergencyBreakGlass = () => {
    alert('Emergency access granted - All actions will be logged and audited');
    setEmergencyMode(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">Health ID & Security System</h1>
                <p className="text-sm text-slate-600">Aadhaar-Linked • Nation-Grade Security</p>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center space-x-2 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('registration')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'registration' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
              >
                🆔 Registration
              </button>
              <button
                onClick={() => setActiveTab('verification')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'verification' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
              >
                🔍 Verification
              </button>
              <button
                onClick={() => setActiveTab('card')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'card' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
              >
                🪪 Health Card
              </button>
              <button
                onClick={() => setActiveTab('consent')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'consent' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
              >
                👁️ Consent
              </button>
              <button
                onClick={() => setActiveTab('emergency')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'emergency' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
              >
                🚨 Emergency
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'security' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-200'
                  }`}
              >
                🔐 Security
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleEmergencyBreakGlass}
                className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${emergencyMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-amber-600 text-white hover:bg-amber-700'
                  }`}
              >
                <AlertTriangle className="w-5 h-5" />
                <span>{emergencyMode ? 'Emergency ON' : 'Emergency'}</span>
              </button>
              <button className="bg-slate-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors flex items-center space-x-2">
                <Download className="w-5 h-5" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Main Content */}
        {activeTab === 'registration' && (
          <div className="bg-white border-2 border-slate-300 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Unified Health ID Registration</h2>
              <div className="flex items-center space-x-2">
                {[1, 2, 3, 4].map((step) => (
                  <div
                    key={step}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step <= registrationStep ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}
                  >
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Step 1: Aadhaar Verification */}
            {registrationStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Fingerprint className="w-16 h-16 text-indigo-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Verify Your Identity</h3>
                  <p className="text-sm text-slate-600">Enter your Aadhaar number to generate your Health ID</p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Aadhaar Number</label>
                    <input
                      type="text"
                      value={aadhaarNumber}
                      onChange={(e) => setAadhaarNumber(e.target.value.replace(/\D/g, '').slice(0, 12))}
                      placeholder="Enter 12-digit Aadhaar number"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
                      maxLength={12}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      <Shield className="w-3 h-3 inline mr-1" />
                      Your Aadhaar number is encrypted and never stored in plain text
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Mobile Number</label>
                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Enter mobile number registered with Aadhaar"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <button
                    onClick={handleAadhaarVerification}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    <Fingerprint className="w-4 h-4 inline mr-2" />
                    Verify Aadhaar
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {registrationStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <UserCheck className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Personal Information</h3>
                  <p className="text-sm text-slate-600">Complete your health profile</p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-800">
                      <CheckCircle className="w-4 h-4 inline mr-2" />
                      Health ID Generated: {generatedHealthID}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Rajesh Kumar"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      defaultValue="1985-06-15"
                      className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Blood Group</label>
                    <select className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500">
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setRegistrationStep(3)}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Health Preferences */}
            {registrationStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <Heart className="w-16 h-16 text-red-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Health Preferences</h3>
                  <p className="text-sm text-slate-600">Set your health preferences</p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <div className="border-2 border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Organ Donation</label>
                      <input type="checkbox" className="w-4 h-4 text-indigo-600" defaultChecked />
                    </div>
                    <p className="text-xs text-slate-600">
                      I consent to donate my organs after death to save lives
                    </p>
                  </div>

                  <div className="border-2 border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <label className="text-sm font-medium text-slate-700">Medical Research</label>
                      <input type="checkbox" className="w-4 h-4 text-indigo-600" />
                    </div>
                    <p className="text-xs text-slate-600">
                      I consent to participate in medical research studies
                    </p>
                  </div>

                  <button
                    onClick={() => setRegistrationStep(4)}
                    className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    Continue
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Confirmation */}
            {registrationStep === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">Registration Complete!</h3>
                  <p className="text-sm text-slate-600">Your Health ID has been successfully created</p>
                </div>

                <div className="max-w-md mx-auto space-y-4">
                  <div className="bg-indigo-50 border-2 border-indigo-200 rounded-lg p-6">
                    <div className="text-center">
                      <QrCode className="w-24 h-24 text-indigo-600 mx-auto mb-4" />
                      <p className="text-lg font-bold text-indigo-800 mb-2">{generatedHealthID}</p>
                      <p className="text-sm text-slate-600">Your Unique Health ID</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={handleGenerateQRCode}
                      className="bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      <QrCode className="w-4 h-4 inline mr-2" />
                      QR Code
                    </button>
                    <button className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                      <Download className="w-4 h-4 inline mr-2" />
                      Download
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-slate-600">
                      <Shield className="w-4 h-4 inline mr-1" />
                      Your data is encrypted and secure
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'card' && (
          <div className="bg-white border border-slate-200 rounded-[3rem] p-12 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row items-center justify-between mb-12">
              <div className="flex items-center space-x-6">
                <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white">
                  <IdCard className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight italic">National Health Identity</h2>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Digital Passport for Citizen Wellness</p>
                </div>
              </div>
              <div className="flex bg-slate-50 p-2 rounded-2xl border border-slate-100 hidden md:flex">
                <div className="px-6 py-2 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">Secure Vault Sync</span>
                </div>
              </div>
            </div>

            <div className="max-w-2xl mx-auto">
              {/* Premium Holographic Card */}
              <div className="relative group perspective-1000">
                <div className="bg-slate-950 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl transition-all duration-700 hover:rotate-y-2 hover:scale-[1.02] border border-white/5">
                  {/* Holographic Overlays */}
                  <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] -mr-40 -mt-40 animate-pulse"></div>
                  <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/10 rounded-full blur-[80px] -ml-20 -mb-20"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50"></div>
                  <div className="absolute top-12 right-12 opacity-10">
                    <ShieldCheck className="w-40 h-40" />
                  </div>

                  <div className="relative z-10">
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-16">
                      <div>
                        <div className="flex items-center space-x-3 mb-6">
                          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10 backdrop-blur-md">
                            <span className="font-black text-lg">H</span>
                          </div>
                          <h4 className="text-xs font-black uppercase tracking-[0.4em] text-blue-400">SwasthyaSetu Hub</h4>
                        </div>
                        <h3 className="text-4xl font-black tracking-tighter italic mb-2 leading-none">{healthIDData.name}</h3>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">{healthIDData.gender} • {healthIDData.dob}</p>
                      </div>
                      <div className="bg-white p-4 rounded-[2rem] border-4 border-white/10 shadow-2xl">
                        <QrCode className="w-20 h-20 text-slate-950" />
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="grid grid-cols-2 gap-y-10 gap-x-12 mb-16">
                      <Detail label="Registry Number (UHID)" value={healthIDData.uhid} color="text-blue-400" />
                      <Detail label="Aadhaar Hash (SHA-256)" value="f89c...2d3a (VERIFIED)" color="text-emerald-400" />
                      <Detail label="Blood Network Index" value={healthIDData.bloodGroup} color="text-white" />
                      <Detail label="Emergency Contact" value={healthIDData.emergencyContact} color="text-white" />
                    </div>

                    {/* Card Footer */}
                    <div className="flex items-center justify-between pt-10 border-t border-white/10">
                      <div className="flex items-center space-x-4">
                        {healthIDData.organDonor && (
                          <div className="bg-rose-500/10 border border-rose-500/20 px-4 py-1.5 rounded-full flex items-center space-x-2">
                            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-rose-400">Organ Donor</span>
                          </div>
                        )}
                        <div className="bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full flex items-center space-x-2">
                          <ShieldCheck className="w-3 h-3 text-blue-400" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">E-KYC ACTIVE</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block text-[8px] font-bold text-slate-600 uppercase tracking-widest mb-1">Issue Date</span>
                        <span className="text-[10px] font-black text-white/40">{healthIDData.registrationDate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="grid grid-cols-3 gap-6 mt-12">
                <CardAction icon={<Smartphone className="w-5 h-5" />} label="Mobile App Sync" />
                <CardAction icon={<Download className="w-5 h-5" />} label="Download PDF" primary />
                <CardAction icon={<FileText className="w-5 h-5" />} label="Secure Share" />
              </div>

              {/* Security Warning */}
              <div className="mt-12 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-start space-x-6">
                <Lock className="w-8 h-8 text-slate-300 shrink-0 mt-1" />
                <div>
                  <h5 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">Legal Compliance Notice</h5>
                  <p className="text-[10px] font-bold text-slate-400 leading-relaxed uppercase tracking-widest">
                    This Digital Health Identity Card is issued under the National Digital Health Mission framework. Your Aadhaar number is never stored in its original format. Attempts to forge or duplicate this identity are punishable under the IT Act and DPDP Act of India.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'consent' && (
          <div className="bg-white border-2 border-slate-300 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-slate-800">Consent Management</h2>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                <Plus className="w-4 h-4 inline mr-2" />
                New Consent
              </button>
            </div>

            <div className="space-y-4">
              {consentData.map((consent) => (
                <div key={consent.id} className="border-2 border-slate-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800">{consent.requester}</h3>
                      <p className="text-sm text-slate-600">{consent.organization}</p>
                      <p className="text-sm text-slate-600">{consent.purpose}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(consent.status)}`}>
                          {consent.status.toUpperCase()}
                        </span>
                        <span className="text-xs text-slate-500">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {new Date(consent.grantedAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600 mb-2">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Expires: {new Date(consent.expiresAt).toLocaleDateString()}
                      </div>
                      <div className="flex space-x-2">
                        {consent.status === 'active' && (
                          <button
                            onClick={() => handleRevokeConsent(consent.id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                          >
                            Revoke
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3">
                    <p className="text-sm font-medium text-slate-700 mb-2">Data Accessed:</p>
                    <div className="flex flex-wrap gap-2">
                      {consent.dataAccessed.map((data, index) => (
                        <span key={index} className="px-2 py-1 bg-indigo-100 text-indigo-800 border-indigo-300 rounded text-xs font-medium">
                          {data}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-slate-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">Security Architecture</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-medium text-slate-700">Data Encryption</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border-green-300">
                    AES-256
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-medium text-slate-700">Transmission Security</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border-green-300">
                    TLS 1.3
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Key className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-medium text-slate-700">Access Tokens</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border-green-300">
                    JWT/OAuth2
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Server className="w-5 h-5 text-indigo-600" />
                    <span className="text-sm font-medium text-slate-700">Hardware Security</span>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border-green-300">
                    HSM
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-white border-2 border-slate-300 rounded-lg p-6">
              <h3 className="text-lg font-bold text-slate-800 mb-4">System Status</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">System Status</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border-green-300">
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Security Level</span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border-green-300">
                    High
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Last Security Audit</span>
                  <span className="text-xs text-slate-500">2 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Active Sessions</span>
                  <span className="text-xs text-slate-500">1,247</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'emergency' && (
          <div className="bg-white border-2 border-slate-300 rounded-lg p-6">
            <div className="text-center mb-6">
              <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-slate-800 mb-2">Emergency Access</h2>
              <p className="text-sm text-slate-600">Break-glass access for critical situations</p>
            </div>

            <div className="max-w-md mx-auto space-y-4">
              <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Emergency Protocol</h3>
                <p className="text-sm text-red-600">
                  This access is only for medical emergencies where the patient is unconscious
                  and no relatives are available. All actions will be logged and audited.
                </p>
              </div>

              <div className="border-2 border-slate-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-slate-700 mb-2">When to use:</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Accident victims</li>
                  <li>• Unconscious patients</li>
                  <li>• No relatives available</li>
                  <li>• Life-threatening situations</li>
                </ul>
              </div>

              <button
                onClick={handleEmergencyBreakGlass}
                className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                <AlertTriangle className="w-4 h-4 inline mr-2" />
                Request Emergency Access
              </button>

              <div className="text-center">
                <p className="text-xs text-slate-500">
                  <Shield className="w-3 h-3 inline mr-1" />
                  All emergency access is logged and audited
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* OTP Modal */}
      {showOTPModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Verify OTP</h3>
              <button
                onClick={() => setShowOTPModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-slate-600">
                Enter the 6-digit OTP sent to {mobileNumber}
              </p>

              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="Enter 6-digit OTP"
                className="w-full px-4 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-indigo-500"
                maxLength={6}
              />

              <div className="flex space-x-3">
                <button
                  onClick={handleOTPVerification}
                  className="flex-1 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Verify OTP
                </button>
                <button
                  onClick={() => setShowOTPModal(false)}
                  className="flex-1 bg-slate-600 text-white py-3 px-4 rounded-lg hover:bg-slate-700 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-800">Health ID QR Code</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="text-center space-y-4">
              <QrCode className="w-32 h-32 text-indigo-600 mx-auto" />
              <p className="text-lg font-bold text-indigo-800">{generatedHealthID}</p>
              <p className="text-sm text-slate-600">Scan this QR code to access your Health ID</p>

              <div className="grid grid-cols-2 gap-4">
                <button className="bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  <Download className="w-4 h-4 inline mr-2" />
                  Download
                </button>
                <button className="bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium">
                  <Smartphone className="w-4 h-4 inline mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Detail({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <span className="block text-[8px] font-bold text-slate-600 uppercase tracking-widest mb-1">{label}</span>
      <span className={`text-sm font-black ${color} tracking-tight italic`}>{value}</span>
    </div>
  );
}

function CardAction({ icon, label, primary = false }: { icon: React.ReactNode; label: string; primary?: boolean }) {
  return (
    <button className={`p-6 rounded-3xl flex flex-col items-center justify-center space-y-3 transition-all active:scale-95 border ${primary ? 'bg-indigo-600 border-indigo-500 text-white shadow-xl shadow-indigo-500/20' : 'bg-white border-slate-100 text-slate-400 hover:text-slate-900 hover:border-slate-200'}`}>
      {icon}
      <span className="text-[9px] font-black uppercase tracking-widest text-center">{label}</span>
    </button>
  );
}
