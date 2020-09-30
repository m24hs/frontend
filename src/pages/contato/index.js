import Head from "next/head";
import Layout from "../../components/site/Layout";

import { Container } from "../../styles/pages/contato";

const Contato = () => {
  return (
    <>
      <Head>
        <title>Contato - M24</title>
      </Head>
      <Layout>
        <Container>
          <h1 className="page-title">Contato</h1>
          <p className="page-description margin-2x">
          Chegamos no mercado com uma proposta inovadora para cuidar da sua moto sem burocracia e com muitas vantagens.

Trabalhamos com a gestão preventiva, evitando que você gaste tempo, dinheiro e energia com imprevistos. Entretanto, caso haja qualquer problema, você estará amparado 24h por dia, sem dor de cabeça e sem estresse!
          </p>
          <form className="form-contact">            
            <input type="text" placeholder="Nome completo"/>            
            <input type="text" placeholder="Email"/>            
            <input type="text" placeholder="Telefone / Celular"/>            
            <textarea type="text" placeholder="Mensagem" rows="4"/>
            <button className="btn-default margin-2x" type="button" onClick={(e) => {handleSubmit(e)}}>Continuar</button>
          </form>
        </Container>
      </Layout>
    </>
  );
};
export default Contato;
