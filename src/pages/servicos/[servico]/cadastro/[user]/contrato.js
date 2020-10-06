// Imports padrão
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Imports de estilo
import Layout from "../../../../../components/site/Layout";
import { PageTitle, PageDescription, Button } from "../../../../../styles/global";
import {
  Container,
  Wrapper,
} from "../../../../../styles/pages/servicos/cadastro/user/contrato";
import {
  Square as SquareIcon,
  CheckSquareFill as CheckSquareFillIcon,
} from "@styled-icons/bootstrap/";

const Servicos = () => {
  // Rotas
  const router = useRouter();
  const { servico, user } = router.query;

  // State
  const [checked, setChecked] = useState(false);

  // Marca check
  const handleCheck = () => {
    setChecked(!checked);
  };

  // Próxima pagina
  const handleContinue = () => {
    router.push(`/servicos/${servico}/cadastro/${user}/pagamento`);
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
              data="/paper.pdf"
              type="application/pdf"
              width="100%"
              height="600px"
            >
              <p>
                <a href="/paper.pdf" target="_blank">
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
            <Button secondary
              disabled={!checked}
              onClick={() => handleContinue()}
            >
              Continuar
            </Button>
          </Wrapper>
        </Container>
      </Layout>
    </>
  );
};
export default Servicos;
