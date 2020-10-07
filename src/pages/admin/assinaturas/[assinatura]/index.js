// Imports padrão
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { PageTitle } from "../../../../styles/global";

// Imports auxiliares
import api from "../../../../services/api.js";
import Layout from "../../../../components/admin/Layout";
import Form, { Input } from "../../../../components/Form";

const Assinaturas = (props) => {
  // Rotas
  const router = useRouter();
  const { assinatura } = router.query;

  // State
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Carregar
  useEffect(() => {
    if ((assinatura || 0) !== 0) {
      const getData = async () => {
        setIsLoading(true);
        const assinaturas = await api.get(`/subscriptions/${assinatura}`);
        console.log(assinaturas.data);
        setFormData(assinaturas.data);
        setIsLoading(false);
      };
      getData();
    }
  }, [assinatura]);

  return (
    <>
      <Head>
        <title>Assinaturas - Painel Administrativo - M24</title>
      </Head>
      <Layout loading={isLoading || false}>
        <div>
          <PageTitle secondary>Assinaturas</PageTitle>
          <Form margin="16px 0">              
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
                label="Nome do Cliente"
                defaultValue={formData.User && formData.User.name}
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
                defaultValue={`(${formData.User && formData.User.phone_prefix}) ${formData.User && formData.User.phone}`}
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
            </Form>
        </div>
      </Layout>
    </>
  );
};
export default Assinaturas;
