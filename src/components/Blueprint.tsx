"use client"

import React from 'react';
import { Clock } from 'lucide-react';

export default function Blueprint() {
  return (
    <section id="blueprint-block" className="space-y-8">
      
      <div className="space-y-2 text-center md:text-left max-w-xl">
        <div className="inline-flex items-center space-x-1.5 bg-slate-900 text-white px-3 py-1 rounded-md text-[10px] font-bold">
          <Clock className="w-3.5 h-3.5 text-[#FF0420]" />
          <span>MEASURABLE INCENTIVE RETENTION</span>
        </div>
        <h2 className="text-3xl font-black text-slate-950 font-sans tracking-tight">
          Campaign Lifecycle Blueprint
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed">
          The pilot executes over a strict 14-week chronological lifecycle: 10 weeks of active, concentrated OP distributions followed immediately by a critical 4-week zero-emission retention monitoring phase.
        </p>
      </div>

      {/* Responsive Chronological Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        
        {/* Desktop Header (Hidden on Mobile) */}
        <div className="hidden md:grid md:grid-cols-12 bg-slate-50 border-b border-slate-200 p-4 font-sans text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
          <div className="col-span-3">Phase Stage</div>
          <div className="col-span-2">Target Duration</div>
          <div className="col-span-5">Strategic Objective</div>
          <div className="col-span-2 text-right">Fund Allocation</div>
        </div>

        <div className="divide-y divide-slate-100 font-mono text-xs">
          
          {/* Baseline Phase */}
          <div className="flex flex-col md:grid md:grid-cols-12 p-5 md:p-4 gap-4 md:gap-0 items-start md:items-center bg-emerald-50/10">
            <div className="col-span-3 flex items-center space-x-2.5 w-full justify-between md:justify-start">
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-extrabold text-slate-800 text-sm md:text-xs">1. Baseline Stage</span>
              </div>
              <span className="md:hidden font-black text-slate-400">0 OP</span>
            </div>
            <div className="col-span-2 text-slate-500 font-bold md:font-normal">7 Full Days</div>
            <div className="col-span-5 font-sans text-slate-600 text-[12px] md:text-[11px] leading-relaxed">
              Establish natural pool metrics (TVL, volume & slippage limits) before distributed rewards are introduced. Proves underlying venue efficiency.
            </div>
            <div className="hidden md:block col-span-2 text-right font-black text-slate-400">0 OP</div>
          </div>

          {/* Active Phase */}
          <div className="flex flex-col md:grid md:grid-cols-12 p-5 md:p-4 gap-4 md:gap-0 items-start md:items-center">
            <div className="col-span-3 flex items-center space-x-2.5 w-full justify-between md:justify-start">
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF0420]" />
                <span className="font-extrabold text-slate-800 text-sm md:text-xs">2. Active Campaign</span>
              </div>
              <span className="md:hidden font-black text-[#FF0420]">205,000 OP</span>
            </div>
            <div className="col-span-2 text-slate-500 font-bold md:font-normal">10 Full Weeks</div>
            <div className="col-span-5 font-sans text-slate-600 text-[12px] md:text-[11px] leading-relaxed">
              Active distributions directly target concentrated LP accounts to scale liquidity depth, lower execution spreads, and support trade volume.
            </div>
            <div className="hidden md:block col-span-2 text-right font-black text-[#FF0420]">205,000 OP</div>
          </div>

          {/* Retention Phase */}
          <div className="flex flex-col md:grid md:grid-cols-12 p-5 md:p-4 gap-4 md:gap-0 items-start md:items-center bg-slate-50/20">
            <div className="col-span-3 flex items-center space-x-2.5 w-full justify-between md:justify-start">
              <div className="flex items-center space-x-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                <span className="font-extrabold text-slate-800 text-sm md:text-xs">3. Retention Epoch</span>
              </div>
              <span className="md:hidden font-black text-emerald-600">35,000 OP</span>
            </div>
            <div className="col-span-2 text-slate-500 font-bold md:font-normal">4-Week Trial</div>
            <div className="col-span-5 font-sans text-slate-600 text-[12px] md:text-[11px] leading-relaxed">
              Reserved incentives audit and reward liquidity pools that remain deployed after baseline rewards taper. Directly measures capital stickiness.
            </div>
            <div className="hidden md:block col-span-2 text-right font-black text-emerald-600">35,000 OP</div>
          </div>

        </div>
      </div>

    </section>
  );
}