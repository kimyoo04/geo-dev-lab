import * as React from 'react'

import { ButtonLink } from '@/components/button-link'
import { Error } from '@/components/error'

export default function NotFound() {
  return (
    <div className="relative">
      <ButtonLink
        href="/"
        className="absolute left-4 top-4 md:left-8 md:top-8"
        startIconName="ChevronLeft"
        translate="yes"
      >
        home
      </ButtonLink>
      <Error status="404" />
    </div>
  )
}
