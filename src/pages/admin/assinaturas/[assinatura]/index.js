// Imports padrão
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

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
      <Layout loading={isLoading ? 1 : 0}>
        <div>
          <h1 className="page-title-secondary">Assinaturas</h1>
          <form className="margin-3x">
            <div>
              <label>ID na IUGU</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.id_iugu}
                readOnly={true}
              />
            </div>
            <div>
              <label>Nome do Cliente</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.name}
                readOnly={true}
              />
            </div>
            <div>
              <label>Email</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.email}
                readOnly={true}
              />
            </div>
            <div>
              <label>Telefone</label>
              <input
                type="text"
                defaultValue={`(${formData.User && formData.User.phone_prefix}) ${formData.User && formData.User.phone}`}
                readOnly={true}
              />
            </div>
            <div>
              <label>CPF/CPPJ</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.cpf_cnpj}
                readOnly={true}
              />
            </div>
            <div>
              <label>CEP</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.zip_code}
                readOnly={true}
              />
            </div>
            <div>
              <label>Endereço</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.street}
                readOnly={true}
              />
            </div>
            <div>
              <label>Nº</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.number}
                readOnly={true}
              />
            </div>
            <div>
              <label>Bairro</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.district}
                readOnly={true}
              />
            </div>
            <div>
              <label>Cidade</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.city}
                readOnly={true}
              />
            </div>
            <div>
              <label>Estado</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.state}
                readOnly={true}
              />
            </div>
            <div>
              <label>Complemento</label>
              <input
                type="text"
                defaultValue={formData.User && formData.User.complement}
                readOnly={true}
              />
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
};
export default Assinaturas;
