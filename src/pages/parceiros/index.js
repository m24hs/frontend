// Imports padrão
import Head from "next/head";

// Imports de estilo
import Layout from "../../components/site/Layout";
import { Container, Wrapper, ListPartners } from "../../styles/pages/parceiros";
import { PageTitle, PageDescription } from "../../styles/global";

// Imports auxiliares
import api from "../../services/api";

// Carrega data
const getDataSettings = async () =>
  await api
    .get("/settings/", {
      params: {
        columns: ["partners"],
      },
    })
    .then((res) => ({
      error: false,
      data: res.data,
    }))
    .catch(() => ({
      error: true,
      data: null,
    }));

// Carrega data
const getDataPartners = async () =>
  await api
    .get("/partners/")
    .then((res) => ({
      error: false,
      data: res.data,
    }))
    .catch(() => ({
      error: true,
      data: null,
    }));

export async function getServerSideProps(context) {
  const settings = await getDataSettings();
  const partners = await getDataPartners();
  return {
    props: { settings, partners },
  };
}

const Parceiros = ({ settings, partners }) => {
  const path = process.env.NEXT_PUBLIC_SERVER_URL;

  return (
    <>
      <Head>
        <title>Parceiros - M24</title>
      </Head>
      <Layout>
        <Container>
          <PageTitle>Parceiros</PageTitle>
          <PageDescription
            dangerouslySetInnerHTML={{
              __html: !settings.error ? settings.data.partners : "",
            }}
          />
          <Wrapper>
            <ListPartners>
              {!partners.error &&
                partners.data.map((item, index) => (
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
