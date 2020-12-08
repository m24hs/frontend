// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

// Imports de estilo
import Layout from "../components/site/Layout";
import { Button } from "../styles/global";
import { Container, Main, Label, VideoWrapper } from "../styles/pages/index";
import Background from "../assets/home/bannerInicio.jpeg";

// Imports Auxiliares
import api from "../services/api";
import { fetchData } from "../services/helpers";

const Index = (props) => {
  useEffect(() => {
    const video = document.querySelector(".home-background");
    video.play();
  }, []);

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Effect
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await fetchData(
        api.get("/settings/", {
          params: {
            columns: ["home"],
          },
        })
      );
      setIsLoading(false);
      setData(response);
    };
    getData();
  }, [props]);

  return (
    <>
      <Head>
        <title>M24 - Soluções de Gestão Preventiva</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout backgroundColor="none">
        <Container>
          <VideoWrapper>
          </VideoWrapper>
          <Main>
            <h1>CUIDAR DA SUA MOTO</h1>
            <h3>
              NÃO TEM PREÇO, <span>TEM VALOR.</span>
            </h3>
          </Main>
          <Label
            dangerouslySetInnerHTML={{
              __html: data ? data.home : "",
            }}
          />
          <Link href="/servicos">
            <Button secondary>Contrate Nosso Plano</Button>
          </Link>
        </Container>
      </Layout>
    </>
  );
};
export default Index;
