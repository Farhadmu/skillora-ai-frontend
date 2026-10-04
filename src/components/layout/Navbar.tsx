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
  GraduationCap,
  Briefcase,
  ShieldCheck,
  Compass,
  Map,
  Code2,
  Cpu,
  BarChart3,
} from 'lucide-react';
import { getCurrentUser, clearAuthSession, setAuthSession, api } from '@/lib/api';

interface NavbarProps {
  onOpenCommandPalette?: () => void;
  onOpenAiAssistant?: () => void;
}

export function Navbar({ onOpenCommandPalette, onOpenAiAssistant }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const handleRoleSwitch = async (role: 'LEARNER' | 'EDUCATOR' | 'EMPLOYER' | 'ADMIN') => {
    setRoleMenuOpen(false);
    try {
      const emailMap = {
        LEARNER: 'learner@skillora.ai',
        EDUCATOR: 'educator@skillora.ai',
        EMPLOYER: 'employer@skillora.ai',
        ADMIN: 'admin@skillora.ai',
      };
      const res = await api.login({
        email: emailMap[role],
        password: 'Password123!',
      });
      setAuthSession(res.tokens.accessToken, res.user);
      setUser(res.user);

      const routeMap = {
        LEARNER: '/dashboard',
        EDUCATOR: '/educator',
        EMPLOYER: '/employer',
        ADMIN: '/admin',
      };
      router.push(routeMap[role]);
    } catch (err) {
      console.error('Quick role switch failed:', err);
    }
  };

  const handleLogout = () => {
    clearAuthSession();
    setUser(null);
    setDropdownOpen(false);
    router.push('/login');
  };

  const navLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Layers },
    { href: '/tutor', label: 'AI Tutor', icon: Bot },
    { href: '/skills', label: 'Skill Graph', icon: Cpu },
    { href: '/career', label: 'Career', icon: Compass },
    { href: '/roadmap', label: 'Roadmap', icon: Map },
    { href: '/projects', label: 'Projects & Code', icon: Code2 },
    { href: '/interview', label: 'Readiness', icon: ShieldCheck },
    { href: '/jobs', label: 'Talent Market', icon: Briefcase },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1a2236] bg-[#06080d]/85 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#06080d] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-lg tracking-wider text-white">SKILLORA</span>
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-md bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 tracking-widest">
                  AI
                </span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-zinc-400 font-medium -mt-1 hidden sm:block">
                Workforce Intelligence
              </span>
            </div>
          </Link>

          {/* Role Badge & Quick Switcher */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-[#111726] border border-[#1e293b] text-zinc-300 hover:text-white hover:border-emerald-500/40 transition"
              title="Click to quickly switch simulated test roles"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Role: <strong className="text-emerald-400">{user?.role || 'GUEST'}</strong></span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute left-0 mt-2 w-48 rounded-xl bg-[#0b0f19] border border-[#1e293b] shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                  Switch Demo Persona
                </div>
                {(['LEARNER', 'EDUCATOR', 'EMPLOYER', 'ADMIN'] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => handleRoleSwitch(r)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition ${
                      user?.role === r
                        ? 'bg-emerald-500/15 text-emerald-400'
                        : 'text-zinc-300 hover:bg-[#161f33] hover:text-white'
                    }`}
                  >
                    <span>{r.charAt(0) + r.slice(1).toLowerCase()}</span>
                    {user?.role === r && <span className="text-[10px] text-emerald-400">Active</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all duration-200 ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-[#111726]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-zinc-400'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Action Tools */}
        <div className="flex items-center gap-2.5">
          {/* Command Palette Trigger */}
          <button
            onClick={onOpenCommandPalette}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0e1424] border border-[#1a2236] text-xs text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition shadow-inner"
            title="Search Platform (Ctrl+K)"
          >
            <Command className="w-3.5 h-3.5 text-zinc-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] rounded bg-[#161f33] text-zinc-400 border border-zinc-700 font-mono">
              ⌘K
            </kbd>
          </button>

          {/* AI Assistant Button */}
          <button
            onClick={onOpenAiAssistant}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-emerald-600 to-cyan-600 text-white hover:opacity-95 shadow-md shadow-emerald-500/20 transition"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Copilot</span>
          </button>

          {/* User Menu */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-full bg-[#111726] border border-[#1e293b] hover:border-emerald-500/40 transition"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <ChevronDown className="w-3 h-3 text-zinc-400 mr-1" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#0b0f19] border border-[#1e293b] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-2 border-b border-[#1a2236]">
                    <div className="text-xs font-bold text-white truncate">{user.name}</div>
                    <div className="text-[11px] text-zinc-400 truncate">{user.email}</div>
                    <div className="mt-1">
                      <span className="px-1.5 py-0.5 text-[9px] font-bold rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {user.role}
                      </span>
                    </div>
                  </div>

                  <div className="py-1">
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#161f33] rounded-lg flex items-center gap-2 transition"
                    >
                      <Layers className="w-3.5 h-3.5 text-zinc-400" />
                      Dashboard
                    </Link>
                    <Link
                      href={`/portfolio/${user.id}`}
                      onClick={() => setDropdownOpen(false)}
                      className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#161f33] rounded-lg flex items-center gap-2 transition"
                    >
                      <User className="w-3.5 h-3.5 text-zinc-400" />
                      Public Portfolio
                    </Link>
                    {user.role === 'EDUCATOR' && (
                      <Link
                        href="/educator"
                        onClick={() => setDropdownOpen(false)}
                        className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#161f33] rounded-lg flex items-center gap-2 transition"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                        Educator Cohorts
                      </Link>
                    )}
                    {user.role === 'EMPLOYER' && (
                      <Link
                        href="/employer"
                        onClick={() => setDropdownOpen(false)}
                        className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#161f33] rounded-lg flex items-center gap-2 transition"
                      >
                        <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
                        Employer ATS
                      </Link>
                    )}
                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        onClick={() => setDropdownOpen(false)}
                        className="px-3 py-2 text-xs font-medium text-zinc-300 hover:text-white hover:bg-[#161f33] rounded-lg flex items-center gap-2 transition"
                      >
                        <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
                        Platform Admin
                      </Link>
                    )}
                  </div>

                  <div className="pt-1 border-t border-[#1a2236]">
                    <button
                      onClick={handleLogout}
                      className="w-full px-3 py-2 text-xs font-medium text-red-400 hover:bg-red-500/10 rounded-lg flex items-center gap-2 transition"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium bg-[#111726] border border-[#1e293b] text-zinc-200 hover:text-white hover:border-emerald-500/40 transition"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
