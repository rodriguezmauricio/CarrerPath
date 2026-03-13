'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { curriculum } from '@/lib/curriculum';

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="fixed left-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-lg border border-card-border bg-card-bg lg:hidden"
      >
        <svg className="h-5 w-5 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          {mobileOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-card-border bg-sidebar-bg transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-card-border px-4">
          {!collapsed && (
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileOpen(false)}>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-teal/20">
                <span className="text-sm font-bold text-accent-teal">A</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-text-primary">Anthropic</span>
                <span className="text-[10px] text-text-muted">Support Academy</span>
              </div>
            </Link>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden h-7 w-7 items-center justify-center rounded-md text-text-muted transition-colors hover:bg-[#1a1a1a] hover:text-text-secondary lg:flex"
          >
            <svg className={`h-4 w-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {/* Home */}
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={`mx-2 mb-1 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
              pathname === '/'
                ? 'bg-accent-teal/10 text-accent-teal'
                : 'text-text-muted hover:bg-[#1a1a1a] hover:text-text-secondary'
            }`}
          >
            <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {!collapsed && <span>Dashboard</span>}
          </Link>

          {/* Divider */}
          <div className="mx-4 my-3 border-t border-card-border" />

          {/* Tracks */}
          {!collapsed && (
            <div className="mx-4 mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                Learning Tracks
              </span>
            </div>
          )}

          {curriculum.map((track) => {
            const isActive = pathname.startsWith(`/track/${track.id}`);
            return (
              <Link
                key={track.id}
                href={`/track/${track.id}`}
                onClick={() => setMobileOpen(false)}
                className={`mx-2 mb-0.5 flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                  isActive
                    ? 'bg-white/5 text-text-primary'
                    : 'text-text-muted hover:bg-[#1a1a1a] hover:text-text-secondary'
                }`}
              >
                <span className="shrink-0 text-base">{collapsed ? track.icon : track.icon}</span>
                {!collapsed && (
                  <span className="truncate">{track.title}</span>
                )}
                {isActive && !collapsed && (
                  <div
                    className="ml-auto h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: track.color }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="border-t border-card-border p-4">
            <div className="rounded-lg bg-[#1a1a1a] p-3">
              <div className="mb-1 text-xs font-medium text-text-secondary">Overall Progress</div>
              <div className="progress-bar mb-1">
                <div className="progress-bar-fill bg-accent-teal" style={{ width: '12%' }} />
              </div>
              <div className="text-[10px] text-text-muted">12% complete</div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
