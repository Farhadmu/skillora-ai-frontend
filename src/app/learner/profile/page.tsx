'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  User,
  Mail,
  GraduationCap,
  Building,
  Briefcase,
  ShieldCheck,
  Award,
  ArrowRight,
  ExternalLink,
  Edit3,
  Save,
  CheckCircle2,
} from 'lucide-react';
import { api } from '@/lib/api';

export default function LearnerProfilePage() {
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [degree, setDegree] = useState('');
  const [institution, setInstitution] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api.getMyProfile().then((p) => {
      setProfile(p);
      setHeadline(p?.headline || '');
      setBio(p?.bio || '');
      setTargetRole(p?.targetRole || 'Full-Stack Software Engineer');
      setDegree(p?.degree || '');
      setInstitution(p?.institution || '');
      setGithubUrl(p?.githubUrl || '');
      setPortfolioUrl(p?.portfolioUrl || '');
    }).catch(() => null);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await api.updateMyProfile({
        headline,
        bio,
        targetRole,
        degree,
        institution,
        githubUrl,
        portfolioUrl,
      });
      setProfile(updated);
      setIsEditing(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="select-none">
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#1a2236]">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
              <User className="w-4 h-4 text-emerald-400" />
              <span>Learner Identity & Credentials</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Learner Profile & Career Dossier
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Verified identity credentials, university background, and career alignment
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/learner/profile/intelligence"
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-cyan-500 text-black transition flex items-center gap-2 shadow-lg shadow-emerald-500/20"
            >
              <Sparkles className="w-4 h-4" />
              <span>Launch AI CV Analyzer</span>
            </Link>

            <Link
              href={`/portfolio/${profile?.userId || 'me'}`}
              className="px-4 py-2.5 rounded-xl font-bold text-xs bg-[#111726] border border-[#1e293b] text-white hover:border-emerald-500/40 transition flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4 text-emerald-400" />
              <span>Public View</span>
            </Link>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>Profile information updated successfully!</span>
          </div>
        )}

        {/* Profile Card */}
        <div className="p-8 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#161f33]">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5 shadow-xl shadow-emerald-500/20">
                <div className="w-full h-full bg-[#06080d] rounded-[14px] flex items-center justify-center font-extrabold text-3xl text-emerald-400">
                  {profile?.name?.charAt(0) || 'L'}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{profile?.name || 'Skillora Learner'}</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Verified Learner
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">{headline || 'Skillora AI Learner'}</p>
                <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{profile?.email || 'learner@skillora.ai'}</p>
              </div>
            </div>

            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              disabled={saving}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#111726] border border-[#1e293b] hover:border-emerald-500/40 text-white transition flex items-center gap-2 disabled:opacity-50"
            >
              {isEditing ? <Save className="w-3.5 h-3.5 text-emerald-400" /> : <Edit3 className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isEditing ? (saving ? 'Saving...' : 'Save Changes') : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Form Fields or Static View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Headline</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. Aspiring Full-Stack Architect"
                    className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                ) : (
                  <div className="text-xs font-bold text-white p-2.5 rounded-xl bg-[#111726] border border-[#1e293b]">
                    {headline || 'Not specified'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Target Career Role</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    placeholder="e.g. Full-Stack AI Systems Engineer"
                    className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                ) : (
                  <div className="text-xs font-bold text-white p-2.5 rounded-xl bg-[#111726] border border-[#1e293b]">
                    {targetRole || 'Not specified'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Professional Bio</label>
                {isEditing ? (
                  <textarea
                    rows={4}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    placeholder="Tell employers about your engineering focus and background..."
                    className="w-full bg-[#111726] border border-[#1e293b] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                  />
                ) : (
                  <div className="text-xs text-zinc-300 p-3 rounded-xl bg-[#111726] border border-[#1e293b] leading-relaxed">
                    {bio || 'No bio provided yet.'}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Degree & Institution</label>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={degree}
                      onChange={(e) => setDegree(e.target.value)}
                      placeholder="Degree (e.g. B.Sc. in Computer Science)"
                      className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="text"
                      value={institution}
                      onChange={(e) => setInstitution(e.target.value)}
                      placeholder="University / Institution Name"
                      className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-[#111726] border border-[#1e293b] space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                      <span>{degree || 'Degree not specified'}</span>
                    </div>
                    <div className="text-[11px] text-zinc-400">
                      {institution || 'Institution not specified'} • Class of {profile?.graduationYear || '2025'}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Online Presence</label>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="GitHub URL (https://github.com/...)"
                      className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                    <input
                      type="url"
                      value={portfolioUrl}
                      onChange={(e) => setPortfolioUrl(e.target.value)}
                      placeholder="Portfolio / Personal Site URL"
                      className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-[#111726] border border-[#1e293b] space-y-1 text-xs text-zinc-300">
                    <div>GitHub: {githubUrl ? <a href={githubUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{githubUrl}</a> : <span className="text-zinc-500">Not linked</span>}</div>
                    <div>Portfolio: {portfolioUrl ? <a href={portfolioUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline">{portfolioUrl}</a> : <span className="text-zinc-500">Not linked</span>}</div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Career Intelligence Summary</label>
                <div className="p-3.5 rounded-xl bg-[#111726] border border-[#1e293b] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Readiness Score</span>
                    <span className="font-bold text-emerald-400">{profile?.readinessScore !== undefined ? `${profile.readinessScore}/100` : 'Not evaluated'}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Profile Completeness</span>
                    <span className="font-bold text-cyan-400">{profile?.completenessScore || 45}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
