'use client';

import React, { createContext, useContext, useState } from 'react';

export type WorkspaceRole = 'LEARNER' | 'EDUCATOR' | 'EMPLOYER' | 'ADMIN';

export interface WorkspaceContextType {
  isInWorkspace: boolean;
  role: WorkspaceRole;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  paletteOpen: boolean;
  setPaletteOpen: React.Dispatch<React.SetStateAction<boolean>>;
  notificationsOpen: boolean;
  setNotificationsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  aiAssistantOpen: boolean;
  setAiAssistantOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WorkspaceContext = createContext<WorkspaceContextType>({
  isInWorkspace: false,
  role: 'LEARNER',
  sidebarCollapsed: false,
  setSidebarCollapsed: () => {},
  mobileSidebarOpen: false,
  setMobileSidebarOpen: () => {},
  paletteOpen: false,
  setPaletteOpen: () => {},
  notificationsOpen: false,
  setNotificationsOpen: () => {},
  aiAssistantOpen: false,
  setAiAssistantOpen: () => {},
});

export function useWorkspace() {
  return useContext(WorkspaceContext);
}

export function WorkspaceProvider({
  role,
  children,
}: {
  role: WorkspaceRole;
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);

  return (
    <WorkspaceContext.Provider
      value={{
        isInWorkspace: true,
        role,
        sidebarCollapsed,
        setSidebarCollapsed,
        mobileSidebarOpen,
        setMobileSidebarOpen,
        paletteOpen,
        setPaletteOpen,
        notificationsOpen,
        setNotificationsOpen,
        aiAssistantOpen,
        setAiAssistantOpen,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}
