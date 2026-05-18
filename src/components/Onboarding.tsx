"use client"

import React from 'react';
import { Wallet, Compass, Zap, BarChart, ExternalLink } from 'lucide-react';
import { CONTRACT_ADDRESS } from '@/lib/constants';

export default function Onboarding() {
  const steps = [
    {
      node: "01",
      action: "INDEX",
      title: "Asset Readiness",
      desc: "Hold both WETH and USDC tokens natively on the OP Mainnet (Optimism) network.",
      icon: <Wallet className="w-5 h-5 text-slate-700" />,
    },
    {
      node: "02",
      action: "ROUTE",
      title: "Venue Verification",
      desc: "Navigate to the official Uniswap V3 WETH/USDC pool (0.3% fee tier) contract.",
      icon: <Compass className="w-5 h-5 text-slate-700" />,
      link: `https://app.uniswap.org/explore/pools/optimism/${CONTRACT_ADDRESS}`
    },
    {
      node: "03",
      action: "DEPLOY",
      title: "Concentrate Capital",
      desc: "Inject liquidity within your chosen range. Narrower ranges generate a larger capital multiplier boost.",
      icon: <Zap className="w-5 h-5 text-slate-700" />,
    },
    {
      node: "04",
      action: "MEASURE",
      title: "Sustain & Accrue",
      desc: "Retain active LP tokens to qualify for bi-weekly OP reward distributions and retention epochs.",
      icon: <BarChart className="w-5 h-5 text-slate-700" />,
    }
  ];

  return (
    <section id="guide-view" className="space-y-12">
      
      {/* Header */}
      <div className="space-y-3 text-center md:text-left max-w-xl mx-auto md:mx-0">
        <div className="inline-flex items-center space-x-1.5 bg-red-50 text-[#FF0420] px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest border border-red-100">
          <span>Onboarding Architecture</span>
        </div>
        <h2 className="text-3xl font-black text-slate-950 font-sans tracking-tight">
          Deployment Sequence Map
        </h2>
        <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
          No wrappers, no complex proxies, and no deposit traps. Follow standard non-custodial Uniswap processes verified on Optimism Mainnet.
        </p>
      </div>

      {/* Sequence Grid */}
      <div className="relative">
        
        {/* Visual Connector Line (Desktop Only) */}
        <div className="hidden md:block absolute top-[4.5rem] left-0 w-full h-[1px] bg-slate-200 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 font-mono text-xs relative z-10">
          {steps.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:border-[#FF0420]/40 transition-colors flex flex-col h-full"
            >
              
              {/* Icon & Node Badge Row */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-50 group-hover:text-[#FF0420] transition-all duration-300">
                  {item.icon}
                </div>
                <div className="text-[10px] font-extrabold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-1 rounded group-hover:border-[#FF0420]/20 group-hover:text-[#FF0420] transition-colors">
                  {item.node} / {item.action}
                </div>
              </div>

              {/* Text Content */}
              <div className="flex-grow">
                <h4 className="font-extrabold text-base text-slate-900 mb-2 font-sans tracking-tight">
                  {item.title}
                </h4>
                <p className="text-slate-500 text-[11px] font-sans leading-relaxed">
                  {item.desc}
                </p>
              </div>

              {/* Optional Quick Link (For Step 2) */}
              {item.link && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center text-[10px] font-bold text-[#FF0420] hover:text-red-700 transition-colors"
                  >
                    OPEN UNISWAP POOL <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                </div>
              )}

            </div>
          ))}
        </div>
      </div>

    </section>
  );
}