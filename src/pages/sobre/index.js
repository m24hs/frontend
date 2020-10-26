// Imports padrão
import Head from "next/head";
import Layout from "../../components/site/Layout";

// Imports de estilo
import { Container } from "../../styles/pages/sobre";
import { PageTitle, PageDescription, ViewHtml } from "../../styles/global";
import api from "../../services/api";

// Carrega data
const getData = async () =>
  await api
    .get("/settings/",{
      params: {
        columns: ["about"]
      }
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
  const settings = await getData();
  return {
    props: settings,
  };
}

const Sobre = ({ error, data }) => {
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
              dangerouslySetInnerHTML={{
                __html: !error ? data.about : "",
              }}
            />
          </PageDescription>
        </Container>
      </Layout>
    </>
  );
};
export default Sobre;
