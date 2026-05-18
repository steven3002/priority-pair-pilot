"use client"

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { CONTRACT_ADDRESS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-500 pt-16 pb-12 px-6 lg:px-12 border-t border-slate-900 font-sans">
      <div className="max-w-6xl mx-auto space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-xs">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-white text-black rounded font-black text-xs flex items-center justify-center">
                PP
              </div>
              <span className="font-bold text-white text-sm tracking-tight">PriorityPair Pilot</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
              An open-source, non-custodial metric and deployment routing architecture operating within the parameters of the Optimism Grant framework.
            </p>
          </div>

          {/* App Platform Navigation */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-extrabold tracking-wider text-[#FF0420] text-[10px] uppercase">Platform</h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li><Link href="/" className="hover:text-white transition-colors">Campaign Home</Link></li>
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Pool Dashboard</Link></li>
              <li><Link href="/incentives" className="hover:text-white transition-colors">Incentive Architecture</Link></li>
            </ul>
          </div>

          {/* External Ecosystem Infrastructure */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-extrabold tracking-wider text-[#FF0420] text-[10px] uppercase">Verified Venues</h4>
            <ul className="space-y-2 text-slate-300 font-medium">
              <li>
                <a 
                  href={`https://app.uniswap.org/explore/pools/optimism/${CONTRACT_ADDRESS}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Uniswap V3 WETH/USDC Pool <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a 
                  href="https://www.optimism.io/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  Optimism Collective <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Metadata Block */}
        <div className="border-t border-slate-900 pt-8 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-[11px]">
          <div className="text-center sm:text-left space-y-0.5">
            <span className="font-bold text-slate-400 block">© 2026 PriorityPair Pilot</span>
            <span className="text-slate-600">Built for the Optimism Ecosystem. Fully non-custodial routing layer.</span>
          </div>
          <div className="text-slate-600 font-mono text-[10px] bg-slate-900/50 border border-slate-800 px-3 py-1 rounded">
            PROPOSAL STATUS: MVP-EVALUATION
          </div>
        </div>

      </div>
    </footer>
  );
}