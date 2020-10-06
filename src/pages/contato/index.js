// Imports padrão
import Head from "next/head";
import Layout from "../../components/site/Layout";

// Imports de estilo
import { Container } from "../../styles/pages/contato";
import { PageTitle, PageDescription, Button } from "../../styles/global";

// Imports auxiliares
import Form, { Input } from "../../components/Form";

const Contato = () => {
  return (
    <>
      <Head>
        <title>Contato - M24</title>
      </Head>
      <Layout>
        <Container>
          <PageTitle>Contato</PageTitle>
          <PageDescription>
            Tem alguma dúvida, sugestão ou gostaria de saber mais sobre a nossa
            proposta? Preencha seus dados corretamente e espere nosso contato em
            breve!
          </PageDescription>
          <Form className="form-contact">
            <Input type="text" label="Nome completo" />
            <Input type="text" label="Email" />
            <Input type="text" label="Telefone / Celular" />
            <Input type="textarea" label="Mensagem" rows="4" />
            <Button
              secondary
              type="button"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Continuar
            </Button>
          </Form>
        </Container>
      </Layout>
    </>
  );
};
export default Contato;
