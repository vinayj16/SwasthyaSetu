'use client';

import { Activity } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  overlay?: boolean;
}

export default function LoadingSpinner({ size = 'md', text, overlay }: LoadingSpinnerProps) {
  const sizeMap = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-16 h-16' };
  const textSize = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' }[size];

  const content = (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className={`${sizeMap[size]} border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin`} />
      {text && <p className={`font-black uppercase tracking-widest ${textSize} text-slate-400 animate-pulse`}>{text}</p>}
    </div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-slate-950/20 backdrop-blur-md z-[100] flex items-center justify-center">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl">
          {content}
        </div>
      </div>
    );
  }

  return content;
}
