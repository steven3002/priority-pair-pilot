"use client"

import React from 'react';
import MetricCard from '@/components/MetricCard';
import { 
  Database, 
  LineChart, 
  Percent, 
  Activity, 
  TrendingUp, 
  Coins
} from 'lucide-react';

import DashboardHeader from '@/components/dashboard/DashboardHeader';
import PoolBanner from '@/components/dashboard/PoolBanner';
import GovernanceReport from '@/components/dashboard/GovernanceReport';
import { useDashboardMetrics } from '@/hooks/useDashboardMetrics';

export default function DashboardPage() {
  const { metrics, isLoading, lastFetched, rawPoolPayload, error } = useDashboardMetrics();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-[6rem] pb-20 font-sans selection:bg-red-100">
      <main className="max-w-6xl mx-auto px-6 space-y-10">
        
        <DashboardHeader 
          isLoading={isLoading} 
          lastFetched={lastFetched} 
          rawPoolPayload={rawPoolPayload} 
          error={error} 
        />

        <PoolBanner />

        {/* METRICS CORE GRID */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Core Pool Liquidity Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              title="Current TVL Depth"
              value={`$${metrics.tvl.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              subtext="Live TVL parsed via indexer"
              isLoading={isLoading}
              icon={<Database className="w-4 h-4" />}
            />
            <MetricCard 
              title="24H Swap Volume"
              value={`$${metrics.volume24h.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              subtext="Volume routed past 24 hours"
              isLoading={isLoading}
              icon={<LineChart className="w-4 h-4" />}
            />
            <MetricCard 
              title="Capital Efficiency (24H)"
              value={metrics.capitalEfficiency}
              subtext="Formula: (24H Volume / TVL)"
              isLoading={isLoading}
              accent={true}
              icon={<Activity className="w-4 h-4" />}
            />
            <MetricCard 
              title="Organic Pool APY"
              value={`${metrics.poolApy.toFixed(2)}%`}
              subtext="Base yield before OP incentives"
              isLoading={isLoading}
              icon={<Percent className="w-4 h-4" />}
            />
          </div>
        </div>

        {/* SECONDARY EXTENDED REAL METRICS GRID */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Derived Volumetric Analytics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              title="Trailing 7D Volume"
              value={`$${metrics.volume7d.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              subtext="Cumulative 7-day trade velocity"
              isLoading={isLoading}
              icon={<TrendingUp className="w-4 h-4" />}
            />
            <MetricCard 
              title="Estimated 24H Fees"
              value={`$${metrics.estFees24h.toLocaleString(undefined, { maximumFractionDigits: 2 })}`}
              subtext="Calculated 0.3% gross revenue"
              isLoading={isLoading}
              icon={<Coins className="w-4 h-4" />}
            />
            <MetricCard 
              title="Estimated 7D Fees"
              value={`$${metrics.estFees7d.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              subtext="7-day accumulated pool revenue"
              isLoading={isLoading}
              icon={<Coins className="w-4 h-4 text-emerald-500" />}
            />
            <MetricCard 
              title="7D Utilization Velocity"
              value={metrics.utilizationVelocity}
              subtext="Formula: (7D Volume / TVL)"
              isLoading={isLoading}
              icon={<Activity className="w-4 h-4" />}
            />
          </div>
        </div>

        <GovernanceReport />

      </main>
    </div>
  );
}