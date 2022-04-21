import JSZip from 'jszip'
import { Data, submitToFirebaseStorage } from 'libs/doujin'
import { saveAs } from 'file-saver'
import { useEffect, useState } from 'react'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase/client'
import { toast } from 'react-hot-toast'
// @ts-ignore
import imageToBase64 from 'image-to-base64/browser'

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

    /* old version */
    /* for await (const { images, id } of doujins) {
      const toastId = toast.loading(`Creating zip for ${id}...`)

      const imgFolder = zip.folder(id)
      for await (const [i, { url }] of images.entries()) {
        const base64 = await imageToBase64(url)
        imgFolder?.file(`${i + 1}.jpg`, base64, { base64: true })
      }

      toast.success(`Zip created for ${id}!`, { id: toastId })
    } */

    /* new version */
    await Promise.all(
      doujins.map(({ images, id }) => {
        const imgFolder = zip.folder(id)

        Promise.all(
          images.map(({ url }, i) => {
            const base64 = imageToBase64(url)

            imgFolder?.file(`${i + 1}.jpg`, base64, { base64: true })
          })
        )
      })
    )

    const toastTest = await toast.promise(
      submitToFirebaseStorage(
        await zip.generateAsync({ type: 'blob' }),
        zipTitle
      ),
      {
        loading: 'submitting zip to storage...',
        success: 'zip submitted!',
        error: 'error submitting zip!',
      }
    )

    return toastTest
  }

  useEffect(() => {
    getZip().then((data) => setDownload({ loading: false, data }))
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
