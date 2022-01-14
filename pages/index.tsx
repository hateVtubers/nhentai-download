import type { NextPage } from "next";
import Image from "next/image";
import nhentai from "public/nhentai.svg";
import Link from "next/link";
import { useDoujin } from "hooks/useDoujin";
import { DoujinList } from "components/DoujinList";
import Head from "next/head";

const Home: NextPage = () => {
  const { doujins, handleDoujin, handlerRemove } = useDoujin([]);
  return (
    <>
      <Head>
        <title>Search Doujin</title>
      </Head>
      <main className="bg-mine-shaft-500 p-4 rounded flex flex-col items-center gap-3 sm:w-[390px] w-80">
        <h1 className="uppercase font-mono text-lg">nhentai downloader</h1>
        <Image
          src={nhentai}
          alt="nhentai logo"
          width={250}
          height={100}
          layout="fixed"
          priority
        />
        <input
          type="number"
          className="outline-none bg-cod-gray-500 py-2 px-3 rounded text-sm w-10/12 lg:w-9/12 placeholder:text-amaranth-500"
          placeholder="example: 177013"
          onKeyUp={handleDoujin}
        />
        {doujins.length ? (
          <DoujinList doujins={doujins} handlerRemove={handlerRemove} />
        ) : null}
        {doujins.length ? (
          <Link href={`doujin/${doujins.join("/")}`}>
            <a className="bg-cod-gray-500 py-1 px-4 rounded-md">
              Conver to zip
            </a>
          </Link>
        ) : null}
      </main>
      <style jsx>{`
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
    </>
  );
};

export default Home;
