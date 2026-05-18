"use client"

import React from 'react';
import { PieChart, Layers, Calendar, ShieldCheck, Info } from 'lucide-react';
import { ALLOCATIONS } from '@/lib/constants';

export default function IncentivesPage() {
  const TOTAL_ALLOCATION = ALLOCATIONS.TOTAL;
  const ACTIVE_ALLOCATION = ALLOCATIONS.ACTIVE;
  const RETENTION_ALLOCATION = ALLOCATIONS.RETENTION;

  const activePercentage = ((ACTIVE_ALLOCATION / TOTAL_ALLOCATION) * 100).toFixed(1);
  const retentionPercentage = ((RETENTION_ALLOCATION / TOTAL_ALLOCATION) * 100).toFixed(1);

  const phases = [
    {
      step: "PHASE 01",
      name: "Baseline Execution Stage",
      duration: "7 Days Continuous",
      objective: "Establish Unsubsidized Pool Performance Baseline",
      description: "Before a single OP token is distributed, the tracking proxy logs time-weighted average TVL, organic trade volume velocity, and standard LP fee collection tiers. This creates a clean performance control group, giving the Grants Council an unmanipulated baseline to audit the campaign's true organic contribution.",
      metricTracked: "Moving Average TVL & Natural Fee Generation"
    },
    {
      step: "PHASE 02",
      name: "Active Incentive Cycle",
      duration: "10 Weeks Fixed",
      objective: "Scale Concentrated Capital Depth & Maximize Slippage Efficiency",
      description: "The core reward pool goes live. Rewards are systematically calculated across bi-weekly epochs. LPs receive distributions directly proportional to their active, in-range concentrated ticks. By targeting tighter pricing intervals, the campaign effectively deepens depth exactly where traders execute swap volume.",
      metricTracked: "In-Range Tick Density & Volume-to-TVL Efficiency"
    },
    {
      step: "PHASE 03",
      name: "Post-Incentive Retention Epoch",
      duration: "4 Weeks Measurement",
      objective: "Isolate Sticky Capital and Evaluate Campaign Retention",
      description: "Active incentives drop by 100%. The system transitions into an audit phase to observe how much liquidity stays in the pool once immediate emissions end. LPs who sustain their positions during this cooldown window are retroactively rewarded from the retention pool, systematically screening out short-term mercenary capital.",
      metricTracked: "Net Sticky Capital Retention Factor (%)"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-[6rem] pb-20 font-sans selection:bg-red-100">
      <main className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* PAGE HEADER */}
        <div className="space-y-2 border-b border-slate-200 pb-6">
          <div className="inline-flex items-center space-x-1.5 bg-slate-950 text-white px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider font-mono">
            <Layers className="w-3.5 h-3.5 text-[#FF0420]" />
            <span>Operational Parameter Matrix</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-950">Incentive Architecture</h1>
          <p className="text-slate-500 font-medium text-sm max-w-2xl">
            Detailed tokenomic distribution vectors and chronological lifecycle configurations for the proposed PriorityPair Pilot.
          </p>
        </div>

        {/* SECTION 1: ALLOCATION BREAKDOWN CHARTS */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-slate-400">
            <PieChart className="w-4 h-4 text-slate-700" />
            <span className="text-[11px] font-bold uppercase tracking-widest font-mono">Strategic Capital Distribution</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Total Metrics Block */}
            <div className="lg:col-span-4 bg-slate-950 text-white p-8 rounded-2xl flex flex-col justify-between border border-slate-900 shadow-sm">
              <div className="space-y-2">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Aggregate Funding</span>
                <h2 className="text-4xl font-black font-mono text-white tracking-tight">
                  {TOTAL_ALLOCATION.toLocaleString()} <span className="text-[#FF0420]">OP</span>
                </h2>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-relaxed mt-4 pt-4 border-t border-slate-900">
                Total grant capital requested from the Optimism Collective, allocated deterministically to eliminate algorithmic emissions inflation or administrative overhead risk.
              </p>
            </div>

            {/* Split Visual Cards */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              {/* Active Incentives Card */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between shadow-xs">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold font-mono text-slate-400 bg-slate-50 px-2 py-0.5 border border-slate-200 rounded">ACTIVE REWARDS</span>
                    <span className="text-[#FF0420] font-mono font-black text-xs">{activePercentage}%</span>
                  </div>
                  <h3 className="text-2xl font-black font-mono text-slate-900">
                    {ACTIVE_ALLOCATION.toLocaleString()} OP
                  </h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Committed exclusively to rewarding in-range, tight tick positions inside the verified Uniswap V3 WETH/USDC pool over the continuous 10-week cycle.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[10px] text-slate-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Dynamic Tick-Proportional Accrual
                </div>
              </div>

              {/* Retention Incentives Card */}
              <div className="bg-white border border-slate-200 p-6 rounded-2xl flex flex-col justify-between shadow-xs">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold font-mono text-slate-400 bg-slate-50 px-2 py-0.5 border border-slate-200 rounded">RETENTION REWARDS</span>
                    <span className="text-emerald-600 font-mono font-black text-xs">{retentionPercentage}%</span>
                  </div>
                  <h3 className="text-2xl font-black font-mono text-slate-900">
                    {RETENTION_ALLOCATION.toLocaleString()} OP
                  </h3>
                  <p className="text-slate-500 text-[11px] leading-relaxed">
                    Reserved specifically for LPs who keep liquidity intact during the 4-week cooldown phase to verify structural ecosystem retention.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center text-[10px] text-slate-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-500" /> Retroactive Commitment Weighting
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* SECTION 2: TIMELINE OPERATIONAL PHASES SELECTION */}
        <div className="space-y-6">
          <div className="flex items-center space-x-2 text-slate-400">
            <Calendar className="w-4 h-4 text-slate-700" />
            <span className="text-[11px] font-bold uppercase tracking-widest font-mono">Campaign Phases Setup Spec</span>
          </div>

          <div className="space-y-4">
            {phases.map((phase, index) => (
              <div 
                key={index} 
                className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start hover:border-slate-300 transition-all shadow-xs"
              >
                
                {/* Meta Identifiers Block */}
                <div className="md:col-span-3 space-y-1">
                  <span className="font-mono text-[10px] font-black text-[#FF0420] tracking-wider block bg-red-50 border border-red-100 rounded px-2 py-0.5 w-fit">
                    {phase.step}
                  </span>
                  <h4 className="font-sans text-sm font-black text-slate-900 pt-1">
                    {phase.name}
                  </h4>
                  <span className="font-mono text-[11px] text-slate-400 block font-bold pt-1">
                    {phase.duration}
                  </span>
                </div>

                {/* Technical Objective & Content Description Block */}
                <div className="md:col-span-6 space-y-2">
                  <h5 className="text-xs font-bold text-slate-800 uppercase tracking-tight">
                    Objective: {phase.objective}
                  </h5>
                  <p className="text-slate-500 text-[12px] leading-relaxed font-sans font-medium">
                    {phase.description}
                  </p>
                </div>

                {/* Metrics Framework Alignment Data */}
                <div className="md:col-span-3 bg-slate-50 rounded-xl p-4 border border-slate-200 flex flex-col justify-center h-full space-y-1">
                  <span className="text-[9px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                    Core Index Metric
                  </span>
                  <p className="text-[11px] font-bold text-slate-800 leading-normal font-sans">
                    {phase.metricTracked}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* COUNCILLOR CLARITY BANNER */}
        <div className="bg-amber-50/50 border border-amber-200 rounded-2xl p-4 flex items-start space-x-3 text-xs max-w-4xl mx-auto">
          <Info className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-amber-800 leading-relaxed font-sans font-medium">
            <strong>Architecture Note:</strong> Operational parameters are constructed entirely via pure stateless tracking configurations. PriorityPair Pilot intentionally decouples metrics reporting from the core smart contracts to isolate tracking logic and introduce zero proxy custody risks.
          </p>
        </div>

      </main>
    </div>
  );
}