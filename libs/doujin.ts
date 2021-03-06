import client from 'apollo/client'
import { getDoujinFromId } from 'apollo/querys'
import { storage } from 'libs/firebase/client'
import { ref, uploadBytes } from 'firebase/storage'

export type Data = {
  title: {
    english?: string
    japanese?: string
  }
  images: {
    url: string
  }[]
  url: string
  id: string
}

export const getDoujins = async (id: string[]) => {
  const datas: Data[] | null = await Promise.all(
    id.map((code) =>
      client
        .query({
          query: getDoujinFromId,
          variables: {
            doujinId: code,
          },
        })
        .then(({ data }) => data.nhentai.info)
    )
  )

  return datas
}

export const submitToFirebaseStorage = async (blob: Blob, title: string) => {
  const storageRef = ref(storage, title)

  await uploadBytes(storageRef, blob)
}
