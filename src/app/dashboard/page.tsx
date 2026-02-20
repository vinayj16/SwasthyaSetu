'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Heart,
  Activity,
  Thermometer,
  TestTube,
  Calendar,
  FileText,
  Pill,
  Bell,
  Search,
  User,
  Settings,
  LogOut,
  ChevronRight,
  TrendingUp,
  AlertCircle,
  Clock,
  Video,
  Upload,
  Download,
  Filter,
  Plus,
  Home,
  CalendarDays,
  FolderOpen,
  UserCircle
} from 'lucide-react';

export default function PatientDashboard() {
  const [greeting, setGreeting] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Mock data
  const [healthOverview] = useState({
    heartRate: { value: 72, status: 'normal', unit: 'bpm', lastUpdated: '2 mins ago' },
    bloodPressure: { value: '120/80', status: 'normal', unit: 'mmHg', lastUpdated: '1 hour ago' },
    temperature: { value: 98.6, status: 'normal', unit: '°F', lastUpdated: '30 mins ago' },
    lastTest: { value: 'Blood Sugar', status: 'normal', result: '95 mg/dL', lastUpdated: '2 days ago' }
  });

  const [appointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      specialization: 'Cardiologist',
      date: '2026-01-31',
      time: '10:30 AM',
      status: 'confirmed',
      type: 'in-person',
      hospital: 'Apollo Hospital'
    },
    {
      id: 2,
      doctor: 'Dr. Rajesh Kumar',
      specialization: 'General Physician',
      date: '2026-02-02',
      time: '2:00 PM',
      status: 'pending',
      type: 'video',
      hospital: 'Online Consultation'
    }
  ]);

  const [medicalRecords] = useState([
    {
      id: 1,
      type: 'Prescription',
      title: 'Antibiotics Course',
      date: '2026-01-15',
      doctor: 'Dr. Sarah Johnson',
      file: 'prescription_001.pdf'
    },
    {
      id: 2,
      type: 'Lab Report',
      title: 'Complete Blood Count',
      date: '2026-01-10',
      doctor: 'Dr. Rajesh Kumar',
      file: 'cbc_report_001.pdf'
    },
    {
      id: 3,
      type: 'X-Ray',
      title: 'Chest X-Ray',
      date: '2026-01-05',
      doctor: 'Dr. Michael Chen',
      file: 'chest_xray_001.jpg'
    }
  ]);

  const [prescriptions] = useState([
    {
      id: 1,
      medicine: 'Amoxicillin',
      dosage: '500mg',
      frequency: '3 times daily',
      duration: '7 days',
      nextDose: '2:00 PM',
      taken: false
    },
    {
      id: 2,
      medicine: 'Vitamin D',
      dosage: '1000 IU',
      frequency: 'Once daily',
      duration: '30 days',
      nextDose: '8:00 AM',
      taken: true
    }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      type: 'appointment',
      message: 'Appointment with Dr. Sarah Johnson tomorrow at 10:30 AM',
      time: '2 hours ago',
      read: false
    },
    {
      id: 2,
      type: 'medication',
      message: 'Time to take Amoxicillin (500mg)',
      time: '30 mins ago',
      read: false
    },
    {
      id: 3,
      type: 'test',
      message: 'Your lab reports are ready to view',
      time: '1 day ago',
      read: true
    }
  ]);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 17) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'alert':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  const getAppointmentStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'pending':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <header className="bg-white border-b-2 border-slate-300 sticky top-0 z-40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">🏥</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-slate-800">SwasthyaSetu</h1>
                <p className="text-xs text-slate-600">Patient Dashboard</p>
              </div>
            </Link>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search doctors, hospitals, services..."
                  className="w-full pl-10 pr-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <Bell className="w-5 h-5 text-slate-600" />
                  {notifications.filter(n => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                  )}
                </button>

                {/* Notifications Dropdown */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border-2 border-slate-300 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-slate-200">
                      <h3 className="font-semibold text-slate-800">Notifications</h3>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className={`w-2 h-2 rounded-full mt-2 ${
                              notification.read ? 'bg-slate-300' : 'bg-blue-500'
                            }`}></div>
                            <div className="flex-1">
                              <p className="text-sm text-slate-800">{notification.message}</p>
                              <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => setShowProfile(!showProfile)}
                  className="flex items-center space-x-2 p-2 border-2 border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>

                {/* Profile Dropdown */}
                {showProfile && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border-2 border-slate-300 rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b border-slate-200">
                      <p className="font-semibold text-slate-800">Vinay Kumar</p>
                      <p className="text-sm text-slate-600">vinay@example.com</p>
                    </div>
                    <div className="py-2">
                      <Link href="/profile" className="flex items-center space-x-3 px-4 py-2 hover:bg-slate-50 transition-colors">
                        <UserCircle className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-700">View Profile</span>
                      </Link>
                      <Link href="/settings" className="flex items-center space-x-3 px-4 py-2 hover:bg-slate-50 transition-colors">
                        <Settings className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-700">Settings</span>
                      </Link>
                      <Link href="/auth" className="flex items-center space-x-3 px-4 py-2 hover:bg-slate-50 transition-colors">
                        <LogOut className="w-4 h-4 text-slate-600" />
                        <span className="text-sm text-slate-700">Logout</span>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-2xl p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {greeting}, Vinay 👋
          </h1>
          <p className="text-blue-100 mb-4">
            Here's your health overview for today. Stay healthy and keep tracking your progress!
          </p>
          <div className="bg-white/20 backdrop-blur-md rounded-lg p-4 inline-block">
            <p className="text-sm font-medium">
              💡 Health Tip: Drink at least 8 glasses of water daily to stay hydrated and maintain optimal body function.
            </p>
          </div>
        </div>

        {/* Health Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white border-2 border-slate-300 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <Heart className="w-8 h-8 text-red-500" />
              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(healthOverview.heartRate.status)}`}>
                {healthOverview.heartRate.status}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">
              {healthOverview.heartRate.value} {healthOverview.heartRate.unit}
            </h3>
            <p className="text-sm text-slate-600">Heart Rate</p>
            <p className="text-xs text-slate-500 mt-2">{healthOverview.heartRate.lastUpdated}</p>
          </div>

          <div className="bg-white border-2 border-slate-300 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-blue-500" />
              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(healthOverview.bloodPressure.status)}`}>
                {healthOverview.bloodPressure.status}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">
              {healthOverview.bloodPressure.value}
            </h3>
            <p className="text-sm text-slate-600">Blood Pressure</p>
            <p className="text-xs text-slate-500 mt-2">{healthOverview.bloodPressure.lastUpdated}</p>
          </div>

          <div className="bg-white border-2 border-slate-300 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <Thermometer className="w-8 h-8 text-amber-500" />
              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(healthOverview.temperature.status)}`}>
                {healthOverview.temperature.status}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-1">
              {healthOverview.temperature.value} {healthOverview.temperature.unit}
            </h3>
            <p className="text-sm text-slate-600">Temperature</p>
            <p className="text-xs text-slate-500 mt-2">{healthOverview.temperature.lastUpdated}</p>
          </div>

          <div className="bg-white border-2 border-slate-300 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-center justify-between mb-4">
              <TestTube className="w-8 h-8 text-purple-500" />
              <span className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(healthOverview.lastTest.status)}`}>
                {healthOverview.lastTest.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">
              {healthOverview.lastTest.value}
            </h3>
            <p className="text-sm text-slate-600">{healthOverview.lastTest.result}</p>
            <p className="text-xs text-slate-500 mt-2">{healthOverview.lastTest.lastUpdated}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Appointments Section */}
          <div className="bg-white border-2 border-slate-300 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Upcoming Appointments</h2>
              <Link href="/appointments/book" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Book New</span>
              </Link>
            </div>

            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border-2 border-slate-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-slate-800">{appointment.doctor}</h3>
                      <p className="text-sm text-slate-600">{appointment.specialization}</p>
                      <p className="text-sm text-slate-600">{appointment.hospital}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getAppointmentStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-600">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{appointment.date}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{appointment.time}</span>
                      </div>
                    </div>
                    {appointment.type === 'video' && (
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                        <Video className="w-4 h-4" />
                        <span className="text-sm">Join Call</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {appointments.length === 0 && (
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No upcoming appointments</p>
                <Link href="/appointments/book" className="text-blue-600 hover:text-blue-700 font-medium mt-2 inline-block">
                  Book your first appointment
                </Link>
              </div>
            )}
          </div>

          {/* Medical Records Section */}
          <div className="bg-white border-2 border-slate-300 rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">Medical Records</h2>
              <div className="flex items-center space-x-2">
                <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                  <Upload className="w-4 h-4" />
                  <span className="text-sm font-medium">Upload</span>
                </button>
                <button className="flex items-center space-x-2 text-slate-600 hover:text-slate-700">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filter</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {medicalRecords.map((record) => (
                <div key={record.id} className="border-2 border-slate-200 rounded-lg p-4 hover:border-blue-400 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <FileText className="w-4 h-4 text-slate-600" />
                        <h3 className="font-semibold text-slate-800">{record.title}</h3>
                        <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                          {record.type}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-1">Dr. {record.doctor}</p>
                      <p className="text-xs text-slate-500">{record.date}</p>
                    </div>
                    <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700">
                      <Download className="w-4 h-4" />
                      <span className="text-sm">Download</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {medicalRecords.length === 0 && (
              <div className="text-center py-8">
                <FolderOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                <p className="text-slate-600">No medical records found</p>
                <button className="text-blue-600 hover:text-blue-700 font-medium mt-2">
                  Upload your first record
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Prescriptions & Medications */}
        <div className="bg-white border-2 border-slate-300 rounded-lg p-6 mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">Active Prescriptions</h2>
            <Link href="/prescriptions" className="text-blue-600 hover:text-blue-700 font-medium">
              View All
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prescriptions.map((prescription) => (
              <div key={prescription.id} className="border-2 border-slate-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-slate-800">{prescription.medicine}</h3>
                    <p className="text-sm text-slate-600">{prescription.dosage} - {prescription.frequency}</p>
                    <p className="text-sm text-slate-600">Duration: {prescription.duration}</p>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${prescription.taken ? 'bg-green-500' : 'bg-amber-500'}`}></div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-slate-600">Next dose: {prescription.nextDose}</p>
                  <button
                    className={`px-3 py-1 rounded text-sm font-medium ${
                      prescription.taken
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                    }`}
                  >
                    {prescription.taken ? 'Taken' : 'Mark as Taken'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-2 border-slate-300 z-40">
        <div className="grid grid-cols-4 gap-1">
          <Link href="/dashboard" className="flex flex-col items-center py-3 text-blue-600">
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/appointments" className="flex flex-col items-center py-3 text-slate-600">
            <CalendarDays className="w-5 h-5" />
            <span className="text-xs mt-1">Appointments</span>
          </Link>
          <Link href="/records" className="flex flex-col items-center py-3 text-slate-600">
            <FolderOpen className="w-5 h-5" />
            <span className="text-xs mt-1">Records</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center py-3 text-slate-600">
            <UserCircle className="w-5 h-5" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
