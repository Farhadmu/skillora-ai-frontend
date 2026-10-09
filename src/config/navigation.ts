import React from 'react';
import {
  Layers,
  TrendingUp,
  Compass,
  Search,
  Target,
  Map,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Bot,
  GraduationCap,
  FileText,
  Bookmark,
  Cpu,
  Award,
  ShieldCheck,
  Code2,
  FileCode,
  Terminal,
  GitPullRequest,
  FolderGit2,
  User,
  Briefcase,
  BarChart3,
  Users,
  Settings,
  Building2,
  Play,
  MessageSquare,
  ShieldAlert,
  UserCheck,
  Database,
  CreditCard,
  Sliders,
  Brain,
  Send,
} from 'lucide-react';

export type WorkspaceRole = 'LEARNER' | 'EDUCATOR' | 'EMPLOYER' | 'ADMIN';

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  badgeColor?: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  sectionHref?: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

export interface RoleNavigationConfig {
  role: WorkspaceRole;
  title: string;
  subtitle: string;
  dashboardHref: string;
  groups: NavGroup[];
}

export const LEARNER_NAVIGATION: RoleNavigationConfig = {
  role: 'LEARNER',
  title: 'LEARNER OS',
  subtitle: 'Workforce Intelligence',
  dashboardHref: '/learner/dashboard',
  groups: [
    {
      title: 'Overview',
      defaultOpen: true,
      items: [
        { label: 'Command Center', href: '/learner/dashboard', icon: Layers },
        { label: '7-D Readiness Score', href: '/learner/readiness', icon: TrendingUp },
      ],
    },
    {
      title: 'Career',
      sectionHref: '/learner/career',
      defaultOpen: true,
      items: [
        { label: 'Career Overview', href: '/learner/career', icon: Compass },
        { label: 'Career Explorer', href: '/learner/career/explorer', icon: Search },
        { label: 'Target Career', href: '/learner/career/target', icon: Target },
        { label: 'Alternative Paths', href: '/learner/career/paths', icon: Map },
        { label: 'Skill Gap Analysis', href: '/learner/career/skill-gap', icon: Sparkles, badge: 'AI', badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
        { label: 'AI Recommendations', href: '/learner/career/recommendations', icon: CheckCircle2 },
      ],
    },
    {
      title: 'Learning',
      sectionHref: '/learner/learning',
      defaultOpen: true,
      items: [
        { label: 'My Learning', href: '/learner/learning', icon: BookOpen },
        { label: 'AI Teacher', href: '/learner/learning/ai-teacher', icon: Bot, badge: 'Socratic', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
        { label: 'Personalized Roadmap', href: '/learner/learning/roadmap', icon: Map },
        { label: 'Courses Catalog', href: '/learner/learning/courses', icon: GraduationCap },
        { label: 'Resources & Docs', href: '/learner/learning/resources', icon: FileText },
        { label: 'Saved Pathways', href: '/learner/learning/saved', icon: Bookmark },
        { label: 'Study Notes', href: '/learner/learning/notes', icon: FileText },
      ],
    },
    {
      title: 'Skills',
      sectionHref: '/learner/skills',
      defaultOpen: true,
      items: [
        { label: 'Skills Directory', href: '/learner/skills', icon: Cpu },
        { label: 'Skill Graph Engine', href: '/learner/skills/graph', icon: Layers, badge: 'Neural', badgeColor: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30' },
        { label: 'Skill Assessments', href: '/learner/skills/assessment', icon: Award },
        { label: 'Evidence Dossier', href: '/learner/skills/evidence', icon: ShieldCheck },
        { label: 'Growth & Progress', href: '/learner/skills/progress', icon: TrendingUp },
      ],
    },
    {
      title: 'Build',
      sectionHref: '/learner/build',
      defaultOpen: true,
      items: [
        { label: 'Build Hub', href: '/learner/build', icon: Code2 },
        { label: 'Active Projects', href: '/learner/build/projects', icon: FileCode },
        { label: 'Recommended Projects', href: '/learner/build/projects/recommended', icon: Sparkles },
        { label: 'Coding Lab', href: '/learner/build/coding', icon: Terminal },
        { label: 'AI Code Review', href: '/learner/build/code-review', icon: GitPullRequest, badge: 'Audit', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
        { label: 'GitHub Sync', href: '/learner/build/github', icon: FolderGit2 },
        { label: 'Portfolio Proofs', href: '/learner/build/portfolio', icon: User },
      ],
    },
    {
      title: 'Interview',
      sectionHref: '/learner/interview',
      defaultOpen: true,
      items: [
        { label: 'AI Mock Interview', href: '/learner/interview', icon: ShieldCheck, badge: 'Live', badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' },
      ],
    },
    {
      title: 'Jobs',
      sectionHref: '/learner/jobs',
      defaultOpen: true,
      items: [
        { label: 'Marketplace', href: '/learner/jobs', icon: Briefcase },
        { label: 'Recommended Roles', href: '/learner/jobs/recommended', icon: Sparkles },
        { label: 'Job Search', href: '/learner/jobs/search', icon: Search },
        { label: 'Skill Matches', href: '/learner/jobs/matches', icon: Target },
        { label: 'Saved Jobs', href: '/learner/jobs/saved', icon: Bookmark },
        { label: 'Applications Tracker', href: '/learner/jobs/applications', icon: CheckCircle2 },
      ],
    },
    {
      title: 'Telemetry & Profile',
      defaultOpen: true,
      items: [
        { label: 'Analytics & Telemetry', href: '/learner/analytics', icon: BarChart3 },
        { label: 'Achievements & Badges', href: '/learner/achievements', icon: Award },
        { label: 'Peer Community', href: '/learner/community', icon: Users },
        { label: 'Public Portfolio', href: '/learner/portfolio', icon: User },
        { label: 'Settings & Security', href: '/learner/settings', icon: Settings },
      ],
    },
  ],
};

export const EDUCATOR_NAVIGATION: RoleNavigationConfig = {
  role: 'EDUCATOR',
  title: 'EDUCATOR OS',
  subtitle: 'Institutional Telemetry',
  dashboardHref: '/educator/dashboard',
  groups: [
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
      defaultOpen: true,
      items: [
        { label: 'Content Library', href: '/educator/content', icon: Layers },
        { label: 'Cohort Management', href: '/educator/cohorts', icon: Users },
        { label: 'Communication & Alerts', href: '/educator/communication', icon: Send },
        { label: 'Educator Settings', href: '/educator/settings', icon: Settings },
      ],
    },
  ],
};

export const EMPLOYER_NAVIGATION: RoleNavigationConfig = {
  role: 'EMPLOYER',
  title: 'EMPLOYER ATS',
  subtitle: 'Verified Talent Pipeline',
  dashboardHref: '/employer/dashboard',
  groups: [
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
      defaultOpen: true,
      items: [
        { label: 'Hiring Analytics', href: '/employer/analytics', icon: BarChart3 },
        { label: 'Candidate Messaging', href: '/employer/communication', icon: MessageSquare },
        { label: 'Account & Compliance', href: '/employer/settings', icon: Settings },
      ],
    },
  ],
};

export const ADMIN_NAVIGATION: RoleNavigationConfig = {
  role: 'ADMIN',
  title: 'ADMIN OS',
  subtitle: 'System Governance',
  dashboardHref: '/admin/dashboard',
  groups: [
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
      defaultOpen: true,
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
      defaultOpen: true,
      items: [
        { label: 'Content Moderation', href: '/admin/moderation', icon: ShieldCheck },
        { label: 'Audit Logs & Ledger', href: '/admin/audit-logs', icon: FileText },
        { label: 'Billing & Subscriptions', href: '/admin/billing', icon: CreditCard },
        { label: 'System Configuration', href: '/admin/settings', icon: Sliders },
      ],
    },
  ],
};

export const NAVIGATION_MAP: Record<WorkspaceRole, RoleNavigationConfig> = {
  LEARNER: LEARNER_NAVIGATION,
  EDUCATOR: EDUCATOR_NAVIGATION,
  EMPLOYER: EMPLOYER_NAVIGATION,
  ADMIN: ADMIN_NAVIGATION,
};

export function getNavigationForRole(role: WorkspaceRole): RoleNavigationConfig {
  return NAVIGATION_MAP[role] || LEARNER_NAVIGATION;
}

export function getAllCanonicalRoutes(): string[] {
  const routes = new Set<string>();
  Object.values(NAVIGATION_MAP).forEach((config) => {
    config.groups.forEach((group) => {
      if (group.sectionHref) routes.add(group.sectionHref);
      group.items.forEach((item) => routes.add(item.href));
    });
  });
  return Array.from(routes);
}

export function isRouteInWorkspace(href: string, role: WorkspaceRole): boolean {
  const prefix = `/${role.toLowerCase()}/`;
  return href.startsWith(prefix) || href === `/${role.toLowerCase()}`;
}
