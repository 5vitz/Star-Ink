'use client';

import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import CatalogModule from '@/components/admin/CatalogModule';

export default function AdminCatalogPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)]">
      {/* Top Admin Navigation Header */}
      <AdminHeader />

      {/* Main Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <CatalogModule />
      </main>
    </div>
  );
}
