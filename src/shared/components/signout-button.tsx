'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import * as React from 'react'

import { Button, ButtonProps } from '@/shared/components/ui/button'
import { useAuth } from '@/shared/hooks/use-auth'
import { createClient } from '@/shared/utils/supabase/client'

interface SignOutButtonProps
  extends ButtonProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {}

const SignOutButton = (props: SignOutButtonProps) => {
  const router = useRouter()
  const { setSession, setUser } = useAuth()

  const onClick = async () => {
    try {
      const supabase = createClient()
      const unsigned = await supabase.auth.signOut()

      if (unsigned?.error) throw new Error(unsigned?.error?.message)

      setSession(null)
      setUser(null)

      router.refresh()
      router.replace('/')
    } catch (e: unknown) {
      toast.error((e as Error)?.message)
    }
  }

  return (
    <Button type="button" onClick={onClick} {...props}>
      로그아웃
    </Button>
  )
}

export { SignOutButton, type SignOutButtonProps }
