import { ReactNode } from 'react'

export const List = ({ children }: { children: ReactNode }) => {
  return (
    <li className='bg-amaranth-500 text-black text-center p-2 rounded text-sm md:text-base'>
      {children}
    </li>
  )
}
