import Head from "next/head";
import Layout from "../../components/site/Layout";

import { Container } from "../../styles/pages/parceiros";
import { PageTitle, PageDescription } from "../../styles/global";

const Parceiros = () => {
  return (
    <>
      <Head>
        <title>Parceiros - M24</title>
      </Head>
      <Layout>
        <Container>
          <PageTitle>Parceiros</PageTitle>
          <PageDescription>
          
          </PageDescription>
        </Container>
      </Layout>
    </>
  );
};
export default Parceiros;
