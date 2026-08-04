/**
 * @file Defines the application root route and forwards users to the villa catalog.
 */

import { redirect } from 'next/navigation'

/**
 * Redirects the root URL to the primary villa-selection workflow.
 *
 * @returns Never returns because Next.js terminates rendering with a redirect.
 */
export default function Home() {
  redirect('/villas')
}
