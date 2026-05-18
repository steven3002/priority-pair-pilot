"use client"

import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function AlertBox() {
  return (
    <div className="w-full overflow-hidden bg-red-50/60 border border-red-200 rounded-xl p-4 flex items-start sm:items-center gap-3.5 shadow-xs">
      <div className="bg-white rounded-full p-2 shadow-xs border border-red-100 flex-shrink-0">
        <AlertTriangle className="w-4 h-4 text-[#FF0420]" strokeWidth={2.5} />
      </div>
      <div className="flex-grow">
        <h4 className="text-xs font-black text-slate-900 mb-0.5 uppercase tracking-wide font-sans">
          Non-Custodial Operational Disclaimer
        </h4>
        <p className="text-[11px] md:text-xs text-slate-600 font-medium leading-relaxed font-sans">
          LPs interact directly with Uniswap V3 smart contracts on OP Mainnet. PriorityPair Pilot does not custody user funds, deploy reward smart contracts, or control the liquidity venues.
        </p>
      </div>
    </div>
  );
}