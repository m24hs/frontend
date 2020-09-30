import { useState } from "react";
import Head from "next/head";
import Layout from "../../components/admin/Layout";

import { Container, Login } from "../../styles/pages/admin";
import LogoSvg from "../../assets/logo.svg";

const Parceiros = () => {
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
          <Container>teste</Container>
        </Layout>
      ) : (
        <Login>
            <form>
                <img src={LogoSvg} />
                <label>Usuário</label>
                <input type="text"/>
                <label>Senha</label>
                <input type="password"/>
                <button className="btn-default" type="button" onClick={(e) => handleLogin(e)}>Entrar</button>
            </form>
        </Login>
      )}
    </>
  );
};
export default Parceiros;
