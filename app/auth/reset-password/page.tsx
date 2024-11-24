import { redirect } from 'next/navigation'
import * as React from 'react'

import { ButtonLink } from '@/shared/components/button-link'
import { Description } from '@/shared/components/description'
import { SiteLogo } from '@/shared/components/site-logo'
import { TextLink } from '@/shared/components/text-link'
import { Title } from '@/shared/components/title'

import { ResetPasswordForm } from './reset-password-form'

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: {
    token_hash: string
    type: string
    next: string
  }
}) {
  if (!/^pkce_/.test(searchParams?.token_hash) || searchParams?.type !== 'recovery') {
    redirect('/auth/signin')
  }

  return (
    <div className="container flex min-h-screen w-screen flex-col items-center justify-center py-8">
      <ButtonLink
        href="/auth/signin"
        className="absolute left-4 top-4 md:left-8 md:top-8"
        startIconName="ChevronLeft"
        translate="yes"
      >
        signin
      </ButtonLink>
      <div className="mx-auto flex w-full max-w-[320px] flex-col justify-center space-y-6">
        <div className="flex flex-col space-y-2 text-center">
          <SiteLogo className="mx-auto size-12 min-w-12" />
          <Title translate="yes">reset_your_password</Title>
          <Description translate="yes">please_enter_your_new_password_below</Description>
        </div>
        <div className="grid gap-6">
          <ResetPasswordForm />
        </div>
        <div className="flex items-center justify-between text-sm">
          <TextLink href="/auth/signup" className="underline hover:no-underline" translate="yes">
            dont_have_an_account_sign_up
          </TextLink>
        </div>
      </div>
    </div>
  )
}
