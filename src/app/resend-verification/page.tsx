'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Sparkles,
  Mail,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import { api } from '@/lib/api';

export default function ResendVerificationPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [responseInfo, setResponseInfo] = useState<{
    message: string;
    verificationUrl?: string;
    alreadyVerified?: boolean;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError(null);
    setResponseInfo(null);

    try {
      const res = await api.resendVerification(email.trim());
      setResponseInfo(res);
    } catch (err: any) {
      setError(err.message || 'Failed to dispatch verification email.');
    } finally {
      setLoading(false);
    }
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
        <h2 className="text-xl font-bold text-white tracking-tight">Resend Verification Email</h2>
        <p className="text-xs text-zinc-400 mt-1">Enter your registered email to receive a new link</p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="glass-panel p-8 rounded-2xl border border-[#1e293b] shadow-2xl space-y-6">
          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {responseInfo && (
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-zinc-200 text-xs space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Verification Link Generated</span>
              </div>
              <p className="text-zinc-300 leading-relaxed">{responseInfo.message}</p>

              {responseInfo.alreadyVerified && (
                <div className="pt-2 border-t border-emerald-500/20">
                  <Link
                    href="/login"
                    className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
                  >
                    <span>Proceed to Sign In</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              )}
            </div>
          )}

          {!responseInfo?.verificationUrl && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                  Account Email Address
                </label>
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

              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-black transition-all duration-200 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Verification Link</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          )}

          <div className="text-center pt-2 border-t border-[#1a2236] text-xs text-zinc-400 flex items-center justify-between">
            <Link href="/login" className="text-zinc-400 hover:text-white transition">
              Back to Sign In
            </Link>
            <Link href="/register" className="text-emerald-400 hover:underline">
              Create New Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
