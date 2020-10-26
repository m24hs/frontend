// Imports padrão
import Head from "next/head";
import Layout from "../../components/site/Layout";
import { useRouter } from "next/router";

// Imports de estilo
import {
  Container,
  Wrapper,
  ListPosts,
  PostDivider,
  PostTitle,
  PostImage,
  PostText,
  Pagination,
} from "../../styles/pages/dicas";
import { PageTitle, ViewHtml, Divider, Button } from "../../styles/global";
import {
  ArrowIosBackOutline as BackIcon,
  ArrowIosForwardOutline as ForwardIcon,
} from "@styled-icons/evaicons-outline";

// Imports auxiliares
import api from "../../services/api";

// Carrega data
const getDataPosts = async (page = "1") =>
  await api
    .get("/posts/", {
      params: {
        page,
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

export async function getServerSideProps(context) {
  const page = context.query.page;
  const posts = await getDataPosts(page);

  return {
    props: { posts },
  };
}

const Dicas = ({ posts }) => {
  // Variáveis auxiliares
  const path = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
  const page = router.query.page ? parseInt(router.query.page) : 1;

  const handleBackPage = () => {
    router.push({ pathname: "/dicas", query: { page: page - 1 } });
  };

  const handleNextPage = () => {
    router.push({ pathname: "/dicas", query: { page: page + 1 } });
  };

  return (
    <>
      <Head>
        <title>Dicas de Gestão - M24</title>
      </Head>
      <Layout>
        <Container>
          <PageTitle>Dicas de Gestão </PageTitle>
          <Wrapper>
            <ListPosts>
              {!posts.error &&
                posts.data.rows.map((item, index) => (
                  <li>
                    <PostDivider>{index !== 0 && <Divider />}</PostDivider>
                    <PostTitle>
                      <PageTitle small>{item.title}</PageTitle>
                    </PostTitle>
                    <PostImage>
                      <img src={path + item.image} />
                    </PostImage>
                    <PostText>
                      <ViewHtml
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      />
                    </PostText>
                  </li>
                ))}
            </ListPosts>
            {!posts.error && posts.data.count > 10 && (
              <Pagination>
                {page !== 1 && (
                  <Button secondary onClick={() => handleBackPage()}>
                    <BackIcon />
                  </Button>
                )}
                <div>{page}</div>
                {page * 10 < posts.data.count && (
                  <Button secondary onClick={() => handleNextPage()}>
                    <ForwardIcon />
                  </Button>
                )}
              </Pagination>
            )}
          </Wrapper>
        </Container>
      </Layout>
    </>
  );
};
export default Dicas;
