/**
 * @file Provides shared styling utilities used by reusable React components.
 */

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Combines conditional class values and resolves conflicting Tailwind utilities.
 *
 * @param inputs - Class strings, arrays, or conditional class maps accepted by `clsx`.
 * @returns A normalized class string with Tailwind conflicts merged.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
