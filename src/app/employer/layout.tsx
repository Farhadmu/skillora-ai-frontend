'use client';

import React from 'react';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';

export default function EmployerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WorkspaceShell role="EMPLOYER">{children}</WorkspaceShell>;
}
