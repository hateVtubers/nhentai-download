import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Layout } from "components/Layout";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#0D0D0D" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta
          name="description"
          content='An unofficial website for download doujin from nhentai"'
        />
        <meta name='keywords' content='Keywords' />
        <link href="/favicon.ico" rel="icon" />
        <link rel="apple-touch-icon" href="/favicon.ico"></link>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
