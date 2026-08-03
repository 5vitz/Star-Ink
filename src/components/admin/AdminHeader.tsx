'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Search, Bell } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', href: '/admin/dashboard' },
  { name: '1. Atendimento', href: '/admin/atendimento' },
  { name: '2. Produção', href: '/admin/producao' },
  { name: '3. Catálogo', href: '/admin/catalogo' },
  { name: '4. Financeiro', href: '/admin/financeiro' },
];

export default function AdminHeader() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-[var(--border-subtle)] bg-[var(--bg-card)]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Brand Logo & Monogram */}
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/admin/dashboard" className="flex items-center gap-3 group">
              {/* Logo Oficial STAR INK */}
              <div className="h-10 w-auto flex items-center justify-center p-1 rounded-lg bg-white/5 border border-[var(--border-subtle)] group-hover:border-[var(--accent-cyan)] transition-colors">
                <Image
                  src="/imagens/LOGO/LOGO_VAZADA.png"
                  alt="STAR INK Logo Oficial"
                  width={40}
                  height={40}
                  className="h-8 w-auto object-contain invert brightness-200"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-[var(--font-heading)] font-bold text-lg tracking-wider text-white">STAR INK</span>
                <span className="text-[10px] tracking-widest uppercase text-[var(--text-muted)] -mt-1 font-mono">Cockpit Executivo</span>
              </div>
            </Link>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 bg-[var(--bg-main)] p-1 rounded-lg border border-[var(--border-subtle)]">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/admin/dashboard' && pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[var(--bg-subtle)] text-white shadow-sm border border-[var(--border-subtle)]'
                      : 'text-[var(--text-secondary)] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Quick Search & User Profile */}
          <div className="flex items-center gap-3">
            
            {/* Search Command Palette Input */}
            <div className="relative hidden sm:block">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Buscar pedido, cliente... (Ctrl+K)"
                className="w-48 lg:w-64 pl-9 pr-3 py-1.5 bg-[var(--bg-main)] border border-[var(--border-subtle)] rounded-lg text-xs text-white placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-cyan)] transition-colors"
                id="search-input"
              />
            </div>

            {/* Server Status Badge */}
            <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Contabo VPS</span>
            </div>

            {/* Notification Bell */}
            <button 
              className="p-2 rounded-lg border border-[var(--border-subtle)] text-[var(--text-secondary)] hover:text-white hover:border-[var(--border-hover)] transition-colors relative"
              aria-label="Notificações"
              id="notification-btn"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--accent-rose)] rounded-full"></span>
            </button>

            {/* User Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-[var(--border-subtle)]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-800 to-slate-700 border border-white/20 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                GA
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-semibold text-white">Genera</span>
                <span className="text-[10px] text-[var(--text-muted)]">Diretor Criativo</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
}
