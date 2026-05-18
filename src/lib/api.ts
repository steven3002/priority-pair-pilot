// src/lib/api.ts

import type { DefiLlamaPool } from '@/types';

export interface LivePoolMetrics {
  tvlUsd: number;
  volumeUsd1d: number;
  volumeUsd7d: number;
  apy: number;
  rawUntouched: DefiLlamaPool;
}

export async function getLivePoolData(): Promise<LivePoolMetrics | null> {
  try {
    const response = await fetch('/api/pool-metrics');

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const pool: DefiLlamaPool = await response.json();

    return {
      tvlUsd: pool.tvlUsd || 0,
      volumeUsd1d: pool.volumeUsd1d || 0,
      volumeUsd7d: pool.volumeUsd7d || 0,
      apy: pool.apy || 0,
      rawUntouched: pool
    };

  } catch (error) {
    console.error("Failed to read metrics from internal API:", error);
    return null;
  }
}