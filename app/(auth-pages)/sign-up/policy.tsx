'use client'

import Link from 'next/link'
import * as React from 'react'

const Policy = () => {
  return (
    <p className="text-sm text-muted-foreground">
      가입하기를 클릭하면{' '}
      <Link href="/policy/terms" className="text-primary underline hover:no-underline">
        서비스 약관
      </Link>{' '}
      및{' '}
      <Link href="/policy/privacy" className="text-primary underline hover:no-underline">
        개인정보 보호정책
      </Link>
      에 동의하게 됩니다.
    </p>
  )
}

export { Policy }
