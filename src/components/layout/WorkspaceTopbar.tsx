'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Menu,
  Search,
  Command,
  Bell,
  Sparkles,
  Bot,
  Brain,
  Building2,
  ShieldAlert,
  User,
  Settings,
  LogOut,
  ChevronRight,
  ChevronDown,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeft,
} from 'lucide-react';
import { useWorkspace, WorkspaceRole } from './WorkspaceContext';
import { getCurrentUser, clearAuthSession } from '@/lib/api';

export function WorkspaceTopbar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    role,
    sidebarCollapsed,
    setSidebarCollapsed,
    setMobileSidebarOpen,
    setPaletteOpen,
    setNotificationsOpen,
    setAiAssistantOpen,
  } = useWorkspace();

  const [user, setUser] = useState<any>(null);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const handleLogout = () => {
    clearAuthSession();
    setUser(null);
    setProfileDropdownOpen(false);
    router.push('/login');
  };

  // Build dynamic breadcrumbs from current pathname
  const generateBreadcrumbs = () => {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length === 0) return [{ label: 'Overview', href: '/', isLast: true }];

    return segments.map((seg, idx) => {
      const href = '/' + segments.slice(0, idx + 1).join('/');
      // Format human-readable label
      const label = seg
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
      return { label, href, isLast: idx === segments.length - 1 };
    });
  };

  const breadcrumbs = generateBreadcrumbs();

  // Role-specific AI button configuration
  const aiButtonConfig: Record<
    WorkspaceRole,
    { label: string; icon: React.ComponentType<{ className?: string }>; gradient: string }
  > = {
    LEARNER: {
      label: 'Ask Skillora AI',
      icon: Sparkles,
      gradient: 'from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-zinc-950 font-bold',
    },
    EDUCATOR: {
      label: 'Ask Teaching AI',
      icon: Brain,
      gradient: 'from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-zinc-950 font-bold',
    },
    EMPLOYER: {
      label: 'Ask Talent AI',
      icon: Building2,
      gradient: 'from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold',
    },
    ADMIN: {
      label: 'AI Insights',
      icon: ShieldAlert,
      gradient: 'from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-zinc-950 font-bold',
    },
  };

  const activeAi = aiButtonConfig[role] || aiButtonConfig.LEARNER;
  const AiIcon = activeAi.icon;

  const roleBadgeStyles: Record<WorkspaceRole, { bg: string; text: string; border: string }> = {
    LEARNER: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/25' },
    EDUCATOR: { bg: 'bg-cyan-500/10', text: 'text-cyan-400', border: 'border-cyan-500/25' },
    EMPLOYER: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/25' },
    ADMIN: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/25' },
  };
  const badgeStyle = roleBadgeStyles[role] || roleBadgeStyles.LEARNER;

  return (
    <header className="sticky top-0 z-30 h-16 w-full border-b border-[#1a2236] bg-[#070a12]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0 select-none">
      {/* Left: Sidebar Toggle & Dynamic Breadcrumbs */}
      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
        {/* Mobile Sidebar Toggle Button */}
        <button
          onClick={() => setMobileSidebarOpen(true)}
          className="lg:hidden p-2 rounded-xl bg-[#0e1422] border border-[#1e293b] text-zinc-400 hover:text-white hover:border-zinc-700 transition"
          aria-label="Open Navigation Drawer"
          title="Open Navigation"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Desktop Sidebar Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex p-2 rounded-xl bg-[#0e1422] border border-[#1e293b] text-zinc-400 hover:text-white hover:border-zinc-700 transition"
          aria-label="Toggle Sidebar"
          title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {sidebarCollapsed ? (
            <PanelLeft className="w-4 h-4 text-emerald-400" />
          ) : (
            <PanelLeftClose className="w-4 h-4 text-zinc-400" />
          )}
        </button>

        {/* Dynamic Breadcrumbs */}
        <nav className="flex items-center gap-1.5 text-xs text-zinc-400 min-w-0" aria-label="Breadcrumb">
          <Link
            href="/"
            className="font-bold text-white hover:text-emerald-400 transition flex items-center gap-1 shrink-0"
          >
            <span className="tracking-wider">SKILLORA</span>
            <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-400 font-mono">
              AI
            </span>
          </Link>

          {breadcrumbs.map((crumb) => (
            <React.Fragment key={crumb.href}>
              <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0" />
              {crumb.isLast ? (
                <span className="font-semibold text-zinc-200 truncate max-w-[140px] sm:max-w-[220px]">
                  {crumb.label}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="hover:text-zinc-200 transition truncate max-w-[100px] hidden sm:inline"
                >
                  {crumb.label}
                </Link>
              )}
            </React.Fragment>
          ))}
        </nav>
      </div>

      {/* Right: Search, Notifications, Role AI Button, Profile Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Command K Trigger */}
        <button
          onClick={() => setPaletteOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0e1424] border border-[#1a2236] text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition shadow-inner"
          title="Search Workspace (Ctrl+K / ⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-zinc-400" />
          <span className="hidden md:inline">Search</span>
          <kbd className="hidden md:inline px-1.5 py-0.5 text-[10px] rounded bg-[#161f33] text-zinc-400 border border-zinc-700 font-mono">
            ⌘K
          </kbd>
        </button>

        {/* Notifications Bell */}
        <button
          onClick={() => setNotificationsOpen(true)}
          className="relative p-2 rounded-xl bg-[#0e1424] border border-[#1a2236] text-zinc-400 hover:text-white hover:border-zinc-700 transition"
          aria-label="View Notifications"
          title="Workspace Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-[#070a12] animate-pulse" />
        </button>

        {/* Role-Specific AI Button */}
        <button
          onClick={() => setAiAssistantOpen(true)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs bg-gradient-to-r shadow-lg transition active:scale-95 ${activeAi.gradient}`}
          title={`${activeAi.label} Assistant`}
        >
          <AiIcon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">{activeAi.label}</span>
        </button>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-full bg-[#0e1422] border border-[#1e293b] hover:border-emerald-500/40 transition"
            aria-label="User Account"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-cyan-600 text-zinc-950 flex items-center justify-center font-black text-xs shadow-inner">
              {user?.name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
            </div>
            <div className="hidden xl:flex flex-col text-left pr-1">
              <span className="text-xs font-semibold text-white leading-tight truncate max-w-[100px]">
                {user?.name || 'Operator'}
              </span>
              <span className="text-[10px] text-zinc-400 font-mono leading-tight">{role}</span>
            </div>
            <ChevronDown className="w-3 h-3 text-zinc-400 mr-1" />
          </button>

          {profileDropdownOpen && (
            <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-2.5 border-b border-[#1a2236]">
                <div className="text-xs font-bold text-white truncate">{user?.name || 'Authenticated User'}</div>
                <div className="text-[11px] text-zinc-400 truncate">{user?.email}</div>
                <div className="mt-2 flex items-center gap-1.5">
                  <span
                    className={`px-2 py-0.5 text-[9px] font-bold rounded uppercase tracking-wider border ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}
                  >
                    {role} WORKSPACE
                  </span>
                </div>
              </div>

              <div className="py-1.5 space-y-0.5">
                <Link
                  href={`/${role.toLowerCase()}/dashboard`}
                  onClick={() => setProfileDropdownOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#161f33] rounded-xl flex items-center gap-2.5 transition"
                >
                  <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                  <span>Command Center</span>
                </Link>

                <Link
                  href="/learner/profile"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#161f33] rounded-xl flex items-center gap-2.5 transition"
                >
                  <User className="w-4 h-4 text-zinc-400" />
                  <span>Profile Dossier</span>
                </Link>

                <Link
                  href="/learner/settings"
                  onClick={() => setProfileDropdownOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#161f33] rounded-xl flex items-center gap-2.5 transition"
                >
                  <Settings className="w-4 h-4 text-zinc-400" />
                  <span>Settings & Security</span>
                </Link>
              </div>

              <div className="pt-1.5 border-t border-[#1a2236]">
                <button
                  onClick={handleLogout}
                  className="w-full px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl flex items-center gap-2.5 transition text-left"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
