'use client'

import { ComponentProps } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  name: string
  icon?: React.ReactNode
}

export function Button({ name, icon, ...rest }: ButtonProps) {
  return (
    <button {...rest} type='submit' className="text-base font-semibold text-white flex items-center justify-center gap-[10px] bg-blue rounded-lg py-2 px-5 max-w-[430px] w-full hover:brightness-90 transition-all duration-200" >
      {name}
      {icon}
    </button>
  )
}