/**
 * @file Provides the persistent application navigation and active-route highlighting.
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BrandLogo } from '@/components/brand-logo'
import { cn } from '@/lib/utils'

const links = [
  { href: '/villas', label: 'Villas' },
  { href: '/proposals', label: 'Proposals' },
]

/**
 * Renders the branded top navigation and marks the current route as active.
 *
 * @returns The application header with villa and proposal navigation links.
 */
export function TopNav() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/villas"
          className="flex h-full shrink-0 items-center"
          aria-label="Redwood Lakeside home"
        >
          <BrandLogo
            size={64}
            className="gap-0 [&>span]:hidden sm:gap-2.5 sm:[&>span]:flex"
            wordmarkClassName="text-xl"
          />
        </Link>

        <nav className="flex items-center gap-1" aria-label="Main navigation">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-secondary text-secondary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
