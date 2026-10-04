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
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';
import { api } from '@/lib/api';

export default function LearnerProfilePage() {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [headline, setHeadline] = useState('');
  const [bio, setBio] = useState('');
  const [targetRole, setTargetRole] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    api.getMyProfile().then((p) => {
      setProfile(p);
      setHeadline(p?.headline || 'Aspiring AI Systems & Full-Stack Architect');
      setBio(p?.bio || 'Building scalable Next.js and NestJS distributed systems.');
      setTargetRole(p?.targetRole || 'Full-Stack AI Systems Engineer');
    }).catch(() => null);
  }, []);

  const handleSave = async () => {
    try {
      const updated = await api.updateMyProfile({ headline, bio, targetRole });
      setProfile(updated);
      setIsEditing(false);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      <Navbar
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onOpenAiAssistant={() => setAssistantOpen(true)}
      />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <AiAssistantDrawer isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
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
              href={`/portfolio/${profile?.userId || 'usr-learner-1'}`}
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
                  {profile?.name?.charAt(0) || 'F'}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-white">{profile?.name || 'Farhadul Islam'}</h2>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Verified Learner
                  </span>
                </div>
                <p className="text-xs text-zinc-400 mt-1">{headline}</p>
                <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{profile?.email || 'learner@skillora.ai'}</p>
              </div>
            </div>

            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-[#111726] border border-[#1e293b] hover:border-emerald-500/40 text-white transition flex items-center gap-2"
            >
              {isEditing ? <Save className="w-3.5 h-3.5 text-emerald-400" /> : <Edit3 className="w-3.5 h-3.5 text-emerald-400" />}
              <span>{isEditing ? 'Save Changes' : 'Edit Profile'}</span>
            </button>
          </div>

          {/* Form Fields or Static View */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Target Career Role</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={targetRole}
                    onChange={(e) => setTargetRole(e.target.value)}
                    className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                  />
                ) : (
                  <div className="text-xs font-bold text-white p-2.5 rounded-xl bg-[#111726] border border-[#1e293b]">
                    {targetRole}
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
                    className="w-full bg-[#111726] border border-[#1e293b] rounded-xl p-3 text-xs text-white focus:outline-none focus:border-emerald-500 resize-none"
                  />
                ) : (
                  <div className="text-xs text-zinc-300 p-3 rounded-xl bg-[#111726] border border-[#1e293b] leading-relaxed">
                    {bio}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Education Background</label>
                <div className="p-3.5 rounded-xl bg-[#111726] border border-[#1e293b] space-y-1">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-emerald-400" />
                    <span>{profile?.degree || 'B.Sc. in Computer Science & Engineering'}</span>
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    {profile?.institution || 'State University of Technology'} • Class of {profile?.graduationYear || '2024'}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Career Intelligence Summary</label>
                <div className="p-3.5 rounded-xl bg-[#111726] border border-[#1e293b] space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Readiness Score</span>
                    <span className="font-bold text-emerald-400">{profile?.readinessScore || 84}/100</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-zinc-400">Profile Completeness</span>
                    <span className="font-bold text-cyan-400">{profile?.completenessScore || 92}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
