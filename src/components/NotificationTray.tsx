'use client';

import { useState, useEffect } from 'react';
import { Bell, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function NotificationTray() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const res = await fetch('/api/notifications');
                const data = await res.json();
                if (data.success) {
                    setNotifications(data.data);
                    setUnreadCount(data.data.filter((n: any) => !n.read).length);
                }
            } catch (e) { console.error(e); }
        }
        fetchNotifications();
        const interval = setInterval(fetchNotifications, 30000); // Poll every 30s
        return () => clearInterval(interval);
    }, []);

    const markAsRead = async (id: string) => {
        try {
            const res = await fetch('/api/notifications', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            if (res.ok) {
                setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
                setUnreadCount(prev => Math.max(0, prev - 1));
            }
        } catch (e) { console.error(e); }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative w-12 h-12 flex items-center justify-center bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition group"
            >
                <Bell className={`w-6 h-6 ${unreadCount > 0 ? 'text-blue-600 animate-pulse' : 'text-slate-400'}`} />
                {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white">
                        {unreadCount}
                    </span>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-4 w-[400px] bg-white rounded-[2rem] shadow-2xl border border-slate-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                    <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                        <h3 className="text-lg font-black text-slate-900">Notifications</h3>
                        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-slate-600">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="max-h-[500px] overflow-y-auto no-scrollbar">
                        {notifications.length > 0 ? (
                            notifications.map((n) => (
                                <div
                                    key={n.id}
                                    onClick={() => !n.read && markAsRead(n.id)}
                                    className={`p-6 border-b border-slate-50 flex space-x-4 hover:bg-slate-50 transition cursor-pointer ${!n.read ? 'bg-blue-50/30' : ''}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${n.type === 'ALERT' ? 'bg-red-100 text-red-600' :
                                            n.type === 'SUCCESS' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                                        }`}>
                                        {n.type === 'ALERT' ? <AlertCircle className="w-5 h-5" /> :
                                            n.type === 'SUCCESS' ? <CheckCircle2 className="w-5 h-5" /> : <Info className="w-5 h-5" />}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-slate-900 text-sm">{n.title}</h4>
                                            {!n.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                                        </div>
                                        <p className="text-xs text-slate-500 leading-relaxed">{n.message}</p>
                                        <span className="text-[10px] font-black text-slate-300 uppercase mt-2 block tracking-widest">
                                            {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-20 text-center">
                                <div className="text-4xl mb-4 opacity-10">🔔</div>
                                <p className="text-slate-400 font-black text-sm uppercase tracking-widest">All caught up!</p>
                            </div>
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="p-4 text-center border-t border-slate-50">
                            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline">Clear all alerts</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
