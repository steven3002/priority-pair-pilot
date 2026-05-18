"use client"

import React, { useState } from 'react';
import { Building, RefreshCw, Lock } from 'lucide-react';

interface RegistrationProps {
  triggerToast: (msg: string) => void;
}

export default function Registration({ triggerToast }: RegistrationProps) {
  const [lpName, setLpName] = useState('');
  const [lpEmail, setLpEmail] = useState('');
  const [lpIntendedSize, setLpIntendedSize] = useState('50k-250k');
  const [lpStrategy, setLpStrategy] = useState('Narrow (Tight Range)');
  const [lpComments, setLpComments] = useState('');
  
  const [submittingInterest, setSubmittingInterest] = useState(false);
  const [interestSubmittedSuccess, setInterestSubmittedSuccess] = useState(false);

  const handleInterestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lpName || !lpEmail) {
      triggerToast("Please input your entity name and contact details.");
      return;
    }
    
    setSubmittingInterest(true);
    
    setTimeout(() => {
      setSubmittingInterest(false);
      setInterestSubmittedSuccess(true);
      triggerToast("Non-binding soft interest submitted successfully!");
    }, 1200);
  };

  const resetInterestForm = () => {
    setLpName('');
    setLpEmail('');
    setLpComments('');
    setInterestSubmittedSuccess(false);
  };

  return (
    <section id="outreach-block" className="max-w-5xl mx-auto bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Info Column */}
        <div className="lg:col-span-5 bg-slate-950 text-white p-8 md:p-12 flex flex-col justify-between border-r border-slate-800">
          <div className="space-y-6">
            <div className="inline-flex p-3 bg-red-600/10 text-[#FF0420] rounded-xl border border-red-500/20">
              <Building className="w-5 h-5" />
            </div>
            
            <h3 className="text-2xl font-black font-sans leading-tight tracking-tight">
              Institutional LP <br />
              Registration Portal
            </h3>
            
            <p className="text-slate-400 text-xs leading-relaxed font-sans">
              PriorityPair is gathering non-binding soft interest from liquidity providers for the upcoming OP Mainnet pilot. If you are preparing allocations matching our proposed reward distribution, register your strategy specs below.
            </p>

            <div className="flex items-start space-x-2 bg-slate-900/50 border border-slate-800 p-3 rounded-lg">
              <Lock className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-400 font-sans leading-relaxed">
                <strong className="text-slate-300">Confidential & Non-Binding:</strong> Data is collected solely to demonstrate baseline capital interest to the Optimism Grants Council. No smart contract approvals are required.
              </p>
            </div>
            
            <div className="bg-[#FF0420]/10 border border-[#FF0420]/20 p-3 rounded-lg flex items-center justify-center">
              <p className="text-[10px] font-bold text-[#FF0420] uppercase tracking-widest text-center">
                Interactive Demo Component Only
              </p>
            </div>
          </div>

          <div className="text-[10px] text-slate-600 font-mono tracking-tight pt-8 border-t border-slate-900 mt-8">
            Optimism Foundation • Pilot Scope 4 Spec
          </div>
        </div>

        {/* Right Interactive Form */}
        <div className="lg:col-span-7 p-8 md:p-12 bg-slate-50/50">
          {interestSubmittedSuccess ? (
            <div className="h-full flex flex-col justify-center items-center text-center space-y-5 py-8 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full flex items-center justify-center font-bold text-2xl shadow-sm">
                ✓
              </div>
              <div className="space-y-2">
                <h4 className="font-black text-slate-900 text-lg tracking-tight">Registration Recorded</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Soft allocation of <strong className="text-slate-700">{lpIntendedSize}</strong> under <strong className="text-slate-700">{lpEmail}</strong> has been logged. Our team will follow up as the grant progresses.
                </p>
              </div>
              <button 
                onClick={resetInterestForm}
                className="text-[10px] mt-4 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-bold px-6 py-2.5 rounded transition-colors uppercase tracking-widest"
              >
                Submit Another Entry
              </button>
            </div>
          ) : (
            <form onSubmit={handleInterestSubmit} className="space-y-5 font-mono text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Entity Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Amber Capital"
                    value={lpName}
                    onChange={(e) => setLpName(e.target.value)}
                    className="w-full bg-white p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF0420] focus:ring-1 focus:ring-[#FF0420]/20 text-slate-800 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Contact Email</label>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. allocs@amber.capital"
                    value={lpEmail}
                    onChange={(e) => setLpEmail(e.target.value)}
                    className="w-full bg-white p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF0420] focus:ring-1 focus:ring-[#FF0420]/20 text-slate-800 transition-all shadow-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Est. Allocation Size</label>
                  <select 
                    value={lpIntendedSize} 
                    onChange={(e) => setLpIntendedSize(e.target.value)}
                    className="w-full bg-white p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF0420] focus:ring-1 focus:ring-[#FF0420]/20 text-slate-700 transition-all shadow-sm cursor-pointer"
                  >
                    <option value="Under 10k">Under $10,000 USD</option>
                    <option value="10k-50k">$10,000 - $50,000 USD</option>
                    <option value="50k-250k">$50,000 - $250,000 USD</option>
                    <option value="250k+">Above $250,000 USD</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Primary Strategy</label>
                  <select 
                    value={lpStrategy} 
                    onChange={(e) => setLpStrategy(e.target.value)}
                    className="w-full bg-white p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF0420] focus:ring-1 focus:ring-[#FF0420]/20 text-slate-700 transition-all shadow-sm cursor-pointer"
                  >
                    <option value="Narrow (Tight Range)">Concentrated / Narrow Range</option>
                    <option value="Standard (Medium Range)">Balanced / Medium Range</option>
                    <option value="Wide (Safe Range)">Passive / Wide Range</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Strategic Notes & Feedback</label>
                <textarea 
                  rows={3}
                  placeholder="e.g. Looking to integrate Gnosis Safe configurations with indexer tracker..."
                  value={lpComments}
                  onChange={(e) => setLpComments(e.target.value)}
                  className="w-full bg-white p-3 rounded-lg border border-slate-200 focus:outline-none focus:border-[#FF0420] focus:ring-1 focus:ring-[#FF0420]/20 text-slate-800 resize-none transition-all shadow-sm"
                />
              </div>

              <div className="pt-2">
                {submittingInterest ? (
                  <button 
                    type="button" 
                    className="w-full bg-[#FF0420] text-white font-bold py-3.5 rounded-lg text-[10px] tracking-widest cursor-wait flex items-center justify-center space-x-2 shadow-sm"
                    disabled
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>REGISTERING DATA SPECIFICATION...</span>
                  </button>
                ) : (
                  <button 
                    type="submit" 
                    className="w-full bg-slate-950 hover:bg-slate-900 text-white font-bold py-3.5 rounded-lg text-[10px] tracking-widest transition-all shadow-sm hover:shadow active:scale-[0.99]"
                  >
                    SUBMIT PORTFOLIO INTEREST
                  </button>
                )}
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
}