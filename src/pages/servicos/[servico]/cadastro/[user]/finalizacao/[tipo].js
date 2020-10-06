// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Imports de estilo
import Layout from "../../../../../../components/site/Layout";
import { PageTitle, PageDescription } from "../../../../../../styles/global";
import {
  Container,
  Wrapper,
} from "../../../../../../styles/pages/servicos/cadastro/user/finalizacao/tipo";
import { CheckCircle as CheckCircleIcon } from "@styled-icons/boxicons-solid";

// Imports auxiliares
import api from "../../../../../../services/api";

const Finalizacao = (props) => {
  // Rotas
  const router = useRouter();
  const { user, tipo, boleto } = router.query;

  // State
  const [name, setName] = useState("");

  // Effect
  useEffect(() => {
    const getData = async () => {
      const response = await api.get(`/users/${user}?type=iugu`);
      setName(response.data ? response.data.name : "");
    };
    getData();
  }, [props]);

  return (
    <>
      <Head>
        <title>
          {tipo === "aprovado" ? "Cadastro aprovado!" : "Pagamento"} - M24
        </title>
      </Head>
      <Layout hideFB backgroundColor="var(--color-text)">
        <Container>
          {tipo === "aprovado" ? (
            <>
              <PageTitle secondary>Seu cadastro foi aprovado!</PageTitle>
              <Wrapper tipo={tipo}>
                <div className="icon">
                  <CheckCircleIcon />
                </div>
                <p>
                  {name}, obrigado por fazer parte do time M24, seu cadastro foi
                  aprovado, fique atento aos emails, logo entraremos em contato
                  com você!
                </p>
              </Wrapper>
            </>
          ) : (
            <>
              <PageTitle secondary>
                Sua assinatura está quase completa...
              </PageTitle>
              <PageDescription secondary>
                {name}, faça o pagamento do boleto para efetivar sua assinatura.
                O boleto também será enviado por email caso queira pagar mais
                tarde.
              </PageDescription>
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
