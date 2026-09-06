'use client';

import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import DiretoriaExecutivaModule from '@/components/admin/DiretoriaExecutivaModule';

export default function AdminDiretoriaPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)]">
      {/* Top Header */}
      <AdminHeader />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <DiretoriaExecutivaModule />
      </main>
    </div>
  );
}
