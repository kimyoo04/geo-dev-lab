import Link from 'next/link'
import * as React from 'react'

import { SiteLogo } from '@/shared/components/site-logo'
import { siteConfig } from '@/shared/config/site'
import { absoluteUrl } from '@/shared/utils'

interface SiteBrandProps {
  className?: string
}

const SiteBrand = ({ className }: SiteBrandProps) => {
  return (
    <Link className={className} href={absoluteUrl('/')}>
      <SiteLogo className="size-8 min-w-8" />
      <span className="sr-only">{siteConfig?.name}</span>
    </Link>
  )
}

export { SiteBrand, type SiteBrandProps }
