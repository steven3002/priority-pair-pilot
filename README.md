# PriorityPair Pilot 
**OP Mainnet Liquidity Incentive MVP & Analytics Engine**

PriorityPair Pilot is a fully functional, front-end Minimum Viable Product (MVP) built to support a proposal to the Optimism Collective. This application serves as a public, non-custodial onboarding layer and live telemetry dashboard designed to prove the viability, transparency, and data-tracking capabilities of the proposed liquidity incentive campaign.

Targeting the **WETH/USDC (0.3% Fee Tier)** pool on **Uniswap V3 (OP Mainnet)**, this MVP establishes the structural framework for distributing 205,000 OP in active rewards and 35,000 OP in retention incentives over a 10-week lifecycle.

---

## 🏗️ Architectural Overview

This platform is engineered to mitigate smart contract risk by acting entirely as an off-chain routing and analytics interface. It proves that ecosystem health can be measured and rewarded without taking custody of user funds. 

### Core Features
* **Live DefiLlama Telemetry Engine:** The `/dashboard` route connects directly to the DefiLlama API to fetch real-time Total Value Locked (TVL), 24H/7D Volume, and Pool APY parameters without relying on hardcoded placeholder data.
* **Capital Efficiency Analytics:** Automatically derives structural health metrics, including Volume-to-TVL utilization velocity and estimated organic fee generation.
* **Governance Reporting Suite:** Generates an Optimism standard bi-weekly draft report, allowing reviewers to download raw `.md` files or copy unfiltered `.json` data payloads directly to their clipboard for audit.
* **Interactive LP Soft-Commit Demo:** A built-in institutional registration portal designed as an interactive demo to show how non-binding liquidity commitments would be captured.
* **Zero-Custody Execution Blueprint:** A visual 3-step onboarding timeline that deep-links directly to verified Uniswap V3 smart contracts to ensure user safety.

---

## 📊 Protocol Specifications

| Parameter | Specification |
| :--- | :--- |
| **Target Chain** | OP Mainnet |
| **DEX Venue** | Uniswap V3 |
| **Target Pair** | WETH / USDC (0.3% Fee Tier) |
| **Pool Contract** | `0xc1738D90E2E26C35784A0d3E3d8A9f795074bcA4` |
| **DefiLlama UUID** | `b2cca178-6e44-4e34-bdec-693994727bc4` |
| **Proposed Funding** | 240,000 OP Total |
| **Reward Split** | 205,000 OP (Active LP) / 35,000 OP (Sticky Retention) |

---

## 🛠️ Technical Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (Optimism Brand Palette `#FF0420`)
* **Icons:** Lucide React
* **Data Layer:** DefiLlama Yields API (`https://yields.llama.fi/pools`)
* **State Management:** React Hooks & LocalStorage

---

## 📂Project Core Structure

```text
priority-pair-pilot-mvp/
├── public/
│   └── Draft_BiWeekly_Report.md  # Standardized public governance report schema
└── src/
    ├── app/
    │   ├── api/pool-metrics/
    │   │   └── route.ts          # Server-side API route for DefiLlama fetching (ISR)
    │   ├── layout.tsx            # Global layout wrapper
    │   ├── page.tsx              # Landing Page container (Hero, Blueprint, Tracker)
    │   ├── icon.tsx              # Dynamically generated Next.js favicon
    │   ├── dashboard/
    │   │   └── page.tsx          # Live analytics engine & raw data export suite
    │   └── incentives/
    │       └── page.tsx          # Allocation distribution & operational phase rules
    ├── components/
    │   ├── dashboard/            # Specialized dashboard sub-components
    │   │   ├── DashboardHeader.tsx
    │   │   ├── GovernanceReport.tsx
    │   │   └── PoolBanner.tsx
    │   ├── AlertBox.tsx          # High-visibility non-custodial risk disclaimer
    │   ├── Blueprint.tsx         # Campaign timeline and operational execution map
    │   ├── Hero.tsx              # Primary value proposition and landing banner
    │   ├── MetricCard.tsx        # Reusable, data-driven telemetry card component
    │   ├── NavBar.tsx            # Premium Web3 navigation with OP-red hover states
    │   ├── Footer.tsx            # Ecosystem anchor navigation
    │   ├── Onboarding.tsx        # Deployment sequence map
    │   ├── Registration.tsx      # Interactive Demo Portal for LP soft-interest capture
    │   ├── Simulator.tsx         # Concentrated liquidity modeling calculator
    │   ├── StepGuide.tsx         # 3-step execution specification view panel
    │   └── Venue.tsx             # Target pool contract verification block
    ├── hooks/
    │   └── useDashboardMetrics.ts# Custom hook for polling and processing live pool data
    ├── lib/
    │   ├── api.ts                # Internal API client logic
    │   └── constants.ts          # Centralized configuration (contract address, allocations)
    └── types/
        └── index.ts              # Global TypeScript interfaces
```

---

##  Local Installation & Setup

To run this MVP locally for testing, auditing, or further development:

1. **Clone the repository:**
```bash
git clone https://github.com/steven3002/priority-pair-pilot.git
cd priority-pair-pilot

```


2. **Install dependencies:**
Ensure you have Node.js (v18+) installed.
```bash
npm install
# or
yarn install
# or
pnpm install

```


3. **Start the development server:**
```bash
npm run dev

```


4. **Access the application:**
Open your browser and navigate to `http://localhost:3000`.

---

## 🛡️ Risk & Custody Disclaimer

**LPs interact directly with Uniswap V3 smart contracts on OP Mainnet.** PriorityPair Pilot acts strictly as an off-chain data aggregator, analytics engine, and onboarding portal. The PriorityPair team does not custody user funds, deploy autonomous reward smart contracts, or control the underlying decentralized exchange liquidity venues. All transactions are executed at the user's discretion via the official Uniswap routing infrastructure.

