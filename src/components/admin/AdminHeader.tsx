'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Bell, Menu, X, LayoutDashboard, Zap } from 'lucide-react';

export default function AdminHeader() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full border-b border-[var(--border-subtle)] bg-[#0d0d0f]/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-6">
          
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-4 shrink-0">
            <Link 
              href="/admin/dashboard" 
              className="flex items-center gap-3 group transition-transform hover:scale-105"
              title="STAR INK — Ir para a Central de Comando"
            >
              <div className="h-10 w-10 flex items-center justify-center">
                <Image
                  src="/LOGO/LOGO_BRANCA_VAZADA.png"
                  alt="STAR INK Logo"
                  width={40}
                  height={40}
                  className="h-10 w-10 object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-white tracking-widest uppercase font-mono">STAR INK</span>
                <span className="text-[10px] font-mono text-[var(--accent-cyan)] flex items-center gap-1">
                  <Zap className="w-3 h-3 fill-[var(--accent-cyan)]" />
                  <span>Cockpit Executivo</span>
                </span>
              </div>
            </Link>
          </div>

          {/* Quick Search, Server Badge, User Profile & Mobile Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Search Command Palette Input */}
            <div className="relative hidden sm:block">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Buscar pedido, cliente... (Ctrl+K)"
                className="w-48 lg:w-64 pl-9 pr-3 py-1.5 bg-[#141417] border border-zinc-800 rounded-lg text-xs text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-amber-500/50 transition-colors"
                id="search-input"
              />
            </div>

            {/* Server Status Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Contabo VPS</span>
            </div>

            {/* Notification Bell */}
            <button 
              className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors relative"
              aria-label="Notificações"
              id="notification-btn"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent-rose)] rounded-full"></span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-zinc-800">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-800 to-zinc-700 border border-white/20 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                GA
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-semibold text-white">Genera</span>
                <span className="text-[10px] text-zinc-400 font-mono">Diretor Criativo</span>
              </div>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg border border-zinc-800 bg-[#141417] text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Mobile Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer / Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-[#0d0d0f] px-4 py-4 space-y-3 shadow-2xl">
          <div className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider px-2">
            Navegação do Cockpit
          </div>

          <div className="space-y-1 font-mono text-xs">
            <Link
              href="/admin/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center justify-between p-3 rounded-lg font-bold transition-all ${
                pathname === '/admin/dashboard'
                  ? 'bg-amber-500 text-black'
                  : 'text-white hover:bg-white/5 bg-[#141417]'
              }`}
            >
              <span className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4" />
                Central de Comando (8 Departamentos)
              </span>
            </Link>
          </div>

          <div className="pt-2 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-emerald-400">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Servidor VPS Contabo Online
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
