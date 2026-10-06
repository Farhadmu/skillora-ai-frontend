'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Layers,
  Sparkles,
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
  ChevronDown,
  ChevronRight,
  LogOut,
  X,
  Bot,
  Brain,
  Search,
  CheckCircle2,
  FileCode,
  FolderGit2,
  GitPullRequest,
  Bookmark,
  FileText,
  Target,
  MessageSquare,
  CreditCard,
  Sliders,
  Filter,
} from 'lucide-react';
import { useWorkspace, WorkspaceRole } from './WorkspaceContext';
import { getCurrentUser, clearAuthSession } from '@/lib/api';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
}

interface NavGroup {
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  items: NavItem[];
  defaultOpen?: boolean;
}

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

  // LEARNER GROUPS
  const learnerGroups: NavGroup[] = [
    {
      title: 'Overview',
      defaultOpen: true,
      items: [
        { label: 'Command Center', href: '/learner/dashboard', icon: Layers },
        { label: '7-D Readiness Score', href: '/learner/readiness', icon: TrendingUp, badge: '84/100', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
      ],
    },
    {
      title: 'Career',
      items: [
        { label: 'Career Overview', href: '/learner/career', icon: Compass },
        { label: 'Career Explorer', href: '/learner/career/explorer', icon: Search },
        { label: 'Target Career', href: '/learner/career/target', icon: Target },
        { label: 'Alternative Paths', href: '/learner/career/paths', icon: Map },
        { label: 'Skill Gap Analysis', href: '/learner/career/skill-gap', icon: Sparkles, badge: 'AI', badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
        { label: 'Recommendations', href: '/learner/career/recommendations', icon: CheckCircle2 },
      ],
    },
    {
      title: 'Learning',
      items: [
        { label: 'My Learning', href: '/learner/learning', icon: BookOpen },
        { label: 'AI Teacher', href: '/learner/learning/ai-teacher', icon: Bot, badge: 'Socratic', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
        { label: 'Personalized Roadmap', href: '/learner/learning/roadmap', icon: Map },
        { label: 'Courses', href: '/learner/learning/courses', icon: GraduationCap },
        { label: 'Resources & Docs', href: '/learner/learning/resources', icon: FileText },
        { label: 'Saved & Notes', href: '/learner/learning/notes', icon: Bookmark },
      ],
    },
    {
      title: 'Skills',
      items: [
        { label: 'Skills Directory', href: '/learner/skills', icon: Cpu },
        { label: 'Skill Graph Engine', href: '/learner/skills/graph', icon: Layers, badge: 'Neural', badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
        { label: 'Skill Assessments', href: '/learner/skills/assessment', icon: Award },
        { label: 'Evidence Dossier', href: '/learner/skills/evidence', icon: ShieldCheck },
        { label: 'Growth & Progress', href: '/learner/skills/progress', icon: TrendingUp },
      ],
    },
    {
      title: 'Assessments',
      items: [
        { label: 'Testing Center', href: '/learner/assessments', icon: Award, badge: 'Adaptive', badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
      ],
    },
    {
      title: 'Build',
      items: [
        { label: 'Build Hub', href: '/learner/build', icon: Code2 },
        { label: 'Active Projects', href: '/learner/build/projects', icon: FileCode },
        { label: 'Recommended Projects', href: '/learner/build/projects/recommended', icon: Sparkles },
        { label: 'Coding Lab', href: '/learner/build/coding', icon: Terminal },
        { label: 'AI Code Review', href: '/learner/build/code-review', icon: GitPullRequest, badge: 'Audit', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
        { label: 'GitHub Sync', href: '/learner/build/github', icon: FolderGit2 },
      ],
    },
    {
      title: 'Interview',
      items: [
        { label: 'AI Mock Interview', href: '/learner/interview', icon: ShieldCheck, badge: 'Live', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
      ],
    },
    {
      title: 'Jobs',
      items: [
        { label: 'Marketplace', href: '/learner/jobs', icon: Briefcase },
        { label: 'Job Search', href: '/learner/jobs/search', icon: Search },
        { label: 'AI Recommended', href: '/learner/jobs/recommended', icon: Sparkles },
        { label: 'Skill Matches', href: '/learner/jobs/matches', icon: Target, badge: '94%', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
        { label: 'Saved Jobs', href: '/learner/jobs/saved', icon: Bookmark },
        { label: 'Applications', href: '/learner/jobs/applications', icon: CheckCircle2 },
      ],
    },
    {
      title: 'Telemetry & Profile',
      items: [
        { label: 'Analytics & Telemetry', href: '/learner/analytics', icon: BarChart3 },
        { label: 'Achievements & Badges', href: '/learner/achievements', icon: Award },
        { label: 'Peer Community', href: '/learner/community', icon: Users },
        { label: 'Public Portfolio', href: '/learner/portfolio', icon: User },
        { label: 'Settings & Security', href: '/learner/settings', icon: Settings },
      ],
    },
  ];

  // EDUCATOR GROUPS
  const educatorGroups: NavGroup[] = [
    {
      title: 'Operations',
      defaultOpen: true,
      items: [
        { label: 'Overview Console', href: '/educator/dashboard', icon: GraduationCap },
        { label: 'Curriculum & Teaching', href: '/educator/teaching', icon: BookOpen },
        { label: 'Learners Roster', href: '/educator/learners', icon: Users },
      ],
    },
    {
      title: 'Evaluation & AI',
      defaultOpen: true,
      items: [
        { label: 'Assessments Studio', href: '/educator/assessments', icon: Award },
        { label: 'AI Teaching Assistant', href: '/educator/ai', icon: Brain, badge: 'Copilot', badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
        { label: 'Cohort Analytics', href: '/educator/analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'Management',
      items: [
        { label: 'Content Library', href: '/educator/content', icon: Layers },
        { label: 'Cohort Management', href: '/educator/cohorts', icon: Users },
        { label: 'Communication & Alerts', href: '/educator/communication', icon: Send },
        { label: 'Educator Settings', href: '/educator/settings', icon: Settings },
      ],
    },
  ];

  // EMPLOYER GROUPS
  const employerGroups: NavGroup[] = [
    {
      title: 'Talent Acquisition',
      defaultOpen: true,
      items: [
        { label: 'ATS Overview', href: '/employer/dashboard', icon: Building2 },
        { label: 'Company Profile', href: '/employer/company', icon: Building2 },
        { label: 'Job Postings', href: '/employer/jobs', icon: Briefcase },
        { label: 'Candidate Pipeline', href: '/employer/pipeline', icon: Layers },
      ],
    },
    {
      title: 'Intelligence & Hiring',
      defaultOpen: true,
      items: [
        { label: 'Verified Talent Search', href: '/employer/talent', icon: Users },
        { label: 'AI Matching Engine', href: '/employer/matching', icon: Sparkles, badge: 'Zero-Bias', badgeColor: 'bg-purple-500/15 text-purple-400 border-purple-500/30' },
        { label: 'Shortlists', href: '/employer/shortlists', icon: Bookmark },
        { label: 'Interview Management', href: '/employer/interviews', icon: Play },
      ],
    },
    {
      title: 'Operations',
      items: [
        { label: 'Hiring Analytics', href: '/employer/analytics', icon: BarChart3 },
        { label: 'Candidate Messaging', href: '/employer/communication', icon: MessageSquare },
        { label: 'Account & Compliance', href: '/employer/settings', icon: Settings },
      ],
    },
  ];

  // ADMIN GROUPS
  const adminGroups: NavGroup[] = [
    {
      title: 'Governance',
      defaultOpen: true,
      items: [
        { label: 'Governance Overview', href: '/admin/dashboard', icon: ShieldAlert },
        { label: 'User Directory', href: '/admin/users', icon: Users },
        { label: 'Roles & Permissions', href: '/admin/roles', icon: UserCheck },
      ],
    },
    {
      title: 'Workforce Registry',
      items: [
        { label: 'Learners Directory', href: '/admin/learners', icon: GraduationCap },
        { label: 'Educators Directory', href: '/admin/educators', icon: BookOpen },
        { label: 'Employers Directory', href: '/admin/employers', icon: Building2 },
        { label: 'Jobs Moderation', href: '/admin/jobs', icon: Briefcase },
        { label: 'Content Management', href: '/admin/content', icon: Layers },
      ],
    },
    {
      title: 'AI & Knowledge',
      defaultOpen: true,
      items: [
        { label: 'Multi-Model AI Cascade', href: '/admin/ai', icon: Cpu, badge: '8 Nodes', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
        { label: 'Vector Knowledge Base', href: '/admin/knowledge-base', icon: Database },
        { label: 'Platform Telemetry', href: '/admin/analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'Compliance & System',
      items: [
        { label: 'Content Moderation', href: '/admin/moderation', icon: ShieldCheck },
        { label: 'Audit Logs & Ledger', href: '/admin/audit-logs', icon: FileText },
        { label: 'Billing & Subscriptions', href: '/admin/billing', icon: CreditCard },
        { label: 'System Configuration', href: '/admin/settings', icon: Sliders },
      ],
    },
  ];

  const roleGroupsMap: Record<WorkspaceRole, NavGroup[]> = {
    LEARNER: learnerGroups,
    EDUCATOR: educatorGroups,
    EMPLOYER: employerGroups,
    ADMIN: adminGroups,
  };

  const groups = roleGroupsMap[role] || learnerGroups;

  // Auto-expand group containing current route
  useEffect(() => {
    groups.forEach((g) => {
      const containsActive = g.items.some((item) => {
        if (item.href === '/learner/dashboard') {
          return pathname === '/learner/dashboard' || pathname === '/dashboard';
        }
        return pathname === item.href || (item.href !== '/learner/career' && item.href !== '/learner/skills' && item.href !== '/learner/build' && item.href !== '/learner/jobs' && pathname.startsWith(item.href + '/'));
      });
      if (containsActive) {
        setOpenGroups((prev) => ({ ...prev, [g.title]: true }));
      } else if (g.defaultOpen && openGroups[g.title] === undefined) {
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
    return pathname === href;
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

          return (
            <div key={group.title} className="space-y-1">
              {!sidebarCollapsed ? (
                <button
                  onClick={() => toggleGroup(group.title)}
                  className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-zinc-400 hover:text-zinc-200 transition group"
                >
                  <span>{group.title}</span>
                  <ChevronDown
                    className={`w-3 h-3 text-zinc-400 group-hover:text-zinc-300 transition-transform duration-150 ${
                      isOpen ? 'rotate-0' : '-rotate-90'
                    }`}
                  />
                </button>
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
