import Head from "next/head";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>nhentaiDownloader</title>
      </Head>
      <div className="bg-cod-gray-500 min-h-screen text-amaranth-500 grid place-items-center">
        {children}
      </div>
    </>
  );
};
