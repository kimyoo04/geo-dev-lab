import { ButtonLink } from '@/shared/components/button-link'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex max-w-7xl flex-1 flex-col justify-center">
      <ButtonLink
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8"
        startIconName="ChevronLeft"
      >
        홈으로
      </ButtonLink>
      {children}
    </div>
  )
}
