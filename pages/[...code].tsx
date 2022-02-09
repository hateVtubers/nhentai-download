import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Card } from "components/Card";
import { getDoujinData, updateDoujinData } from "libs/doujin";
import { Data } from "libs/doujin";
import { Download } from "components/Download";

type Props = {
  datas: Data[];
  server:
    | ({
        Key: string;
      } | null)[]
    | undefined;
};

const DoujinDownload: NextPage<Props> = ({ datas, server }) => {
  console.log(server);
  const urlArray = datas.map(
    ({ id }) =>
      `${process.env.NEXT_PUBLIC_SUPABASE_URL_DOWNLOAD}/storage/v1/object/public/base64/${id}.json`
  );
  const map = (s: string) => datas.map(({ id }) => id).join(s);
  return (
    <>
      <Head>
        <title>{map("-")}</title>
      </Head>
      <main className="bg-mine-shaft-500 my-5 p-4 rounded flex items-center flex-col gap-4 max-w-[300px]">
        <Card data={datas} />
        <Download doujins={datas} map={map("-")} urlArray={urlArray} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const codes = [...new Set(query.code)]; // remove duplicated codes from query(url)
  const datas = await getDoujinData(codes);

  const server = await updateDoujinData(codes); // updata doujin are not exists in database

  return {
    props: {
      datas,
      server,
    },
  };
};

export default DoujinDownload;
