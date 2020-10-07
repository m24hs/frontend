// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Imports de estilo
import Layout from "../../../components/site/Layout";
import { PageTitle, PageDescription, Button, ViewHtml } from "../../../styles/global";

// Imports auxiliares
import api from "../../../services/api";
import { fetchData } from "../../../services/helpers";

const Servico = (props) => {
  // Rotas
  const router = useRouter();
  const { servico } = router.query;

  // State
  const [servicos, setServicos] = useState({});

  // Effect
  useEffect(() => {
    const getData = async () => {
      const response = await fetchData(
        api.get(`/services/${servico}?where=url`)
      );
      setServicos(response);
    };
    getData();
  }, [props]);

  return (
    <>
      <Head>
        <title>{servico} - M24</title>
      </Head>
      <Layout>
        <div>
          {servicos.title && (
            <>
              <PageTitle>{servicos.title}</PageTitle>
              <PageDescription>
                <ViewHtml dangerouslySetInnerHTML={{ __html: servicos.page }} />
              </PageDescription>
              {servicos.price > 0 ? (
                <Link href={`/servicos/${servico}/cadastro`}>
                  <Button secondary>Continuar</Button>
                </Link>
              ) : (
                <Link href={"https://api.whatsapp.com/send?phone=558007299123&text=*Mensagem%20autom%C3%A1tica*%20|%20Envie%20esta%20mensagem%20para%20confirmar%20seu%20pr%C3%A9-cadastro%20e%20receber%20mais%20informa%C3%A7%C3%B5es.&fbclid=IwAR31FZjOvBMjR-rl4OMPRYJGfjRoQTFscXkxa9dsuKElaqEl3pyG4r6HTOE"}>
                  <Button secondary>Saiba mais</Button>
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
