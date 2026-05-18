// src/lib/api.ts

const DEFILLAMA_POOLS_URL = "https://yields.llama.fi/pools";
export const TARGET_POOL_UUID = "b2cca178-6e44-4e34-bdec-693994727bc4";

export interface LivePoolMetrics {
  tvlUsd: number;
  volumeUsd1d: number;
  volumeUsd7d: number;
  apy: number;
  rawUntouched: any; // <-- Added to hold the completely unfiltered API response
}

export async function getLivePoolData(): Promise<LivePoolMetrics | null> {
  try {
    const response = await fetch(DEFILLAMA_POOLS_URL, {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      throw new Error(`DefiLlama API error: ${response.status}`);
    }

    const json = await response.json();
    const pool = json.data.find((p: any) => p.pool === TARGET_POOL_UUID);

    if (!pool) return null;

    return {
      tvlUsd: pool.tvlUsd || 0,
      volumeUsd1d: pool.volumeUsd1d || 0,
      volumeUsd7d: pool.volumeUsd7d || 0,
      apy: pool.apy || 0,
      rawUntouched: pool // <-- Passing the entire, unmodified object straight through
    };

  } catch (error) {
    console.error("Failed to read DefiLlama metrics layer:", error);
    return null;
  }
}