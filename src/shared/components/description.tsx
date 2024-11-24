import * as React from 'react'

import { cn } from '@/shared/utils'

interface DescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const Description = ({ children, className, ...props }: DescriptionProps) => {
  return (
    <p className={cn('text-sm text-muted-foreground', className)} {...props}>
      {children}
    </p>
  )
}

export { Description, type DescriptionProps }
