// src/app/dashboard/page.tsx
"use client"

import React, { useState, useEffect } from 'react';
import { getLivePoolData } from '@/lib/api';
import MetricCard from '@/components/MetricCard';
import { 
  Database, 
  LineChart, 
  Percent, 
  Activity, 
  FileText, 
  CheckCircle, 
  TrendingUp, 
  Coins,
  ExternalLink,
  Copy,
  Check,
  ShieldCheck,
  FileCode,
  Braces,
  Download
} from 'lucide-react';

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<string>("Never");
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);
  const [copiedJson, setCopiedJson] = useState(false);
  
  // State to hold the completely unfiltered data object from our query
  const [rawPoolPayload, setRawPoolPayload] = useState<any>(null);

  const contractAddress = "0xc1738D90E2E26C35784A0d3E3d8A9f795074bcA4";

  // Real stats extracted and derived purely from live indexer parameters
  const [metrics, setMetrics] = useState({
    tvl: 0,
    volume24h: 0,
    volume7d: 0,
    poolApy: 0,
    capitalEfficiency: "0.00%",
    estFees24h: 0,
    estFees7d: 0,
    utilizationVelocity: "0.00%"
  });

  const rawMarkdownTemplate = `# PriorityPair Pilot: Bi-Weekly Performance Update\n**Reporting Epoch Block:** [Insert Date Range] | **Grant Reference ID:** OP-Pilot-240k\n\n## 1. Aggregate Resource Utilization\n- OP Spent During Period: 41,000.00 OP\n- Time-Weighted Average TVL: [Metric Base]\n- Total Fee Yield vs Baseline: +[Percentage]% Delta\n\n## 2. Liquidity Efficiency Analysis\nCalculated index ratio logs (Δ Volume / Δ TVL) to verify optimal non-mercenary capital allocation mapping.`;

  useEffect(() => {
    async function fetchDashboardMetrics() {
      setIsLoading(true);
      const data = await getLivePoolData();
      
      if (data) {
        const tvl = data.tvlUsd;
        const vol24h = data.volumeUsd1d;
        const vol7d = data.volumeUsd7d;
        
        const efficiency = tvl > 0 ? ((vol24h / tvl) * 100).toFixed(2) + "%" : "0.00%";
        const velocity7d = tvl > 0 ? ((vol7d / tvl) * 100).toFixed(2) + "%" : "0.00%";
        const fees24h = vol24h * 0.003;
        const fees7d = vol7d * 0.003;

        setMetrics({
          tvl,
          volume24h: vol24h,
          volume7d: vol7d,
          poolApy: data.apy,
          capitalEfficiency: efficiency,
          estFees24h: fees24h,
          estFees7d: fees7d,
          utilizationVelocity: velocity7d
        });
        
        // Save the completely unfiltered query object directly to state
        setRawPoolPayload(data.rawUntouched);
        
        const now = new Date();
        setLastFetched(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      }
      setIsLoading(false);
    }

    fetchDashboardMetrics();
    const interval = setInterval(fetchDashboardMetrics, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(contractAddress).then(() => {
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2000);
    });
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(rawMarkdownTemplate).then(() => {
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2000);
    });
  };

  const handleCopyJson = () => {
    if (!rawPoolPayload) return;
    navigator.clipboard.writeText(JSON.stringify(rawPoolPayload, null, 2)).then(() => {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    });
  };

  // NATIVE BROWSER DOWNLOAD ENGINE FOR THE UNFILTERED DATA OBJECT
  const handleDownloadJsonFile = () => {
    if (!rawPoolPayload) return;
    
    // Create a client-side blob containing the completely unedited payload architecture
    const jsonBlob = new Blob([JSON.stringify(rawPoolPayload, null, 2)], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(jsonBlob);
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = blobUrl;
    downloadAnchor.download = `uniswap_v3_op_pool_query_raw.json`;
    
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    
    // Clean up memory space
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pt-[6rem] pb-20 font-sans selection:bg-red-100">
      <main className="max-w-6xl mx-auto px-6 space-y-10">
        
        {/* DASHBOARD HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-black tracking-tight text-slate-950">Pilot Analytics Engine</h1>
            <p className="text-slate-500 font-medium text-sm">
              Verified live indexer telemetry derived entirely from on-chain pool parameters.
            </p>
          </div>
          
          <div className="flex items-center gap-2.5">
            {/* NEW: DOWNLOAD RAW UNFILTERED JSON DATA BUTTON */}
            <button
              onClick={handleDownloadJsonFile}
              disabled={isLoading || !rawPoolPayload}
              className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all shadow-xs active:scale-95 disabled:opacity-50"
              title="Download completely unfiltered raw API data object as a .json file"
            >
              <Download className="w-3.5 h-3.5 text-[#FF0420]" />
              <span>DOWNLOAD UNFILTERED DATA (.JSON)</span>
            </button>

            {/* COPY JSON TO CLIPBOARD LINK */}
            <button
              onClick={handleCopyJson}
              disabled={isLoading || !rawPoolPayload}
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold px-3 py-2 rounded-xl flex items-center space-x-1.5 transition-all shadow-xs active:scale-95 disabled:opacity-50"
            >
              {copiedJson ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  <span>JSON COPIED</span>
                </>
              ) : (
                <>
                  <Braces className="w-3.5 h-3.5 text-slate-500" />
                  <span>COPY JSON</span>
                </>
              )}
            </button>

            {/* SYNCING TICKER BADGE */}
            <div className="bg-white border border-slate-200 px-4 py-2 rounded-xl flex items-center space-x-2 w-fit shadow-xs">
              <span className="flex h-2 w-2 relative">
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isLoading ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${isLoading ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
              </span>
              <span className="font-mono text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                {isLoading ? "Syncing..." : `Last Indexed: ${lastFetched}`}
              </span>
            </div>
          </div>
        </div>

        {/* TARGET VENUE & POOL LINK BANNER */}
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
                  {contractAddress}
                </code>
                <button 
                  onClick={handleCopyAddress}
                  className="p-1 bg-white border border-slate-200 rounded hover:border-[#FF0420] hover:text-[#FF0420] transition-colors text-slate-400 shadow-xs ml-1"
                >
                  {copiedAddress ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                </button>
              </div>
            </div>
          </div>

          <a 
            href={`https://app.uniswap.org/explore/pools/optimism/${contractAddress}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center space-x-2 bg-[#FF0420] hover:bg-red-700 text-white font-bold text-xs px-5 py-3 rounded-xl shadow-xs transition-colors tracking-tight font-sans"
          >
            <span>Open Verified Pool Interface</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* METRICS CORE GRID */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 font-mono">Core Pool Liquidity Metrics</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard 
              title="Current TVL Depth"
              value={`$${metrics.tvl.toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              subtext="Live TVL parsed via DefiLlama indexer"
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

        {/* GOVERNANCE REPORT TEMPLATE SECTION */}
        <div id="report-template" className="space-y-6 pt-4 scroll-mt-24">
          <div className="flex items-center space-x-2 text-slate-400">
            <FileText className="w-4 h-4 text-slate-700" />
            <span className="text-[11px] font-bold uppercase tracking-widest font-mono">Optimism Governance Reporting Standard</span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 md:p-10 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <h3 className="text-xl font-extrabold tracking-tight text-slate-950">Draft Bi-Weekly Campaign Report</h3>
                <p className="text-slate-400 text-xs font-medium">Standardized schema template for public ecosystem evaluation updates.</p>
              </div>
              
              <div className="flex flex-wrap items-center gap-2.5">
                <a 
                  href="/Draft_BiWeekly_Report.md" 
                  download="Draft_BiWeekly_Report.md"
                  className="inline-flex items-center space-x-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-mono text-[10px] font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs border border-slate-200 active:scale-95"
                  title="Download Raw Markdown Specification File"
                >
                  <FileText className="w-3.5 h-3.5 text-slate-500" />
                  <span>DOWNLOAD AS ASSET (.MD)</span>
                </a>

                <button 
                  onClick={handleCopyMarkdown}
                  className="inline-flex items-center space-x-2 bg-slate-950 hover:bg-slate-900 text-white font-mono text-[10px] font-bold px-3.5 py-2 rounded-xl transition-all shadow-xs border border-slate-900 active:scale-95"
                >
                  {copiedMarkdown ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>COPIED RAW MARKDOWN</span>
                    </>
                  ) : (
                    <>
                      <FileCode className="w-3.5 h-3.5 text-red-500" />
                      <span>COPY RAW MARKDOWN</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* GORGEOUS SEMANTIC LAYOUT WINDOW */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 space-y-6 text-slate-800 font-sans shadow-inner">
              <div className="border-b border-slate-200 pb-4">
                <h1 className="text-xl font-black tracking-tight text-slate-950">
                  PriorityPair Pilot: Bi-Weekly Performance Update
                </h1>
                <p className="text-[11px] text-slate-400 font-mono mt-1.5 font-bold uppercase tracking-wide">
                  Reporting Epoch Block: <span className="text-slate-700">[Insert Date Range]</span> | Grant Reference ID: <span className="text-slate-700">OP-Pilot-240k</span>
                </p>
              </div>

              {/* Section 1 */}
              <div className="space-y-3">
                <h2 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono text-red-600">
                  1. Aggregate Resource Utilization
                </h2>
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-xs">
                  <div className="grid grid-cols-12 bg-slate-100 px-4 py-2 text-[10px] font-black text-slate-500 uppercase font-mono border-b border-slate-200">
                    <div className="col-span-5">Metric Tracked</div>
                    <div className="col-span-3 text-right">Target Parameter</div>
                    <div className="col-span-4 text-right">Actual Realized Value</div>
                  </div>
                  <div className="divide-y divide-slate-100 font-mono text-xs">
                    <div className="grid grid-cols-12 px-4 py-3 items-center">
                      <div className="col-span-5 font-sans font-bold text-slate-800">OP Spent During Period</div>
                      <div className="col-span-3 text-right text-slate-500">41,000.00 OP</div>
                      <div className="col-span-4 text-right font-black text-slate-400">[Awaiting Phase Input]</div>
                    </div>
                    <div className="grid grid-cols-12 px-4 py-3 items-center">
                      <div className="col-span-5 font-sans font-bold text-slate-800">Time-Weighted Average TVL</div>
                      <div className="col-span-3 text-right text-slate-500">Scale Depth Metric</div>
                      <div className="col-span-4 text-right font-black text-slate-400">[Awaiting Phase Input]</div>
                    </div>
                    <div className="grid grid-cols-12 px-4 py-3 items-center">
                      <div className="col-span-5 font-sans font-bold text-slate-800">Total Fee Yield vs Baseline</div>
                      <div className="col-span-3 text-right text-slate-500">Positive Delta Growth</div>
                      <div className="col-span-4 text-right font-black text-emerald-600">+[Awaiting Phase]% Delta</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-2">
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono text-red-600">
                  2. Liquidity Efficiency Analysis
                </h3>
                <p className="text-slate-600 text-xs font-medium leading-relaxed max-w-3xl">
                  Historical tracking matrix calculating index ratio logs (Δ Volume / Δ TVL) to explicitly verify that incentive distributions are generating optimized, non-mercenary capital allocation depth across active trading paths.
                </p>
              </div>

              {/* Section 3 */}
              <div className="space-y-3">
                <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono text-red-600">
                  3. Post-Campaign Sticky Retention Monitor
                </h3>
                <div className="bg-slate-900 text-slate-400 p-4 rounded-xl border border-slate-800 space-y-1.5 text-[11px]">
                  <p className="text-white font-extrabold font-sans flex items-center gap-1.5 text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-400" /> Retention Parameter Check Active
                  </p>
                  <p className="font-sans font-medium text-slate-400">
                    During the subsequent 4-week trial cooldown period, the indexer proxy continues to track persistent TVL to verify standard structural stickiness factors after the emission weights taper.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}