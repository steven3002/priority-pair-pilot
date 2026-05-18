import { NextResponse } from 'next/server';
import { TARGET_POOL_UUID } from '@/lib/constants';

const DEFILLAMA_POOLS_URL = "https://yields.llama.fi/pools";

export async function GET() {
  try {
    const response = await fetch(DEFILLAMA_POOLS_URL, {
      next: { revalidate: 300 }
    });

    if (!response.ok) {
      return NextResponse.json({ error: `DefiLlama API error: ${response.status}` }, { status: response.status });
    }

    const json = await response.json();
    const pool = json.data?.find((p: any) => p.pool === TARGET_POOL_UUID);

    if (!pool) {
      return NextResponse.json({ error: "Pool not found" }, { status: 404 });
    }

    return NextResponse.json(pool);
  } catch (error) {
    console.error("Failed to read DefiLlama metrics layer:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
