'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Sparkles,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RefreshCw,
  Mail,
  ShieldCheck,
} from 'lucide-react';
import { api, setAuthSession } from '@/lib/api';

function VerifyEmailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [manualToken, setManualToken] = useState('');
  const [verifiedUser, setVerifiedUser] = useState<any>(null);

  useEffect(() => {
    if (token) {
      handleVerification(token);
    }
  }, [token]);

  const handleVerification = async (tok: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.verifyEmail(tok.trim());
      setSuccess(true);
      setVerifiedUser(res.user);
      if (res.tokens) {
        setAuthSession(res.tokens.accessToken, res.user);
      }
    } catch (err: any) {
      setError(
        err.message ||
          'Verification failed. The token may have expired or is invalid. Please request a new verification link.',
      );
    } finally {
      setLoading(false);
    }
  };

  const getDashboardRoute = (role?: string) => {
    if (role === 'EDUCATOR') return '/educator/dashboard';
    if (role === 'EMPLOYER') return '/employer/dashboard';
    if (role === 'ADMIN') return '/admin/dashboard';
    return '/learner/dashboard';
  };

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
        <h2 className="text-xl font-bold text-white tracking-tight">Email Verification</h2>
        <p className="text-xs text-zinc-400 mt-1">Securing your verified AI workforce identity</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass-panel p-8 rounded-2xl border border-[#1e293b] shadow-2xl space-y-6">
          {loading && (
            <div className="text-center py-8 space-y-4">
              <div className="w-12 h-12 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-sm font-semibold text-zinc-200">Verifying security token...</p>
              <p className="text-xs text-zinc-400">Verifying cryptographic hash with backend datastore</p>
            </div>
          )}

          {!loading && success && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Email Successfully Verified!</h3>
                <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                  Your identity has been authenticated. You now have full access to personalized roadmaps, AI Teacher, adaptive assessments, and verified employability credentials.
                </p>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => router.push(getDashboardRoute(verifiedUser?.role))}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition-all duration-200 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
                >
                  <span>Enter Command Center</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400 shadow-xl shadow-red-500/10">
                <XCircle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Verification Failed</h3>
                <p className="text-xs text-red-400 mt-1.5 leading-relaxed">{error}</p>
              </div>

              <div className="space-y-3 pt-2">
                <Link
                  href="/resend-verification"
                  className="w-full py-3 rounded-xl font-bold text-xs bg-[#111726] border border-[#1e293b] hover:border-emerald-500/50 text-white transition flex items-center justify-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Request New Verification Link</span>
                </Link>

                <Link
                  href="/login"
                  className="block text-xs text-zinc-400 hover:text-white transition"
                >
                  Return to Sign In
                </Link>
              </div>
            </div>
          )}

          {!loading && !token && !success && !error && (
            <div className="space-y-5">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-[#111726] border border-[#1e293b] flex items-center justify-center mx-auto text-emerald-400 mb-3">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold text-white">Paste Verification Token</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Enter the token provided in your verification email or dispatched by the system.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Verification Security Token
                </label>
                <input
                  type="text"
                  placeholder="e.g. 742b2ccf092c4a3a2312c450082e25d..."
                  value={manualToken}
                  onChange={(e) => setManualToken(e.target.value)}
                  className="w-full bg-[#111726] border border-[#1e293b] rounded-xl px-3 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <button
                type="button"
                onClick={() => handleVerification(manualToken)}
                disabled={!manualToken.trim()}
                className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition-all duration-200 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <span>Verify Token & Activate Account</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <div className="pt-2 text-center border-t border-[#1a2236] text-xs text-zinc-400">
                Didn&apos;t receive the email?{' '}
                <Link href="/resend-verification" className="text-emerald-400 font-semibold hover:underline">
                  Resend Link
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#06080d] flex items-center justify-center text-zinc-400 text-xs">
          Loading verification gateway...
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
