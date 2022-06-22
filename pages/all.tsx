import { NextPage } from 'next'
import { storage } from 'libs/firebase/client'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { useEffect, useState } from 'react'
import { List } from 'components/List'

const All: NextPage = () => {
  const [dbDoujins, setDbDoujins] = useState<string[]>([])
  useEffect(() => {
    const firebaseInfo = async () => {
      const refAll = ref(storage, '/')
      const { items } = await listAll(refAll)
      const doujins = items.map(({ fullPath, name }) => name ?? fullPath)

      setDbDoujins(doujins)
    }

    firebaseInfo()
  }, [])
  return (
    <>
      <main>
        <h1 className='mt-10 text-xl text-center font-semibold'>
          Doujin in database:
        </h1>
        <ul className='my-5 md:my-10 flex flex-col gap-4'>
          {dbDoujins.length ? (
            dbDoujins.map((doujin) => <List key={doujin}>{doujin}</List>)
          ) : (
            <List>loading...</List>
          )}
        </ul>
      </main>
    </>
  )
}

export default All
