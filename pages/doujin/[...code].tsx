import type {
  GetServerSideProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import Head from "next/head";
import { Card } from "components/Card";
import { Download } from "components/Download";
import { useDoujin } from "hooks/useDoujin";
import { Doujin } from "nhentai";

const DoujinDownload: NextPage = ({
  doujin,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const { doujins, handlerRemove } = useDoujin<Doujin[]>(
    JSON.parse(doujin as string)
  );
  const map = (separator: string) => doujins.map(({ id }) => id).join(separator);
  return (
    <>
      <Head>
        <title>{map(" ")}</title>
      </Head>
      <main className="bg-mine-shaft-500 p-4 rounded flex items-center flex-col gap-4">
        <Card doujin={doujins} handlerRemove={handlerRemove} />
        <Download url={map("/")} doujin={doujins} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { getDoujin } = await import("lib/doujin");

  const url = query.code as string[];

  const doujin = JSON.stringify(await getDoujin(url));
  return {
    props: {
      doujin,
    },
  };
};

export default DoujinDownload;
