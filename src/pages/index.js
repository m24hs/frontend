// Imports padrão
import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

// Imports de estilo
import Layout from "../components/site/Layout";
import { Button } from "../styles/global";
import { Container, VideoWrapper } from "../styles/pages/index";
import Background from "../assets/home/background.mp4";

const Index = () => {
  useEffect(() => {
    const video = document.querySelector(".home-background");
    video.play();
  }, []);

  return (
    <>
      <Head>
        <title>M24 - Soluções de Gestão Preventiva</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout backgroundColor="none">
        <Container>
          <VideoWrapper>
            <video autoPlay muted loop className="home-background">
              <source src={Background} type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>
          </VideoWrapper>
          <div className="main">
            <h1>CUIDAR DA SUA MOTO</h1>
            <h3>NÃO TEM PREÇO, <span>TEM VALOR.</span></h3>
          </div>
          <Link href="/servicos">
            <Button secondary>Contrate Nosso Plano</Button>
          </Link>
        </Container>
      </Layout>
    </>
  );
};
export default Index;
