import React, { useState } from 'react';
import { ShieldCheck, Check, Copy, ExternalLink } from 'lucide-react';
import { CONTRACT_ADDRESS } from '@/lib/constants';

export default function PoolBanner() {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(CONTRACT_ADDRESS).then(() => {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 md:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        <div className="flex items-center space-x-3 bg-slate-950 text-white px-4 py-3 rounded-xl border border-slate-900 shadow-xs">
          <div className="w-6 h-6 bg-white text-black rounded-md font-black text-[11px] flex items-center justify-center font-mono">
            UNI
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-tight leading-none">Uniswap V3</span>
            <span className="text-[8px] text-slate-400 font-bold tracking-widest uppercase font-mono mt-0.5">DEX VENUE</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Target Pool Root Router
          </span>
          <div className="flex items-center space-x-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg w-fit">
            <code className="text-xs font-mono font-bold text-slate-700 truncate max-w-[180px] sm:max-w-none">
              {CONTRACT_ADDRESS}
            </code>
            <button 
              onClick={handleCopyAddress}
              aria-label="Copy contract address"
              className="p-1 bg-white border border-slate-200 rounded hover:border-[#FF0420] hover:text-[#FF0420] transition-colors text-slate-400 shadow-xs ml-1"
            >
              {copiedAddress ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>
        </div>
      </div>

      <a 
        href={`https://app.uniswap.org/explore/pools/optimism/${CONTRACT_ADDRESS}`}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center justify-center space-x-2 bg-[#FF0420] hover:bg-red-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-colors tracking-tight font-sans"
      >
        <span>Open Verified Pool Interface</span>
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
