// src/components/MetricCard.tsx
"use client"

import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtext: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  accent?: boolean;
}

export default function MetricCard({
  title,
  value,
  subtext,
  isLoading = false,
  icon,
  accent = false
}: MetricCardProps) {
  return (
    <div className={`rounded-xl p-6 border transition-all shadow-xs flex flex-col justify-between h-36 ${
      accent 
        ? 'bg-slate-950 text-white border-slate-900 shadow-md' 
        : 'bg-white text-slate-900 border-slate-200/90 hover:border-slate-300'
    }`}>
      <div className="flex items-center justify-between w-full">
        <span className={`text-[10px] font-bold uppercase tracking-wider font-mono ${accent ? 'text-slate-500' : 'text-slate-400'}`}>
          {title}
        </span>
        {icon && <div className={`${accent ? 'text-[#FF0420]' : 'text-slate-400'}`}>{icon}</div>}
      </div>

      <div className="my-2">
        {isLoading ? (
          <div className={`h-7 w-28 rounded animate-pulse ${accent ? 'bg-slate-800' : 'bg-slate-100'}`} />
        ) : (
          <span className="text-2xl font-black font-mono tracking-tight leading-none block">
            {value}
          </span>
        )}
      </div>

      <div className={`text-[10px] font-sans font-medium truncate ${accent ? 'text-slate-400' : 'text-slate-500'}`}>
        {subtext}
      </div>
    </div>
  );
}