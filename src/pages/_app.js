import GlobalStyles from "../styles/global";
import Head from "next/head";
import cookieCutter from 'cookie-cutter';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="HandheldFriendly" content="true" />
      </Head>
      <Component {...pageProps} />
      <GlobalStyles />
    </>
  );
}

MyApp.getInitialProps = (ctx) => {
  if (ctx.router.pathname.includes("/admin")) {
    console.log();    
  }
  return {};
}

export default MyApp;
