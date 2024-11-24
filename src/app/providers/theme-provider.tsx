'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import * as React from 'react'

interface ThemeProviderProps {
  children?: React.ReactNode
  value: { theme: string }
}

const ThemeProvider = ({ children, value }: ThemeProviderProps) => {
  return (
    <NextThemeProvider
      attribute="class"
      defaultTheme={value?.theme}
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemeProvider>
  )
}

export { ThemeProvider, type ThemeProviderProps }
