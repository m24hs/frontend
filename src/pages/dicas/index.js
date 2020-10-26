// Imports padrão
import { useState, useEffect } from "react";
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
import { fetchData } from "../../services/helpers";

const Dicas = (props) => {
  // Variáveis auxiliares
  const path = process.env.NEXT_PUBLIC_SERVER_URL;
  const router = useRouter();
  const page = router.query.page ? parseInt(router.query.page) : 1;
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const response = await fetchData(
        api.get("/posts/", {
          params: {
            page,
          },
        })
      );
      setIsLoading(false);
      setData(response);
    };
    getData();
  }, [props]);


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
      <Layout loading={isLoading}>
        <Container>
          <PageTitle>Dicas de Gestão </PageTitle>
          <Wrapper>
            <ListPosts>
              {data.rows && Object.keys(data.rows).length > 0 &&
                data.rows.map((item, index) => (
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
            {data.count && data.count > 10 && (
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
