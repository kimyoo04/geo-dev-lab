import Link from 'next/link'
import * as React from 'react'

import { SiteLogo } from '@/shared/components/site-logo'
import { siteConfig } from '@/shared/config/site'
import { absoluteUrl } from '@/shared/utils'

const MobileNavigation = () => {
  return (
    <div className="grid w-full max-w-md gap-4">
      <div className="flex items-center gap-4">
        <SiteLogo className="size-8 min-w-8" />
        <span>{siteConfig?.title}</span>
      </div>
      <nav className="grid gap-2 text-sm">
        <Link href={absoluteUrl('/')} className="hover:underline">
          Home
        </Link>
        <Link href={absoluteUrl('/posts')} className="hover:underline">
          Posts
        </Link>
      </nav>
    </div>
  )
}

export { MobileNavigation }
