import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Layout from "../../../../../components/site/Layout";
import {
  Container,
  Wrapper,
} from "../../../../../styles/pages/servicos/cadastro/user/contrato";

import {
  Square as SquareIcon,
  CheckSquareFill as CheckSquareFillIcon,
} from "@styled-icons/bootstrap/";

const Servicos = () => {
  const router = useRouter();
  const { servico, user } = router.query;

  const [checked, setChecked] = useState(false);

  const handleCheck = () => {
    setChecked(!checked);
  };

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
          <h1 className="page-title-secondary">Contrato</h1>
          <p className="page-description-secondary margin-3x">Leia atentamente o contrato, caso tenha alguma dúvida entre em contato com a gente.</p>
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
            <button className="btn-default" disabled={!checked} onClick={() => handleContinue()}>Continuar</button>
          </Wrapper>
        </Container>
      </Layout>
    </>
  );
};
export default Servicos;
