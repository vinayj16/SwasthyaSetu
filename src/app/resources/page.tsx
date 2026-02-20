'use client';

import React, { useState } from 'react';
import {
    BookOpen, Search, Filter, Book, FileText,
    ArrowUpRight, Bookmark, Video
} from 'lucide-react';
import Link from 'next/link';

const MOCK_RESOURCES = [
    { id: 1, type: 'BOOK', title: 'The Complete Heart Health Guide', author: 'Dr. A. K. Gupta', category: 'Cardiology', reads: '14.2k', img: 'bg-rose-100' },
    { id: 2, type: 'ARTICLE', title: 'Understanding Diabetes in 2026', author: 'Medical Journal of India', category: 'Endocrinology', reads: '8.5k', img: 'bg-blue-100' },
    { id: 3, type: 'VIDEO', title: 'Yoga for Mental Wellness', author: 'Ministry of AYUSH', category: 'Wellness', reads: '22k', img: 'bg-emerald-100' },
    { id: 4, type: 'MAGAZINE', title: 'Swasthya Weekly - Feb Edition', author: 'SwasthyaSetu Team', category: 'General Health', reads: '45k', img: 'bg-indigo-100' },
    { id: 5, type: 'BOOK', title: 'Nutrition for Immunity', author: 'Sanjeev Kapoor', category: 'Diet', reads: '12k', img: 'bg-orange-100' },
    { id: 6, type: 'ARTICLE', title: 'First Aid for Home Emergencies', author: 'Red Cross India', category: 'Emergency', reads: '30k', img: 'bg-red-100' },
];

export default function ResourcesPage() {
    const [filter, setFilter] = useState('ALL');

    const filteredResources = MOCK_RESOURCES.filter(res => filter === 'ALL' || res.type === filter);

    return (
        <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 pt-20 pb-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-md mb-4">
                                <BookOpen className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-widest">Knowledge Hub</span>
                            </div>
                            <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">Library & Resources</h1>
                            <p className="text-slate-500 max-w-xl leading-relaxed">
                                Access a vast collection of verified medical literature, health guides, and wellness journals curated by India's top medical professionals.
                            </p>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="Search topic, author..."
                                    className="bg-slate-50 border border-slate-200 rounded-lg py-3 pl-12 pr-4 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:border-blue-500 outline-none w-64 md:w-80 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Filters */}
                <div className="flex overflow-x-auto pb-4 mb-8 space-x-2 no-scrollbar">
                    <FilterTab label="All Resources" active={filter === 'ALL'} onClick={() => setFilter('ALL')} />
                    <FilterTab label="Medical Books" active={filter === 'BOOK'} onClick={() => setFilter('BOOK')} />
                    <FilterTab label="Articles & Research" active={filter === 'ARTICLE'} onClick={() => setFilter('ARTICLE')} />
                    <FilterTab label="Videos" active={filter === 'VIDEO'} onClick={() => setFilter('VIDEO')} />
                    <FilterTab label="Health Magazines" active={filter === 'MAGAZINE'} onClick={() => setFilter('MAGAZINE')} />
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredResources.map(res => (
                        <ResourceCard key={res.id} data={res} />
                    ))}
                </div>

                {filteredResources.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-6 h-6 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">No resources found</h3>
                        <p className="text-slate-500">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

function FilterTab({ label, active, onClick }: any) {
    return (
        <button
            onClick={onClick}
            className={`px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border ${active ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}
        >
            {label}
        </button>
    );
}

function ResourceCard({ data }: any) {
    const icons = {
        'BOOK': <Book className="w-5 h-5" />,
        'ARTICLE': <FileText className="w-5 h-5" />,
        'VIDEO': <Video className="w-5 h-5" />,
        'MAGAZINE': <BookOpen className="w-5 h-5" />
    };

    return (
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-all group cursor-pointer flex flex-col h-full">
            <div className={`h-48 ${data.img} relative p-6 flex items-center justify-center group-hover:opacity-90 transition-opacity`}>
                <div className="w-20 h-28 bg-white shadow-xl rounded flex items-center justify-center">
                    {icons[data.type as keyof typeof icons]}
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    {data.type}
                </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center space-x-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-3">
                    <span className="bg-blue-50 px-2 py-1 rounded">{data.category}</span>
                    <span className="text-slate-400">•</span>
                    <span className="text-slate-400">{data.reads} Views</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                    {data.title}
                </h3>
                <p className="text-sm text-slate-500 mb-6 flex-1">By {data.author}</p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                    <button className="flex items-center space-x-2 text-xs font-bold text-slate-900 hover:text-blue-600 uppercase tracking-wide transition-colors">
                        <span>Read Now</span>
                        <ArrowUpRight className="w-3 h-3" />
                    </button>
                    <button className="text-slate-400 hover:text-blue-600 transition-colors">
                        <Bookmark className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
