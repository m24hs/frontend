// Imports padrão
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Imports auxiliares
import api from "../../../../services/api.js";
import { getFormData } from "../../../../services/helpers.js";
import Layout from "../../../../components/admin/Layout";
import NoSsr from "../../../../components/NoSsr";
import Editor from "../../../../components/admin/Editor";

const Servicos = (props) => {
  // Rotas
  const router = useRouter();
  const { servico } = router.query;

  // State
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Carregar
  useEffect(() => {
    const getData = async () => {
      if ( servico === "novo" ) 
        return;
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
    <NoSsr>
      <Head>
        <title>Serviços - Painel Administrativo - M24</title>
      </Head>
      <Layout loading={isLoading ? 1 : 0}>
        <div>
          <h1 className="page-title-secondary">Serviços</h1>
          <form className="form-service margin-3x">
            <input name="id" type="hidden" defaultValue={formData.id} />
            <div>
              <label>Titulo</label>
              <input name="title" type="text" defaultValue={formData.title} />
            </div>
            <div>
              <label>Url</label>
              <input name="url" type="text" defaultValue={formData.url} />
            </div>
            <div>
              <label>Image</label>
              <input name="image" type="text" defaultValue={formData.image} />
            </div>    
            <div>
              <label>Plano</label>
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
    </NoSsr>
  );
};
export default Servicos;
