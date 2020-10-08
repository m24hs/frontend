// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

// Imports de estilo
import Layout from "../../../../../components/site/Layout";
import {
  PageTitle,
  PageDescription,
  Button,
} from "../../../../../styles/global";
import {
  Container,
  Wrapper,
} from "../../../../../styles/pages/servicos/cadastro/user/contrato";
import {
  Square as SquareIcon,
  CheckSquareFill as CheckSquareFillIcon,
} from "@styled-icons/bootstrap/";

// Imports auxiliares
import api from "../../../../../services/api";
import { fetchData } from "../../../../../services/helpers";

const Servicos = (props) => {
  // Rotas
  const router = useRouter();
  const { servico, user } = router.query;

  // State
  const [checked, setChecked] = useState(false);
  const [servicos, setServicos] = useState({});

  // Effect
  useEffect(() => {
    const getData = async () => {
      const response = await fetchData(
        api.get(`/services/${servico}?where=url`)
      );
      setServicos(response);
    };
    getData();
  }, [props]);

  // Marca check
  const handleCheck = () => {
    setChecked(!checked);
  };

  return (
    <>
      <Head>
        <title>Contrato - M24</title>
      </Head>
      <Layout hideFB backgroundColor="var(--color-text)">
        <Container>
          <PageTitle secondary>Contrato</PageTitle>
          <PageDescription secondary>
            Leia atentamente o contrato, caso tenha alguma dúvida entre em
            contato com a gente.
          </PageDescription>
          <Wrapper className="margin-2x">
            <object
              data={servicos.contract}
              type="application/pdf"
              width="100%"
              height="600px"
            >
              <p>
                <a
                  download="contrato.pdf"
                  href={servicos.contract}
                  target="_blank"
                >
                  Seu navegador não permite a exibição do PDF, clique aqui para
                  fazer o download.
                </a>
              </p>
            </object>
            <div onClick={handleCheck}>
              {checked ? <CheckSquareFillIcon /> : <SquareIcon />}
              <label htmlFor="check">
                Eu li e concordo com os termos, quero continuar
              </label>
            </div>
            <Link href="/servicos/[servico]/cadastro/[user]/pagamento" as={`/servicos/${servico}/cadastro/${user}/pagamento`}>
              <Button secondary disabled={!checked}>
                Continuar
              </Button>
            </Link>
          </Wrapper>
        </Container>
      </Layout>
    </>
  );
};
export default Servicos;
