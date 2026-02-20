'use client';

import {
    Bell,
    Calendar,
    Droplet,
    AlertTriangle,
    CheckCircle2,
    MessageSquare,
    Settings,
    ChevronRight,
    Search
} from 'lucide-react';

export default function MobileAlerts() {
    const notifications = [
        {
            id: 1,
            type: 'Emergency',
            title: 'Critical: Blood Request O+',
            message: 'Emergency request from AIIMS Delhi. Urgent donor needed within 5km.',
            time: '2 mins ago',
            icon: Droplet,
            color: 'bg-red-50 text-red-600 border-red-100',
            dot: 'bg-red-500'
        },
        {
            id: 2,
            type: 'Appointment',
            title: 'Reminder: Dr. Arpit Mishra',
            message: 'Your follow-up session starts in 1 hour via Video Consultation.',
            time: '1 hour ago',
            icon: Calendar,
            color: 'bg-blue-50 text-blue-600 border-blue-100',
            dot: 'bg-blue-500'
        },
        {
            id: 3,
            type: 'System',
            title: 'Medical Records Synced',
            message: 'Your recent lab report from Apollo Indraprastha is now encrypted in your vault.',
            time: '4 hours ago',
            icon: CheckCircle2,
            color: 'bg-emerald-50 text-emerald-600 border-emerald-100',
            dot: 'bg-emerald-500'
        }
    ];

    return (
        <div className="space-y-6 animate-in slide-in-from-right-4 duration-500 pb-10">
            {/* Header */}
            <div className="px-2 flex justify-between items-end">
                <div>
                    <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">Notification Mesh v1.4</span>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">Alerts & Hub</h1>
                </div>
                <button className="p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <Settings className="w-5 h-5 text-slate-400" />
                </button>
            </div>

            {/* Quick Filter Search */}
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                    type="text"
                    placeholder="Filter notifications..."
                    className="w-full bg-white border border-slate-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:ring-4 focus:ring-blue-500/5 transition-all text-sm font-bold shadow-sm"
                />
            </div>

            {/* Notification List */}
            <div className="space-y-4">
                {notifications.map((notif) => (
                    <div key={notif.id} className="relative group">
                        <div className={`p-5 rounded-2xl border ${notif.color} shadow-sm group-hover:shadow-md transition-all active:scale-[0.98]`}>
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center space-x-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${notif.color} border shadow-sm`}>
                                        <notif.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{notif.type}</span>
                                </div>
                                <span className="text-[8px] font-bold uppercase tracking-widest opacity-40">{notif.time}</span>
                            </div>
                            <h3 className="font-bold text-slate-900 text-sm tracking-tight mb-1">{notif.title}</h3>
                            <p className="text-xs text-slate-500 font-medium leading-relaxed">{notif.message}</p>

                            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                                <button className="text-[10px] font-bold uppercase tracking-widest text-blue-600 hover:underline">Mark as Read</button>
                                <ChevronRight className="w-4 h-4 text-slate-300" />
                            </div>
                        </div>
                        {notif.dot && (
                            <div className={`absolute top-4 -left-1 w-2.5 h-2.5 rounded-full border-2 border-white shadow-sm ${notif.dot}`}></div>
                        )}
                    </div>
                ))}
            </div>

            {/* Empty State Illustration (Simulated) */}
            <div className="py-10 text-center opacity-30">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-300" />
                <p className="text-[10px] font-bold uppercase tracking-widest">No earlier notifications</p>
            </div>
        </div>
    );
}
