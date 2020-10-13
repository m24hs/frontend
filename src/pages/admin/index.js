// Imports padrão
import { useState } from "react";
import Head from "next/head";
import Layout from "../../components/admin/Layout";

// Imports de estilo
import { Container, Login } from "../../styles/pages/admin";
import LogoSvg from "../../assets/logo.svg";
import Form, { Input } from "../../components/Form";
import { Button, PageTitle } from "../../styles/global";


const Wrapper = () => {
  const [logged, setLogged] = useState(false);
    const handleLogin = (e) => {
        e.preventDefault();
        setLogged(true);
    };

  return (
    <>
      <Head>
        <title>Painel Administrativo - M24</title>
      </Head>
      {logged ? (
        <Layout>
          <Container>
          <PageTitle secondary>Bem vindo!</PageTitle>
            </Container>
        </Layout>
      ) : (
        <Login>
            <Form>
                <img src={LogoSvg} />
                <Input light={true} type="text" label="Usuário"/ >
                <Input light={true} type="text" label="Senha"/ >                
                <Button onClick={(e) => handleLogin(e)}>Entrar</Button>
            </Form>
        </Login>
      )}
    </>
  );
};
export default Wrapper;
