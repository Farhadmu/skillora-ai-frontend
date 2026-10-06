'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Sparkles,
  Command,
  Bot,
  User,
  LogOut,
  ChevronDown,
  Layers,
  LayoutDashboard,
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Settings,
  Award,
  Menu,
  ShieldAlert,
} from 'lucide-react';
import { getCurrentUser, clearAuthSession } from '@/lib/api';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenAiAssistant?: () => void;
  onToggleMobileSidebar?: () => void;
  isSidebarAvailable?: boolean;
}

export function Navbar({
  onOpenCommandPalette,
  onOpenAiAssistant,
  onToggleMobileSidebar,
  isSidebarAvailable = false,
}: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const handleLogout = () => {
    clearAuthSession();
    setUser(null);
    setDropdownOpen(false);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  // Helper to determine the correct role-specific dashboard route
  const getRoleDashboardUrl = (role?: string) => {
    switch (role) {
      case 'EDUCATOR':
        return '/educator/dashboard';
      case 'EMPLOYER':
        return '/employer/dashboard';
      case 'ADMIN':
        return '/admin/dashboard';
      case 'LEARNER':
      default:
        return '/learner/dashboard';
    }
  };

  const dashboardUrl = getRoleDashboardUrl(user?.role);
  const isDashboardActive =
    pathname.includes('/dashboard') ||
    pathname.startsWith('/learner') ||
    pathname.startsWith('/educator') ||
    pathname.startsWith('/employer') ||
    pathname.startsWith('/admin') ||
    pathname === '/career' ||
    pathname === '/skills' ||
    pathname === '/projects' ||
    pathname === '/interview' ||
    pathname === '/jobs' ||
    pathname === '/tutor' ||
    pathname === '/roadmap';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1a2236] bg-[#06080d]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Section: Mobile Sidebar Toggle & Brand Logo */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Mobile Sidebar Toggle Button (if sidebar is present in layout) */}
          {isSidebarAvailable && onToggleMobileSidebar && (
            <button
              onClick={onToggleMobileSidebar}
              className="lg:hidden p-2 rounded-xl bg-[#0f1523] border border-[#1e293b] text-zinc-400 hover:text-white transition"
              aria-label="Toggle Navigation Sidebar"
              title="Open Navigation Sidebar"
            >
              <Menu className="w-4 h-4" />
            </button>
          )}

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#06080d] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg tracking-wider text-white">SKILLORA</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 tracking-widest">
                  AI
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-medium -mt-1 hidden sm:block">
                Workforce Intelligence
              </span>
            </div>
          </Link>
        </div>

        {/* Center Navigation Links: Clean, Uncluttered */}
        <nav className="hidden md:flex items-center gap-1.5">
          {user ? (
            // When Logged In: Dedicated Dashboard link (routes to role dashboard)
            <>
              <Link
                href={dashboardUrl}
                className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all duration-200 ${
                  isDashboardActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-500/10'
                    : 'text-zinc-300 hover:text-white hover:bg-[#111726] border border-transparent'
                }`}
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                <span>Dashboard</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </Link>

              <Link
                href="/assessments"
                className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all duration-200 ${
                  pathname === '/assessments'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-[#111726]'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-zinc-400" />
                <span>Certification Center</span>
              </Link>
            </>
          ) : (
            // When Logged Out: Clean public navigation
            <>
              <Link
                href="/#features"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-[#111726] transition"
              >
                Features
              </Link>
              <Link
                href="/assessments"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-[#111726] transition"
              >
                Testing Center
              </Link>
              <Link
                href="/educator/dashboard"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-[#111726] transition"
              >
                For Educators
              </Link>
              <Link
                href="/employer/dashboard"
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-[#111726] transition"
              >
                For Employers
              </Link>
            </>
          )}
        </nav>

        {/* Right Tools & Account Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0e1424] border border-[#1a2236] text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition shadow-inner"
            title="Search Platform (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] rounded bg-[#161f33] text-zinc-400 border border-zinc-700 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* AI Copilot Button */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:opacity-95 shadow-md shadow-emerald-500/20 transition active:scale-95"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          {/* User Auth Section */}
          {user ? (
            <div className="flex items-center gap-2">
              {/* Static Role Indicator Pill (Clean status badge - NO demo switcher!) */}
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#111726] border border-[#1e293b] text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-bold text-emerald-400 tracking-wide">
                  {user.role || 'LEARNER'}
                </span>
              </div>

              {/* User Avatar Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1.5 p-1 rounded-full bg-[#111726] border border-[#1e293b] hover:border-emerald-500/40 transition"
                  aria-label="User Account Menu"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-600 to-cyan-600 text-zinc-950 flex items-center justify-center font-black text-xs shadow-inner">
                    {user.name?.charAt(0) || user.email?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <ChevronDown className="w-3 h-3 text-zinc-400 mr-1" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-3 py-2.5 border-b border-[#1a2236]">
                      <div className="text-xs font-bold text-white truncate">{user.name || 'User'}</div>
                      <div className="text-[11px] text-zinc-400 truncate">{user.email}</div>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        <span className="px-2 py-0.5 text-[9px] font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                          {user.role} Workspace
                        </span>
                      </div>
                    </div>

                    <div className="py-1.5 space-y-0.5">
                      <Link
                        href={dashboardUrl}
                        onClick={() => setDropdownOpen(false)}
                        className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#161f33] rounded-xl flex items-center gap-2.5 transition"
                      >
                        <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                        <span>Go to Dashboard</span>
                      </Link>

                      <Link
                        href="/learner/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#161f33] rounded-xl flex items-center gap-2.5 transition"
                      >
                        <User className="w-4 h-4 text-zinc-400" />
                        <span>My Profile Dossier</span>
                      </Link>

                      <Link
                        href="/learner/settings"
                        onClick={() => setDropdownOpen(false)}
                        className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#161f33] rounded-xl flex items-center gap-2.5 transition"
                      >
                        <Settings className="w-4 h-4 text-zinc-400" />
                        <span>Settings & Security</span>
                      </Link>
                    </div>

                    <div className="pt-1.5 border-t border-[#1a2236]">
                      <button
                        onClick={handleLogout}
                        className="w-full px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl flex items-center gap-2.5 transition text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-xl text-xs font-medium bg-[#111726] border border-[#1e293b] text-zinc-200 hover:text-white hover:border-emerald-500/40 transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="hidden sm:inline-flex px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-black transition shadow-md shadow-emerald-500/20"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
