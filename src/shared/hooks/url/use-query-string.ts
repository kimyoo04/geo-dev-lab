'use client'

import { useSearchParams } from 'next/navigation'
import * as React from 'react'

const useQueryString = () => {
  const searchParams = useSearchParams()

  const qs = React.useCallback(
    <T extends Record<string, any>>(object?: T): string => {
      const params = new URLSearchParams(searchParams.toString())

      if (object) {
        Object.keys(object).forEach((k: string) => {
          if (object[k] === undefined || object[k] === null) {
            params.delete(k)
            return
          }
          params.set(k, object[k])
        })
      }

      return params.toString()
    },
    [searchParams],
  )

  return { qs }
}

export { useQueryString }
