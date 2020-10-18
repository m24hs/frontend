// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Imports de estilo
import Layout from "../../../components/site/Layout";
import {
  PageTitle,
  PageDescription,
  Button,
  ViewHtml,
} from "../../../styles/global";

// Imports auxiliares
import api from "../../../services/api";

// Carrega data
const getData = async (context) =>
  await api
    .get(`services/${context.query.servico}`, {
      params: { 
        where: "url",
        columns: ["title", "page", "price"] },
    })
    .then((res) => ({
      error: false,
      data: res.data,
    }))
    .catch(() => ({
      error: true,
      data: null,
    }));

export async function getServerSideProps(context) {
  const servicos = await getData(context);
  
  return {
    props: servicos,
  };
}

const Servico = ({ error, data }) => {
  // Rotas
  const router = useRouter();
  const { servico } = router.query;

  return (
    <>
      <Head>
        <title>{!error && data.title} - M24</title>
      </Head>
      <Layout>
        {error && <div>Erro</div>}
        <div>
          {!error && (
            <>
              <PageTitle>{data.title}</PageTitle>
              <PageDescription>
                <ViewHtml dangerouslySetInnerHTML={{ __html: data.page }} />
              </PageDescription>
              {data.price > 0 ? (
                <Button
                  secondary
                  onClick={() => {
                    location.href = `/servicos/${servico}/cadastro`;
                  }}
                >
                  Continuar
                </Button>
              ) : (
                <Link
                  href={
                    "https://api.whatsapp.com/send?phone=558007299123&text=*Mensagem%20autom%C3%A1tica*%20|%20Envie%20esta%20mensagem%20para%20confirmar%20seu%20pr%C3%A9-cadastro%20e%20receber%20mais%20informa%C3%A7%C3%B5es.&fbclid=IwAR31FZjOvBMjR-rl4OMPRYJGfjRoQTFscXkxa9dsuKElaqEl3pyG4r6HTOE"
                  }
                >
                  <a>
                    <Button secondary>Saiba mais</Button>
                  </a>
                </Link>
              )}
            </>
          )}
        </div>
      </Layout>
    </>
  );
};
export default Servico;
