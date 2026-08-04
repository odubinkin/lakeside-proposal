import type React from 'react'
import { TopNav } from '@/components/top-nav'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <TopNav />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-6 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© 2026 Redwood Lakeside Development Co., Ltd. — Phuket, Thailand</p>
          <p>Internal sales tool · Proposal Studio</p>
        </div>
      </footer>
    </div>
  )
}
