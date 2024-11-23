'use client'

import { createClient } from '@/supabase/client'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import * as React from 'react'

import { SiteLogo } from '@/components/site-logo'

import { useAuth } from '@/hooks/use-auth'

export default function BlockedPage() {
  const router = useRouter()
  const { t } = useTranslation()
  const { setSession, setUser } = useAuth()

  const onClick = async () => {
    try {
      const supabase = createClient()
      const unsigned = await supabase.auth.signOut()

      if (unsigned?.error) throw new Error(unsigned?.error?.message)

      setSession(null)
      setUser(null)

      router.refresh()
      router.replace('/auth/signin')
    } catch (e: unknown) {
      toast.error((e as Error)?.message)
    }
  }

  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-8">
      <div className="mx-auto flex w-full max-w-[360px] flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <SiteLogo className="mx-auto size-12 min-w-12" />
          <h1 translate="yes">your_account_has_been_blocked</h1>
        </div>
        <div className="grid gap-4">
          <p>{t('weve_detected_suspicious_activity_on_your_account')}</p>
          <p>
            {t('organizations_seeking_access_are_limiting_users_at_risk')}
            {t('please_contact_your_administrator')}
          </p>
          <button
            onClick={onClick}
            className="text-left text-blue-700 underline hover:no-underline"
          >
            {t('sign_out_and_sign_in_with_a_different_account')}
          </button>
        </div>
      </div>
    </div>
  )
}
