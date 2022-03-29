import { ReactNode } from 'react';
import { Toaster } from 'react-hot-toast';

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='bg-cod-gray-500 min-h-screen text-amaranth-500 grid place-items-center'>
        {children}
        <Toaster
          position='top-right'
          toastOptions={{
            style: { backgroundColor: '#ED2553', color: '#0D0D0D' },
          }}
        />
      </div>
    </>
  );
};
