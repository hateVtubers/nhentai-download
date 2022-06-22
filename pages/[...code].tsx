import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Card } from 'components/Card'
import { getDoujins, Data } from 'libs/doujin'
import { Download } from 'components/Download'

type Props = {
  doujins: Data[]
}

const DoujinDownload: NextPage<Props> = ({ doujins }) => {
  return (
    <>
      <Head>
        <title>{doujins.map(({ id }) => id).join('-')}</title>
      </Head>
      <main className='bg-mine-shaft-500 my-5 p-4 rounded flex items-center flex-col gap-4'>
        <Card doujins={doujins} />
        <Download doujins={doujins} />
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const codes = [...new Set(query.code)] // remove duplicated codes from query(url)
  const doujins = await getDoujins(codes)

  if (!doujins.length) return { redirect: { destination: '/404', permanent: false } }

  return {
    props: {
      doujins,
    },
  }
}

export default DoujinDownload
