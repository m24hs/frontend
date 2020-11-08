// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import * as gtag from "../services/gtag";

// Imports de estilo
import GlobalStyles from "../styles/global";
import Loading from "../components/Loading";
import Maintence from "../components/Maintence";

// Componente
function MyApp({ Component, pageProps }) {
  // Rotas
  const router = useRouter();

  // State
  const [isLoading, setIsLoading] = useState(false);

  // Verifica se mudou de rota
  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setIsLoading(true);
    const handleComplete = (url) => {
      gtag.pageview(url);
      return url === router.asPath && setIsLoading(false);
    }

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };

    //process.env.NEXT_PUBLIC_SERVER_URL
  });

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <meta name="HandheldFriendly" content="true" />
      </Head>
      <Loading show={isLoading} />
      {process.env.NEXT_PUBLIC_MAINTENCE === "true" ? (
        <Maintence />
      ) : (
        <Component {...pageProps} />
      )}
      <GlobalStyles />
    </>
  );
}

export default MyApp;
