'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BookOpen,
  Cpu,
  Briefcase,
  Bot,
  Users,
  GraduationCap,
  BarChart3,
  Brain,
  Building2,
  Layers,
  Sparkles,
  ShieldAlert,
  Sliders,
  Settings,
} from 'lucide-react';
import { useWorkspace, WorkspaceRole } from './WorkspaceContext';

interface BottomNavItem {
  label: string;
  href?: string;
  icon: React.ComponentType<{ className?: string }>;
  isAiAction?: boolean;
}

export function WorkspaceBottomNav() {
  const pathname = usePathname();
  const { role, setAiAssistantOpen } = useWorkspace();

  const learnerItems: BottomNavItem[] = [
    { label: 'Home', href: '/learner/dashboard', icon: LayoutDashboard },
    { label: 'Learn', href: '/learner/learning', icon: BookOpen },
    { label: 'Skills', href: '/learner/skills', icon: Cpu },
    { label: 'Jobs', href: '/learner/jobs', icon: Briefcase },
    { label: 'AI', isAiAction: true, icon: Bot },
  ];

  const educatorItems: BottomNavItem[] = [
    { label: 'Home', href: '/educator/dashboard', icon: LayoutDashboard },
    { label: 'Learners', href: '/educator/learners', icon: Users },
    { label: 'Teaching', href: '/educator/teaching', icon: GraduationCap },
    { label: 'Analytics', href: '/educator/analytics', icon: BarChart3 },
    { label: 'AI', isAiAction: true, icon: Brain },
  ];

  const employerItems: BottomNavItem[] = [
    { label: 'Home', href: '/employer/dashboard', icon: LayoutDashboard },
    { label: 'Jobs', href: '/employer/jobs', icon: Briefcase },
    { label: 'Talent', href: '/employer/talent', icon: Users },
    { label: 'Pipeline', href: '/employer/pipeline', icon: Layers },
    { label: 'AI', isAiAction: true, icon: Sparkles },
  ];

  const adminItems: BottomNavItem[] = [
    { label: 'Home', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Users', href: '/admin/users', icon: Users },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Alerts', href: '/admin/moderation', icon: ShieldAlert },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
  ];

  const itemsMap: Record<WorkspaceRole, BottomNavItem[]> = {
    LEARNER: learnerItems,
    EDUCATOR: educatorItems,
    EMPLOYER: employerItems,
    ADMIN: adminItems,
  };

  const items = itemsMap[role] || learnerItems;

  const isItemActive = (href?: string) => {
    if (!href) return false;
    if (href.endsWith('/dashboard')) {
      return pathname === href || pathname === href.replace(/\/dashboard$/, '');
    }
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070a12]/95 backdrop-blur-lg border-t border-[#1a2236] px-2 py-1.5 flex items-center justify-around select-none safe-area-bottom"
      aria-label="Mobile Navigation"
    >
      {items.map((item, idx) => {
        const Icon = item.icon;
        const active = isItemActive(item.href);

        if (item.isAiAction) {
          return (
            <button
              key={idx}
              onClick={() => setAiAssistantOpen(true)}
              className="flex flex-col items-center justify-center p-1.5 text-emerald-400 hover:text-emerald-300 transition"
              title="Open AI Assistant"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center text-zinc-950 shadow-md shadow-emerald-500/20 active:scale-90 transition">
                <Icon className="w-4 h-4 text-zinc-950" />
              </div>
              <span className="text-[10px] font-bold mt-0.5 text-emerald-400">AI</span>
            </button>
          );
        }

        return (
          <Link
            key={item.href || idx}
            href={item.href || '#'}
            className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition-all ${
              active
                ? 'text-emerald-400 font-bold'
                : 'text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Icon
              className={`w-5 h-5 transition-transform ${
                active ? 'scale-110 text-emerald-400' : 'text-zinc-400'
              }`}
            />
            <span className="text-[10px] mt-0.5 leading-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
