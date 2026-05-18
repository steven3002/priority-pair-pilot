"use client"

import React, { useState } from 'react';
import { Cpu, ShieldCheck, Check, Copy, ExternalLink, Terminal, Activity } from 'lucide-react';
import { CONTRACT_ADDRESS } from '@/lib/constants';
import type { Transaction } from '@/types';

interface VenueProps {
  indexedTransactions: Transaction[];
  triggerToast: (msg: string) => void;
}

export default function Venue({ indexedTransactions, triggerToast }: VenueProps) {
  const [copiedContract, setCopiedContract] = useState(false);

  const copyContractToClipboard = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS)
      .then(() => {
        setCopiedContract(true);
        triggerToast("Uniswap V3 WETH/USDC Address copied!");
        setTimeout(() => setCopiedContract(false), 2000);
      })
      .catch(() => {
        triggerToast("Failed to copy. Please highlight and copy manually.");
      });
  };

  return (
    <section id="venue-block" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
      
      {/* Left Column (TECHNICAL DETAILS AND ADDRESS COPY) */}
      <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-8 flex flex-col justify-between border border-slate-800 shadow-sm relative overflow-hidden">
        {/* Tech background matrix line */}
        <div className="absolute top-0 right-0 w-32 h-full bg-slate-950/25 border-l border-slate-800 pointer-events-none" />

        <div className="space-y-6 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-[#FF0420]" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Uniswap V3 Contract</span>
            </div>
            <span className="bg-[#FF0420] text-white text-[9px] font-black px-2 py-0.5 rounded font-mono">OP MAINNET</span>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-black text-white font-sans tracking-tight">Verified Pool Integration</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              Depositing liquidity to unverified contracts introduces severe risk. Copy our officially index-tracked pool address below to construct your positions directly on Uniswap.
            </p>

            {/* Interactive Copy Card */}
            <div className="bg-slate-950 rounded-lg p-3 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[9px] font-bold text-slate-500">
                <span>VERIFIED ADDRESS (POOL)</span>
                <span className="text-emerald-500 flex items-center">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1" /> SECURE ROOT
                </span>
              </div>
              <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded border border-slate-800">
                <span className="font-mono text-[10px] md:text-xs text-slate-200 overflow-x-auto whitespace-nowrap scrollbar-none pr-6 font-bold">
                  {CONTRACT_ADDRESS}
                </span>
                <button 
                  onClick={copyContractToClipboard}
                  className="p-1.5 bg-slate-950 hover:bg-slate-800 rounded border border-slate-700 text-slate-400 hover:text-white transition-all flex-shrink-0"
                >
                  {copiedContract ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-6 border-t border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 relative z-10">
          <div className="text-[10px] text-slate-400 space-y-0.5">
            <span className="font-bold text-slate-500 uppercase block">Fee Tier Weighting</span>
            <span className="font-mono text-white">0.30% Pool Category</span>
          </div>
          <a 
            href={`https://app.uniswap.org/explore/pools/optimism/${CONTRACT_ADDRESS}`} 
            target="_blank" 
            rel="noreferrer"
            className="bg-[#FF0420] hover:bg-red-700 text-white font-black text-xs px-5 py-2.5 rounded-lg transition-all flex items-center justify-center space-x-2 text-center"
          >
            <span>OPEN IN UNISWAP UI</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Right Column: Live Telemetry Indexer Feed */}
      <div className="lg:col-span-7 bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center">
             
              Indexing Stream Status
            </span>
            <span className="text-[10px] text-slate-600 bg-slate-100 px-2.5 py-1 rounded font-bold border border-slate-200 font-sans">
              Awaiting Campaign Launch
            </span>
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-950 font-sans tracking-tight">On-Chain Activity Feed</h3>
            <p className="text-slate-500 text-xs mt-0.5">Live-indexed LP actions matching the targeted UUID proxy tracking layer.</p>
          </div>

          {/* Indexing Table with Graceful Empty State */}
          <div className="border border-slate-200 rounded-lg overflow-hidden text-[10px]">
            <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 p-2.5 text-slate-500 font-bold uppercase tracking-wider">
              <div className="col-span-3">Action Type</div>
              <div className="col-span-4">LP Node Address</div>
              <div className="col-span-3 text-right">Size USD</div>
              <div className="col-span-2 text-right">Age</div>
            </div>
            
            <div className="divide-y divide-slate-100 font-mono">
              {indexedTransactions.length > 0 ? (
                indexedTransactions.map((tx) => (
                  <div key={tx.id} className="grid grid-cols-12 p-3 items-center hover:bg-slate-50 transition-all">
                    <div className="col-span-3 flex items-center space-x-1">
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        tx.type === 'MINT' ? 'bg-emerald-500' : tx.type === 'BURN' ? 'bg-red-500' : 'bg-amber-500'
                      }`} />
                      <span className="font-extrabold text-slate-800">{tx.type}</span>
                    </div>
                    <div className="col-span-4 font-bold text-slate-600">{tx.address}</div>
                    <div className="col-span-3 text-right font-black text-slate-900">
                      ${tx.amountUSD.toLocaleString()}
                    </div>
                    <div className="col-span-2 text-right text-slate-400 font-medium">{tx.age}</div>
                  </div>
                ))
              ) : (
                /* DELIBERATE EMPTY STATE */
                <div className="p-10 flex flex-col items-center justify-center text-center space-y-3 bg-slate-50/50">
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center border border-slate-200">
                    <Activity className="w-5 h-5 text-slate-400" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-600 font-sans text-xs">Baseline Phase Active</p>
                    <p className="text-slate-400 font-sans mt-1">Transaction stream will activate upon OP reward epoch initialization.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 mt-6 text-[10px] text-slate-400 flex items-center justify-between">
          <span>*Metrics currently tracking baseline pool depth.</span>
          <span className="font-extrabold text-slate-500">INDEXER STANDBY</span>
        </div>
      </div>

    </section>
  );
}