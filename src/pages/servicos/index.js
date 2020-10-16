// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Imports de estilo
import Layout from "../../components/site/Layout";
import { Divider, PageTitle, Button, ViewHtml } from "../../styles/global";
import {
  Container,
  ListService,
  ListItem,
  ListImage,
} from "../../styles/pages/servicos/index.js";

// Imports auxiliares
import api from "../../services/api";
import { fetchData } from "../../services/helpers";

const Servicos = (props) => {
  // Variáveis auxiliares
  const router = useRouter();
  
  return (
    <>
      <Head>
        <title>Serviços - M24</title>
      </Head>
      <Layout>
        <Container>
          <PageTitle>Serviços</PageTitle>
          <ListService>
            {Object.keys(props.servicos).length > 0 &&
              props.servicos.map((item, index) => (
                <>
                  <ListItem key={index} right={index % 2 !== 0}>
                    <span>{index !== 0 && <Divider />}</span>
                    <PageTitle small>{item.title}</PageTitle>
                    <ListImage>
                      <img src={item.image} />
                    </ListImage>
                    <ViewHtml
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <Link href={`${router.pathname}/${item.url}`} shallow={true} >
                      <Button secondary>Saiba mais</Button>
                    </Link>
                  </ListItem>
                </>
              ))}
          </ListService>
        </Container>
      </Layout>
    </>
  );
};

Servicos.getInitialProps = async (ctx) => {
  const servicos = await fetchData(api.get("/services"));

  return { servicos }
}

export default Servicos;