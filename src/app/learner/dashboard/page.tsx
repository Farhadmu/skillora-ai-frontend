'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bot,
  Compass,
  Map,
  Code2,
  Briefcase,
  CheckCircle2,
  Clock,
  TrendingUp,
  FileText,
  Upload,
  Layers,
  Award,
  AlertCircle,
  ExternalLink,
  Cpu,
  Copy,
  Check,
  Target,
  X,
  RefreshCw,
  DollarSign,
  Share2,
  Download,
  BookOpen,
} from 'lucide-react';
import { api, getCurrentUser } from '@/lib/api';

export default function LearnerDashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [readiness, setReadiness] = useState<any>(null);
  const [roadmap, setRoadmap] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);

  // Stage 1: Role Selection & AI Research Modal State
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const [availableRoles, setAvailableRoles] = useState<any[]>([]);
  const [selectedRoleTitle, setSelectedRoleTitle] = useState('');
  const [customRoleInput, setCustomRoleInput] = useState('');
  const [roleResearchData, setRoleResearchData] = useState<any>(null);
  const [researchLoading, setResearchLoading] = useState(false);
  const [applyingRole, setApplyingRole] = useState(false);
  const [roleSuccessToast, setRoleSuccessToast] = useState<string | null>(null);

  // Stage 4: Job Readiness Suite State
  const [jobReadinessData, setJobReadinessData] = useState<any>(null);
  const [jobReadinessTab, setJobReadinessTab] = useState<'resume' | 'linkedin' | 'portfolio'>('resume');
  const [loadingReadiness, setLoadingReadiness] = useState(false);

  // Utility Copy Feedback State
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  // CV Parsing Modal State
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [cvText, setCvText] = useState('');
  const [cvParsing, setCvParsing] = useState(false);
  const [cvSuccess, setCvSuccess] = useState<string | null>(null);

  // Roadmap Generation State
  const [generatingRoadmap, setGeneratingRoadmap] = useState(false);

  // Job Application State
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [jobToast, setJobToast] = useState<string | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const user = getCurrentUser();
      if (!user) {
        router.push('/login');
        return;
      }

      const [profData, readData, roadData, jobsData, rolesList] = await Promise.all([
        api.getMyProfile().catch(() => null),
        api.getReadinessScore().catch(() => null),
        api.getActiveRoadmap().catch(() => null),
        api.getJobs({ userId: user?.id }).catch(() => []),
        api.getCareerRoles().catch(() => []),
      ]);

      setProfile(profData);
      setReadiness(readData);
      setRoadmap(roadData);
      setJobs(jobsData.slice(0, 3));
      setAvailableRoles(rolesList || []);

      const activeRole = profData?.targetRole || 'Full-Stack AI Systems Engineer';
      setSelectedRoleTitle(activeRole);

      // Load Job Readiness Suite
      loadJobReadiness(activeRole);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
    }
  };

  const loadJobReadiness = async (roleName?: string) => {
    setLoadingReadiness(true);
    try {
      const data = await api.generateJobReadiness(roleName || profile?.targetRole);
      setJobReadinessData(data);
    } catch (err) {
      console.error('Failed to load job readiness suite:', err);
    } finally {
      setLoadingReadiness(false);
    }
  };

  const handleOpenRoleModal = async (roleToInspect?: string) => {
    setRoleModalOpen(true);
    const target = roleToInspect || profile?.targetRole || 'Full-Stack AI Systems Engineer';
    setSelectedRoleTitle(target);
    fetchRoleResearch(target);
  };

  const fetchRoleResearch = async (roleTitle: string) => {
    if (!roleTitle) return;
    setResearchLoading(true);
    try {
      const data = await api.researchRole(roleTitle);
      setRoleResearchData(data);
    } catch (err) {
      console.error('Failed to fetch role research:', err);
    } finally {
      setResearchLoading(false);
    }
  };

  const handleSelectPredefinedRole = (title: string) => {
    setSelectedRoleTitle(title);
    setCustomRoleInput('');
    fetchRoleResearch(title);
  };

  const handleCustomRoleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customRoleInput.trim()) return;
    setSelectedRoleTitle(customRoleInput.trim());
    fetchRoleResearch(customRoleInput.trim());
  };

  const handleSetRoleAndGenerateRoadmap = async () => {
    if (!selectedRoleTitle) return;
    setApplyingRole(true);
    try {
      // 1. Update Profile targetRole
      await api.updateMyProfile({ targetRole: selectedRoleTitle });

      // 2. Generate new 30-day roadmap for this role
      const newRoadmap = await api.generateRoadmap(selectedRoleTitle, 30);
      setRoadmap(newRoadmap);

      // 3. Update local state & refresh readiness suite
      setProfile((prev: any) => ({ ...prev, targetRole: selectedRoleTitle }));
      await loadJobReadiness(selectedRoleTitle);

      // 4. Reload jobs matching the new role
      const jobsData = await api.getJobs({ query: selectedRoleTitle }).catch(() => []);
      if (jobsData.length > 0) setJobs(jobsData.slice(0, 3));

      setRoleSuccessToast(`Target career set to "${selectedRoleTitle}" & 30-day roadmap activated!`);
      setTimeout(() => {
        setRoleSuccessToast(null);
        setRoleModalOpen(false);
      }, 2000);
    } catch (err: any) {
      console.error('Failed to set role & generate roadmap:', err);
      setRoleSuccessToast(`Error: ${err?.message || 'Could not update role'}`);
      setTimeout(() => setRoleSuccessToast(null), 3000);
    } finally {
      setApplyingRole(false);
    }
  };

  const handleGenerateRoadmap = async () => {
    setGeneratingRoadmap(true);
    try {
      const newRoadmap = await api.generateRoadmap(
        profile?.targetRole || 'Full-Stack AI Systems Engineer',
        30,
      );
      setRoadmap(newRoadmap);
    } catch (err) {
      console.error('Failed to generate roadmap:', err);
    } finally {
      setGeneratingRoadmap(false);
    }
  };

  const handleToggleMilestone = async (milestoneIndex: number) => {
    if (!roadmap) return;
    try {
      const updated = await api.toggleRoadmapMilestone(roadmap.id, milestoneIndex);
      setRoadmap(updated);
    } catch (err) {
      console.error('Failed to toggle milestone:', err);
    }
  };

  const handleCvParse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvText.trim()) return;
    setCvParsing(true);
    setCvSuccess(null);

    try {
      const res = await api.parseCv(cvText);
      setProfile(res.profile);
      setCvSuccess(`AI extracted ${res.extracted?.extractedSkills?.length || 0} skills with evidence mapped!`);
      // Reload readiness suite with newly extracted skills
      loadJobReadiness(res.profile?.targetRole || profile?.targetRole);
      setTimeout(() => {
        setCvModalOpen(false);
        setCvSuccess(null);
        setCvText('');
      }, 1500);
    } catch (err: any) {
      console.error('CV Parse error:', err);
    } finally {
      setCvParsing(false);
    }
  };

  const handleApplyJob = async (jobId: string) => {
    setApplyingJobId(jobId);
    try {
      await api.applyForJob(jobId);
      setJobToast('Application successfully submitted with verified credentials!');
      setTimeout(() => setJobToast(null), 3000);
    } catch (err: any) {
      setJobToast(err?.message || 'Application failed. Please try again.');
      setTimeout(() => setJobToast(null), 3000);
    } finally {
      setApplyingJobId(null);
    }
  };

  const copyToClipboard = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(identifier);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const downloadTextFile = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 select-none">
      {/* Toast Alert */}
      {jobToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl bg-emerald-500 text-black font-bold text-xs flex items-center gap-2.5 shadow-2xl animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 shrink-0" />
          <span>{jobToast}</span>
        </div>
      )}

      {/* ======================================================== */}
      {/* HEADER & TARGET ROLE CONTROL */}
      {/* ======================================================== */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Learner Mission Control • 5-Stage Career Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {profile?.name || 'Learner'}
          </h1>
          <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-zinc-400">
            <span>Target Career Track:</span>
            <button
              onClick={() => handleOpenRoleModal(profile?.targetRole)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-bold hover:bg-emerald-500/25 transition group cursor-pointer"
            >
              <Target className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>{profile?.targetRole || 'Select Target Career'}</span>
              <span className="text-[10px] text-emerald-400/80 underline ml-1">Change / Research</span>
            </button>
            <span>•</span>
            <span>
              Verified Readiness:{' '}
              <strong className="text-emerald-400 font-mono">
                {readiness?.overallScore != null
                  ? `${readiness.overallScore}/100`
                  : profile?.readinessScore != null
                  ? `${profile.readinessScore}/100`
                  : 'Pending'}
              </strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => handleOpenRoleModal(profile?.targetRole)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-1.5 shadow-lg shadow-emerald-500/20 font-bold"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>AI Role Research</span>
          </button>

          <button
            onClick={() => setCvModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#111726] border border-[#1e293b] text-zinc-200 hover:text-white hover:border-emerald-500/40 transition flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI CV Analyzer</span>
          </button>

          <Link
            href={`/portfolio/${profile?.userId || 'usr-learner-1'}`}
            target="_blank"
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#111726] border border-[#1e293b] text-zinc-200 hover:text-white hover:border-cyan-500/40 transition flex items-center gap-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
            <span>Public Portfolio</span>
          </Link>
        </div>
      </div>

      {/* 5-STAGE PURPOSE ROADMAP BANNER */}
      <div className="p-4 rounded-2xl bg-[#090e18] border border-[#1a2338] overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] text-xs">
          {[
            { step: '1', title: 'Pick Role & AI Research', desc: 'Market demand & gaps', active: true, done: !!profile?.targetRole },
            { step: '2', title: 'Learn with Adaptive Path', desc: '30-Day SkillBridge', active: true, done: (roadmap?.progressPercent || 0) > 0 },
            { step: '3', title: 'Verify Skills & Projects', desc: 'Assessments & labs', active: true, done: (profile?.skills?.filter((s: any) => s.verified)?.length || 0) > 0 },
            { step: '4', title: 'Ready CV, LinkedIn & Portfolio', desc: 'ATS Resume & Story', active: true, done: false },
            { step: '5', title: 'Direct Job Match & Apply', desc: 'Verified hiring partners', active: true, done: false },
          ].map((st, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                  st.done
                    ? 'bg-emerald-500 text-black'
                    : 'bg-[#121a2c] text-emerald-400 border border-emerald-500/40'
                }`}
              >
                {st.done ? <Check className="w-4 h-4" /> : st.step}
              </div>
              <div>
                <div className="font-bold text-white text-[11px]">{st.title}</div>
                <div className="text-[10px] text-zinc-500">{st.desc}</div>
              </div>
              {i < 4 && <ArrowRight className="w-3 h-3 text-zinc-600 ml-2" />}
            </div>
          ))}
        </div>
      </div>

      {/* Intelligent Next Action Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#0c182b] via-[#091322] to-[#070d17] border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
              AI Next Best Career Action for {profile?.targetRole || 'Your Role'}
            </div>
            <div className="text-sm font-bold text-white mt-0.5">
              {readiness?.recommendations?.[0] ||
                `Complete milestone tasks in your active roadmap and review your optimized ATS Resume below.`}
            </div>
            <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
              Target Role: <strong className="text-white">{profile?.targetRole || 'Full-Stack Software Engineer'}</strong>. Real-time workforce evaluation across 7 objective pillars.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => handleOpenRoleModal(profile?.targetRole)}
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#111726] hover:bg-[#1a233a] border border-emerald-500/40 text-emerald-300 transition flex items-center gap-1.5"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Role Intelligence</span>
          </button>
          <Link
            href="/learner/interview"
            className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-1.5 shadow-md"
          >
            <span>Diagnostic Drill</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* ======================================================== */}
      {/* GRID: 7-D READINESS & ACTIVE ROADMAP */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 7-Dimension Readiness Score Dial */}
        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                7-D Readiness Score
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                {readiness?.overallScore != null ? 'Verified' : 'Pending'}
              </span>
            </div>

            {readiness?.overallScore != null ? (
              <>
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-5xl font-extrabold text-white tracking-tight">
                    {readiness.overallScore}
                  </span>
                  <span className="text-sm text-zinc-500 font-mono">/ 100</span>
                  <span className="ml-auto text-xs font-semibold text-emerald-400">
                    {readiness.employabilityStatus || 'Active Candidate'}
                  </span>
                </div>

                {/* 7 Dimensions Bar Breakdown */}
                <div className="space-y-2.5 text-xs">
                  {[
                    { name: 'Technical Rigor', val: readiness.dimensions?.technical || 0 },
                    { name: 'Problem Solving', val: readiness.dimensions?.problemSolving || 0 },
                    { name: 'Applied Projects', val: readiness.dimensions?.projects || 0 },
                    { name: 'Communication', val: readiness.dimensions?.communication || 0 },
                    { name: 'Interview Mastery', val: readiness.dimensions?.interview || 0 },
                    { name: 'Role Alignment', val: readiness.dimensions?.roleAlignment || 0 },
                    { name: 'Production Practical', val: readiness.dimensions?.practical || 0 },
                  ].map((dim, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-[11px]">
                        <span className="text-zinc-400">{dim.name}</span>
                        <span className="text-zinc-200 font-mono font-semibold">{dim.val}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-[#141b2b] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                          style={{ width: `${dim.val}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="py-8 text-center text-zinc-400 text-xs space-y-3">
                <AlertCircle className="w-8 h-8 text-zinc-500 mx-auto" />
                <p>Complete your profile and take a diagnostic drill to calculate your 7-D readiness score.</p>
                <Link
                  href="/learner/interview"
                  className="inline-block px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs"
                >
                  Start Diagnostic Assessment
                </Link>
              </div>
            )}
          </div>

          <div className="pt-6 mt-6 border-t border-[#141b2b]">
            <Link
              href="/learner/readiness"
              className="text-xs font-bold text-emerald-400 hover:underline flex items-center justify-between"
            >
              <span>Explainable Score Breakdown</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Active SkillBridge Roadmap */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] flex flex-col justify-between">
          {roadmap ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Map className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                    Active Roadmap ({roadmap?.durationDays || 30} Days) • {roadmap?.targetRole || profile?.targetRole}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Progress:</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    {roadmap?.progressPercent ?? 0}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#141b2b] rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${roadmap?.progressPercent ?? 0}%` }}
                />
              </div>

              {/* Milestones list */}
              <div className="space-y-3">
                {roadmap?.milestones?.map((m: any, idx: number) => (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition ${
                      m.completed
                        ? 'bg-[#0a121c] border-emerald-500/30'
                        : 'bg-[#0e1424] border-[#161f33]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <button
                          onClick={() => handleToggleMilestone(idx)}
                          className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center transition cursor-pointer ${
                            m.completed
                              ? 'bg-emerald-500 text-black'
                              : 'border border-zinc-600 hover:border-emerald-400'
                          }`}
                        >
                          {m.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                        </button>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-mono font-bold text-zinc-500">
                              {m.dayRange}
                            </span>
                            <span className="text-xs font-bold text-white">{m.title}</span>
                          </div>
                          <div className="text-[11px] text-zinc-400 mt-1">
                            Focus: <strong className="text-emerald-300">{m.focusSkill}</strong> • {m.tasks?.[0]}
                          </div>
                        </div>
                      </div>
                      <span
                        className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                          m.completed
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-zinc-800 text-zinc-400'
                        }`}
                      >
                        {m.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-zinc-400 text-xs space-y-4 my-auto">
              <Map className="w-10 h-10 text-zinc-600 mx-auto" />
              <div>
                <div className="text-sm font-bold text-white mb-1">No Active Pathway Found</div>
                <p className="text-zinc-500 max-w-sm mx-auto">
                  Generate an adaptive 30-day SkillBridge roadmap tailored to your target career role: {profile?.targetRole || 'Full-Stack Engineer'}.
                </p>
              </div>
              <button
                onClick={handleGenerateRoadmap}
                disabled={generatingRoadmap}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs transition inline-flex items-center gap-2 cursor-pointer"
              >
                {generatingRoadmap ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                <span>Generate 30-Day Roadmap</span>
              </button>
            </div>
          )}

          <div className="pt-4 mt-6 border-t border-[#141b2b] flex items-center justify-between text-xs">
            <span className="text-zinc-500">Milestones adapt dynamically as tasks are checked.</span>
            <Link href="/learner/learning/roadmap" className="font-bold text-emerald-400 hover:underline flex items-center gap-1">
              <span>View Full Pathway & Curriculum</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* COMPLETE JOB-READINESS SUITE: CV, LINKEDIN, PORTFOLIO */}
      {/* ======================================================== */}
      <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#161f33]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-0.5">
              <Award className="w-4 h-4" />
              <span>Commercial Job-Readiness Suite</span>
            </div>
            <h3 className="text-lg font-bold text-white">
              Role-Tailored ATS Resume, LinkedIn Optimizer & Verifiable Portfolio
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Targeted to <strong className="text-emerald-300">{profile?.targetRole || 'Full-Stack AI Systems Engineer'}</strong> with your verified credentials
            </p>
          </div>

          {/* Tab Controls */}
          <div className="flex items-center rounded-xl bg-[#111726] border border-[#1e293b] p-1">
            <button
              onClick={() => setJobReadinessTab('resume')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                jobReadinessTab === 'resume'
                  ? 'bg-emerald-500 text-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>ATS Resume</span>
            </button>
            <button
              onClick={() => setJobReadinessTab('linkedin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                jobReadinessTab === 'linkedin'
                  ? 'bg-emerald-500 text-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>LinkedIn Optimizer</span>
            </button>
            <button
              onClick={() => setJobReadinessTab('portfolio')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                jobReadinessTab === 'portfolio'
                  ? 'bg-emerald-500 text-black shadow'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Live Portfolio</span>
            </button>
          </div>
        </div>

        {loadingReadiness ? (
          <div className="py-12 text-center text-zinc-400 text-xs flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
            <span>Synthesizing your verified job-readiness artifacts...</span>
          </div>
        ) : jobReadinessData ? (
          <div>
            {/* TAB 1: ATS RESUME BUILDER */}
            {jobReadinessTab === 'resume' && (
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-[#0e1424] border border-[#161f33]">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span>ATS Resume for {jobReadinessData.targetRole}</span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-[10px]">
                        ATS Friendly
                      </span>
                    </div>
                    <div className="text-[11px] text-zinc-400 mt-0.5">
                      Structured specifically to clear automated resume screeners and recruiter keyword filters.
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        copyToClipboard(jobReadinessData.resume?.rawMarkdown || '', 'resume-markdown')
                      }
                      className="px-3 py-1.5 rounded-lg bg-[#141c2e] hover:bg-[#1a253e] border border-[#1f2b45] text-zinc-200 text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      {copiedItem === 'resume-markdown' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Copy Markdown</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        downloadTextFile(
                          jobReadinessData.resume?.rawMarkdown || '',
                          `${(jobReadinessData.learnerName || 'resume').replace(/\s+/g, '_')}_ATS_Resume.md`,
                        )
                      }
                      className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold flex items-center gap-1.5 transition cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Resume</span>
                    </button>
                  </div>
                </div>

                {/* Resume Preview Box */}
                <div className="p-6 rounded-xl bg-[#070a12] border border-[#161f33] text-xs font-mono text-zinc-300 leading-relaxed whitespace-pre-wrap max-h-96 overflow-y-auto">
                  {jobReadinessData.resume?.rawMarkdown}
                </div>
              </div>
            )}

            {/* TAB 2: LINKEDIN OPTIMIZER */}
            {jobReadinessTab === 'linkedin' && (
              <div className="space-y-6">
                {/* Headlines Section */}
                <div className="space-y-2">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>High-Converting LinkedIn Headlines (Pick 1 to stand out to recruiters)</span>
                  </div>

                  <div className="space-y-2">
                    {jobReadinessData.linkedIn?.headlines?.map((hl: string, idx: number) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#0e1424] border border-[#161f33] flex items-center justify-between gap-4"
                      >
                        <span className="text-xs text-zinc-200 font-medium">{hl}</span>
                        <button
                          onClick={() => copyToClipboard(hl, `headline-${idx}`)}
                          className="px-3 py-1 rounded-lg bg-[#141c2e] hover:bg-[#1b2742] text-[11px] font-semibold text-emerald-400 flex items-center gap-1 shrink-0 transition cursor-pointer"
                        >
                          {copiedItem === `headline-${idx}` ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* About Section */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Compelling LinkedIn &apos;About&apos; Story</span>
                    </div>
                    <button
                      onClick={() =>
                        copyToClipboard(jobReadinessData.linkedIn?.aboutStory || '', 'linkedin-about')
                      }
                      className="px-3 py-1 rounded-lg bg-[#141c2e] hover:bg-[#1b2742] text-[11px] font-semibold text-cyan-400 flex items-center gap-1 transition cursor-pointer"
                    >
                      {copiedItem === 'linkedin-about' ? (
                        <>
                          <Check className="w-3 h-3" />
                          <span>Copied Story!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy About Section</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33] text-xs text-zinc-300 leading-relaxed whitespace-pre-wrap">
                    {jobReadinessData.linkedIn?.aboutStory}
                  </div>
                </div>

                {/* Featured Skills & Action Bullets */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Recommended LinkedIn Skills</span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            (jobReadinessData.linkedIn?.featuredSkills || []).join(', '),
                            'linkedin-skills',
                          )
                        }
                        className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {copiedItem === 'linkedin-skills' ? 'Copied All!' : 'Copy All'}
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {jobReadinessData.linkedIn?.featuredSkills?.map((sk: string, i: number) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-[#141c2e] text-zinc-300 border border-[#1f2b45]">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33] space-y-3">
                    <span className="text-xs font-bold text-white">High-Impact Experience Bullets</span>
                    <div className="space-y-2 text-xs text-zinc-400">
                      {jobReadinessData.linkedIn?.experienceBullets?.map((b: string, i: number) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="text-[11px] text-zinc-300">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: VERIFIABLE PORTFOLIO SHOWCASE */}
            {jobReadinessTab === 'portfolio' && (
              <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0c182b] to-[#070e1a] border border-cyan-500/30 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verified Talent Public Portfolio</span>
                    </div>
                    <h4 className="text-base font-bold text-white mt-1">
                      {profile?.name || 'Talent'} — {jobReadinessData.targetRole}
                    </h4>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Status: <strong className="text-emerald-400">{jobReadinessData.portfolio?.status}</strong> • Verified Skills: {jobReadinessData.portfolio?.verifiedSkillsCount || 0}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          `${window.location.origin}${jobReadinessData.portfolio?.publicUrl}`,
                          'portfolio-link',
                        )
                      }
                      className="px-3.5 py-2 rounded-xl bg-[#111726] border border-[#1e293b] text-xs font-semibold text-zinc-200 hover:text-white transition flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedItem === 'portfolio-link' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied Link!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Share Link</span>
                        </>
                      )}
                    </button>

                    <Link
                      href={jobReadinessData.portfolio?.publicUrl || `/portfolio/${profile?.userId || 'usr-learner-1'}`}
                      target="_blank"
                      className="px-4 py-2 rounded-xl font-bold text-xs bg-cyan-500 hover:bg-cyan-400 text-black transition flex items-center gap-1.5 shadow-lg shadow-cyan-500/20"
                    >
                      <span>Open Live Portfolio</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[#060b14] border border-[#141f33] text-xs text-zinc-400">
                  <strong className="text-white">Why recruiters value this portfolio:</strong> Every skill badge on your Skillora public profile is cryptographically verified through authenticated diagnostic assessments, hands-on code reviews, and project submissions — zero self-reported fluff.
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>

      {/* ======================================================== */}
      {/* VERIFIED SKILLS & FAST LAUNCH TOOLS */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verified Skills Catalog */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Verified Skill Graph Nodes ({profile?.skills?.length || 0})
              </h3>
            </div>
            <Link href="/learner/skills" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
              <span>Open Graph Engine</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {profile?.skills && profile.skills.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {profile.skills.map((s: any, idx: number) => (
                <div
                  key={idx}
                  className="p-3 rounded-xl bg-[#0e1424] border border-[#161f33] flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-bold text-white">{s.name}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        s.verified
                          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {s.verified ? 'Verified Proof' : 'Pending Proof'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
                    <span>Proficiency: <strong className="text-white">{s.proficiency}%</strong></span>
                    <span>Confidence: <strong className="text-emerald-400">{s.confidence}%</strong></span>
                  </div>
                  <div className="text-[10px] text-zinc-500 truncate">
                    Evidence: {s.evidence?.[0] || 'Direct project assessment'}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-zinc-500 text-xs space-y-2">
              <Cpu className="w-6 h-6 mx-auto text-zinc-600" />
              <p>No verified skills yet. Paste your CV or take an assessment to populate your skill graph.</p>
            </div>
          )}
        </div>

        {/* Quick AI Launch Tools */}
        <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                Quick Intelligence Tools
              </h3>
            </div>

            <div className="space-y-2">
              <Link
                href="/learner/learning/ai-teacher"
                className="p-3 rounded-xl bg-[#0e1424] hover:bg-[#161f33] border border-[#161f33] hover:border-emerald-500/40 transition flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                    Socratic AI Tutor
                  </div>
                  <div className="text-[10px] text-zinc-400">Bloom&apos;s adaptive tutoring & hints</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400" />
              </Link>

              <Link
                href="/learner/career"
                className="p-3 rounded-xl bg-[#0e1424] hover:bg-[#161f33] border border-[#161f33] hover:border-cyan-500/40 transition flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-cyan-300">
                    JD Requirements Analyzer
                  </div>
                  <div className="text-[10px] text-zinc-400">Paste job post & compare skill overlap</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-cyan-400" />
              </Link>

              <Link
                href="/learner/build/coding"
                className="p-3 rounded-xl bg-[#0e1424] hover:bg-[#161f33] border border-[#161f33] hover:border-purple-500/40 transition flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-purple-300">
                    Coding Sandbox Lab
                  </div>
                  <div className="text-[10px] text-zinc-400">In-browser code challenges & tests</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-purple-400" />
              </Link>

              <Link
                href="/learner/jobs"
                className="p-3 rounded-xl bg-[#0e1424] hover:bg-[#161f33] border border-[#161f33] hover:border-emerald-500/40 transition flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-white group-hover:text-emerald-300">
                    Talent Marketplace
                  </div>
                  <div className="text-[10px] text-zinc-400">Browse roles with AI match score</div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400" />
              </Link>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-[#141b2b] text-[11px] text-zinc-500 text-center">
            Skillora Real-Time Intelligence Engine
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MATCHED JOBS PREVIEW */}
      {/* ======================================================== */}
      <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Matched Positions For Your Target Role ({profile?.targetRole || 'Software Engineer'})
            </h3>
          </div>
          <Link href="/learner/jobs" className="text-xs text-emerald-400 hover:underline flex items-center gap-1">
            <span>Browse All Positions</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {jobs && jobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="p-4 rounded-xl bg-[#0e1424] border border-[#161f33] hover:border-emerald-500/40 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {job.matchScore || 85}% Match
                    </span>
                    <span className="text-xs font-mono text-zinc-400">{job.salaryRange || '$120k - $160k'}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1">{job.title}</h4>
                  <div className="text-xs text-zinc-400 mb-3">{job.companyName} • {job.location || 'Remote'}</div>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {job.requiredSkills?.slice(0, 3).map((sk: string, i: number) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-[#111726] text-zinc-300">
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => handleApplyJob(job.id)}
                  disabled={applyingJobId === job.id}
                  className="w-full py-2 text-center rounded-lg bg-[#162035] hover:bg-emerald-500 hover:text-black font-semibold text-xs text-zinc-200 transition cursor-pointer disabled:opacity-50"
                >
                  {applyingJobId === job.id ? 'Submitting Application...' : '1-Click Verified Apply'}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-zinc-500 text-xs space-y-2">
            <Briefcase className="w-6 h-6 mx-auto text-zinc-600" />
            <p>Explore the talent marketplace to inspect verified job openings matching your profile.</p>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* STAGE 1: ROLE SELECTION & AI RESEARCH MODAL */}
      {/* ======================================================== */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
          <div className="w-full max-w-4xl max-h-[90vh] rounded-2xl bg-[#0b0f19] border border-[#1e293b] p-6 shadow-2xl flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#161f33]">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white">
                  Target Career Role Selection & AI Market Research
                </h3>
              </div>
              <button
                onClick={() => setRoleModalOpen(false)}
                className="w-7 h-7 rounded-lg bg-[#111726] hover:bg-[#1a233a] flex items-center justify-center text-zinc-400 hover:text-white transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {roleSuccessToast && (
              <div className="p-3 my-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{roleSuccessToast}</span>
              </div>
            )}

            {/* Modal Content - Scrollable */}
            <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1">
              {/* Predefined Roles Selector */}
              <div>
                <div className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                  Select High-Demand Career Track
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {availableRoles.map((r: any) => (
                    <button
                      key={r.id || r.title}
                      onClick={() => handleSelectPredefinedRole(r.title)}
                      className={`p-2.5 rounded-xl text-left border transition text-xs cursor-pointer ${
                        selectedRoleTitle.toLowerCase() === r.title.toLowerCase()
                          ? 'bg-emerald-500/15 border-emerald-500 text-white font-bold'
                          : 'bg-[#0e1424] border-[#161f33] text-zinc-300 hover:border-zinc-500'
                      }`}
                    >
                      <div className="truncate">{r.title}</div>
                      <div className="text-[10px] text-emerald-400 mt-0.5">{r.salaryRange || 'High Demand'}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Role Input */}
              <div>
                <form onSubmit={handleCustomRoleSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={customRoleInput}
                    onChange={(e) => setCustomRoleInput(e.target.value)}
                    placeholder="Or type custom role title (e.g. Lead SRE, Embedded Systems Engineer, AI Researcher)..."
                    className="flex-1 bg-[#111726] border border-[#1e293b] rounded-xl px-3.5 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-[#162035] hover:bg-emerald-500 hover:text-black text-zinc-200 text-xs font-bold transition cursor-pointer"
                  >
                    Research Custom Role
                  </button>
                </form>
              </div>

              {/* AI Research Report */}
              {researchLoading ? (
                <div className="py-12 text-center text-zinc-400 text-xs flex flex-col items-center gap-2">
                  <div className="w-6 h-6 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  <span>Synthesizing live workforce intelligence & skill gap analysis...</span>
                </div>
              ) : roleResearchData ? (
                <div className="space-y-5 animate-in fade-in duration-200">
                  {/* Market Overview Card */}
                  <div className="p-5 rounded-2xl bg-[#0e1424] border border-[#1a2338] space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-emerald-400">
                          {roleResearchData.role?.category}
                        </span>
                        <h4 className="text-lg font-bold text-white">{roleResearchData.role?.title}</h4>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-[10px] text-zinc-500">Market Demand</div>
                          <div className="text-xs font-extrabold text-emerald-400">
                            {roleResearchData.role?.demandIndex}/100 ({roleResearchData.role?.marketGrowthRate})
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-zinc-500">Comp Benchmark</div>
                          <div className="text-xs font-extrabold text-white">
                            {roleResearchData.role?.salaryRange}
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-zinc-300 leading-relaxed">{roleResearchData.role?.description}</p>
                  </div>

                  {/* Skill Gap Analysis vs Learner Profile */}
                  <div className="p-5 rounded-2xl bg-[#090f1d] border border-emerald-500/30 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4" />
                        <span>Your Personalized Skill Gap Analysis</span>
                      </div>
                      <span className="text-sm font-extrabold text-emerald-400 font-mono">
                        {roleResearchData.skillGapAnalysis?.matchPercentage}% Fit
                      </span>
                    </div>

                    <div className="w-full h-2 bg-[#141b2b] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                        style={{ width: `${roleResearchData.skillGapAnalysis?.matchPercentage}%` }}
                      />
                    </div>

                    <p className="text-xs text-zinc-300">
                      {roleResearchData.skillGapAnalysis?.recommendation}
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                      {/* Matching Skills */}
                      <div className="p-3 rounded-xl bg-[#070b14] border border-emerald-500/20">
                        <div className="text-[11px] font-bold text-emerald-400 mb-1.5 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Matching Skills ({roleResearchData.skillGapAnalysis?.matchingSkills?.length || 0})</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {roleResearchData.skillGapAnalysis?.matchingSkills?.length > 0 ? (
                            roleResearchData.skillGapAnalysis.matchingSkills.map((s: string, i: number) => (
                              <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-[10px] text-zinc-500">None yet. Start with roadmap phase 1.</span>
                          )}
                        </div>
                      </div>

                      {/* Missing Skills */}
                      <div className="p-3 rounded-xl bg-[#070b14] border border-cyan-500/20">
                        <div className="text-[11px] font-bold text-cyan-400 mb-1.5 flex items-center gap-1">
                          <Target className="w-3.5 h-3.5" />
                          <span>Key Gaps to Bridge ({roleResearchData.skillGapAnalysis?.missingSkills?.length || 0})</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {roleResearchData.skillGapAnalysis?.missingSkills?.slice(0, 6).map((s: string, i: number) => (
                            <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-300">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 4-Phase Learning Path Preview */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold text-white">Recommended 4-Phase Curriculum Outline</div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {roleResearchData.role?.learningPath?.map((lp: any, i: number) => (
                        <div key={i} className="p-3 rounded-xl bg-[#0e1424] border border-[#161f33] text-xs">
                          <div className="flex items-center justify-between text-[10px] font-bold text-emerald-400 mb-1">
                            <span>{lp.phase} • {lp.title}</span>
                            <span className="text-zinc-500">{lp.duration}</span>
                          </div>
                          <div className="text-[11px] text-zinc-400">
                            {lp.keyTopics?.join(' • ')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-[#161f33] flex items-center justify-between gap-3">
              <span className="text-xs text-zinc-500 hidden sm:inline">
                Changing role recalibrates roadmap, ATS resume, and job matches.
              </span>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setRoleModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSetRoleAndGenerateRoadmap}
                  disabled={applyingRole || !selectedRoleTitle}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {applyingRole ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                  <span>Set as Active Role & Launch 30-Day Roadmap</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* AI CV PARSING MODAL */}
      {/* ======================================================== */}
      {cvModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-xl rounded-2xl bg-[#0b0f19] border border-[#1e293b] p-6 shadow-2xl relative">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              AI CV Parsing & Skill Extraction
            </h3>
            <p className="text-xs text-zinc-400 mb-4">
              Paste your resume or CV text. Skillora AI will extract skills, map project evidence, and update your verified profile.
            </p>

            {cvSuccess && (
              <div className="p-3 mb-4 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>{cvSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCvParse} className="space-y-4">
              <textarea
                rows={8}
                required
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                placeholder="Paste your CV / Resume text here (e.g. Experience with TypeScript, NestJS, React, MongoDB, Next.js, RAG pipelines, Docker, etc.)..."
                className="w-full bg-[#111726] border border-[#1e293b] rounded-xl p-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono leading-relaxed"
              />

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCvModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={cvParsing || !cvText.trim()}
                  className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-2 disabled:opacity-50 cursor-pointer"
                >
                  {cvParsing ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Upload className="w-3.5 h-3.5" />
                      <span>Extract & Enrich Profile</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
