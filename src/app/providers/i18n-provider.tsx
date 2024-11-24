'use client'

import { I18nextProvider } from 'react-i18next'
import * as React from 'react'

import { defaultNS } from '@/shared/config/i18next.config'
import { i18n } from '@/shared/lib'
import { useAppStore } from '@/shared/stores/app-store'

interface I18nProviderProps {
  children?: React.ReactNode
  value: { language: string }
}

const I18nProvider = ({ children, value }: I18nProviderProps) => {
  const { setLanguage } = useAppStore()

  React.useEffect(() => {
    i18n.changeLanguage(value?.language)
    setLanguage(value?.language)
  }, [value?.language, setLanguage])

  return (
    <I18nextProvider i18n={i18n} defaultNS={defaultNS}>
      {children}
    </I18nextProvider>
  )
}

export { I18nProvider, type I18nProviderProps }
