import React, { useState } from 'react';
import { Download, Check, Braces, AlertTriangle } from 'lucide-react';

interface DashboardHeaderProps {
  isLoading: boolean;
  lastFetched: string;
  rawPoolPayload: any;
  error: string | null;
}

export default function DashboardHeader({ isLoading, lastFetched, rawPoolPayload, error }: DashboardHeaderProps) {
  const [copiedJson, setCopiedJson] = useState(false);

  const handleCopyJson = () => {
    if (!rawPoolPayload) return;
    navigator.clipboard.writeText(JSON.stringify(rawPoolPayload, null, 2)).then(() => {
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    });
  };

  const handleDownloadJsonFile = () => {
    if (!rawPoolPayload) return;
    
    const jsonBlob = new Blob([JSON.stringify(rawPoolPayload, null, 2)], { type: 'application/json' });
    const blobUrl = URL.createObjectURL(jsonBlob);
    
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = blobUrl;
    downloadAnchor.download = `uniswap_v3_op_pool_query_raw.json`;
    
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    
    document.body.removeChild(downloadAnchor);
    URL.revokeObjectURL(blobUrl);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200 pb-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight text-slate-950">Pilot Analytics Engine</h1>
        <p className="text-slate-500 font-medium text-sm">
          Verified live indexer telemetry derived entirely from on-chain pool parameters.
        </p>
      </div>
      
      <div className="flex flex-col items-end gap-2">
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleDownloadJsonFile}
            disabled={isLoading || !rawPoolPayload}
            className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold px-3.5 py-2 rounded-xl flex items-center space-x-1.5 transition-all shadow-xs active:scale-95 disabled:opacity-50"
            title="Download unfiltered raw API data object as a .json file"
          >
            <Download className="w-3.5 h-3.5 text-[#FF0420]" />
            <span className="hidden sm:inline">DOWNLOAD DATA</span>
          </button>

          <button
            onClick={handleCopyJson}
            disabled={isLoading || !rawPoolPayload}
            className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-mono text-[10px] font-bold px-3 py-2 rounded-xl flex items-center space-x-1.5 transition-all shadow-xs active:scale-95 disabled:opacity-50"
          >
            {copiedJson ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span className="hidden sm:inline">COPIED</span>
              </>
            ) : (
              <>
                <Braces className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden sm:inline">COPY JSON</span>
              </>
            )}
          </button>

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
        {error && (
          <div className="text-[10px] text-red-500 font-mono flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> {error}
          </div>
        )}
      </div>
    </div>
  );
}
