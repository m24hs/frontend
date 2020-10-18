// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/site/Layout";

// Imports de estilo
import { Wrapper } from "../../styles/pages/contato";
import { PageTitle, PageDescription, Button } from "../../styles/global";
import Img from "../../assets/contato.jpg";

// Imports auxiliares
import Form, { Input } from "../../components/Form";
import api from "../../services/api";

// Carrega data
const getData = async () =>
  await api
    .get("/settings/")
    .then((res) => ({
      error: false,
      data: res.data,
    }))
    .catch(() => ({
      error: true,
      data: null,
    }));

export async function getServerSideProps(context) {
  const settings = await getData();
  return {
    props: settings,
  };
}

const Contato = ({ error,data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  // Salvar
  const handleSend = async () => {
    // Limpa erros
    setIsError("");

    // Se houver error no form
    const numberErrors = await countError(".form-contact");
    if (numberErrors > 0) {
      return;
    }

    // Marca como loading
    setIsLoading(true);

    // Envia
    const formData = getFormData(".form-contact");
    const response = await api.post(`/contact`, formData);

    // Remove loading
    setIsLoading(false);

    // Retorna
    if (response.data.status === "success") {
    } else {
      setIsError(response.data.data);
    }
  };

  return (
    <>
      <Head>
        <title>Contato - M24</title>
      </Head>
      <Layout loading={isLoading} error={isError}>
        <div>
          <PageTitle>Contato</PageTitle>
          <PageDescription
            dangerouslySetInnerHTML={{
              __html: !error ? data.contact : "",
            }}
          />
          <Wrapper>
            <Form className="form-contact">
              <Input
                type="text"
                name="name"
                label="Nome completo"
                validate={(e) => {
                  return [
                    {
                      expression: e.value.length === 0,
                      message: "Preencha o Nome!",
                    },
                  ];
                }}
              />
              <Input
                type="text"
                name="email"
                label="Email"
                validate={(e) => {
                  return [
                    {
                      expression: e.value.length === 0,
                      message: "Preencha o Email!",
                    },
                  ];
                }}
              />
              <Input
                type="mask"
                name="phone"
                label="Telefone / Celular"
                mask="(99) 999999999"
                maskPlaceholder=" "
                validate={(e) => {
                  const phone = e.value
                    .replaceAll("(", "")
                    .replaceAll(")", "")
                    .replaceAll(" ", "")
                    .trim();

                  return [
                    {
                      expression: phone.length === 0,
                      message: "Preencha o Telefon / Celular!",
                    },
                  ];
                }}
              />
              <Input
                type="textarea"
                name="message"
                label="Mensagem"
                rows="4"
              />
              <Button
                secondary
                type="button"
                margin="16px 0 0 0"
                onClick={() => {
                  handleSend();
                }}
              >
                Continuar
              </Button>
            </Form>
            <div>
              <img src={Img} />
            </div>
          </Wrapper>
        </div>
      </Layout>
    </>
  );
};
export default Contato;
