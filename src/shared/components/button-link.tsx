import Link, { type LinkProps } from 'next/link'
import * as React from 'react'

import { ButtonProps, buttonVariants } from '@/shared/components/ui/button'
import { LucideIcon, type LucideIconName } from '@/shared/lib/lucide-icon'
import { cn } from '@/shared/utils'

interface ButtonLinkProps
  extends LinkProps,
    Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  startIconName?: LucideIconName
  startIconClassName?: string
  endIconName?: LucideIconName
  endIconClassName?: string
  variant?: ButtonProps['variant']
}

const ButtonLink = React.forwardRef<HTMLAnchorElement, ButtonLinkProps>((props, ref) => {
  const {
    children,
    className,
    startIconName,
    startIconClassName,
    endIconName,
    endIconClassName,
    variant = 'ghost',
    ...rest
  } = props

  return (
    <Link ref={ref} className={cn(buttonVariants({ variant }), className)} {...rest}>
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

ButtonLink.displayName = 'ButtonLink'

export { ButtonLink, type ButtonLinkProps }
