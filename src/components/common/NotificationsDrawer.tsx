'use client';

import React, { useState } from 'react';
import {
  Bell,
  X,
  CheckCircle2,
  Sparkles,
  Briefcase,
  Award,
  AlertTriangle,
  Clock,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: 'system' | 'job' | 'assessment' | 'alert' | 'ai';
  timestamp: string;
  read: boolean;
  link?: string;
}

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  role?: string;
}

const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: 'AI Readiness Verified',
    message: 'Your 7-Dimension Employability score reached 84/100 following verified NestJS and TypeScript evidence.',
    category: 'assessment',
    timestamp: '10m ago',
    read: false,
    link: '/learner/readiness',
  },
  {
    id: 'n-2',
    title: 'New High-Match Role Match (94%)',
    message: 'TechScale AI posted "Senior Full-Stack AI Engineer" which strongly matches your verified graph nodes.',
    category: 'job',
    timestamp: '1h ago',
    read: false,
    link: '/learner/jobs',
  },
  {
    id: 'n-3',
    title: 'Automated Early Intervention Dispatched',
    message: 'Socratic Tutor suggested targeted diagnostic drill on distributed cache invalidation.',
    category: 'ai',
    timestamp: '3h ago',
    read: true,
    link: '/learner/learning/ai-teacher',
  },
  {
    id: 'n-4',
    title: 'Responsible AI Audit Pass',
    message: 'Demographic anonymization heuristics verified 100% compliant with zero adverse impact guidelines.',
    category: 'system',
    timestamp: 'Yesterday',
    read: true,
  },
];

export function NotificationsDrawer({ isOpen, onClose, role }: NotificationsDrawerProps) {
  const [notifications, setNotifications] = useState<NotificationItem[]>(DEFAULT_NOTIFICATIONS);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

  const getCategoryIcon = (cat: NotificationItem['category']) => {
    switch (cat) {
      case 'job':
        return <Briefcase className="w-4 h-4 text-purple-400" />;
      case 'assessment':
        return <Award className="w-4 h-4 text-emerald-400" />;
      case 'ai':
        return <Sparkles className="w-4 h-4 text-cyan-400" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-amber-400" />;
      default:
        return <Bell className="w-4 h-4 text-zinc-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#080c14] border-l border-[#1a2236] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#1a2236] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <span>Intelligence Notifications</span>
                  {unreadCount > 0 && (
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                      {unreadCount} new
                    </span>
                  )}
                </h3>
                <p className="text-[11px] text-zinc-400">Real-time alerts across your {role || 'Skillora'} workspace</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#121927] transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Bar */}
          <div className="px-4 py-2.5 border-b border-[#151d2f] bg-[#060910] flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  filter === 'all'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                All ({notifications.length})
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition ${
                  filter === 'unread'
                    ? 'bg-zinc-800 text-white'
                    : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                Unread ({unreadCount})
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px]">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-emerald-400 hover:underline font-semibold"
                >
                  Mark read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-zinc-500 hover:text-zinc-300 transition"
                  title="Clear all notifications"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
            {filtered.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-zinc-500">
                <CheckCircle2 className="w-10 h-10 text-zinc-600 mb-2 stroke-[1.5]" />
                <div className="text-xs font-bold text-zinc-300">You&apos;re completely caught up!</div>
                <p className="text-[11px] text-zinc-500 mt-1 max-w-xs">
                  No unread notifications at this time. Telemetry signals and AI matching results will appear here automatically.
                </p>
              </div>
            ) : (
              filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => markAsRead(item.id)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer relative ${
                    item.read
                      ? 'bg-[#0a0f1b] border-[#151e31] text-zinc-300'
                      : 'bg-[#0e1526] border-emerald-500/30 text-white shadow-sm'
                  }`}
                >
                  {!item.read && (
                    <span className="absolute top-3.5 right-3.5 w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}

                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-2 rounded-lg bg-[#141b2c] border border-[#1e2a40] shrink-0">
                      {getCategoryIcon(item.category)}
                    </div>

                    <div className="flex-1 min-w-0 pr-4">
                      <div className="text-xs font-bold truncate">{item.title}</div>
                      <p className="text-[11px] text-zinc-400 mt-1 leading-relaxed">{item.message}</p>
                      <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-[#162035] text-[10px] text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.timestamp}
                        </span>
                        {item.link && (
                          <Link
                            href={item.link}
                            onClick={onClose}
                            className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                          >
                            <span>Inspect</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
