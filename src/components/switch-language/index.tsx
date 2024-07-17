'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'

export function SwitchLanguage() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function changeLanguage() {
    if (locale === 'en') {
      router.push(pathname.replace('en', 'pt'))
      return
    }

    router.push(pathname.replace('pt', 'en'))
  }

  return (
    <button
      onClick={() => changeLanguage()}
      className="absolute top-4 right-4 p-2 text-base font-semibold rounded-md bg-white border border-gray hover:bg-secondary-white focus:bg-secondary-white hover:border-black focus:border-black transition-colors duration-200 z-30"
    >
      <span>{locale.toUpperCase()}</span>
    </button>
  )
}
