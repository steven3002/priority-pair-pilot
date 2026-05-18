"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavBar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Campaign', href: '/' },
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Incentives', href: '/incentives' }
  ];

  return (
    <>
      {/* --- SECTION 1: FIXED TOP RISK & CUSTODY ALERT --- */}
      <div className="fixed top-0 left-0 right-0 h-12 bg-[#FF0420] text-white z-50 px-4 flex items-center justify-center text-center shadow-sm select-none border-b border-red-700">
        <p className="text-[10px] md:text-xs font-semibold uppercase tracking-tight flex items-center space-x-2">
          <span className="bg-white text-[#FF0420] px-1.5 py-0.5 rounded font-black text-[9px] mr-1.5 hidden sm:inline-block">NON-CUSTODIAL INFRASTRUCTURE</span>
          <span>LPs deploy directly to Uniswap V3 on OP Mainnet. PriorityPair Pilot never handles user capital.</span>
        </p>
      </div>

      {/* --- PREMIUM WEB3 HEADER --- */}
      <header className="fixed w-full bg-white/80 backdrop-blur-md border-b border-slate-200 top-12 z-40 px-4 lg:px-12 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center space-x-6">
            <Link 
              href="/" 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-9 h-9 bg-black text-white rounded-lg flex items-center justify-center font-black text-base border-2 border-slate-800 shadow-sm transition-transform duration-300 ease-out group-hover:scale-105 group-active:scale-95">
                PP
              </div>
              <div className="flex flex-col font-sans">
                <span className="text-sm font-black tracking-tight leading-none text-slate-900 group-hover:text-slate-700 transition-colors">PriorityPair</span>
                <span className="text-[9px] font-bold text-[#FF0420] uppercase tracking-widest mt-0.5">OP MAINNET PILOT</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-2">
            {navLinks.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  className={`inline-block px-4 py-2 rounded-md text-xs font-bold tracking-tight uppercase transition-all duration-300 ease-out ${
                    isActive 
                      ? 'text-white bg-slate-950 shadow-md' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-200 hover:shadow-sm hover:scale-105 active:scale-95'
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle Button */}
          <button 
            className="lg:hidden p-2 -mr-2 text-slate-600 hover:text-slate-900 focus:outline-none hover:bg-slate-100 rounded-md transition-all duration-300 ease-out active:scale-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              // X (Close) Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger Menu Icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-200 -mx-4 px-4 py-4 space-y-2 shadow-lg">
            {navLinks.map((tab) => {
              const isActive = pathname === tab.href;
              return (
                <Link
                  key={tab.name}
                  href={tab.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-md text-sm font-bold tracking-tight uppercase transition-all duration-300 ease-out ${
                    isActive 
                      ? 'text-white bg-slate-950 shadow-md' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100 hover:translate-x-2'
                  }`}
                >
                  {tab.name}
                </Link>
              );
            })}
          </div>
        )}
      </header>
    </>
  );
}