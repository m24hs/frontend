// Imports padrão
import Head from "next/head";
import Layout from "../../components/site/Layout";

// Imports de estilo
import { Container, Wrapper, ListPartners } from "../../styles/pages/parceiros";
import { PageTitle, PageDescription } from "../../styles/global";

// Imports auxiliares
import api from "../../services/api";

// Carrega data
const getDataPosts = async () =>
  await api
    .get("/posts/")
    .then((res) => ({
      error: false,
      data: res.data,
    }))
    .catch(() => ({
      error: true,
      data: null,
    }));

export async function getServerSideProps(context) {
  const posts = await getDataPosts();
  return {
    props: { posts },
  };
}

const Parceiros = ({ settings, posts }) => {
  const path = process.env.NEXT_PUBLIC_SERVER_URL;

  return (
    <>
      <Head>
        <title>Parceiros - M24</title>
      </Head>
      <Layout>
        <Container>
          <PageTitle>Parceiros</PageTitle>
          <Wrapper>
            <ListPartners>
              {!posts.error &&
                posts.data.map((item, index) => (
                  <li>
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
