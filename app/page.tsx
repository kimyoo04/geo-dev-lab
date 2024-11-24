import Link from 'next/link'

export default function Home() {
  return (
    <div className="row">
      <div className="col-12">
        <h1 className="header">Supabase Auth + Storage</h1>
        <p>app/page.tsx</p>
      </div>
      <div className="col-6 form-widget">
        <Link href="/auth/signin">sign in</Link>
      </div>
    </div>
  )
}
