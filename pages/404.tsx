import Link from 'next/link';

const Custom404 = () => {
  return (
    <div className='text-center'>
      <h1>404</h1>
      <p className='text-xl font-semibold'>Page not found</p>
      <Link href='/'>
        <a>Go back to the homepage</a>
      </Link>
    </div>
  )
}

export default Custom404
