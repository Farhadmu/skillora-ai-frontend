'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Target, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Zap, Sparkles, Save, Check } from 'lucide-react';
import { api } from '@/lib/api';

const AVAILABLE_ROLES = [
  'Full-Stack AI Systems Engineer',
  'Senior Backend Microservices Engineer',
  'AI Applied Platform Engineer',
  'Frontend & Full-Stack Architect',
  'Machine Learning & RAG Engineer',
  'DevOps & Cloud Platform Engineer',
];

export default function TargetCareerPage() {
  const [profile, setProfile] = useState<any>(null);
  const [readiness, setReadiness] = useState<any>(null);
  const [targetRole, setTargetRole] = useState('Full-Stack AI Systems Engineer');
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.getMyProfile().catch(() => null),
      api.getReadinessScore().catch(() => null),
    ]).then(([p, r]) => {
      if (p) {
        setProfile(p);
        if (p.targetRole) {
          setTargetRole(p.targetRole);
        }
      }
      if (r) {
        setReadiness(r);
      }
      setLoading(false);
    });
  }, []);

  const handleSaveRole = async (selectedRole: string) => {
    setSaving(true);
    setSavedSuccess(false);
    try {
      const updated = await api.updateMyProfile({ targetRole: selectedRole });
      setProfile(updated);
      setTargetRole(selectedRole);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    } catch (err) {
      console.error('Failed to update target role:', err);
    } finally {
      setSaving(false);
    }
  };

  const userSkills: any[] = profile?.skills || [];
  const verifiedCount = userSkills.filter((s) => s.verified).length;
  const overallScore = readiness?.overallScore ?? profile?.readinessScore ?? null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Target Career Benchmark
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono">
              Role Alignment
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Pin your primary career destination to calibrate skill graphs, adaptive roadmaps, and interview simulators.
          </p>
        </div>

        <Link
          href="/learner/career/skill-gap"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95"
        >
          <span>Calculate Gap to Target</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {savedSuccess && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Target career updated to <strong>{targetRole}</strong> across all platform modules!</span>
        </div>
      )}

      {/* Target Role Card */}
      <div className="p-6 rounded-2xl bg-[#090d16] border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
            Current Target
          </div>
          <h2 className="text-2xl font-black text-white">{targetRole}</h2>
          <p className="text-xs text-zinc-300 max-w-xl">
            Calibrating all workforce readiness dimensions, roadmap milestones, and talent matching against verified market requirements for this position.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#0e1424] p-4 rounded-xl border border-[#1a263c]">
          <div className="text-center">
            <div className="text-3xl font-black text-emerald-400 font-mono">
              {overallScore != null ? `${overallScore}%` : 'Pending'}
            </div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Readiness Score</div>
          </div>
          <div className="h-10 w-px bg-[#1e2d44]" />
          <div className="text-center">
            <div className="text-3xl font-black text-cyan-400 font-mono">
              {verifiedCount} / {Math.max(userSkills.length, 5)}
            </div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider mt-0.5">Verified Pillars</div>
          </div>
        </div>
      </div>

      {/* Role Selection Grid */}
      <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-emerald-400" />
          <span>Select Target Role Destination</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {AVAILABLE_ROLES.map((role) => (
            <button
              key={role}
              onClick={() => handleSaveRole(role)}
              disabled={saving}
              className={`p-4 rounded-xl border text-left transition flex flex-col justify-between ${
                targetRole === role
                  ? 'bg-emerald-500/10 border-emerald-500 text-white'
                  : 'bg-[#0c1220] border-[#1a253c] text-zinc-300 hover:border-zinc-600'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold">{role}</span>
                {targetRole === role && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                )}
              </div>
              <div className="text-[11px] text-zinc-400">
                {targetRole === role ? 'Active Target Benchmark' : 'Click to set as target'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Target Role Competency Checklist */}
      <div className="p-6 rounded-2xl bg-[#090d16] border border-[#1a2236] space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Your Verified Skill Pillars ({userSkills.length})</span>
        </h3>

        {userSkills.length > 0 ? (
          <div className="space-y-3">
            {userSkills.map((sk: any, idx: number) => (
              <div
                key={idx}
                className="p-3.5 rounded-xl bg-[#0c1220] border border-[#1a253c] flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  {sk.verified ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  )}
                  <span className="text-xs font-semibold text-zinc-200">{sk.name}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="w-24 h-2 rounded-full bg-[#162136] overflow-hidden">
                      <div
                        className={`h-full ${
                          sk.proficiency >= 80 ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                        style={{ width: `${sk.proficiency}%` }}
                      />
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-300">
                      {sk.proficiency}%
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                      sk.verified
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {sk.verified ? 'VERIFIED' : 'PENDING'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-zinc-500 text-xs space-y-2">
            <p>No skills recorded yet. Complete CV parsing or an assessment to populate your competency matrix.</p>
          </div>
        )}
      </div>
    </div>
  );
}
