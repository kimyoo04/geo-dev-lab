'use client'

import { useTheme } from 'next-themes'
import * as React from 'react'

import { LucideIcon } from '@/shared/lib/lucide-icon'
import { useAppStore } from '@/shared/stores/app-store'

interface ThemeToggleProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {}

const ThemeToggle = (props: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme()

  const setAppTheme = useAppStore((state) => state.setTheme)

  const onClick = () => {
    const value = theme === 'light' ? 'dark' : 'light'
    setTheme(value)
    setAppTheme(value)
  }

  return (
    <button type="button" onClick={onClick} {...props}>
      <LucideIcon name="Sun" className="size-5 min-w-5 dark:hidden" />
      <LucideIcon name="Moon" className="hidden size-5 min-w-5 dark:block" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

export { ThemeToggle, type ThemeToggleProps }
