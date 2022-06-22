import JSZip from 'jszip'
import { Data, submitToFirebaseStorage } from 'libs/doujin'
import { saveAs } from 'file-saver'
import { useEffect, useState } from 'react'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from 'libs/firebase/client'
import { toast } from 'react-hot-toast'
import { getBase64 } from 'libs/base64image'

type Download = {
  loading: boolean
  data: null | Blob
}

export const useDownload = (doujins: Data[]) => {
  const [download, setDownload] = useState<Download>({
    loading: true,
    data: null,
  })
  const zip = new JSZip()
  const zipTitle = `[${doujins.map(({ id }) => id).join('-')}].zip`
  const listRef = ref(storage)

  const getZip = async () => {
    const { items } = await listAll(listRef)

    if (items.find(({ name }) => name === zipTitle)) return null

    await Promise.all(
      doujins.map(async ({ id, images }) => {
        const imgFolder = zip.folder(id)
        const toastId = toast.loading(`converting ${id} doujin to zip...`)

        await Promise.all(
          images.map(async ({ url }, i) => {
            const { base64 } = await getBase64(url)
            const arrayExtension = url.toLowerCase().split('')
            const extension = arrayExtension
              .slice(-3)
              .toString()
              .replaceAll(',', '')

            const imgName = `${i + 1}.${extension}`

            imgFolder?.file(imgName, base64, { base64: true })
          })
        )

        toast.success(`doujin ${id} is converted to zip!`, {
          id: toastId,
        })
      })
    )

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

  const handleDownload = () => {
    saveAs(download.data as Blob, zipTitle)
  }

  const handleDownloadFromFirebase = async () => {
    const storageRef = ref(storage, zipTitle)
    const url = await getDownloadURL(storageRef)

    window.open(url) // open new tab
  }

  return {
    download,
    handleDownload,
    handleDownloadFromFirebase,
  }
}
