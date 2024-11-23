'use client'

import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { usePathname, useSearchParams } from 'next/navigation'
import * as React from 'react'

import { MobileNavigation } from '@/components/mobile-navigation'
import { Navigation } from '@/components/navigation'
import { SearchForm } from '@/components/search-form'
import { SearchFormDialog } from '@/components/search-form-dialog'
import { SiteBrand } from '@/components/site-brand'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

import { LucideIcon } from '@/lib/lucide-icon'

import { cn } from '@/utils'

interface HeaderProps extends React.HTMLAttributes<HTMLElement> {}

const Header = ({ className, ...props }: HeaderProps) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  return (
    <Sheet>
      <VisuallyHidden.Root>
        <SheetTitle>Sheet Content</SheetTitle>
        <SheetDescription>This is a hidden description for screen readers.</SheetDescription>
      </VisuallyHidden.Root>
      <SheetContent className="bg-white dark:bg-gray-900" side="left">
        <MobileNavigation />
      </SheetContent>
      <header
        className={
          (cn(
            'flex w-full flex-col border-0 border-b border-solid border-input',
            // 'sticky left-0 top-0 z-10'
          ),
          className)
        }
        {...props}
      >
        <div className="container flex h-[60px] items-center">
          <SheetTrigger asChild>
            <Button type="button" className="md:hidden" size="icon" variant="outline">
              <LucideIcon name="Menu" className="size-6 min-w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SiteBrand className="mr-6 hidden md:flex" />
          <Navigation />
          <div className="ml-auto flex gap-2">
            {pathname !== '/' ? (
              <SearchForm
                path="/search"
                placeholder="search_text"
                translate="yes"
                values={{
                  q: pathname?.startsWith('/search')
                    ? ((searchParams.get('q') as string) ?? '')
                    : '',
                }}
                className="hidden sm:flex"
              />
            ) : null}
            {pathname !== '/' ? <SearchFormDialog className="sm:hidden" /> : null}
          </div>
        </div>
      </header>
    </Sheet>
  )
}

export { Header, type HeaderProps }
