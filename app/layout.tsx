import { Analytics } from '@vercel/analytics/react'
import type { Metadata, Viewport } from 'next'
import { cookies } from 'next/headers'
import * as React from 'react'

import { TailwindIndicator } from '@/shared/components/tailwind-indicator'
import { defaultLng } from '@/shared/config/i18next.config'
import { siteConfig } from '@/shared/config/site'
import { cn } from '@/shared/utils'

import '@/app/styles/globals.css'

import { ErrorBoundary } from 'react-error-boundary'

import { I18nProvider } from '@/app/providers/i18n-provider'
import { TanstackProvider } from '@/app/providers/tanstack-provider'
import { ThemeProvider } from '@/app/providers/theme-provider'

import { MainErrorFallback } from '@/shared/components/errors/main'
import { Toaster } from '@/shared/components/ui/sonner'
import { AuthProvider } from '@/shared/hooks/auth-provider'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL!),
  title: siteConfig.title,
  description: siteConfig.description,
  manifest: '/manifest.json',
  verification: {
    google: 'IxvN4WdPU9_KS-Tte2fenLPbVODRkNwhyqrXGx2rAJw',
    // other: { 'naver-site-verification': '' },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({
  children,
}: Readonly<{
  children?: React.ReactNode
}>) {
  const cookieStore = cookies()
  const language = cookieStore.get('app:language')?.value || defaultLng
  const theme = cookieStore.get('app:theme')?.value || 'system'

  return (
    <html lang={language} suppressHydrationWarning>
      <body className={cn('font-sans antialiased')}>
        <ErrorBoundary FallbackComponent={MainErrorFallback}>
          <I18nProvider value={{ language }}>
            <ThemeProvider value={{ theme }}>
              <TanstackProvider>
                <AuthProvider>
                  <div id="__next">{children}</div>
                  <Toaster richColors closeButton />
                  {process.env.DEV ? <TailwindIndicator /> : null}
                  {process.env.NODE_ENV === 'production' ? <Analytics /> : null}
                </AuthProvider>
              </TanstackProvider>
            </ThemeProvider>
          </I18nProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
