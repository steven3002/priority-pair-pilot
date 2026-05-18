"use client"

import React, { useState, useEffect } from 'react';
import { getLivePoolData } from '@/lib/api';
import type { Transaction } from '@/types';

import Telemetry from '@/components/Telemetry';
import AlertBox from '@/components/AlertBox';
import Hero from '@/components/Hero';
import Venue from '@/components/Venue';
import Simulator from '@/components/Simulator';
import Blueprint from '@/components/Blueprint';
import Registration from '@/components/Registration';
import Onboarding from '@/components/Onboarding';
import Guardrails from '@/components/Guardrails';

export default function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [poolTvl, setPoolTvl] = useState(0); 
  const [poolVolume24h, setPoolVolume24h] = useState(0); 
  const [poolFees24h, setPoolFees24h] = useState(0);
  const [indexedTransactions, setIndexedTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function fetchRealMetrics() {
      setIsLoading(true);
      const data = await getLivePoolData();
      
      if (data) {
        setPoolTvl(data.tvlUsd || 0);
        setPoolVolume24h(data.volumeUsd1d || 0);
        if (data.volumeUsd1d) {
          setPoolFees24h(data.volumeUsd1d * 0.003);
        }
      } else {
        triggerToast("Notice: DefiLlama indexer unreachable. Retaining static baseline parameters.");
      }
      setIsLoading(false);
    }

    fetchRealMetrics();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] bg-[radial-gradient(#E2E8F0_1px,transparent_1px)] [background-size:24px_24px] font-mono text-slate-900 selection:bg-red-100 flex flex-col pt-[3.5rem]">
      
      {toastMessage && (
        <div className="fixed bottom-4 right-4 bg-slate-900 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fadeIn font-sans text-xs font-bold">
          {toastMessage}
        </div>
      )}

      {/* Live Indexer Top-bar */}
      <Telemetry 
        isLoading={isLoading}
        poolTvl={poolTvl}
        poolVolume24h={poolVolume24h}
        poolFees24h={poolFees24h}
      />

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 md:px-8 py-8 space-y-16">
        
        {/* Top-Level Risk Disclaimer Alert Box */}
        <AlertBox />

        {/* Hero Block */}
        <Hero />
        
        {/* Target Venue Box */}
        <Venue 
          indexedTransactions={indexedTransactions}
          triggerToast={triggerToast}
        />
        
        {/* Concentrated Calculator */}
        <Simulator poolTvl={poolTvl} />
        
        {/* Execution Lifecycle Blueprint */}
        <Blueprint />

        <Guardrails />
        
        {/* Onboarding Step-by-Step Flow */}
        <Onboarding />
        
        {/* Soft Interest Portal */}
        <Registration triggerToast={triggerToast} />
      </main>

   
    </div>
  );
}