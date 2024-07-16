/* eslint-disable import/no-absolute-path */

import Image from 'next/image'
import Link from 'next/link'

import logo from '/public/logo.svg'

export function Navbar() {
  return (
    <header className="w-full pt-9 pb-10 flex items-center justify-center">
      <Link href="/">
        <Image
          src={logo}
          alt="Woovi logo"
          width={123}
          height={37}
          priority
          quality={100}
        />
      </Link>
    </header>
  )
}
