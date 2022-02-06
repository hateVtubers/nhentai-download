import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { Card } from "components/Card";
import { getDoujinData, updateDoujinData } from "libs/doujin";
import { Data } from "libs/doujin";
import { Download } from "components/Download";

type Props = {
  datas: Data[];
};

const DoujinDownload: NextPage<Props> = ({ datas }) => {
  const map = (s: string) => datas.map(({ id }) => id).join(s);
  return (
    <>
      <Head>
        <title>{map("-")}</title>
      </Head>
      <main className="bg-mine-shaft-500 p-4 rounded flex items-center flex-col gap-4">
        <Card data={datas} />
        <Download doujins={datas} map={map("-")} />
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const codes = [...new Set(query.code)]; // remove duplicated codes from query(url)
  const datas = await getDoujinData(codes);

  updateDoujinData(codes); // updata doujin are not exists in database

  return {
    props: {
      datas,
    },
  };
};

export default DoujinDownload;