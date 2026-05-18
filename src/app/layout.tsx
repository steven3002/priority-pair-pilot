import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from '@/components/Footer';

// Optimize font loading with Next.js
const lato = Lato({ 
  subsets: ["latin"], 
  weight: ["400", "700", "900"] 
});

export const metadata: Metadata = {
  title: "PriorityPair | Uniswap V3 Pool Intelligence",
  description:
    "Real-time pool metrics, APY tracking, and LP onboarding for the Uniswap V3 WETH/USDC incentive pool on Optimism Mainnet.",
  keywords: ["Uniswap V3", "liquidity pool", "DeFi", "Optimism", "APY", "WETH", "USDC"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} antialiased`}>
        
        <NavBar />
 
        <main className="pt-24 min-h-screen">
          {children}
        </main>
        <Footer  />
      </body>
    </html>
  );
}