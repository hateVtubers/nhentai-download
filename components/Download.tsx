import { Data } from 'libs/doujin'
import { useDownload } from 'hooks/useDownload'

type Props = {
  doujins: Data[]
}

export const Download = ({ doujins }: Props) => {
  const {
    download: { loading, data },
    handleDownloadFromZip,
    handleDownloadFromFirebase,
  } = useDownload(doujins)

  return (
    <button
      onClick={data ? handleDownloadFromZip : handleDownloadFromFirebase}
      disabled={loading}
      className={`bg-cod-gray-500 py-1 px-3 rounded ${
        loading ? 'cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      {loading ? 'Creating...' : 'Download'}
    </button>
  )
}
