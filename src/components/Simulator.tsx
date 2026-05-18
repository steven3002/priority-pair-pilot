"use client"

import React, { useState } from 'react';
import { Sliders } from 'lucide-react';
import { ALLOCATIONS } from '@/lib/constants';

interface SimulatorProps {
  poolTvl: number;
}

export default function Simulator({ poolTvl }: SimulatorProps) {
  const WETH_PRICE_USD = 3200;
  const OP_PRICE_USD = 1.45; 
  const ACTIVE_PHASE_OP = ALLOCATIONS.ACTIVE;
  const RETENTION_PHASE_OP = ALLOCATIONS.RETENTION;

  const [lpDepositAmount, setLpDepositAmount] = useState('25000'); 
  const [priceMinRange, setPriceMinRange] = useState(2800);
  const [priceMaxRange, setPriceMaxRange] = useState(3600);

  // 3. UNI V3 MATH ABSTRACTION
  const parsedDeposit = parseFloat(lpDepositAmount) || 0;
  
  // Safely bound the ranges so math doesn't break if sliders cross
  const minRangeVal = Math.max(100, Math.min(priceMinRange, WETH_PRICE_USD - 10));
  const maxRangeVal = Math.max(WETH_PRICE_USD + 10, priceMaxRange);
  
  const rangeRatio = (maxRangeVal - minRangeVal) / WETH_PRICE_USD;
  const concentrationMultiplier = Math.max(1.0, Math.min(18.5, 2.0 / (rangeRatio || 0.1)));

  const virtualLiquidity = parsedDeposit * concentrationMultiplier;
  
  const safePoolTvl = poolTvl > 0 ? poolTvl : 5000000; 
  const estimatedPoolShare = virtualLiquidity / (safePoolTvl + virtualLiquidity);

  const estOpActiveRewards = ACTIVE_PHASE_OP * estimatedPoolShare;
  const estOpRetentionRewards = RETENTION_PHASE_OP * estimatedPoolShare;
  
  const estimatedWeeklyOpYield = estOpActiveRewards / 10;
  
  const projectedApr = parsedDeposit > 0 
    ? (((estimatedWeeklyOpYield * 52 * OP_PRICE_USD) / parsedDeposit) * 100).toFixed(1) 
    : "0.0";

  return (
    <section id="simulator-block" className="space-y-8">
      
      <div className="space-y-2 text-center lg:text-left max-w-xl">
        <div className="inline-flex items-center space-x-1.5 bg-slate-900 text-white px-3 py-1 rounded-md text-[10px] font-bold">
          <Sliders className="w-3.5 h-3.5 text-[#FF0420]" />
          <span>UNISWAP V3 SIMULATION LAYER</span>
        </div>
        <h2 className="text-3xl font-black text-slate-950 font-sans tracking-tight">
          Concentrated Rewards Calculator
        </h2>
        <p className="text-slate-500 text-xs md:text-sm font-sans leading-relaxed">
          Input your intended deposit size and customize your liquidity range limits on WETH/USDC. Under Uniswap V3, narrower pricing pools result in massive virtual reward leverage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Interactive Control Dashboard */}
        <div className="lg:col-span-7 bg-white rounded-xl p-8 border border-slate-200 shadow-sm space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <span className="text-xs font-black text-slate-950">SIMULATION PARAMETERS</span>
            <span className="text-[10px] text-slate-400 font-bold">
              WETH Ref: ${WETH_PRICE_USD} | OP Ref: ${OP_PRICE_USD}
            </span>
          </div>

          {/* Deposit Amount */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <label>1. EXPECTED INTENDED CAPITAL (USD)</label>
              <span className="font-mono text-[#FF0420] font-black">${parseFloat(lpDepositAmount).toLocaleString()} USD</span>
            </div>
            <div className="flex items-center space-x-3 bg-slate-50 rounded-lg p-3 border border-slate-200">
              <span className="font-extrabold text-slate-400 text-lg">$</span>
              <input
                type="range"
                min="1000"
                max="500000"
                step="1000"
                value={lpDepositAmount}
                onChange={(e) => setLpDepositAmount(e.target.value)}
                className="w-full accent-[#FF0420]"
              />
              <input
                type="number"
                value={lpDepositAmount}
                onChange={(e) => setLpDepositAmount(e.target.value)}
                className="w-24 bg-white p-1 rounded text-center text-xs font-extrabold border border-slate-200 focus:outline-none font-mono"
              />
            </div>
          </div>

          {/* Interactive Tick / Price Ranges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Min Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <label>2. MIN PRICE LIMIT (USD)</label>
                <span className="font-mono text-slate-800 font-bold">${priceMinRange}</span>
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1500"
                  max="3150"
                  step="50"
                  value={priceMinRange}
                  onChange={(e) => setPriceMinRange(parseInt(e.target.value))}
                  className="w-full accent-slate-800"
                />
                <div className="flex justify-between text-[9px] text-slate-400">
                  <span>$1,500</span>
                  <span>$3,150</span>
                </div>
              </div>
            </div>

            {/* Max Price */}
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] font-bold text-slate-500">
                <label>3. MAX PRICE LIMIT (USD)</label>
                <span className="font-mono text-slate-800 font-bold">${priceMaxRange}</span>
              </div>
              <div className="space-y-2">
                <input
                  type="range"
                  min="3250"
                  max="5500"
                  step="50"
                  value={priceMaxRange}
                  onChange={(e) => setPriceMaxRange(parseInt(e.target.value))}
                  className="w-full accent-slate-800"
                />
                <div className="flex justify-between text-[9px] text-slate-400">
                  <span>$3,250</span>
                  <span>$5,500</span>
                </div>
              </div>
            </div>

          </div>

          {/* Range status metrics overlay banner */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">Range Width Ratio</span>
              <span className="font-mono font-bold text-slate-800">{(rangeRatio * 100).toFixed(1)}% Wide</span>
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 block mb-0.5 uppercase">CAPITAL MULTIPLIER</span>
              <span className="font-mono font-black text-red-600">
                {concentrationMultiplier.toFixed(2)}x Boost
              </span>
            </div>
          </div>

        </div>

        {/* Calculated Pool Rewards Outputs */}
        <div className="lg:col-span-5 bg-slate-950 text-white rounded-xl p-8 border border-slate-800 flex flex-col justify-between shadow-md relative">
          
          <div className="space-y-6">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Calculated Return Vector</span>
              <span className="text-[10px] text-emerald-400 font-bold font-mono">Simulated Epoch v1.2</span>
            </div>

            {/* Big Reward metrics */}
            <div className="space-y-4">
              
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">PROJECTED LP REWARD APR</span>
                <div className="text-4xl md:text-5xl font-black text-emerald-400 font-mono tracking-tight flex items-baseline space-x-1.5">
                  <span>{projectedApr}%</span>
                  <span className="text-xs text-slate-400 font-bold">APR*</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4 text-xs font-mono">
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block mb-1">Est. OP Rewards (10-Wks)</span>
                  <span className="text-white font-extrabold">
                    {Math.floor(estOpActiveRewards).toLocaleString()} OP
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-slate-500 uppercase block mb-1">Retention OP (Post-Phase)</span>
                  <span className="text-emerald-400 font-extrabold">
                    {Math.floor(estOpRetentionRewards).toLocaleString()} OP
                  </span>
                </div>
              </div>

              <div className="bg-slate-900 rounded p-3 border border-slate-800 space-y-1.5 text-[10px] text-slate-400 font-mono">
                <div className="flex justify-between">
                  <span>Your share of virtual capital:</span>
                  <span className="font-bold text-slate-200">{(estimatedPoolShare * 100).toFixed(4)}%</span>
                </div>
                <div className="flex justify-between">
                  <span>Virtual deposit valuation:</span>
                  <span className="font-bold text-slate-200">${Math.floor(virtualLiquidity).toLocaleString()}</span>
                </div>
              </div>

            </div>

          </div>

          <div className="pt-6 border-t border-slate-800 text-[9px] text-slate-500 leading-normal italic mt-6">
            *Estimated APR assumes constant pool depths and OP token price. Under Uniswap V3, yields update dynamically based on price fluctuations and active tick density.
          </div>

        </div>

      </div>

    </section>
  );
}