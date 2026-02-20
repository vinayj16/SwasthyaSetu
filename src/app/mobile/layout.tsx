'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    Home,
    FileText,
    Calendar,
    Bell,
    User,
    Shield,
    Activity
} from 'lucide-react';

export default function MobileLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        async function checkAuth() {
            try {
                const res = await fetch('/api/user/profile');
                const data = await res.json();
                if (data.success) {
                    setUser(data.data);
                } else {
                    router.push('/login');
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        checkAuth();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-xl animate-pulse flex items-center justify-center text-white font-bold">S</div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest animate-pulse">Initializing Secure Mesh</span>
                </div>
            </div>
        );
    }

    const navItems = [
        { icon: Home, label: 'Home', href: '/mobile' },
        { icon: FileText, label: 'Records', href: '/mobile/records' },
        { icon: Calendar, label: 'Care', href: '/mobile/appointments' },
        { icon: Bell, label: 'Alerts', href: '/mobile/alerts' },
        { icon: User, label: 'Profile', href: '/mobile/profile' },
    ];

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-sans pb-24 max-w-md mx-auto relative shadow-2xl overflow-x-hidden">
            {/* Mobile Header */}
            <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 h-16">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-lg">S</div>
                    <span className="font-bold text-slate-800 tracking-tight">Swasthya Setu</span>
                </div>
                <div className="flex items-center space-x-4">
                    <button className="relative">
                        <Bell className="w-5 h-5 text-slate-400" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                        <img
                            src={user?.patientProfile?.[0]?.profilePhotoUrl || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </header>

            <main className="p-4">
                {children}
            </main>

            {/* Bottom Navigation */}
            <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-slate-100 px-2 py-3 z-50 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
                <div className="flex justify-around items-center">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex flex-col items-center space-y-1 px-4 py-1 rounded-xl transition-all ${isActive ? 'text-blue-600' : 'text-slate-400'}`}
                            >
                                <item.icon className={`w-6 h-6 ${isActive ? 'fill-blue-600/10' : ''}`} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                                {isActive && <div className="w-1 h-1 bg-blue-600 rounded-full"></div>}
                            </Link>
                        );
                    })}
                </div>
            </nav>
        </div>
    );
}
