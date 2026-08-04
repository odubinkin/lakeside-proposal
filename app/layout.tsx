/**
 * @file Configures global metadata, fonts, styling, and analytics for the Next.js application.
 */

import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Fraunces } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Redwood Lakeside — Villa Proposal Studio',
  description:
    'Generate premium commercial proposals for luxury villas in Phuket by Redwood Lakeside.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#ffffff',
}

/**
 * Renders the root HTML document and applies global font variables and production analytics.
 *
 * @param props - Root layout properties supplied by the Next.js App Router.
 * @param props.children - Application route content rendered inside the document body.
 * @returns The application's root HTML structure.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} bg-background`}>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
