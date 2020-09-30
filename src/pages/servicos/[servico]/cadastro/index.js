import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Layout from "../../../../components/site/Layout";
import { Container } from "../../../../styles/pages/servicos/cadastro";
import Img from "../../../../assets/cadastro.png";

import api from "../../../../services/api";
import { getFormData } from "../../../../services/helpers";

const Servicos = () => {
  const router = useRouter();
  const { servico } = router.query;

  const [ isLoading, setIsLoading ] = useState(false);
  const [ isError, setIsError ] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Pega os dados do form
    const teste = getFormData(".form-contact");

    // Tratamento de dados
    teste["phone_prefix"] = teste.phone.substr(1, 2);
    teste["phone"] = teste.phone.substr(5, 9);

    // Consome a API
    setIsLoading(true);
    const response = await api.post("/users", teste);
    console.log(response);

    // Avança para a proxima página
    setIsLoading(false);
    if (response.data.status == "success") {
      const user = response.data.data.id_iugu;
      router.replace(`/servicos/${servico}/cadastro/${user}/contrato`);
    } else {
      setIsError(response.data.data);
    }
  };

  return (
    <>
      <Head>
        <title>Cadastro - M24</title>
      </Head>
      <Layout hideFB loading={isLoading} error={isError}>
        <Container>
          <h1 className="page-title">Cadastro</h1>
          <p className="page-description margin-3x">
            Chegamos no mercado com uma proposta inovadora para cuidar da sua
            moto sem burocracia e com muitas vantagens. Trabalhamos com a gestão
            preventiva, evitando que você gaste tempo, dinheiro e energia com
            imprevistos. Entretanto, caso haja qualquer problema, você estará
            amparado 24h por dia, sem dor de cabeça e sem estresse!
          </p>
          <form className="form-contact">
            <div style={{ width: "100%" }}>
              <label>Nome completo *</label>
              <input name="name" type="text" />
            </div>
            <div style={{ width: "100%" }}>
              <label>Email *</label>
              <input name="email" type="text" />
            </div>
            <div style={{ width: "50%" }} className="margin-right">
              <label>Celular *</label>
              <input name="phone" type="text" />
            </div>
            <div style={{ width: "50%" }}>
              <label>CPF *</label>
              <input name="cpf_cnpj" type="text" />
            </div>
            <div style={{ width: "100%" }}>
              <label>CEP *</label>
              <input name="zip_code" type="text" />
            </div>
            <div style={{ width: "60%" }} className="margin-right">
              <label>Endereço *</label>
              <input name="street" type="text" />
            </div>
            <div style={{ width: "40%" }}>
              <label>Número *</label>
              <input name="number" type="text" />
            </div>
            <div style={{ width: "100%" }}>
              <label>Bairro *</label>
              <input name="district" type="text" />
            </div>
            <div style={{ width: "60%" }} className="margin-right">
              <label>Cidade *</label>
              <input name="city" type="text" />
            </div>
            <div style={{ width: "40%" }}>
              <label>Estado *</label>
              <input name="state" type="text" />
            </div>
            <div style={{ width: "100%" }}>
              <label>Complemento</label>
              <input name="complement" type="text" />
            </div>
            <div style={{ width: "100%" }}>
              <label>Como conheceu a M24?</label>
              <input name="origin" type="text" />
            </div>
            <div>
              <p className="page-description">
                Obs: Os campos * são obrigatórios.
              </p>
            </div>
            <button
              className="btn-default margin-3x"
              type="button"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Continuar
            </button>
          </form>
          <div>
            <img src={Img} />
          </div>
        </Container>
      </Layout>
    </>
  );
};
export default Servicos;
