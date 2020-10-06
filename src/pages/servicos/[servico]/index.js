// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Imports de estilo
import Layout from "../../../components/site/Layout";
import { PageTitle, PageDescription, Button } from "../../../styles/global";

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
              <PageDescription>{servicos.page}</PageDescription>
              {servicos.price > 0 ? (
                <Link href={`/servicos/${servico}/cadastro`}>
                  <Button secondary>Continuar</Button>
                </Link>
              ) : (
                <Link href={alert("whats")}>
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
