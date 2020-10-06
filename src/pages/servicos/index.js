// Imports padrão
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

// Imports de estilo
import Layout from "../../components/site/Layout";
import { Divider, PageTitle, Button } from "../../styles/global";
import { Container, ViewHtml } from "../../styles/pages/servicos/index.js";
import ImgMotor from "../../assets/servicos/motor.jpg";
import ImgRoda from "../../assets/servicos/roda.jpg";
import ImgDirecao from "../../assets/servicos/direcao.jpg";

// Imports auxiliares
import api from "../../services/api";
import { fetchData } from "../../services/helpers";

const Servicos = (props) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Serviços - M24</title>
      </Head>
      <Layout>
        <Container>
          <PageTitle>Serviços</PageTitle>
          <ul className="margin-3x">
            {props.servicos.map((item, index) => (
              <>
                {index !== 0 && (
                  <li>
                    <Divider />
                  </li>
                )}
                <li>
                  <div className={`services margin-2x ${(index % 2) !== 0 ? "right" : ""}`}>
                    <PageTitle small>{item.title}</PageTitle>
                    <div className="service-img">
                      <img src={ImgRoda} />
                    </div>
                    <ViewHtml
                      dangerouslySetInnerHTML={{ __html: item.description }}
                    />
                    <Link href={`${router.pathname}/${item.url}`}>
                      <Button secondary>
                        Saiba mais
                      </Button>
                    </Link>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </Container>
      </Layout>
    </>
  );
};
export default Servicos;

export async function getStaticProps() {
  // Carregar
  const servicos = await fetchData(api.get("/services"));

  return {
    props: {
      servicos,
    },
  };
}
