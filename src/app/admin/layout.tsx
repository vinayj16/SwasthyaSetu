'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard, Users, UserCog, Stethoscope, FileText,
    Activity, ShieldAlert, Settings, LogOut, Database, UserCheck, Globe
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Skip layout for login page
    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const menuItems = [
        { label: 'Overview', icon: <LayoutDashboard />, href: '/admin/dashboard' },
        { label: 'Doctors', icon: <Stethoscope />, href: '/admin/doctors' },
        { label: 'Receptionists', icon: <UserCheck />, href: '/admin/receptionists' },
        { label: 'Patients', icon: <Users />, href: '/admin/patients' },
        { label: 'Website CMS', icon: <Globe />, href: '/admin/cms' },
        { label: 'Consultations', icon: <Activity />, href: '/admin/consultations' },
        { label: 'Datasets & AI', icon: <Database />, href: '/admin/datasets' },
        { label: 'System Logs', icon: <FileText />, href: '/admin/logs' },
        { label: 'Settings', icon: <Settings />, href: '/admin/settings' },
    ];

    return (
        <div className="flex min-h-screen bg-[#0F172A] text-slate-300 font-sans selection:bg-blue-500/30 selection:text-white">
            {/* Sidebar */}
            <aside className="w-72 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col fixed h-full z-50">
                <div className="p-6 border-b border-slate-800">
                    <div className="flex items-center space-x-3 mb-1">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <ShieldAlert className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white tracking-tight">SwasthyaSetu</span>
                    </div>
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest pl-1">Admin Console</span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all group ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                            >
                                {React.cloneElement(item.icon as React.ReactElement, { className: `w-5 h-5 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-white'} transition-colors` } as any)}
                                <span className={`text-xs font-bold uppercase tracking-wide ${isActive ? 'opacity-100' : 'opacity-80 group-hover:opacity-100'}`}>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <button className="flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-all group">
                        <LogOut className="w-5 h-5" />
                        <span className="text-xs font-bold uppercase tracking-wide">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-72 p-8 relative">
                <div className="max-w-[1600px] mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
