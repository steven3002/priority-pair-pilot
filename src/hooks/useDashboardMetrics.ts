import { useState, useEffect } from 'react';
import { getLivePoolData, LivePoolMetrics } from '@/lib/api';

export function useDashboardMetrics() {
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
  const [isLoading, setIsLoading] = useState(true);
  const [lastFetched, setLastFetched] = useState<string>("Never");
  const [rawPoolPayload, setRawPoolPayload] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    async function fetchDashboardMetrics() {
      // Only fetch if the page is visible to save resources
      if (document.hidden) return;
      
      setIsLoading(true);
      setError(null);
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
        
        setRawPoolPayload(data.rawUntouched);
        
        const now = new Date();
        setLastFetched(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        setError("Failed to fetch pool metrics. Retrying...");
      }
      setIsLoading(false);
    }

    fetchDashboardMetrics();
    
    // Resume polling when tab becomes visible
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchDashboardMetrics();
      }
    };
    
    document.addEventListener("visibilitychange", handleVisibilityChange);
    interval = setInterval(fetchDashboardMetrics, 60000);
    
    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return { metrics, isLoading, lastFetched, rawPoolPayload, error };
}
