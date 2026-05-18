"use client";

import { useState } from "react";
import { CONTRACT_ADDRESS } from '@/lib/constants';

interface Step {
  id: number;
  title: string;
  description: string;
  detailedContent: string;
  actionText?: string;
  actionLink?: string;
}

const STEPS: Step[] = [
  {
    id: 1,
    title: "Acquire WETH & USDC",
    description: "Prepare assets on Optimism Mainnet.",
    detailedContent:
      "To participate in this incentive pool, you'll need both WETH and USDC in equal values (for a balanced range) on Optimism. You can bridge assets from Ethereum L1 or other L2s using the official Optimism Bridge, or swap directly on Optimism via Uniswap or 1inch.",
    actionText: "Optimism Bridge",
    actionLink: "https://gateway.optimism.io/",
  },
  {
    id: 2,
    title: "Access Pool Venue",
    description: "Navigate to the Uniswap V3 WETH/USDC pool.",
    detailedContent:
      "Click the direct pool link below, or search for the WETH/USDC pool contract (fee tier 0.05%) on the Uniswap V3 Optimism application. Ensure your Web3 wallet is switched to Optimism Mainnet before proceeding.",
    actionText: "Uniswap Pool Interface",
    actionLink:
      `https://app.uniswap.org/#/add/v3/${CONTRACT_ADDRESS}`,
  },
  {
    id: 3,
    title: "Set Range & Supply",
    description: "Specify price ranges and supply liquidity.",
    detailedContent:
      "Input your target WETH and USDC liquidity range. Sticking to a concentrated range around current prices maximises fee generation and qualifies for campaign rewards. Confirm the transaction in your wallet to begin indexing.",
    actionText: "View Pool Contract",
    actionLink:
      `https://optimistic.etherscan.io/address/${CONTRACT_ADDRESS}`,
  },
];

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2.5 7L5.5 10L11.5 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M6 3H3a1 1 0 00-1 1v9a1 1 0 001 1h9a1 1 0 001-1v-3M9 2h5m0 0v5m0-5L8 9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StepGuide() {
  const [activeStep, setActiveStep] = useState(1);
  const active = STEPS[activeStep - 1];

  return (
    <div
      className="w-full rounded-xl overflow-hidden"
      style={{
        background: "#0B121F",
        border: "1px solid #1E293B",
      }}
    >
      {/* ── Header ─────────────────────────────────────── */}
      <div
        className="px-6 py-5 flex items-center justify-between"
        style={{ borderBottom: "1px solid #1E293B" }}
      >
        <div>
          <h3
            className="text-base font-semibold tracking-tight"
            style={{ color: "#F8FAFC" }}
          >
            LP Onboarding Guide
          </h3>
          <p className="text-xs mt-0.5" style={{ color: "#94A3B8" }}>
            Three steps to supply liquidity and join the campaign.
          </p>
        </div>

        {/* Progress fraction */}
        <span
          className="text-xs font-mono font-medium px-2.5 py-1 rounded-md"
          style={{
            background: "rgba(0,210,255,0.08)",
            border: "1px solid rgba(0,210,255,0.18)",
            color: "#00D2FF",
          }}
        >
          {activeStep}/{STEPS.length}
        </span>
      </div>

      {/* ── Step Tabs ───────────────────────────────────── */}
      <div
        className="grid grid-cols-3"
        style={{ borderBottom: "1px solid #1E293B" }}
        role="tablist"
        aria-label="Onboarding steps"
      >
        {STEPS.map((step) => {
          const isActive    = activeStep === step.id;
          const isCompleted = activeStep > step.id;

          return (
            <button
              key={step.id}
              id={`step-tab-${step.id}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`step-panel-${step.id}`}
              onClick={() => setActiveStep(step.id)}
              className="relative px-4 py-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#00D2FF]/60 group"
              style={{
                background: isActive ? "rgba(0,210,255,0.05)" : "transparent",
                borderRight: step.id < STEPS.length ? "1px solid #1E293B" : undefined,
              }}
            >
              {/* Step number / check */}
              <div className="flex items-center gap-2.5 mb-1.5">
                <span
                  className="flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-mono transition-all duration-200"
                  style={
                    isActive
                      ? { background: "#00D2FF", color: "#030712" }
                      : isCompleted
                      ? { background: "rgba(16,185,129,0.15)", color: "#10B981", border: "1px solid rgba(16,185,129,0.30)" }
                      : { background: "rgba(30,41,59,0.80)", color: "#94A3B8", border: "1px solid #1E293B" }
                  }
                >
                  {isCompleted ? <CheckIcon /> : step.id}
                </span>

                <p
                  className="text-xs font-semibold truncate"
                  style={{
                    color: isActive ? "#F8FAFC" : isCompleted ? "#10B981" : "#94A3B8",
                  }}
                >
                  {step.title}
                </p>
              </div>

              <p
                className="text-[11px] hidden sm:block truncate"
                style={{ color: "#94A3B8", opacity: isActive ? 1 : 0.6 }}
              >
                {step.description}
              </p>

              {/* Active underline indicator */}
              {isActive && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 right-0 h-[2px]"
                  style={{
                    background:
                      "linear-gradient(90deg, #00D2FF 0%, rgba(0,210,255,0) 100%)",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Step Detail Panel ───────────────────────────── */}
      <div
        id={`step-panel-${active.id}`}
        role="tabpanel"
        aria-labelledby={`step-tab-${active.id}`}
        className="px-6 py-6 transition-all duration-300"
      >
        {/* Step label */}
        <span
          className="inline-flex items-center gap-1.5 text-[11px] font-mono font-medium px-2 py-0.5 rounded mb-3"
          style={{
            background: "rgba(0,210,255,0.08)",
            border: "1px solid rgba(0,210,255,0.18)",
            color: "#00D2FF",
          }}
        >
          step {active.id} of {STEPS.length}
        </span>

        <h4
          className="text-lg font-semibold tracking-tight mb-3"
          style={{ color: "#F8FAFC" }}
        >
          {active.title}
        </h4>

        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "#94A3B8" }}
        >
          {active.detailedContent}
        </p>

        {/* Action row */}
        <div className="flex items-center justify-between gap-4">
          {/* Prev / Next */}
          <div className="flex items-center gap-2">
            <button
              id="step-prev-btn"
              disabled={activeStep === 1}
              onClick={() => setActiveStep((s) => Math.max(1, s - 1))}
              className="px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF]/60"
              style={{
                background: "rgba(30,41,59,0.60)",
                border: "1px solid #1E293B",
                color: "#94A3B8",
              }}
            >
              ← Prev
            </button>
            <button
              id="step-next-btn"
              disabled={activeStep === STEPS.length}
              onClick={() => setActiveStep((s) => Math.min(STEPS.length, s + 1))}
              className="px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF]/60"
              style={{
                background: "rgba(30,41,59,0.60)",
                border: "1px solid #1E293B",
                color: "#94A3B8",
              }}
            >
              Next →
            </button>
          </div>

          {/* External action link */}
          {active.actionText && (
            <a
              id={`step-action-${active.id}`}
              href={active.actionLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-xs font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2FF]/60 hover:opacity-90 active:scale-95"
              style={{
                background: "linear-gradient(135deg, #00D2FF 0%, #0077B6 100%)",
                color: "#030712",
                boxShadow: "0 0 16px rgba(0,210,255,0.20)",
              }}
            >
              {active.actionText}
              <ExternalLinkIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
