'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export const useQueryParams = <T>() => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const urlSearchParams = new URLSearchParams(searchParams.toString())

  const setQueryParams = (params: Partial<T>) => {
    Object.entries(params).forEach(([key, value]) => {
      urlSearchParams.set(key, String(value))
    })
    const searchParams = urlSearchParams.toString()
    const query = searchParams ? `?${searchParams}` : ''
    router.push(`${pathname}${query}`)
  }

  return setQueryParams
}
