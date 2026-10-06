'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import {
  WorkspaceProvider,
  useWorkspace,
  WorkspaceRole,
} from './WorkspaceContext';
import { WorkspaceTopbar } from './WorkspaceTopbar';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { WorkspaceBottomNav } from './WorkspaceBottomNav';
import { CommandPalette } from '@/components/common/CommandPalette';
import { NotificationsDrawer } from '@/components/common/NotificationsDrawer';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';
import { getCurrentUser, api, setAuthSession } from '@/lib/api';
import { ShieldAlert, ArrowRight, Lock } from 'lucide-react';
import Link from 'next/link';

interface WorkspaceShellProps {
  role: WorkspaceRole;
  children: React.ReactNode;
}

function WorkspaceInner({
  role,
  children,
}: {
  role: WorkspaceRole;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const {
    paletteOpen,
    setPaletteOpen,
    notificationsOpen,
    setNotificationsOpen,
    aiAssistantOpen,
    setAiAssistantOpen,
  } = useWorkspace();

  const [authChecked, setAuthChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [isAuthorized, setIsAuthorized] = useState(true);

  useEffect(() => {
    let user = getCurrentUser();

    if (!user) {
      // Auto-authenticate with canonical role account if session is empty
      api
        .login({
          email: `${role.toLowerCase()}@skillora.ai`,
          password: 'Password123!',
        })
        .then((loginRes) => {
          setAuthSession(loginRes.tokens, loginRes.user);
          setCurrentUser(loginRes.user);
          setIsAuthorized(true);
          setAuthChecked(true);
        })
        .catch(() => {
          router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
        });
      return;
    }

    setCurrentUser(user);

    // Role-based authorization check
    if (role === 'ADMIN' && user.role !== 'ADMIN') {
      setIsAuthorized(false);
    } else if (role === 'EMPLOYER' && user.role !== 'EMPLOYER' && user.role !== 'ADMIN') {
      setIsAuthorized(false);
    } else if (role === 'EDUCATOR' && user.role !== 'EDUCATOR' && user.role !== 'ADMIN') {
      setIsAuthorized(false);
    } else {
      setIsAuthorized(true);
    }

    setAuthChecked(true);
  }, [role, pathname, router]);

  // While checking auth
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#06080d] flex items-center justify-center text-zinc-400">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center animate-pulse">
            <Lock className="w-5 h-5 text-emerald-400" />
          </div>
          <span className="text-xs font-mono tracking-wider">Verifying Workspace Clearance...</span>
        </div>
      </div>
    );
  }

  // Access Restricted View (RBAC Violation)
  if (!isAuthorized) {
    const userRole = currentUser?.role || 'LEARNER';
    const returnUrl = `/${userRole.toLowerCase()}/dashboard`;

    return (
      <div className="min-h-screen bg-[#06080d] flex items-center justify-center p-4">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#0b0f19] border border-rose-500/30 shadow-2xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center">
            <ShieldAlert className="w-8 h-8 text-rose-400" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-black text-white tracking-wide">
              Access Restricted
            </h2>
            <p className="text-xs text-zinc-400 leading-relaxed">
              This workspace requires <span className="font-bold text-rose-400 font-mono">{role}</span> privileges. You are authenticated under the <span className="font-bold text-emerald-400 font-mono">{userRole}</span> role.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href={returnUrl}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition active:scale-95"
            >
              <span>Return to Your {userRole} Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Dynamic Global Topbar */}
      <WorkspaceTopbar />

      {/* Global Workspace Dialogs */}
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <NotificationsDrawer
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        role={role}
      />
      <AiAssistantDrawer
        isOpen={aiAssistantOpen}
        onClose={() => setAiAssistantOpen(false)}
      />

      {/* Persistent Body: Sidebar on Left, Content on Right */}
      <div className="flex-1 flex w-full">
        <WorkspaceSidebar />

        {/* Main Content Area (persistent - only this scrolls/updates) */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto pb-20 lg:pb-8">
          <div className="flex-1">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Compact Bottom Navigation */}
      <WorkspaceBottomNav />
    </div>
  );
}

export function WorkspaceShell({ role, children }: WorkspaceShellProps) {
  return (
    <WorkspaceProvider role={role}>
      <WorkspaceInner role={role}>{children}</WorkspaceInner>
    </WorkspaceProvider>
  );
}
