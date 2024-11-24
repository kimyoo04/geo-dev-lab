'use client'

import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import * as React from 'react'

import { MobileNavigation } from '@/modules/mobile-navigation'
import { Navigation } from '@/modules/navigation'

import { SiteBrand } from '@/shared/components/site-brand'
import { Button } from '@/shared/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet'
import { LucideIcon } from '@/shared/lib/lucide-icon'
import { cn } from '@/shared/utils'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = ({ className, ...props }: HeaderProps) => {
  return (
    <>
      <Sheet>
        <VisuallyHidden.Root>
          <SheetTitle>Sheet Content</SheetTitle>
          <SheetDescription>This is a hidden description for screen readers.</SheetDescription>
        </VisuallyHidden.Root>

        <SheetContent className="bg-white dark:bg-gray-900" side="left">
          <MobileNavigation />
        </SheetContent>

        <header
          className={cn([
            'container flex flex-col border-0 border-b border-solid border-input',
            className,
          ])}
          {...props}
        >
          <div className="flex h-[60px] w-full items-center">
            <SheetTrigger asChild>
              <Button type="button" className="md:hidden" size="icon" variant="outline">
                <LucideIcon name="Menu" className="size-6 min-w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SiteBrand className="mr-6 hidden md:flex" />
            <Navigation />
          </div>
        </header>
      </Sheet>
    </>
  )
}

export { Header, type HeaderProps }
