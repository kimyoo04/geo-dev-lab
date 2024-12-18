'use client'

// import { AuthLoader, useLogout } from '@/shared/lib/auth'
// import { ROLES, useAuthorization } from '@/shared/lib/authorization'
import { Folder, Home, PanelLeft, User2 } from 'lucide-react'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'

import { Button } from '@/shared/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/shared/components/ui/drawer'
import { Spinner } from '@/shared/components/ui/spinner'
import { cn } from '@/shared/utils'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown'
import { Link } from '../ui/link'

type SideNavigationItem = {
  name: string
  to: string
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
}

const Logo = () => {
  return (
    <Link className="flex items-center text-white" href="/">
      <img className="h-8 w-auto" src="/logo.svg" alt="Workflow" />
      <span className="text-sm font-semibold text-white">Bulletproof React</span>
    </Link>
  )
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  // const logout = useLogout()
  // const { checkAccess } = useAuthorization()
  const pathname = usePathname()
  const router = useRouter()
  const navigation = [
    { name: 'Dashboard', to: '/app', icon: Home },
    { name: 'Discussions', to: '/app/discussions', icon: Folder },
    // checkAccess({ allowedRoles: [ROLES.ADMIN] }) && {
    //   name: 'Users',
    //   to: '/app/users',
    //   icon: Users,
    // },
  ].filter(Boolean) as SideNavigationItem[]

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-black sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 py-4">
          <div className="flex h-16 shrink-0 items-center px-4">
            <Logo />
          </div>
          {navigation.map((item) => {
            const isActive = pathname === item.to
            return (
              <NextLink
                key={item.name}
                href={item.to}
                className={cn(
                  'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'group flex w-full flex-1 items-center rounded-md p-2 text-base font-medium',
                  isActive && 'bg-gray-900 text-white',
                )}
              >
                <item.icon
                  className={cn('text-gray-400 group-hover:text-gray-300', 'mr-4 size-6 shrink-0')}
                  aria-hidden="true"
                />
                {item.name}
              </NextLink>
            )
          })}
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:justify-end sm:border-0 sm:bg-transparent sm:px-6">
          {/* <Progress /> */}
          <Drawer>
            <DrawerTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="size-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent side="left" className="bg-black pt-10 text-white sm:max-w-60">
              <nav className="grid gap-6 text-lg font-medium">
                <div className="flex h-16 shrink-0 items-center px-4">
                  <Logo />
                </div>
                {navigation.map((item) => {
                  const isActive = pathname === item.to
                  return (
                    <NextLink
                      key={item.name}
                      href={item.to}
                      className={cn(
                        'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'group flex w-full flex-1 items-center rounded-md p-2 text-base font-medium',
                        isActive && 'bg-gray-900 text-white',
                      )}
                    >
                      <item.icon
                        className={cn(
                          'text-gray-400 group-hover:text-gray-300',
                          'mr-4 size-6 shrink-0',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </NextLink>
                  )
                })}
              </nav>
            </DrawerContent>
          </Drawer>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="overflow-hidden rounded-full">
                <span className="sr-only">Open user menu</span>
                <User2 className="size-6 rounded-full" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => router.push('/app/profile')}
                className={cn('block px-4 py-2 text-sm text-gray-700')}
              >
                Your Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className={cn('block w-full px-4 py-2 text-sm text-gray-700')}
                // onClick={() => logout.mutate({})}
              >
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  )
}

export const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <ErrorBoundary key={pathname} fallback={<div>Something went wrong!</div>}>
          {/* <AuthLoader
            renderLoading={() => (
              <div className="flex size-full items-center justify-center">
                <Spinner size="xl" />
              </div>
            )}
          > */}
          {children}
          {/* </AuthLoader> */}
        </ErrorBoundary>
      </Suspense>
    </Layout>
  )
}
