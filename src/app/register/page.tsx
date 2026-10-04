'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bot,
  GraduationCap,
  Building2,
  Lock,
  Mail,
  User,
  AlertCircle,
} from 'lucide-react';
import { api, setAuthSession } from '@/lib/api';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'LEARNER' | 'EDUCATOR' | 'EMPLOYER'>('LEARNER');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [headline, setHeadline] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.register({
        name,
        email,
        password,
        role,
        headline: headline || `${role.charAt(0) + role.slice(1).toLowerCase()} at Skillora`,
      });
      setAuthSession(res.tokens.accessToken, res.user);

      if (role === 'EDUCATOR') router.push('/educator');
      else if (role === 'EMPLOYER') router.push('/employer');
      else router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrength = () => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 6) s += 25;
    if (password.length >= 10) s += 25;
    if (/[A-Z]/.test(password)) s += 25;
    if (/[0-9!@#$%^&*]/.test(password)) s += 25;
    return s;
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-grid-pattern">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-[#06080d] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <span className="font-extrabold text-2xl tracking-wider text-white">SKILLORA AI</span>
        </Link>
        <h2 className="text-xl font-bold text-white tracking-tight">Create Your Verified Account</h2>
        <p className="text-xs text-zinc-400 mt-1">Join the unified AI workforce intelligence ecosystem</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass-panel p-8 rounded-2xl border border-[#1e293b] shadow-2xl space-y-6">
          {/* Role Selector Tabs */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 mb-2">Select Account Role</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { r: 'LEARNER' as const, label: 'Learner', icon: Bot },
                { r: 'EDUCATOR' as const, label: 'Educator', icon: GraduationCap },
                { r: 'EMPLOYER' as const, label: 'Employer', icon: Building2 },
              ].map((item) => {
                const Icon = item.icon;
                const isSel = role === item.r;
                return (
                  <button
                    key={item.r}
                    type="button"
                    onClick={() => setRole(item.r)}
                    className={`p-2.5 rounded-xl border text-center flex flex-col items-center gap-1.5 transition ${
                      isSel
                        ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400 font-bold'
                        : 'bg-[#0f1422] border-[#1c263c] text-zinc-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Farhadul Islam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#111726] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111726] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                Headline / Target Focus (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Full-Stack AI Engineer or Cloud Architect"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-zinc-300">Password</label>
                <span className="text-[10px] text-zinc-500">Min. 6 chars</span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#111726] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
              {/* Strength Indicator */}
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="w-full h-1.5 bg-[#161f33] rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        strength < 50 ? 'bg-red-400' : strength < 75 ? 'bg-yellow-400' : 'bg-emerald-400'
                      }`}
                      style={{ width: `${strength}%` }}
                    />
                  </div>
                  <div className="text-[10px] text-zinc-400 text-right">
                    Strength: {strength < 50 ? 'Weak' : strength < 75 ? 'Good' : 'Strong'}
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition-all duration-200 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Create Account & Start</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[#1a2236] text-xs text-zinc-400">
            Already have an account?{' '}
            <Link href="/login" className="text-emerald-400 font-semibold hover:underline">
              Sign In Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
