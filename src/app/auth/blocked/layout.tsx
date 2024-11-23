import { getUserAPI } from '@/queries/server/users'
import { redirect } from 'next/navigation'
import * as React from 'react'

export default async function BlockedLayout({ children }: { children?: React.ReactNode }) {
  const { user } = await getUserAPI()

  if (!user) redirect('/auth/signin')
  if (!user?.is_ban) redirect('/dashboard')

  return <>{children}</>
}
