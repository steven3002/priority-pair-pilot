"use client"

import React from 'react';
import { ShieldCheck, Database, Layers } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero-block" className="relative w-full bg-white border border-slate-200/90 rounded-2xl p-8 md:p-14 overflow-hidden shadow-sm">
      {/* Subtle dotted grid texture inside card */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#000000_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        
        {/* Pitch Column */}
        <div className="lg:col-span-7 space-y-6 text-left">
          
          <div className="inline-flex items-center space-x-1.5 bg-red-50 text-[#FF0420] px-3 py-1 rounded-md border border-red-100 text-[10px] font-bold">
            <Layers className="w-3.5 h-3.5" />
            <span>PROPOSAL ID: OPTIMISM-GRANT-MVP</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight font-sans leading-none text-slate-900">
            Capital Efficient Yield <br />
            <span className="text-[#FF0420] font-black">on Optimism Mainnet</span>
          </h1>

          <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed max-w-xl">
            PriorityPair Pilot is a lightweight, non-custodial routing and metrics proxy designed to execute and measure targeted liquidity campaigns. Supply assets directly on Uniswap V3 to participate.
          </p>

          {/* Verified Badge / Metrics Checklist */}
          <div className="grid grid-cols-2 gap-4 pt-2 text-[10px] text-slate-600">
            <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded border border-slate-200/60">
              <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span><strong>Zero Smart Contract Risk:</strong> Never custodying private keys</span>
            </div>
            <div className="flex items-center space-x-2 bg-slate-50 p-2.5 rounded border border-slate-200/60">
              <Database className="w-4 h-4 text-slate-700 flex-shrink-0" />
              <span><strong>Sub-Graph Monitored:</strong> Indexed via DefiLlama tracker</span>
            </div>
          </div>

        </div>

        {/* Campaign Metrics Status Display */}
        <div className="lg:col-span-5 bg-slate-50 rounded-xl p-6 border border-slate-200 space-y-5">
          
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <span className="text-[10px] font-bold text-slate-400">PROPOSED CAMPAIGN METRICS</span>
            <span className="bg-red-100 text-[#FF0420] text-[9px] font-black px-2 py-0.5 rounded">STATUS: PRE-LAUNCH</span>
          </div>

          <div className="space-y-4 font-mono">
            
            {/* WETH/USDC Status */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Target Pair Pool:</span>
              <span className="text-xs font-bold text-slate-900 bg-white px-2 py-0.5 border border-slate-200 rounded">WETH / USDC</span>
            </div>

            {/* OP distribution */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">OP Rewards Size:</span>
              <span className="text-xs font-bold text-slate-900 bg-white px-2 py-0.5 border border-slate-200 rounded">240,000 OP</span>
            </div>

            {/* Planned Duration */}
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Planned Duration:</span>
              <span className="text-xs font-bold text-slate-900 bg-white px-2 py-0.5 border border-slate-200 rounded">10 Weeks</span>
            </div>

            {/* Reward Split */}
            <div className="space-y-2 pt-3 border-t border-slate-200">
              <div className="flex justify-between text-[10px]">
                <span className="text-slate-500 uppercase font-bold">Reward Allocation Split</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[9px] font-bold text-center">
                <div className="bg-[#FF0420]/10 text-[#FF0420] py-1.5 rounded border border-[#FF0420]/20">
                  205,000 OP <br/> <span className="text-[8px] text-[#FF0420]/70">ACTIVE LP</span>
                </div>
                <div className="bg-slate-200 text-slate-600 py-1.5 rounded border border-slate-300">
                  35,000 OP <br/> <span className="text-[8px] text-slate-500">RETENTION</span>
                </div>
              </div>
            </div>

          </div>

          <div className="pt-2 text-[9px] text-slate-400 leading-normal italic text-center">
            Currently tracking baseline pool depth prior to active reward epoch.
          </div>

        </div>

      </div>
    </section>
  );
}