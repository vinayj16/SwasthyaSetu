'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Users, Calendar, Video, Clock,
    CreditCard, Star, Settings, LogOut, FileText
} from 'lucide-react';

export default function DoctorLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { label: 'Dashboard', icon: <LayoutDashboard />, href: '/doctor/dashboard' },
        { label: 'Appointments', icon: <Calendar />, href: '/doctor/appointments' },
        { label: 'Consultation', icon: <Video />, href: '/doctor/consultation' },
        { label: 'My Patients', icon: <Users />, href: '/doctor/patients' },
        { label: 'Schedule', icon: <Clock />, href: '/doctor/schedule' },
        { label: 'Earnings', icon: <CreditCard />, href: '/doctor/earnings' },
        { label: 'Reviews', icon: <Star />, href: '/doctor/reviews' },
        { label: 'Profile', icon: <Settings />, href: '/doctor/profile' },
    ];

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
            {/* Sidebar */}
            <aside className="w-72 border-r border-slate-200 bg-white flex flex-col fixed h-full z-50 shadow-sm">
                <div className="p-8 border-b border-slate-100">
                    <div className="flex items-center space-x-3 mb-1">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
                            <span className="text-xl font-bold text-white">S</span>
                        </div>
                        <span className="text-xl font-[950] text-slate-900 tracking-tight italic">SwasthyaSetu</span>
                    </div>
                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] pl-1">Doctor Portal</span>
                </div>

                <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-4 px-4 py-4 rounded-xl transition-all group ${isActive ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
                            >
                                {React.cloneElement(item.icon as React.ReactElement, { className: `w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-blue-600'} transition-colors` } as any)}
                                <span className={`text-[11px] font-black uppercase tracking-widest ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-6 border-t border-slate-100 dark:border-slate-800">
                    <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all group">
                        <LogOut className="w-5 h-5" />
                        <span className="text-[11px] font-black uppercase tracking-widest">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72">
                {children}
            </main>
        </div>
    );
}
