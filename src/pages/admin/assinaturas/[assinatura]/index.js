// Imports padrão
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { PageTitle } from "../../../../styles/global";

// Imports auxiliares
import api from "../../../../services/api.js";
import Layout from "../../../../components/admin/Layout";
import Form, { Input, Button } from "../../../../components/Form";
import cookieCutter from "cookie-cutter";

const Assinaturas = (props) => {
  // Rotas
  const router = useRouter();
  const { assinatura } = router.query;

  // State
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Carregar
  useEffect(() => {
    // Vai para tela de loggin
    if (cookieCutter.get("logged") !== "true") {
      router.push("/admin");
    }

    // Consulta
    if ((assinatura || 0) !== 0) {
      const getData = async () => {
        setIsLoading(true);
        const assinaturas = await api.get(
          `/subscriptions/${assinatura}?where=iugu`
        );
        setFormData(assinaturas.data);
        setIsLoading(false);
      };
      getData();
    }
  }, [assinatura]);

  const handleSendLink = (url) => {
    window.open(
      `${window.location.origin}/servicos/${url}/cadastro/${formData.User.id_iugu}/contrato`,
      "_blank"
    );
  };

  return (
    <>
      <Head>
        <title>Assinaturas - Painel Administrativo - M24</title>
      </Head>
      <Layout loading={isLoading || false}>
        <div>
          <PageTitle secondary>Assinaturas</PageTitle>
          <Form margin="16px 0">
            {(formData.payment_method || "") !== "" ? (
              <Input
                light={true}
                type="text"
                label="Forma de pagamento"
                defaultValue={formData.payment_method}
                disabled={true}
              />
            ) : (
              <>
                <Button
                  margin={"16px 0"}
                  type="button"
                  onClick={() => handleSendLink(formData.Service.url)}
                >
                  Gerar link de pagamento para o cliente
                </Button>
              </>
            )}
            <Input
              light={true}
              type="text"
              label="Nome do Cliente"
              defaultValue={formData.User && formData.User.name}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Serviço"
              defaultValue={formData.Service && formData.Service.title}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="ID na IUGU"
              defaultValue={formData.User && formData.User.id_iugu}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Email"
              defaultValue={formData.User && formData.User.email}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Telefone"
              defaultValue={`(${formData.User && formData.User.phone_prefix}) ${
                formData.User && formData.User.phone
              }`}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="CPF/CPPJ"
              defaultValue={formData.User && formData.User.cpf_cnpj}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="CEP"
              defaultValue={formData.User && formData.User.zip_code}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Endereço"
              defaultValue={formData.User && formData.User.street}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Nº"
              defaultValue={formData.User && formData.User.number}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Bairro"
              defaultValue={formData.User && formData.User.district}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Cidade"
              defaultValue={formData.User && formData.User.city}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Estado"
              defaultValue={formData.User && formData.User.state}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Complemento"
              defaultValue={formData.User && formData.User.complement}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Categoria da Moto"
              defaultValue={formData.User && formData.User.motorcycle_category}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Ano/Modelo"
              defaultValue={formData.User && formData.User.motorcycle_year}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Placa"
              defaultValue={formData.User && formData.User.motorcycle_placa}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Renavam"
              defaultValue={formData.User && formData.User.motorcycle_renavam}
              disabled={true}
            />
            <Input
              light={true}
              type="text"
              label="Como conheceu a M24?"
              defaultValue={formData.User && formData.User.origin}
              disabled={true}
            />
          </Form>
        </div>
      </Layout>
    </>
  );
};
export default Assinaturas;
