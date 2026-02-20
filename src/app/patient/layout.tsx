'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Calendar, MapPin, FileText,
    BookOpen, HelpCircle, User, LogOut, Activity
} from 'lucide-react';

export default function PatientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const menuItems = [
        { label: 'Dashboard', icon: <LayoutDashboard />, href: '/patient/dashboard' },
        { label: 'Book Appointment', icon: <Calendar />, href: '/patient/book' },
        { label: 'Nearby Services', icon: <MapPin />, href: '/patient/locate' },
        { label: 'My Records', icon: <FileText />, href: '/patient/records' },
        { label: 'Health Wiki', icon: <Activity />, href: '/health-wiki' },
        { label: 'User Guide', icon: <BookOpen />, href: '/guide' },
        { label: 'Profile', icon: <User />, href: '/patient/profile' },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 text-slate-900 font-sans">
            {/* Sidebar - Strict Edge Design */}
            <aside className="w-64 border-r border-slate-300 bg-white flex flex-col fixed h-full z-50 shadow-sm">
                <div className="p-6 border-b border-slate-300 bg-white">
                    <div className="flex items-center space-x-3 mb-1">
                        <div className="w-8 h-8 bg-blue-700 flex items-center justify-center rounded-sm shadow-sm">
                            <Activity className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">SwasthyaSetu</span>
                    </div>
                </div>

                <nav className="flex-1 p-0 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-4 px-6 py-4 border-b border-slate-100 transition-all hover:bg-slate-50 group rounded-none ${isActive ? 'bg-blue-50 border-l-4 border-l-blue-700' : 'border-l-4 border-l-transparent'}`}
                            >
                                {React.cloneElement(item.icon as React.ReactElement, { className: `w-5 h-5 ${isActive ? 'text-blue-700' : 'text-slate-500 group-hover:text-slate-900'} transition-colors` } as any)}
                                <span className={`text-sm font-semibold ${isActive ? 'text-blue-900' : 'text-slate-600 group-hover:text-slate-900'}`}>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-0 border-t border-slate-300">
                    <Link href="/login" className="flex items-center space-x-4 px-6 py-5 hover:bg-red-50 transition-colors group">
                        <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-600" />
                        <span className="text-sm font-semibold text-slate-600 group-hover:text-red-600">Logout</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 bg-slate-50 p-0">
                <div className="min-h-screen">
                    {children}
                </div>
            </main>
        </div>
    );
}
