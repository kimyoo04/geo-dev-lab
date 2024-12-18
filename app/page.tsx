import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-4">
      <div className="col-12">
        <h1 className="header">Geometry Blog</h1>
        <p>url: /</p>
      </div>
      <div className="col-6">
        <Link href="/sign-in">sign in</Link>
      </div>
    </div>
  )
}
