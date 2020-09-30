import Head from "next/head";
import Layout from "../../components/site/Layout";

import { Container } from "../../styles/pages/parceiros";

const Parceiros = () => {
  return (
    <>
      <Head>
        <title>Parceiros - M24</title>
      </Head>
      <Layout>
        <Container>
          <h1 className="page-title">Parceiros</h1>
          <p className="page-description margin-2x">
          
          </p>
        </Container>
      </Layout>
    </>
  );
};
export default Parceiros;
