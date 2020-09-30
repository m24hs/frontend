import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../../../components/site/Layout";

import { Container } from "../../../styles/pages/servicos";

const Servico = () => {
  const router = useRouter();
  const { servico } = router.query;

  return (
    <>
      <Head>
        <title>{servico} - M24</title>
      </Head>
      <Layout>
        <Container>
          <h1 className="page-title">{servico}</h1>
          <p className="page-description margin-2x"></p>
          <button className="service-button btn-default">
            <Link href={`/servicos/${servico}/cadastro`}>Saiba mais</Link>
          </button>
        </Container>
      </Layout>
    </>
  );
};
export default Servico;
