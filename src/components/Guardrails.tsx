"use client"

import React from 'react';
import { ShieldAlert, FileSpreadsheet, Eye } from 'lucide-react';

export default function Guardrails() {
  return (
    <section id="guardrails-block" className="space-y-8">
      
      <div className="space-y-2 text-center md:text-left max-w-xl">
        <div className="inline-flex items-center space-x-1.5 bg-slate-900 text-white px-3 py-1 rounded-md text-[10px] font-bold">
          <ShieldAlert className="w-3.5 h-3.5 text-[#FF0420]" />
          <span>GRANTS COUNCIL RISK MITIGATION</span>
        </div>
        <h2 className="text-3xl font-black text-slate-950 font-sans tracking-tight">
          Campaign Integrity & Transparency
        </h2>
        <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
          Designed with stringent guardrails to maximize the health, efficiency, and public accountability of incentivized pool depth.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans text-xs">
        
        {/* Card 1: Anti-Gaming Guardrails */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center border border-red-100 flex-shrink-0">
              <ShieldAlert className="w-4 h-4 text-[#FF0420]" />
            </div>
            <h4 className="font-extrabold text-sm text-slate-900 tracking-tight">
              Mitigating Low-Quality & Out-of-Range Capital
            </h4>
          </div>
          <p className="text-slate-500 leading-relaxed text-[11px]">
            To guarantee capital efficiency for the Optimism network, rewards are calculated dynamically based on active tick time. LPs whose price ranges fall <strong>out-of-range</strong> are automatically disqualified from reward accruals for that epoch, preventing dead-capital farming.
          </p>
          <div className="bg-slate-50 p-2.5 rounded border border-slate-200/60 text-[10px] text-slate-600 font-mono flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-[#FF0420] rounded-full animate-pulse" />
            <span>Anti-JIT Bot Protection Filter: ACTIVE</span>
          </div>
        </div>

        {/* Card 2: Public Reporting Format */}
        <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center border border-slate-200 flex-shrink-0">
                <FileSpreadsheet className="w-4 h-4 text-slate-700" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-900 tracking-tight">
                Public Transparency & Success Reporting
              </h4>
            </div>
            <p className="text-slate-500 leading-relaxed text-[11px]">
              Every bi-weekly reward epoch is backed by a deterministic, downloadable report indexing the pool’s net retention, absolute volume velocity, and total fee generation. Reviewers can access our draft reporting standard immediately.
            </p>
          </div>
          <div className="pt-2">
            <button className="text-[10px] font-bold text-slate-700 hover:text-[#FF0420] transition-colors flex items-center space-x-1 uppercase font-mono tracking-wider">
              <Eye className="w-3.5 h-3.5 mr-1" />
              <span>Review Draft Success Template</span>
            </button>
          </div>
        </div>

      </div>

    </section>
  );
}