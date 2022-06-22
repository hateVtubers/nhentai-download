import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'
import Link from 'next/link'

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='bg-cod-gray-500 min-h-screen text-amaranth-500 grid place-items-center'>
        <Link href={'/'}>
          <a className='absolute top-7 left-7 md:top-10 md:left-10 text-2xl font-bol rotate-12'>/</a>
        </Link>
        <Link href={'/all'}>
          <a className='absolute top-7 right-7 md:top-10 md:right-10 text-2xl font-bol'>-a</a>
        </Link>
        {children}
        <Toaster
          position='top-right'
          toastOptions={{
            style: { backgroundColor: '#ED2553', color: '#0D0D0D' },
          }}
        />
      </div>
    </>
  )
}
