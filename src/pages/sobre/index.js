// Imports padrão
import Head from "next/head";
import Layout from "../../components/site/Layout";

// Imports de estilo
import { Container } from "../../styles/pages/sobre";
import { PageTitle, PageDescription, ViewHtml } from "../../styles/global";
import api from "../../services/api.js";

const getData = async () =>
  await api
    .get("/settings/")
    .then((res) => res.data)
    .catch(() => ({}));

export async function getServerSideProps(context) {
  const settings = await getData();
  return {
    props: { settings },
  };
}

const Sobre = (props) => {
  return (
    <>
      <Head>
        <title>Sobre - M24</title>
      </Head>
      <Layout>
        <Container>
          <PageTitle>Sobre</PageTitle>
          <PageDescription>
            <ViewHtml
              dangerouslySetInnerHTML={{ __html: props.settings ? props.settings.about : "" }}
            />
          </PageDescription>
        </Container>
      </Layout>
    </>
  );
};
export default Sobre;
