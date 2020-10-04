import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Layout from "../../../../../../components/site/Layout";
import {
  Container,
  Wrapper,
} from "../../../../../../styles/pages/servicos/cadastro/user/finalizacao/tipo";

import { Clock as ClockIcon } from "@styled-icons/bootstrap";
import { CheckCircle as CheckCircleIcon } from "@styled-icons/boxicons-solid";

const Finalizacao = () => {
  const router = useRouter();
  const { tipo, boleto } = router.query;

  const { name, setName } = useState("Marcelo Rossini");

  useEffect(() => {}, []);

  return (
    <>
      <Head>
        <title>Cadastro aprovado! - M24</title>
      </Head>
      <Layout hideFB backgroundColor="var(--color-text)">
        <Container>
          {tipo === "aprovado" ? (
            <>
              <h1 className="page-title-secondary">
                {tipo === "aprovado"
                  ? "Seu cadastro foi aprovado!"
                  : "Seu cadastro está em analise!"}
              </h1>
              <Wrapper tipo={tipo}>
              <div className="icon">
                    {tipo === "aprovado" ? <CheckCircleIcon /> : <ClockIcon />}
                  </div>
                  <p>
                    {tipo === "aprovado"
                      ? `${name}, obrigado por fazer parte do time M24, seu cadastro foi aprovado, fique atento aos emails, logo entraremos em contato com você!`
                      : `${name}, obrigado por querer fazer parte do time M24, verifique seu email, o boleto para pagamento foi enviado, estamos aguardando o pagamento para dar continuidade ao processo, logo entraremos em contato com você!`}
                  </p>
              </Wrapper>
            </>
          ) : (
            <>
              <h1 className="page-title-secondary">
                Sua assinatura está quase completa...
              </h1>
              <p className="page-description-secondary margin-3x">
                Faça o pagamento do boleto para efetivar sua assinatura. O
                boleto também será enviado por email caso queira pagar mais
                tarde.
              </p>
              <Wrapper tipo={tipo}>
                <iframe src={boleto} />
              </Wrapper>
            </>
          )}
        </Container>
      </Layout>
    </>
  );
};
export default Finalizacao;
