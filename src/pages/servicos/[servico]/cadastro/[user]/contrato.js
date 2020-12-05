// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";

// Imports de estilo
import Layout from "../../../../../components/site/Layout";
import Pdf from "../../../../../components/Pdf";
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
  const path = process.env.NEXT_PUBLIC_SERVER_URL;

  // Effect
  useEffect(() => {
    const getData = async () => {
      const response = await fetchData(
        api.get(`/services/${servico}`, {
          params: {
            where: "url",
            columns: ["contract"],
          },
        })
      );

      setServicos(response);
    };
    getData();
  }, [servico]);

  // Verifica se o usuário já fez o pagamento
  useEffect(() => {
    const getData = async () => {
      if (user) {
        const subscription = await api.get(`/subscriptions/${user}?where=iugu`);
        if (subscription.data.payment_method !== "") {
          router.push("/");
        }
      }
    };
    getData();
  }, [user]);

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
            Caso tenha alguma dúvida entre em
            contato com a gente.
          </PageDescription>
          <Wrapper className="margin-2x">
            <Pdf url={path + servicos.contract} />
            <div onClick={handleCheck}>
              {checked ? <CheckSquareFillIcon /> : <SquareIcon />}
              <label htmlFor="check">
                Eu li e concordo com os termos, quero continuar
              </label>
            </div>
            <Link
              href="/servicos/[servico]/cadastro/[user]/pagamento"
              as={`/servicos/${servico}/cadastro/${user}/pagamento`}
            >
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
