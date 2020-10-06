// Imports padrão
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { PageTitle } from "../../../../styles/global";

// Imports auxiliares
import api from "../../../../services/api.js";
import Layout from "../../../../components/admin/Layout";

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
          <form className="margin-3x">
            <div>
              <label>ID na IUGU</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.id_iugu}
                disabled={true}
              />
            </div>
            <div>
              <label>Nome do Cliente</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.name}
                disabled={true}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.email}
                disabled={true}
              />
            </div>
            <div>
              <label>Telefone</label>
              <input
                type="text"
                defaultValue={`(${formData.User && formData.User.phone_prefix}) ${formData.User && formData.User.phone}`}
                disabled={true}
              />
            </div>
            <div>
              <label>CPF/CPPJ</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.cpf_cnpj}
                disabled={true}
              />
            </div>
            <div>
              <label>CEP</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.zip_code}
                disabled={true}
              />
            </div>
            <div>
              <label>Endereço</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.street}
                disabled={true}
              />
            </div>
            <div>
              <label>Nº</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.number}
                disabled={true}
              />
            </div>
            <div>
              <label>Bairro</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.district}
                disabled={true}
              />
            </div>
            <div>
              <label>Cidade</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.city}
                disabled={true}
              />
            </div>
            <div>
              <label>Estado</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.state}
                disabled={true}
              />
            </div>
            <div>
              <label>Complemento</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.complement}
                disabled={true}
              />
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};
export default Assinaturas;
