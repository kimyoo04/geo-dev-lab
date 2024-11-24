'use client'

import { useSearchParams } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import { FaGithub } from 'react-icons/fa'
import { toast } from 'sonner'
import * as React from 'react'

import { createClient } from '@/shared/api/supabase/client'
import { Button, ButtonProps } from '@/shared/components/ui/button'

interface SignInWithGithubProps
  extends ButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {}

const SignInWithGithub = ({ variant = 'outline', ...props }: SignInWithGithubProps) => {
  const { t } = useTranslation()
  const searchParams = useSearchParams()

  const onClick = async () => {
    try {
      // if "next" is in param, use it as the redirect URL
      const next = (searchParams.get('next') as string) ?? '/dashboard'

      const supabase = createClient()
      const signed = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          // A URL to send the user to after they are confirmed.
          // Don't forget to change the URL in supabase's email template.
          redirectTo: process.env.NEXT_PUBLIC_URL + `/api/auth/callback?next=${next}`,
        },
      })

      if (signed?.error) throw new Error(signed?.error?.message)
    } catch (e: unknown) {
      toast.error((e as Error)?.message)
    }
  }

  return (
    <Button type="button" variant={variant} onClick={onClick} {...props}>
      <FaGithub className="mr-2 size-4" />
      {t('signin_with_github')}
    </Button>
  )
}

export { SignInWithGithub, type SignInWithGithubProps }
