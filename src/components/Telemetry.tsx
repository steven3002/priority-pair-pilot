"use client"

import React from 'react';

interface TelemetryProps {
  isLoading?: boolean;
  poolTvl: number;
  poolVolume24h: number;
  poolFees24h: number;
}

export default function Telemetry({
  isLoading = false,
  poolTvl,
  poolVolume24h,
  poolFees24h
}: TelemetryProps) {
  return (
    <div className="w-full bg-slate-950 text-slate-300 border-b border-slate-800 py-2.5 px-4 overflow-x-auto whitespace-nowrap scrollbar-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between space-x-12 text-[10px]">
        
        {/* Status Indicator */}
        <div className="flex items-center space-x-2 shrink-0">
          <span className={`w-1.5 h-1.5 rounded-full ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
          <span className="text-slate-500 font-black uppercase">Live Indexer Feed:</span>
          <span className="font-mono text-white">
            {isLoading ? "SYNCING..." : "OP MAINNET SYNCED"}
          </span>
        </div>

        {/* Real-time Metrics */}
        <div className="flex items-center space-x-8 font-mono">
          
          <div className="flex items-center">
            <span className="text-slate-500 mr-1.5">POOL TVL:</span>
            {isLoading ? (
              <span className="block w-16 h-3 bg-slate-800 rounded animate-pulse" />
            ) : (
              <span className="text-white font-extrabold">
                ${poolTvl.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            )}
          </div>
          
          <div className="flex items-center">
            <span className="text-slate-500 mr-1.5">24H VOLUME:</span>
            {isLoading ? (
              <span className="block w-16 h-3 bg-slate-800 rounded animate-pulse" />
            ) : (
              <span className="text-white font-extrabold">
                ${poolVolume24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            )}
          </div>
          
          <div className="flex items-center">
            <span className="text-slate-500 mr-1.5">EST. 24H FEES:</span>
            {isLoading ? (
              <span className="block w-16 h-3 bg-slate-800 rounded animate-pulse" />
            ) : (
              <span className="text-emerald-400 font-bold">
                ${poolFees24h.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
          </div>
          
          <div className="bg-slate-800 px-2 py-0.5 rounded text-[9px] text-slate-400 border border-slate-700 hidden sm:block">
            DEFILLAMA UUID: b2cca178
          </div>

        </div>

      </div>
    </div>
  );
}