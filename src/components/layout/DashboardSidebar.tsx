'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Layers,
  Bot,
  Brain,
  Compass,
  BookOpen,
  Cpu,
  Award,
  Code2,
  ShieldCheck,
  Briefcase,
  User,
  BarChart3,
  Terminal,
  Users,
  Settings,
  GraduationCap,
  Building2,
  ShieldAlert,
  Server,
  Database,
  UserCheck,
  Play,
  TrendingUp,
  Map,
  Send,
  ChevronLeft,
  ChevronRight,
  LogOut,
  X,
  Sparkles,
} from 'lucide-react';
import { getCurrentUser, clearAuthSession } from '@/lib/api';

export type UserRole = 'LEARNER' | 'EDUCATOR' | 'EMPLOYER' | 'ADMIN';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

interface NavCategory {
  title: string;
  items: NavItem[];
}

interface DashboardSidebarProps {
  role?: UserRole;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
  className?: string;
}

export function DashboardSidebar({
  role: initialRole,
  mobileOpen = false,
  onCloseMobile,
  className = '',
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, [pathname]);

  const activeRole: UserRole =
    initialRole || (user?.role as UserRole) || 'LEARNER';

  const handleLogout = () => {
    clearAuthSession();
    setUser(null);
    if (onCloseMobile) onCloseMobile();
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  // Define navigation categories for LEARNER
  const learnerCategories: NavCategory[] = [
    {
      title: 'Command Center',
      items: [
        { label: 'Overview', href: '/learner/dashboard', icon: Layers },
        { label: '7-D Readiness Score', href: '/learner/readiness', icon: TrendingUp, badge: '84/100', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
        { label: 'Adaptive Roadmap', href: '/roadmap', icon: Map },
      ],
    },
    {
      title: 'Intelligence & Tutoring',
      items: [
        { label: 'Socratic AI Tutor', href: '/tutor', icon: Bot, badge: 'AI', badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
        { label: 'Skill Graph Engine', href: '/skills', icon: Cpu },
        { label: 'Curated Pathways', href: '/learner/learn', icon: BookOpen },
        { label: 'Sandboxed Coding Lab', href: '/learner/coding', icon: Terminal },
      ],
    },
    {
      title: 'Practical Proof',
      items: [
        { label: 'Verified Assessments', href: '/assessments', icon: Award },
        { label: 'AI Code Review & Projects', href: '/projects', icon: Code2 },
        { label: 'AI Mock Interview', href: '/interview', icon: ShieldCheck, badge: 'Live', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
      ],
    },
    {
      title: 'Career & Network',
      items: [
        { label: 'Career & JD Analyzer', href: '/career', icon: Compass },
        { label: 'Talent Marketplace & Jobs', href: '/jobs', icon: Briefcase },
        { label: 'Public Portfolio Dossier', href: '/learner/portfolio', icon: User },
        { label: 'Peer Community', href: '/learner/community', icon: Users },
      ],
    },
    {
      title: 'Telemetry & Settings',
      items: [
        { label: 'Analytics & Telemetry', href: '/learner/analytics', icon: BarChart3 },
        { label: 'Profile Dossier', href: '/learner/profile', icon: User },
        { label: 'Settings & Security', href: '/learner/settings', icon: Settings },
      ],
    },
  ];

  // Define navigation categories for EDUCATOR
  const educatorCategories: NavCategory[] = [
    {
      title: 'Cohort Operations',
      items: [
        { label: 'Cohort Console', href: '/educator/dashboard', icon: GraduationCap },
        { label: 'Student Cohort Roster', href: '/educator/learners', icon: Users },
        { label: 'Curriculum & Teaching', href: '/educator/teaching', icon: Layers },
      ],
    },
    {
      title: 'AI Generation & Support',
      items: [
        { label: 'AI Quiz Generator Studio', href: '/educator/assessments', icon: Brain, badge: 'AI', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
        { label: 'AI Teaching Assistant', href: '/educator/ai', icon: Bot, badge: 'Copilot', badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
        { label: 'Cohort Telemetry', href: '/educator/analytics', icon: BarChart3 },
        { label: 'Examination Catalog', href: '/assessments', icon: Award },
      ],
    },
    {
      title: 'Institutional Settings',
      items: [
        { label: 'Cohort Management', href: '/educator/cohorts', icon: Users },
        { label: 'Educator Settings', href: '/educator/settings', icon: Settings },
      ],
    },
  ];

  // Define navigation categories for EMPLOYER
  const employerCategories: NavCategory[] = [
    {
      title: 'Talent Acquisition ATS',
      items: [
        { label: 'ATS Command Center', href: '/employer/dashboard', icon: Building2 },
        { label: 'Candidate Pipeline', href: '/employer/pipeline', icon: Users, badge: 'ATS', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
        { label: 'Job Postings Studio', href: '/employer/jobs', icon: Briefcase },
      ],
    },
    {
      title: 'Fair Hiring & Verification',
      items: [
        { label: 'Verified Talent Search', href: '/employer/talent', icon: ShieldCheck, badge: 'Zero-Bias', badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
        { label: 'Company Profile', href: '/employer/company', icon: Building2 },
        { label: 'Hiring Funnel Analytics', href: '/employer/analytics', icon: TrendingUp },
        { label: 'Simulated Interviews', href: '/interview', icon: Play },
      ],
    },
    {
      title: 'Compliance & Account',
      items: [
        { label: 'Company Settings', href: '/employer/settings', icon: Settings },
      ],
    },
  ];

  // Define navigation categories for ADMIN
  const adminCategories: NavCategory[] = [
    {
      title: 'Platform Governance',
      items: [
        { label: 'Governance Command Center', href: '/admin/dashboard', icon: ShieldAlert },
        { label: 'Multi-Provider AI Cascade', href: '/admin/ai', icon: Cpu, badge: '8 Nodes', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
        { label: 'RBAC User Management', href: '/admin/users', icon: UserCheck },
      ],
    },
    {
      title: 'Infrastructure & Ledger',
      items: [
        { label: 'System Telemetry & Health', href: '/admin/analytics', icon: Server },
        { label: 'Audit Logs & Ledger', href: '/admin/audit-logs', icon: Database },
        { label: 'Assessments Oversight', href: '/assessments', icon: Award },
      ],
    },
    {
      title: 'Platform System',
      items: [
        { label: 'System Configuration', href: '/admin/settings', icon: Settings },
      ],
    },
  ];

  const categoriesMap: Record<UserRole, NavCategory[]> = {
    LEARNER: learnerCategories,
    EDUCATOR: educatorCategories,
    EMPLOYER: employerCategories,
    ADMIN: adminCategories,
  };

  const roleMeta: Record<
    UserRole,
    { title: string; subtitle: string; icon: React.ComponentType<{ className?: string }>; color: string }
  > = {
    LEARNER: {
      title: 'LEARNER PORTAL',
      subtitle: 'Intelligence Workspace',
      icon: Sparkles,
      color: 'text-emerald-400',
    },
    EDUCATOR: {
      title: 'EDUCATOR CONSOLE',
      subtitle: 'Institutional Telemetry',
      icon: GraduationCap,
      color: 'text-cyan-400',
    },
    EMPLOYER: {
      title: 'EMPLOYER ATS',
      subtitle: 'Verified Talent Pipeline',
      icon: Building2,
      color: 'text-purple-400',
    },
    ADMIN: {
      title: 'ADMIN GOVERNANCE',
      subtitle: 'System Control Center',
      icon: ShieldAlert,
      color: 'text-cyan-400',
    },
  };

  const categories = categoriesMap[activeRole] || learnerCategories;
  const currentMeta = roleMeta[activeRole] || roleMeta.LEARNER;
  const RoleIcon = currentMeta.icon;

  const isLinkActive = (href: string) => {
    if (href.includes('#')) {
      return pathname === href.split('#')[0];
    }
    if (href === '/learner/dashboard') {
      return pathname === '/learner/dashboard' || pathname === '/dashboard';
    }
    if (href === '/educator/dashboard') {
      return pathname === '/educator/dashboard' || pathname === '/educator';
    }
    if (href === '/employer/dashboard') {
      return pathname === '/employer/dashboard' || pathname === '/employer';
    }
    if (href === '/admin/dashboard') {
      return pathname === '/admin/dashboard' || pathname === '/admin';
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#070a11] border-r border-[#1a2236] select-none">
      {/* Sidebar Header */}
      <div className="h-16 px-4 border-b border-[#1a2236] flex items-center justify-between shrink-0">
        <div className={`flex items-center gap-2.5 overflow-hidden transition-all duration-200 ${collapsed ? 'justify-center w-full' : ''}`}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#122033] to-[#0c1524] border border-[#1e2d44] flex items-center justify-center shrink-0 shadow-inner">
            <RoleIcon className={`w-4 h-4 ${currentMeta.color}`} />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <div className="text-xs font-black tracking-wider text-white truncate flex items-center gap-1.5">
                <span>{currentMeta.title}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <div className="text-[10px] text-zinc-400 truncate font-mono">
                {currentMeta.subtitle}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Close Button */}
        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#121a2c] transition"
            aria-label="Close Sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#121a2c] border border-transparent hover:border-[#1e293b] transition"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Scrollable Body */}
      <div className="flex-1 overflow-y-auto px-2.5 py-4 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800">
        {categories.map((cat, catIdx) => (
          <div key={catIdx} className="space-y-1">
            {!collapsed && (
              <div className="px-2.5 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                {cat.title}
              </div>
            )}
            <div className="space-y-0.5">
              {cat.items.map((item, itemIdx) => {
                const active = isLinkActive(item.href);
                const Icon = item.icon;
                return (
                  <Link
                    key={itemIdx}
                    href={item.href}
                    onClick={() => {
                      if (onCloseMobile) onCloseMobile();
                    }}
                    title={collapsed ? item.label : undefined}
                    className={`group relative flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-semibold transition-all duration-150 ${
                      active
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-md shadow-emerald-500/5'
                        : 'text-zinc-400 hover:text-zinc-100 hover:bg-[#111728] border border-transparent'
                    } ${collapsed ? 'justify-center px-2' : ''}`}
                  >
                    {active && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 rounded-r-full bg-emerald-400 shadow-sm shadow-emerald-400" />
                    )}

                    <Icon
                      className={`w-4 h-4 shrink-0 transition-colors ${
                        active
                          ? 'text-emerald-400'
                          : 'text-zinc-400 group-hover:text-zinc-200'
                      }`}
                    />

                    {!collapsed && (
                      <div className="flex-1 flex items-center justify-between min-w-0">
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`ml-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded border uppercase tracking-wider shrink-0 ${
                              item.badgeColor || 'bg-zinc-800 text-zinc-300 border-zinc-700'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Sidebar Footer User Card */}
      <div className="p-3 border-t border-[#1a2236] bg-[#06080d]/70 shrink-0">
        <div
          className={`flex items-center gap-2.5 p-2 rounded-xl bg-[#0c111c] border border-[#162134] ${
            collapsed ? 'justify-center p-1.5' : ''
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-cyan-500 text-zinc-950 font-black text-xs flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
            {user?.name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
          </div>

          {!collapsed && (
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white truncate">
                {user?.name || (activeRole === 'LEARNER' ? 'Learner Workspace' : user?.email || 'Skillora User')}
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                  {activeRole}
                </span>
              </div>
            </div>
          )}

          {!collapsed && (
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 sticky top-16 h-[calc(100vh-4rem)] z-30 transition-all duration-300 ease-in-out ${
          collapsed ? 'w-20' : 'w-64'
        } ${className}`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={onCloseMobile}
            aria-hidden="true"
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-[#070a11] z-50 shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
