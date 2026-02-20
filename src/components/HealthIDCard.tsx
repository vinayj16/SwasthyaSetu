'use client';

export default function HealthIDCard({ data }: { data: any }) {
    return (
        <div className="w-[500px] h-[300px] bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl border border-white/10 group cursor-default">
            {/* Background Decals */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-20 -mr-20 -mt-20"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600 rounded-full blur-[80px] opacity-10 -ml-20 -mb-20"></div>

            {/* Card Header */}
            <div className="flex justify-between items-start mb-10 relative z-10">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-slate-900 font-black text-xl">S</span>
                    </div>
                    <div>
                        <h4 className="text-sm font-black tracking-tight leading-none">SwasthyaSetu</h4>
                        <span className="text-[8px] font-black uppercase text-blue-400 tracking-[0.2em]">National Digital Health Mission</span>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-1">Pass Issued</span>
                    <span className="text-xs font-bold font-mono">2026-09-10</span>
                </div>
            </div>

            {/* Identity Body */}
            <div className="flex items-center space-x-8 relative z-10">
                <div className="w-24 h-24 rounded-2xl bg-white/10 p-1.5 border border-white/10 overflow-hidden">
                    <img src={data?.photo || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'} className="w-full h-full object-cover rounded-xl" />
                </div>
                <div className="flex-1">
                    <h3 className="text-2xl font-black mb-1">{data?.name || 'Aarav Kumar'}</h3>
                    <p className="text-xs font-bold text-white/50 mb-4">{data?.dob || '14 Nov 1998'} • {data?.gender || 'Male'}</p>
                    <div className="flex items-center space-x-6">
                        <div>
                            <span className="block text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">Blood Group</span>
                            <span className="text-sm font-black">{data?.bloodGroup || 'O+'}</span>
                        </div>
                        <div>
                            <span className="block text-[8px] font-black text-blue-400 uppercase tracking-widest mb-1">HID Status</span>
                            <span className="text-sm font-black text-emerald-400">Verified</span>
                        </div>
                    </div>
                </div>
                <div className="w-20 h-20 bg-white rounded-2xl p-2 flex items-center justify-center">
                    {/* Simple QR Mockup */}
                    <div className="grid grid-cols-4 gap-1 w-full h-full">
                        {[...Array(16)].map((_, i) => (
                            <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-slate-900' : 'bg-transparent'}`}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Info */}
            <div className="mt-8 flex justify-between items-end relative z-10">
                <div>
                    <span className="block text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Universal Health ID</span>
                    <span className="text-lg font-black font-mono tracking-tighter text-blue-100">{data?.healthId || 'IND-HID-2026-X8B2-99L1'}</span>
                </div>
                <div className="h-4 w-12 bg-white/20 rounded-full blur-[8px]"></div>
            </div>
        </div>
    );
}
