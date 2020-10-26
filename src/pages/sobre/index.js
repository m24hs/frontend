// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/site/Layout";

// Imports de estilo
import { Container } from "../../styles/pages/sobre";
import { PageTitle, PageDescription, ViewHtml } from "../../styles/global";
import api from "../../services/api";
import { fetchData } from "../../services/helpers";

const Sobre = (props) => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Effect
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await fetchData(
        api.get("/settings/",{
          params: {
            columns: ["about"]
          }
        })
      );
      setIsLoading(false);
      setData(response);
    };
    getData();
  }, [props]);

  return (
    <>
      <Head>
        <title>Sobre - M24</title>
      </Head>
      <Layout loading={isLoading}>
        <Container>
          <PageTitle>Sobre</PageTitle>
          <PageDescription>
            <ViewHtml
              dangerouslySetInnerHTML={{
                __html: data ? data.about : "",
              }}
            />
          </PageDescription>
        </Container>
      </Layout>
    </>
  );
};
export default Sobre;
