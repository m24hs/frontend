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
import { fetchData } from "../../../services/helpers";

const Servico = (props) => {
  // Rotas
  const router = useRouter();
  const { servico } = router.query;

  return (
    <>
      <Head>
        <title>{props.servicos.title && props.servicos.title} - M24</title>
      </Head>
      <Layout>
        <div>
          {props.servicos && (
            <>
              <PageTitle>{props.servicos.title}</PageTitle>
              <PageDescription>
                <ViewHtml
                  dangerouslySetInnerHTML={{ __html: props.servicos.page }}
                />
              </PageDescription>
              {props.servicos.price > 0 ? (
                <Link href={`/servicos/${servico}/cadastro`}>
                  <a>
                    <Button secondary>Continuar</Button>
                  </a>
                </Link>
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

export async function getStaticPaths() {
  const servicos = await fetchData(api.get(`/services/`));

  const paths = servicos.map((item) => ({
    params: { servico: item.url },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({params}) {
  // Servico
  const { servico } = params;
  // Carregar
  const servicos = await fetchData(api.get(`/services/${servico}?where=url`));

  return {
    props: {
      servicos,
    },
  };
}

export default Servico;
