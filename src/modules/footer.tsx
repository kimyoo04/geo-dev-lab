import * as React from 'react'

import { Copyright } from '@/shared/components/copyright'
// import { LanguageCombobox } from '@/shared/components/language-combobox'
import { ThemeToggle } from '@/shared/components/theme-toggle'
import { cn } from '@/shared/utils'

interface FooterProps extends React.HTMLAttributes<HTMLElement> {}

const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer
      className={cn(
        'container flex border-0 border-t border-solid border-input bg-inherit',
        className,
      )}
      {...props}
    >
      <div className="flex w-full items-center justify-between gap-2 bg-inherit py-4">
        <Copyright className="text-sm" />
        <div className="flex gap-2">
          <ThemeToggle />
          {/* <LanguageCombobox /> */}
        </div>
      </div>
    </footer>
  )
}

export { Footer, type FooterProps }
