'use client';

import React, { useState } from 'react';
import { MapPin, Search, Phone, Navigation, Clock, Filter } from 'lucide-react';

const MOCK_PLACES = [
    { id: 1, name: 'Apollo Indraprastha', type: 'HOSPITAL', distance: '1.2 km', address: 'Sarita Vihar, New Delhi', open: '24 Hours', rating: 4.8 },
    { id: 2, name: 'Sanjeevani Medicos', type: 'PHARMACY', distance: '0.4 km', address: 'Block C, Market Road', open: 'Close 11 PM', rating: 4.2 },
    { id: 3, name: 'Max Super Speciality', type: 'HOSPITAL', distance: '3.5 km', address: 'Saket, New Delhi', open: '24 Hours', rating: 4.9 },
    { id: 4, name: 'Dr. Reddys Path Lab', type: 'LAB', distance: '0.8 km', address: 'Near Metro Station', open: 'Close 8 PM', rating: 4.5 },
];

export default function LocatePage() {
    const [filter, setFilter] = useState('ALL');

    const filtered = MOCK_PLACES.filter(p => filter === 'ALL' || p.type === filter);

    return (
        <div className="p-8 space-y-8 animate-in fade-in duration-300">
            <div className="flex items-end justify-between border-b border-slate-300 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">Find Nearby Services</h1>
                    <p className="text-base text-slate-600 font-medium">Locate medical help around <span className="text-slate-900 font-bold">New Delhi</span></p>
                </div>
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search area or hospital..."
                        className="pl-10 pr-4 py-3 border border-slate-300 bg-white w-80 text-sm font-semibold text-slate-900 focus:border-blue-600 outline-none transition-colors rounded-sm shadow-sm"
                    />
                </div>
            </div>

            {/* Filter Tabs - Sharp Edge Design */}
            <div className="flex space-x-2 bg-slate-100 p-1 w-fit border border-slate-200 rounded-sm">
                {['ALL', 'HOSPITAL', 'PHARMACY', 'LAB'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-6 py-2.5 text-xs font-bold uppercase tracking-wide transition-all rounded-sm ${filter === type ? 'bg-white text-blue-700 shadow-sm border border-slate-200' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200'}`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {filtered.map(place => (
                    <div key={place.id} className="border border-slate-300 bg-white p-6 hover:border-blue-600 hover:shadow-md transition-all group flex justify-between items-start rounded-sm">
                        <div>
                            <div className="flex items-center space-x-2 mb-3">
                                <span className={`px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide border rounded-sm ${place.type === 'HOSPITAL' ? 'bg-rose-50 text-rose-700 border-rose-200' : place.type === 'PHARMACY' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-blue-50 text-blue-700 border-blue-200'}`}>
                                    {place.type}
                                </span>
                                <span className="text-xs font-semibold text-slate-500 flex items-center">
                                    <Clock className="w-3 h-3 mr-1" /> {place.open}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-1 group-hover:text-blue-700 transition-colors">{place.name}</h3>
                            <p className="text-sm text-slate-600 font-medium mb-6">{place.address}</p>

                            <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors rounded-sm">
                                    <Phone className="w-3 h-3" />
                                    <span>Call</span>
                                </button>
                                <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 bg-slate-50 text-xs font-bold uppercase tracking-wide text-slate-800 hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors rounded-sm">
                                    <Navigation className="w-3 h-3" />
                                    <span>Directions</span>
                                </button>
                            </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                            <div className="text-2xl font-black text-slate-900 leading-none">{place.distance}</div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mt-1">Distance</div>
                            <div className="mt-3 inline-flex items-center px-2 py-1 bg-amber-50 text-amber-700 text-xs font-bold border border-amber-200 rounded-sm">
                                {place.rating} ★
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-slate-100 p-12 border border-slate-300 text-center rounded-sm">
                <MapPin className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-700">Map View</h3>
                <p className="text-sm text-slate-500 font-medium">Interactive map is loading...</p>
            </div>
        </div>
    );
}
