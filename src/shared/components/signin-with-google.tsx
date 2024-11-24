'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'sonner'
import * as React from 'react'

import { createClient } from '@/shared/api/supabase/client'
import { Button, ButtonProps } from '@/shared/components/ui/button'

interface SignInWithGoogleProps
  extends ButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {}

const SignInWithGoogle = ({ variant = 'outline', ...props }: SignInWithGoogleProps) => {
  const { t } = useTranslation()
  const searchParams = useSearchParams()

  const onClick = async () => {
    try {
      // if "next" is in param, use it as the redirect URL
      const next = (searchParams.get('next') as string) ?? '/dashboard'

      const supabase = createClient()
      const signed = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // A URL to send the user to after they are confirmed.
          // Don't forget to change the URL in supabase's email template.
          redirectTo: process.env.NEXT_PUBLIC_URL + `/api/auth/callback?next=${next}`,
          // Google does not send out a refresh token by default,
          // so you will need to pass parameters like these to signInWithOAuth() in order to extract the provider_refresh_token:
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      })

      if (signed?.error) throw new Error(signed?.error?.message)
    } catch (e: unknown) {
      toast.error((e as Error)?.message)
    }
  }

  return (
    <Button
      className="flex justify-center align-middle"
      type="button"
      variant={variant}
      onClick={onClick}
      icon={<FcGoogle className="size-4" />}
      {...props}
    >
      {t('signin_with_google')}
    </Button>
  )
}

export { SignInWithGoogle, type SignInWithGoogleProps }
