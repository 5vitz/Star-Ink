'use client';

import React from 'react';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminHubHome from '@/components/admin/AdminHubHome';

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)]">
      {/* Top Header */}
      <AdminHeader />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
        <AdminHubHome />
      </main>
    </div>
  );
}
