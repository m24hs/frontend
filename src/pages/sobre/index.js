// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/site/Layout";

// Imports de estilo
import { Container } from "../../styles/pages/sobre";
import { PageTitle, PageDescription, ViewHtml } from "../../styles/global";
import api from "../../services/api.js";
import { fetchData } from "../../services/helpers.js";

const Sobre = (props) => {
  // Effect
  const [data, setData] = useState({});
  useEffect(() => {
    const getData = async () => {
      const response = await fetchData(
        api.get(`/settings/`)
      );
      setData(response);
    };
    getData();
  }, [props]);

  return (
    <>
      <Head>
        <title>Sobre - M24</title>
      </Head>
      <Layout>
        <Container>
          <PageTitle>Sobre</PageTitle>
          <PageDescription>
            <ViewHtml dangerouslySetInnerHTML={{ __html: data.about ? data.about : "" }} / >
          </PageDescription>
        </Container>
      </Layout>
    </>
  );
};
export default Sobre;
