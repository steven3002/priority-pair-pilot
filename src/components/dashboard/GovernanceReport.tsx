import React, { useState } from 'react';
import { FileText, Check, FileCode, CheckCircle } from 'lucide-react';

export default function GovernanceReport() {
  const [copiedMarkdown, setCopiedMarkdown] = useState(false);

  const rawMarkdownTemplate = `# PriorityPair Pilot: Bi-Weekly Performance Update\n**Reporting Epoch Block:** [Insert Date Range] | **Grant Reference ID:** OP-Pilot-240k\n\n## 1. Aggregate Resource Utilization\n- OP Spent During Period: 41,000.00 OP\n- Time-Weighted Average TVL: [Metric Base]\n- Total Fee Yield vs Baseline: +[Percentage]% Delta\n\n## 2. Liquidity Efficiency Analysis\nCalculated index ratio logs (Δ Volume / Δ TVL) to verify optimal non-mercenary capital allocation mapping.`;

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(rawMarkdownTemplate).then(() => {
      setCopiedMarkdown(true);
      setTimeout(() => setCopiedMarkdown(false), 2000);
    });
  };

  return (
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
              aria-label="Copy raw markdown"
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

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 md:p-8 space-y-6 text-slate-800 font-sans shadow-inner">
          <div className="border-b border-slate-200 pb-4">
            <div className="text-xl font-black tracking-tight text-slate-950">
              PriorityPair Pilot: Bi-Weekly Performance Update
            </div>
            <p className="text-[11px] text-slate-400 font-mono mt-1.5 font-bold uppercase tracking-wide">
              Reporting Epoch Block: <span className="text-slate-700">[Insert Date Range]</span> | Grant Reference ID: <span className="text-slate-700">OP-Pilot-240k</span>
            </p>
          </div>

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

          <div className="space-y-2">
            <h3 className="text-sm font-black text-slate-950 uppercase tracking-wider font-mono text-red-600">
              2. Liquidity Efficiency Analysis
            </h3>
            <p className="text-slate-600 text-xs font-medium leading-relaxed max-w-3xl">
              Historical tracking matrix calculating index ratio logs (Δ Volume / Δ TVL) to explicitly verify that incentive distributions are generating optimized, non-mercenary capital allocation depth across active trading paths.
            </p>
          </div>

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
  );
}
