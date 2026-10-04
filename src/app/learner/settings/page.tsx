'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Sparkles,
  Settings,
  Shield,
  User,
  KeyRound,
  LogOut,
  Smartphone,
  Laptop,
  CheckCircle2,
  AlertCircle,
  Link2,
  Globe,
  Bell,
  Sliders,
  Save,
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CommandPalette } from '@/components/common/CommandPalette';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';
import { api, getCurrentUser, clearAuthSession } from '@/lib/api';

export default function LearnerSettingsPage() {
  const router = useRouter();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<'profile' | 'security' | 'integrations' | 'ai' | 'notifications'>('profile');

  // Profile State
  const [name, setName] = useState('Farhadul Islam');
  const [targetRole, setTargetRole] = useState('Full-Stack AI Systems Engineer');
  const [weeklyHours, setWeeklyHours] = useState('20');
  const [preferredMode, setPreferredMode] = useState<'remote' | 'hybrid' | 'onsite'>('remote');

  // Security State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [logoutAllMsg, setLogoutAllMsg] = useState<string | null>(null);

  // Connected accounts
  const [githubConnected, setGithubConnected] = useState(true);
  const [linkedinConnected, setLinkedinConnected] = useState(true);

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [jobMatchAlerts, setJobMatchAlerts] = useState(true);
  const [streakReminders, setStreakReminders] = useState(true);

  useEffect(() => {
    const user = getCurrentUser();
    if (user?.name) setName(user.name);
  }, []);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(null);

    try {
      const res = await api.changePassword({ currentPassword, newPassword });
      setPasswordSuccess(res.message || 'Password successfully changed.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password. Verify your current password.');
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleLogoutAll = async () => {
    try {
      await api.logoutAll();
      setLogoutAllMsg('All other device sessions have been invalidated.');
      setTimeout(() => setLogoutAllMsg(null), 3000);
    } catch (err) {
      setLogoutAllMsg('Failed to revoke sessions.');
    }
  };

  const handleLogoutCurrent = () => {
    clearAuthSession();
    router.push('/login');
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
              <Settings className="w-4 h-4 text-emerald-400" />
              <span>Learner Account Governance</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Platform & Security Settings
            </h1>
            <p className="text-xs text-zinc-400 mt-0.5">
              Manage your verified profile, connected identity credentials, security parameters, and AI learning preferences
            </p>
          </div>
        </div>

        {/* Settings Layout: Left navigation, Right content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Settings Tabs Sidebar */}
          <div className="space-y-1">
            {[
              { id: 'profile', label: 'Career & Profile', icon: User },
              { id: 'security', label: 'Security & Sessions', icon: Shield },
              { id: 'integrations', label: 'Connected Accounts', icon: Link2 },
              { id: 'ai', label: 'AI Teacher Preferences', icon: Sliders },
              { id: 'notifications', label: 'Notifications', icon: Bell },
            ].map((item) => {
              const Icon = item.icon;
              const isSel = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as any)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium flex items-center gap-2.5 transition ${
                    isSel
                      ? 'bg-emerald-500/15 text-emerald-400 font-bold border border-emerald-500/30'
                      : 'text-zinc-400 hover:text-white hover:bg-[#111726]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}

            <div className="pt-4 border-t border-[#1a2236]">
              <button
                onClick={handleLogoutCurrent}
                className="w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 transition flex items-center gap-2.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out Current Device</span>
              </button>
            </div>
          </div>

          {/* Settings Detail Panel */}
          <div className="md:col-span-3">
            {/* Section 1: Profile & Career Preferences */}
            {activeSection === 'profile' && (
              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-6">
                <div>
                  <h3 className="text-base font-bold text-white">Career Target & Learning Schedule</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    These settings feed directly into your dynamic roadmap and skill gap analyzer.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Target Career Goal</label>
                    <input
                      type="text"
                      value={targetRole}
                      onChange={(e) => setTargetRole(e.target.value)}
                      className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Weekly Learning Hours</label>
                      <input
                        type="number"
                        value={weeklyHours}
                        onChange={(e) => setWeeklyHours(e.target.value)}
                        className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Work Preference</label>
                      <select
                        value={preferredMode}
                        onChange={(e) => setPreferredMode(e.target.value as any)}
                        className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        <option value="remote">Fully Remote</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="onsite">On-site</option>
                      </select>
                    </div>
                  </div>

                  <button className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-2">
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Preferences</span>
                  </button>
                </div>
              </div>
            )}

            {/* Section 2: Security & Sessions */}
            {activeSection === 'security' && (
              <div className="space-y-6">
                {/* Change Password */}
                <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-5">
                  <div>
                    <h3 className="text-base font-bold text-white">Change Account Password</h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Ensure your password contains at least 8 characters with a mix of letters, numbers, and symbols.
                    </p>
                  </div>

                  {passwordSuccess && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>{passwordSuccess}</span>
                    </div>
                  )}

                  {passwordError && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{passwordError}</span>
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Current Password</label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1.5">New Password</label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Confirm New Password</label>
                        <input
                          type="password"
                          required
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={passwordLoading}
                      className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition flex items-center gap-2 disabled:opacity-50"
                    >
                      <KeyRound className="w-3.5 h-3.5" />
                      <span>{passwordLoading ? 'Updating Password...' : 'Update Password'}</span>
                    </button>
                  </form>
                </div>

                {/* Active Sessions */}
                <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-white">Active Device Sessions</h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        Manage devices currently signed into your Skillora AI account.
                      </p>
                    </div>

                    <button
                      onClick={handleLogoutAll}
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500/20 transition"
                    >
                      Logout All Devices
                    </button>
                  </div>

                  {logoutAllMsg && (
                    <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs">
                      {logoutAllMsg}
                    </div>
                  )}

                  <div className="space-y-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-[#111726] border border-[#1e293b] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Laptop className="w-5 h-5 text-emerald-400" />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-2">
                            <span>Windows Desktop • Next.js Client</span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                              Current Session
                            </span>
                          </div>
                          <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                            IP: 127.0.0.1 • Chrome Browser • Active Now
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-[#111726] border border-[#1e293b] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Smartphone className="w-5 h-5 text-zinc-400" />
                        <div>
                          <div className="text-xs font-bold text-white">Mobile Safari • iOS 18</div>
                          <div className="text-[11px] text-zinc-400 font-mono mt-0.5">
                            Last active: 2 hours ago • Dhaka, BD
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Section 3: Integrations */}
            {activeSection === 'integrations' && (
              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-5">
                <div>
                  <h3 className="text-base font-bold text-white">Connected Platforms & Evidence Sources</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Connect external accounts to automatically pull project repositories and career history into your verified readiness profile.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-[#111726] border border-[#1e293b] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Link2 className="w-6 h-6 text-emerald-400" />
                      <div>
                        <div className="text-xs font-bold text-white">GitHub Account</div>
                        <div className="text-[11px] text-zinc-400">Connected as @farhadul-dev (14 verified repositories)</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      Connected
                    </span>
                  </div>

                  <div className="p-4 rounded-xl bg-[#111726] border border-[#1e293b] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="w-6 h-6 text-cyan-400" />
                      <div>
                        <div className="text-xs font-bold text-white">LinkedIn Profile</div>
                        <div className="text-[11px] text-zinc-400">Syncs career experience and university education</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      Connected
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Section 4: AI Teacher Preferences */}
            {activeSection === 'ai' && (
              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-5">
                <div>
                  <h3 className="text-base font-bold text-white">AI Teacher & Socratic Engine Configuration</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    Tailor how Skillora AI adapts its explanations, pedagogical questioning, and code review feedback.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Pedagogical Mode</label>
                    <select className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500">
                      <option>Socratic Questioning (Encourages first-principles reasoning)</option>
                      <option>Direct Architecture Explanations (Fast & technical)</option>
                      <option>Exam Prep & Code Challenge (Interview focused)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Language Mode</label>
                    <select className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500">
                      <option>English (Technical Standard)</option>
                      <option>Bangla + English Code-Switching (বাংলা মিশ্রিত)</option>
                    </select>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111726] border border-[#1e293b] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">RAG Grounded Citations</div>
                      <div className="text-zinc-400 text-[11px]">Enforce trusted textbook and documentation citations in tutor responses</div>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500" />
                  </div>
                </div>
              </div>
            )}

            {/* Section 5: Notifications */}
            {activeSection === 'notifications' && (
              <div className="p-6 rounded-2xl bg-[#0b0f19] border border-[#1e293b] space-y-5">
                <div>
                  <h3 className="text-base font-bold text-white">Notification Preferences</h3>
                  <p className="text-xs text-zinc-400 mt-0.5">Control how and when Skillora AI sends intelligence alerts.</p>
                </div>

                <div className="space-y-3">
                  <div className="p-3.5 rounded-xl bg-[#111726] border border-[#1e293b] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">Job Match & Employer Alerts</div>
                      <div className="text-zinc-400 text-[11px]">Receive notifications when an employer views your verified profile</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={jobMatchAlerts}
                      onChange={(e) => setJobMatchAlerts(e.target.checked)}
                      className="w-4 h-4 accent-emerald-500"
                    />
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#111726] border border-[#1e293b] flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">Roadmap Milestone Reminders</div>
                      <div className="text-zinc-400 text-[11px]">Gentle nudge when you are falling behind your weekly target</div>
                    </div>
                    <input
                      type="checkbox"
                      checked={streakReminders}
                      onChange={(e) => setStreakReminders(e.target.checked)}
                      className="w-4 h-4 accent-emerald-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
