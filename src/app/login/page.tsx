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
  AlertCircle,
} from 'lucide-react';
import { api, setAuthSession } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('learner@skillora.ai');
  const [password, setPassword] = useState('Password123!');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.login({ email, password });
      setAuthSession(res.tokens.accessToken, res.user);

      if (res.user.role === 'EDUCATOR') router.push('/educator');
      else if (res.user.role === 'EMPLOYER') router.push('/employer');
      else if (res.user.role === 'ADMIN') router.push('/admin');
      else router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const quickDemoSelect = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('Password123!');
  };

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden bg-grid-pattern">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20">
            <div className="w-full h-full bg-[#06080d] rounded-[10px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-emerald-400" />
            </div>
          </div>
          <span className="font-extrabold text-2xl tracking-wider text-white">SKILLORA AI</span>
        </Link>
        <h2 className="text-xl font-bold text-white tracking-tight">Sign In to Platform Workspace</h2>
        <p className="text-xs text-zinc-400 mt-1">Select a simulated persona or enter your credentials</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass-panel p-8 rounded-2xl border border-[#1e293b] shadow-2xl space-y-6">
          {/* Quick Demo Persona Switcher */}
          <div>
            <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 mb-2">
              1-Click Demo Persona Quick-Fill
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => quickDemoSelect('learner@skillora.ai')}
                className={`p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                  email === 'learner@skillora.ai'
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                    : 'bg-[#0f1422] border-[#1c263c] text-zinc-300 hover:bg-[#151c30]'
                }`}
              >
                <Bot className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold">Learner</div>
                  <div className="text-[10px] text-zinc-500">Farhadul</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => quickDemoSelect('educator@skillora.ai')}
                className={`p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                  email === 'educator@skillora.ai'
                    ? 'bg-cyan-500/15 border-cyan-500 text-cyan-400'
                    : 'bg-[#0f1422] border-[#1c263c] text-zinc-300 hover:bg-[#151c30]'
                }`}
              >
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                <div>
                  <div className="font-bold">Educator</div>
                  <div className="text-[10px] text-zinc-500">Prof. Mitchell</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => quickDemoSelect('employer@skillora.ai')}
                className={`p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                  email === 'employer@skillora.ai'
                    ? 'bg-purple-500/15 border-purple-500 text-purple-400'
                    : 'bg-[#0f1422] border-[#1c263c] text-zinc-300 hover:bg-[#151c30]'
                }`}
              >
                <Building2 className="w-4 h-4 text-purple-400" />
                <div>
                  <div className="font-bold">Employer</div>
                  <div className="text-[10px] text-zinc-500">TechScale AI</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => quickDemoSelect('admin@skillora.ai')}
                className={`p-2 rounded-xl border text-left flex items-center gap-2 transition ${
                  email === 'admin@skillora.ai'
                    ? 'bg-emerald-500/15 border-emerald-500 text-emerald-400'
                    : 'bg-[#0f1422] border-[#1c263c] text-zinc-300 hover:bg-[#151c30]'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="font-bold">SuperAdmin</div>
                  <div className="text-[10px] text-zinc-500">Governance</div>
                </div>
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#111726] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-300 mb-1.5">Password</label>
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
                  <span>Sign In & Continue</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-[#1a2236] text-xs text-zinc-400">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-emerald-400 font-semibold hover:underline">
              Register New Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
