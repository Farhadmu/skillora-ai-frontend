'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { DashboardSidebar, UserRole } from '@/components/layout/DashboardSidebar';
import { CommandPalette } from '@/components/common/CommandPalette';
import { AiAssistantDrawer } from '@/components/common/AiAssistantDrawer';
import { Footer } from '@/components/layout/Footer';

import { useWorkspace } from '@/components/layout/WorkspaceContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role?: UserRole;
  showFooter?: boolean;
}

export function DashboardLayout({
  children,
  role,
  showFooter = true,
}: DashboardLayoutProps) {
  const workspace = useWorkspace();
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If already rendered inside a WorkspaceShell (e.g., in /learner/*, /educator/*, /employer/*, /admin/*),
  // do not duplicate the topbar and sidebar!
  if (workspace.isInWorkspace) {
    return (
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex-1">{children}</div>
        {showFooter && <Footer />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#06080d] text-zinc-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-300">
      {/* Top Navbar */}
      <Navbar
        onOpenCommandPalette={() => setPaletteOpen(true)}
        onOpenAiAssistant={() => setAssistantOpen(true)}
        onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        isSidebarAvailable={true}
      />

      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
      <AiAssistantDrawer isOpen={assistantOpen} onClose={() => setAssistantOpen(false)} />

      {/* Main Workspace with Sidebar */}
      <div className="flex-1 flex w-full">
        <DashboardSidebar
          role={role}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="flex-1">
            {children}
          </div>
          {showFooter && <Footer />}
        </div>
      </div>
    </div>
  );
}
