// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";

// Imports de estilo
import Layout from "../../components/site/Layout";
import { Container, Wrapper, ListPartners } from "../../styles/pages/parceiros";
import { PageTitle, PageDescription } from "../../styles/global";
import { fetchData } from "../../services/helpers";

// Imports auxiliares
import api from "../../services/api";

// Carrega data
const Parceiros = (props) => {
  // Variáveis auxiliares
  const path = process.env.NEXT_PUBLIC_SERVER_URL;
  const [dataSettings, setDataSettings] = useState({});
  const [dataPartners, setDataPartners] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Effect
  useEffect(() => {
    const getDataSettings = async () => {
      setDataSettings(true);
      const response = await fetchData(
        api.get("/settings/", {
          params: {
            columns: ["partners"],
          },
        })
      );
      setIsLoading(false);
      setDataSettings(response);
    };
    getDataSettings();

    const getDataPartners = async () => {
      setIsLoading(true);
      const response = await fetchData(api.get("/partners/"));
      setIsLoading(false);
      setDataPartners(response);
    };
    getDataPartners();
  }, [props]);

  return (
    <>
      <Head>
        <title>Parceiros - M24</title>
      </Head>
      <Layout loading={isLoading}>
        <Container>
          <PageTitle>Parceiros</PageTitle>
          <PageDescription
            dangerouslySetInnerHTML={{
              __html: dataSettings ? dataSettings.partners : "",
            }}
          />
          <Wrapper>
            <ListPartners>
              { Object.keys(dataPartners).length > 0 &&
                dataPartners.map((item, index) => (
                  <li key={index}>
                    <div>
                      <img src={path + item.image} />
                    </div>
                    <h3>{item.name}</h3>
                  </li>
                ))}
            </ListPartners>
          </Wrapper>
        </Container>
      </Layout>
    </>
  );
};
export default Parceiros;
