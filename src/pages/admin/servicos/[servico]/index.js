import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import api from "../../../../services/api.js";
import { getFormData } from "../../../../services/helpers.js";

import Layout from "../../../../components/admin/Layout";
import Editor from "../../../../components/admin/Editor";

const Servicos = (props) => {
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const { servico } = router.query;

  useEffect(() => {
    const getData = async () => {
      const servicos = await api.get(`/services/${servico}`);
      setFormData(servicos.data);
    }
    getData();
  },[servico]);

  const handleSave = async () => {
    const formData = getFormData(".form-service");
    const servico = await api.post(`/services/${servico}`,formData);
    console.log(servico)
  }

  return (
    <>
      <Head>
        <title>Serviços - Painel Administrativo - M24</title>
      </Head>
      <Layout>
        <div>
          <h1 className="page-title-secondary">Serviços</h1>
          <form className="form-service margin-3x">
            <input name="id" type="hidden" defaultValue={formData.id} />
            <div>
              <label>Titulo</label>
              <input name="name" type="text" defaultValue={formData.name} />
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
              <label>Conteúdo</label>
              <Editor name="content" defaultValue={formData.content} />
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
export default Servicos;
