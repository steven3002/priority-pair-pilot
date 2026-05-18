export interface Transaction {
  id: string;
  type: string;
  address: string;
  amountUSD: number;
  tickLower: number;
  tickUpper: number;
  age: string;
}

export interface DefiLlamaPool {
  pool: string;
  chain: string;
  project: string;
  symbol: string;
  tvlUsd: number;
  apyBase?: number;
  apyReward?: number;
  apy?: number;
  rewardTokens?: string[];
  poolMeta?: string;
  volumeUsd1d?: number;
  volumeUsd7d?: number;
  [key: string]: any;
}
