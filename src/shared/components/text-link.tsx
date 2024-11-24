'use client'

import Link, { type LinkProps } from 'next/link'
import * as React from 'react'

import { LucideIcon, type LucideIconName } from '@/shared/lib/lucide-icon'
import { cn } from '@/shared/utils'

interface TextLinkProps
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  startIconName?: LucideIconName
  startIconClassName?: string
  endIconName?: LucideIconName
  endIconClassName?: string
}

const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>((props, ref) => {
  const { children, startIconName, startIconClassName, endIconName, endIconClassName, ...rest } =
    props

  return (
    <Link ref={ref} {...rest}>
      {startIconName ? (
        <LucideIcon
          name={startIconName}
          className={cn('mr-2 size-4 min-w-4', startIconClassName)}
        />
      ) : null}
      {children}
      {endIconName ? (
        <LucideIcon name={endIconName} className={cn('ml-2 size-4 min-w-4', endIconClassName)} />
      ) : null}
    </Link>
  )
})

TextLink.displayName = 'TextLink'

export { TextLink, type TextLinkProps }
