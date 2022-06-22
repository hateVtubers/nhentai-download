import JSZip from 'jszip'
import { Data, submitToFirebaseStorage } from 'libs/doujin'
import { saveAs } from 'file-saver'
import { useEffect, useState, useRef } from 'react'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from 'libs/firebase/client'
import { toast } from 'react-hot-toast'
import { getBase64 } from 'libs/base64image'

type Download = {
  loading: boolean
  data: null | Blob
}

const listRef = ref(storage)

const constructorZip = async ({
  doujins,
  zip,
}: {
  doujins: Data[]
  zip: typeof JSZip
}) => {
  await Promise.all(
    doujins.map(async ({ id, images }) => {
      const imgFolder = zip.folder(id)

      await Promise.all(
        images.map(async ({ url }, i) => {
          const { base64 } = await getBase64(url)
          const arrayExtension = url.toLowerCase().split('')
          const extension = arrayExtension.slice(-3).join('')

          const imgName = `${i + 1}.${extension}`

          imgFolder?.file(imgName, base64, { base64: true })
        })
      )
    })
  )
}

export const useDownload = (doujins: Data[]) => {
  const { current: zip } = useRef(new JSZip())
  const [download, setDownload] = useState<Download>({
    loading: true,
    data: null,
  })
  const zipTitle = `[${doujins.map(({ id }) => id).join('-')}].zip`

  const getZip = async () => {
    const { items } = await listAll(listRef)

    if (items.find(({ name }) => name === zipTitle)) return null

    await toast.promise(constructorZip({ doujins, zip }), {
      success: 'Zip created',
      loading: `Creating zip to ${doujins.map(({ id }) => id).join(' - ')}...`,
      error: 'Error creating zip please send log as issue',
    })

    const zipDoujin = await zip.generateAsync({ type: 'blob' })

    await toast.promise(submitToFirebaseStorage(zipDoujin, zipTitle), {
      loading: 'uploading to firebase storage...',
      success: 'uploaded to firebase storage!',
      error: 'failed to upload to firebase storage!',
    })

    return zipDoujin
  }

  useEffect(() => {
    getZip().then((data) => setDownload({ loading: false, data }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDownloadFromZip = () => {
    saveAs(download.data as Blob, zipTitle)
  }

  const handleDownloadFromFirebase = async () => {
    const storageRef = ref(storage, zipTitle)
    const url = await getDownloadURL(storageRef)

    // open new tab
    window.open(url)
  }

  return {
    download,
    handleDownloadFromZip,
    handleDownloadFromFirebase,
  }
}
