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
import NoSsr from "../../components/NoSsr";

/*
const Servicos = (props) => {
  return (
    <NoSsr>
      <Wrapper {...props}/>
    </NoSsr>
  );
};
*/

const Servicos = (props) => {
  // Variáveis auxiliares
  const router = useRouter();
  const [dataServicos,setDataServicos] = useState({});
  
  // Carregar
  useEffect(() => {
    const teste = async () => {
      const servicos = await fetchData(api.get("/services"));
      setDataServicos(servicos);
      console.log(dataServicos);
    }
    teste();
  },[props])

  return (
    <>
      <Head>
        <title>Serviços - M24</title>
      </Head>
      <Layout>
        <Container>
          <PageTitle>Serviços</PageTitle>
          <ListService>
            {Object.keys(dataServicos).length > 0 &&
              dataServicos.map((item, index) => (
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
                    <Link href={`${router.pathname}/${item.url}`}>
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

export default Servicos;