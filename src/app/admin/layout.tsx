'use client';

import React from 'react';
import { WorkspaceShell } from '@/components/layout/WorkspaceShell';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <WorkspaceShell role="ADMIN">{children}</WorkspaceShell>;
}
