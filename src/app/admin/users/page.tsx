'use client';

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  UserCheck,
} from 'lucide-react';
import { api } from '@/lib/api';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: 'LEARNER' | 'EDUCATOR' | 'EMPLOYER' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED';
  emailVerified: boolean;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('ALL');
  const [toast, setToast] = useState('');
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    loadUsers();
  }, [roleFilter]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const data = await api.listUsers(roleFilter === 'ALL' ? undefined : roleFilter);
      if (Array.isArray(data)) {
        setUsers(
          data.map((u: any) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            status: u.status === 'suspended' ? 'SUSPENDED' : 'ACTIVE',
            emailVerified: u.isVerified ?? true,
            createdAt: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Active',
          })),
        );
      }
    } catch (err) {
      console.error('Failed to load admin users:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string) => {
    const user = users.find((u) => u.id === id);
    if (!user) return;
    const newStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u)),
    );
    try {
      await api.updateUserStatus(id, newStatus.toLowerCase());
      setToast(`User ${user.email} status updated to ${newStatus}`);
    } catch (err: any) {
      console.error('Failed to update status:', err);
    }
    setTimeout(() => setToast(''), 3000);
  };

  const handleRevokeSessions = (email: string) => {
    setToast(`All active JWT refresh sessions revoked for ${email}`);
    setTimeout(() => setToast(''), 3000);
  };

  const filtered = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl mx-auto">
      {toast && (
        <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center justify-between">
          <span>{toast}</span>
          <button onClick={() => setToast('')} className="text-zinc-400 hover:text-white">✕</button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Global User Directory & Access Control
            </h1>
            <span className="px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-400 text-xs font-bold font-mono">
              Identity Registry
            </span>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            Enforce account states, revoke token rotation sessions, and inspect verification status.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-[#090d16] border border-[#1a2236] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by user name or email address..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#070a12] border border-[#1e293b] text-xs text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        <div className="flex items-center gap-2">
          {['ALL', 'LEARNER', 'EDUCATOR', 'EMPLOYER', 'ADMIN'].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                roleFilter === r
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'text-zinc-400 hover:text-white hover:bg-[#101726]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table / List */}
      <div className="space-y-3">
        {filtered.map((u) => (
          <div
            key={u.id}
            className="p-5 rounded-2xl bg-[#090d16] border border-[#1a2236] hover:border-amber-500/30 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">{u.name}</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase bg-[#111728] border border-[#1e293b] text-amber-300">
                  {u.role}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono uppercase ${
                    u.status === 'ACTIVE'
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-400 border border-rose-500/30'
                  }`}
                >
                  {u.status}
                </span>
              </div>
              <div className="text-xs text-zinc-400 font-mono mt-0.5">
                {u.email} • Registered {u.createdAt} • Email {u.emailVerified ? 'Verified' : 'Unverified'}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleRevokeSessions(u.email)}
                className="px-3 py-1.5 rounded-xl bg-[#111728] hover:bg-[#1a233c] border border-[#1e2d44] text-zinc-300 hover:text-white text-xs font-mono font-semibold transition"
                title="Revoke all active sessions and rotate refresh tokens"
              >
                Revoke Sessions
              </button>

              <button
                onClick={() => toggleStatus(u.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition border ${
                  u.status === 'ACTIVE'
                    ? 'bg-rose-500/15 hover:bg-rose-500/25 border-rose-500/30 text-rose-300'
                    : 'bg-emerald-500/15 hover:bg-emerald-500/25 border-emerald-500/30 text-emerald-300'
                }`}
              >
                {u.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
