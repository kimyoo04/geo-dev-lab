import * as React from 'react'

import { cn } from '@/shared/utils'

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const Title = ({ children, className, ...props }: TitleProps) => {
  return (
    <h2 className={cn('text-2xl font-semibold tracking-tight', className)} {...props}>
      {children}
    </h2>
  )
}

export { Title, type TitleProps }
