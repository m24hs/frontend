// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import Layout from "../../components/admin/Layout";

// Imports de estilo
import { Container, Login } from "../../styles/pages/admin";
import LogoSvg from "../../assets/logo.svg";
import Form, { Input } from "../../components/Form";
import { Button, PageTitle } from "../../styles/global";
import { countError, getFormData } from "../../services/helpers";
import CryptoJS from "crypto-js";
import cookieCutter from 'cookie-cutter';

const Wrapper = (props) => {
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (cookieCutter.get('logged') === "true") {
      setLogged(true);
    }
  },[props]);

  const handleLogin = async (e) => {
    e.preventDefault();
    //setIsError("");

    // Se houver error no form
    const numberErrors = await countError(".form-login");
    if (numberErrors > 0) {
      return;
    }

    // Form
    const formData = getFormData(".form-login");

    // Loga
    if (
      formData.user === "admin" &&
      CryptoJS.MD5(formData.pass).toString() ===
        "2f704b2e1d1ccf4a0baf3e03fe4bc4ba"
    ) {
      cookieCutter.set('logged', true);
      setLogged(true);
    } else {
      alert("Usuário inválido!");
    }
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
          <Form className="form-login">
            <img src={LogoSvg} />
            <Input
              light={true}
              type="text"
              name="user"
              label="Usuário"
              validate={(e) => {
                return [
                  {
                    expression: e.value.length === 0,
                    message: "Preencha o usuário!",
                  },
                ];
              }}
            />
            <Input
              light={true}
              type="password"
              name="pass"
              label="Senha"
              validate={(e) => {
                return [
                  {
                    expression: e.value.length === 0,
                    message: "Preencha a senha!",
                  },
                ];
              }}
            />
            <Button onClick={(e) => handleLogin(e)}>Entrar</Button>
          </Form>
        </Login>
      )}
    </>
  );
};
export default Wrapper;
