import Link from 'next/link'

const Custom500 = () => {
  return (
    <div className='text-center'>
      <h1>500</h1>
      <p className='text-xl font-semibold'>
        Doujin does not exist or server error
      </p>
      <Link href='/'>
        <a>Go back to the homepage</a>
      </Link>
    </div>
  )
}

export default Custom500
