import { Footer } from '@/modules/footer'
import { Header } from '@/modules/header'

export default async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div id="__protected" className="container flex flex-1 flex-col items-center">
        {children}
      </div>
      <Footer />
    </>
  )
}
