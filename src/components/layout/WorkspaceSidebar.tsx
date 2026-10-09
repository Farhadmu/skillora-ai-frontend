'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  ChevronDown,
  LogOut,
  X,
  Sparkles,
  GraduationCap,
  Building2,
  ShieldAlert,
} from 'lucide-react';
import { useWorkspace, WorkspaceRole } from './WorkspaceContext';
import { getCurrentUser, clearAuthSession } from '@/lib/api';
import { getNavigationForRole, NavGroup, NavItem } from '@/config/navigation';

export function WorkspaceSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const {
    role,
    sidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = useWorkspace();

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, [pathname]);

  const navConfig = getNavigationForRole(role);
  const groups = navConfig.groups;

  // Auto-expand group containing current route
  useEffect(() => {
    groups.forEach((g) => {
      const containsActive =
        (g.sectionHref && (pathname === g.sectionHref || pathname.startsWith(g.sectionHref + '/'))) ||
        g.items.some((item) => {
          if (
            item.href === '/learner/dashboard' ||
            item.href === '/educator/dashboard' ||
            item.href === '/employer/dashboard' ||
            item.href === '/admin/dashboard'
          ) {
            return pathname === item.href;
          }
          return pathname === item.href || pathname.startsWith(item.href + '/');
        });

      if (containsActive) {
        setOpenGroups((prev) => ({ ...prev, [g.title]: true }));
      }
    });
  }, [pathname, groups]);

  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [title]: prev[title] === false ? true : false,
    }));
  };

  const isLinkActive = (href: string) => {
    if (
      href === '/learner/dashboard' ||
      href === '/educator/dashboard' ||
      href === '/employer/dashboard' ||
      href === '/admin/dashboard'
    ) {
      return pathname === href;
    }
    if (pathname === href) return true;
    return pathname.startsWith(href + '/');
  };

  const isGroupActive = (group: NavGroup) => {
    if (group.sectionHref && (pathname === group.sectionHref || pathname.startsWith(group.sectionHref + '/'))) {
      return true;
    }
    return group.items.some((item) => isLinkActive(item.href));
  };

  const handleLogout = () => {
    clearAuthSession();
    setUser(null);
    if (mobileSidebarOpen) setMobileSidebarOpen(false);
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
  };

  const roleMeta: Record<
    WorkspaceRole,
    { title: string; subtitle: string; icon: React.ComponentType<{ className?: string }>; color: string }
  > = {
    LEARNER: {
      title: 'LEARNER OS',
      subtitle: 'Workforce Intelligence',
      icon: Sparkles,
      color: 'text-emerald-400',
    },
    EDUCATOR: {
      title: 'EDUCATOR OS',
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
      title: 'ADMIN OS',
      subtitle: 'System Governance',
      icon: ShieldAlert,
      color: 'text-amber-400',
    },
  };

  const currentMeta = roleMeta[role] || roleMeta.LEARNER;
  const RoleIcon = currentMeta.icon;

  const sidebarBody = (
    <div className="flex flex-col h-full bg-[#070a11] border-r border-[#1a2236] select-none text-zinc-300">
      {/* Brand Header */}
      <div className="h-16 px-4 border-b border-[#1a2236] flex items-center justify-between shrink-0">
        <Link
          href={`/${role.toLowerCase()}/dashboard`}
          className={`flex items-center gap-2.5 overflow-hidden transition-all duration-200 ${
            sidebarCollapsed ? 'justify-center w-full' : ''
          }`}
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#122033] to-[#0c1524] border border-[#1e2d44] flex items-center justify-center shrink-0 shadow-inner">
            <RoleIcon className={`w-4 h-4 ${currentMeta.color}`} />
          </div>
          {!sidebarCollapsed && (
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
        </Link>

        {/* Mobile Close Button */}
        {mobileSidebarOpen && (
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#121a2c] transition"
            aria-label="Close Navigation Drawer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Groups (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 custom-scrollbar">
        {groups.map((group) => {
          const isOpen = openGroups[group.title] !== false;
          const groupActive = isGroupActive(group);

          return (
            <div key={group.title} className="space-y-1">
              {!sidebarCollapsed ? (
                <div className="flex items-center justify-between px-2 py-1">
                  {group.sectionHref ? (
                    <Link
                      href={group.sectionHref}
                      onClick={() => {
                        if (mobileSidebarOpen) setMobileSidebarOpen(false);
                      }}
                      className={`text-[11px] font-bold uppercase tracking-wider transition ${
                        groupActive ? 'text-emerald-400' : 'text-zinc-400 hover:text-zinc-200'
                      }`}
                    >
                      {group.title}
                    </Link>
                  ) : (
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      {group.title}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => toggleGroup(group.title)}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-200 hover:bg-[#121a2c] transition"
                    aria-label={`Toggle ${group.title} group`}
                  >
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-150 ${
                        isOpen ? 'rotate-0' : '-rotate-90'
                      }`}
                    />
                  </button>
                </div>
              ) : (
                <div className="h-px bg-[#151e30] my-2" />
              )}

              {/* Items in Group */}
              {(isOpen || sidebarCollapsed) && (
                <div className="space-y-0.5">
                  {group.items.map((item) => {
                    const active = isLinkActive(item.href);
                    const Icon = item.icon;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          if (mobileSidebarOpen) setMobileSidebarOpen(false);
                        }}
                        title={sidebarCollapsed ? item.label : undefined}
                        className={`group relative flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium transition-all duration-150 ${
                          sidebarCollapsed ? 'justify-center' : ''
                        } ${
                          active
                            ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                            : 'text-zinc-300 hover:text-white hover:bg-[#111728] border border-transparent'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 shrink-0 transition-colors ${
                            active
                              ? 'text-emerald-400'
                              : 'text-zinc-400 group-hover:text-zinc-200'
                          }`}
                        />

                        {!sidebarCollapsed && (
                          <div className="flex-1 flex items-center justify-between min-w-0">
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <span
                                className={`ml-2 px-1.5 py-0.5 text-[9px] font-bold rounded-md border tracking-wider uppercase shrink-0 ${
                                  item.badgeColor || 'bg-zinc-800 text-zinc-400 border-zinc-700'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Active Indicator Bar */}
                        {active && (
                          <div className="absolute left-0 top-1.5 bottom-1.5 w-1 bg-emerald-400 rounded-r" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Profile Pill & Sign Out */}
      <div className="p-3 border-t border-[#1a2236] bg-[#05070d] shrink-0">
        {!sidebarCollapsed ? (
          <div className="flex items-center justify-between gap-2 p-2 rounded-xl bg-[#0c1220] border border-[#1a263c]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                {user?.name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  {user?.name || 'Authenticated User'}
                </div>
                <div className="text-[10px] text-zinc-400 truncate font-mono">
                  {user?.email || 'user@skillora.ai'}
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition shrink-0"
              title="Sign Out"
              aria-label="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="w-full flex justify-center p-2 rounded-xl text-zinc-400 hover:text-rose-400 hover:bg-rose-500/10 transition"
            title="Sign Out"
            aria-label="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden lg:block shrink-0 transition-all duration-200 sticky top-0 h-screen z-20 ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {sidebarBody}
      </aside>

      {/* Mobile Drawer Sidebar */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Drawer Window */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl animate-in slide-in-from-left duration-200">
            {sidebarBody}
          </div>
        </div>
      )}
    </>
  );
}
