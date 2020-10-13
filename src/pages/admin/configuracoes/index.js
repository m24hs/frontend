// Imports padrão
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Imports auxiliares
import api from "../../../services/api.js";
import { getFormData } from "../../../services/helpers.js";
import Layout from "../../../components/admin/Layout";
import { PageTitle } from "../../../styles/global";

import Form, {
  Editor,
} from "../../../components/Form";

const Configuracoes = (props) => {
  // Rotas
  const router = useRouter();
  const { servico } = router.query;

  // State
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Carregar
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const servicos = await api.get(`/services/${servico}`);
      setFormData(servicos.data);
      setIsLoading(false);
    }
    getData();
  },[servico]);

  // Salvar
  const handleSave = async () => {
    setIsLoading(true);
    const formData = getFormData(".form-service");
    const servico = await api.post(`/services`,formData);
    setIsLoading(false);
    router.push("/admin/servicos")
  }

  return (
    <>
      <Head>
        <title>Configurações - Painel Administrativo - M24</title>
      </Head>
      <Layout loading={isLoading}>
        <div>
          <PageTitle secondary>Configurações</PageTitle>
          <form className="form-service margin-3x">
            <input name="id" type="hidden" defaultValue={formData.id} />
            <div>
              <label>Email</label>
              <input name="title" type="text" defaultValue={formData.title} />
            </div>
            <div>
              <label>Senha</label>
              <input name="url" type="text" defaultValue={formData.url} />
            </div>
            <div>
              <label>Host</label>
              <input name="image" type="text" defaultValue={formData.image} />
            </div>    
            <div>
              <label>Porta</label>
              <input name="plan" type="text" defaultValue={formData.plan} />
            </div>                    
            <div>
              <label>Descrição</label>
              <Editor name="description" defaultValue={formData.description} />
            </div>
            <div>
              <label>Página</label>
              <Editor name="page" defaultValue={formData.page} />
            </div>
            <div>
              <label>Valor</label>
              <input  name="price" type="text" defaultValue={formData.price || 0} />
            </div>            
            <button className="btn-primary" type="button" onClick={() => handleSave()}>Salvar</button>
          </form>
        </div>
      </Layout>
    </>
  );
};
export default Configuracoes;
