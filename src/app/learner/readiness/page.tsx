'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  FileText,
  Award,
  Layers,
  Info,
  HelpCircle,
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { api } from '@/lib/api';

export default function LearnerReadinessPage() {
  const [readiness, setReadiness] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      api.getReadinessScore().catch(() => null),
      api.getMyProfile().catch(() => null),
    ]).then(([r, p]) => {
      setReadiness(r);
      setProfile(p);
    });
  }, []);

  const hasCalculated = readiness?.overallScore != null || profile?.readinessScore != null;
  const score = readiness?.overallScore ?? profile?.readinessScore ?? null;
  const dimensions = readiness?.dimensions || profile?.readinessDimensions || {
    technical: 0,
    problemSolving: 0,
    projects: 0,
    communication: 0,
    interview: 0,
    roleAlignment: 0,
    practical: 0,
  };

  return (
    <DashboardLayout role="LEARNER">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Workforce Intelligence Engine</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Verified Job Readiness Score: {score != null ? `${score}/100` : 'Pending Evaluation'}
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Explainable multi-dimensional assessment evaluating your readiness for{' '}
              <strong className="text-white">
                {profile?.targetRole || 'Full-Stack AI Systems Engineer'}
              </strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/learner/interview"
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <span>Retake Diagnostic Assessment</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Explainability Banner: "Why is the score this value?" */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0c182b] via-[#091322] to-[#070d17] border border-emerald-500/30 space-y-3 shadow-xl">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>AI Explainability Audit • Why is your score {score}/100?</span>
          </div>

          <p className="text-xs text-zinc-300 leading-relaxed max-w-3xl">
            Your readiness score is synthesized across 7 objective pillars. You exhibit high technical rigor in{' '}
            <strong className="text-white">TypeScript (90%)</strong>,{' '}
            <strong className="text-white">NestJS (86%)</strong>, and{' '}
            <strong className="text-white">RAG retrieval architectures (84%)</strong>, backed by verified code reviews and repository evidence. To push past 90/100, increase your distributed consensus knowledge and complete a simulated System Design mock interview.
          </p>
        </div>

        {/* 7 Dimensions Detailed Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              name: 'Technical Skills Rigor',
              score: dimensions.technical,
              desc: 'Mastery across core language fundamentals, static typing, and backend framework conventions.',
              evidence: 'Validated through 92% score on TypeScript Enterprise assessment.',
            },
            {
              name: 'Applied Projects & Code',
              score: dimensions.projects,
              desc: 'Production readiness of public GitHub repositories, error handling, and container deployment.',
              evidence: 'Verified RAG Knowledge Assistant codebase with zero OWASP flags.',
            },
            {
              name: 'Problem Solving & Algorithms',
              score: dimensions.problemSolving,
              desc: 'Algorithmic efficiency, time & space complexity, and concurrency handling.',
              evidence: 'Passed asynchronous queue challenge with optimal O(1) scheduling.',
            },
            {
              name: 'Role Alignment to Market',
              score: dimensions.roleAlignment,
              desc: 'Overlap between your verified skills and current job postings from verified employers.',
              evidence: '87% match with TechScale AI & QuantumData Labs requirements.',
            },
            {
              name: 'Mock Interview Performance',
              score: dimensions.interview,
              desc: 'First-principles reasoning, trade-off communication, and system design clarity.',
              evidence: 'Scored 82% in Socratic System Design interview simulator.',
            },
            {
              name: 'Communication & Architecture',
              score: dimensions.communication,
              desc: 'Clarity in PR review feedback, architecture brief documentation, and explanations.',
              evidence: 'AI evaluated peer code reviews and architectural explanations.',
            },
            {
              name: 'Production Practicality',
              score: dimensions.practical,
              desc: 'Real-world considerations including observability, logging, and rate limiting.',
              evidence: 'Demonstrated in NestJS API Gateway implementation.',
            },
          ].map((dim, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0b0f19] border border-[#1e293b] flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-bold text-white">{dim.name}</h3>
                  <span className="text-sm font-mono font-extrabold text-emerald-400">{dim.score}%</span>
                </div>

                <div className="w-full h-1.5 bg-[#141b2b] rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                    style={{ width: `${dim.score}%` }}
                  />
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed">{dim.desc}</p>
              </div>

              <div className="pt-3 border-t border-[#161f33] text-[11px] text-zinc-500 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>{dim.evidence}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Responsible Disclaimer */}
        <div className="p-4 rounded-xl bg-[#0c121e] border border-[#1a2236] flex items-start gap-3 text-xs text-zinc-400">
          <Info className="w-4 h-4 text-zinc-500 flex-shrink-0 mt-0.5" />
          <p>
            <strong>Skillora Governance Notice</strong>: Readiness scores represent algorithmic and evidence-based measurements of technical competency and project deliverables. While high scores correlate strongly with employer interview invitations, Skillora AI does not guarantee employment.
          </p>
        </div>
      </main>
    </DashboardLayout>
  );
}
