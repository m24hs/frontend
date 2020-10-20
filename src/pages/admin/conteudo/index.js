// Imports padrão
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Imports auxiliares
import api from "../../../services/api.js";
import { getFormData } from "../../../services/helpers.js";
import Layout from "../../../components/admin/Layout";
import { PageTitle } from "../../../styles/global";
import Form, { Input, Editor, Button } from "../../../components/Form";
import cookieCutter from 'cookie-cutter';

const Conteudo = (props) => {
  // Rotas
  const router = useRouter();

  // State
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Carregar
  useEffect(() => {
    // Vai para tela de loggin
    if (cookieCutter.get('logged') !== "true") {
      router.push("/admin");
    }

    // Consulta    
    const getData = async () => {
      setIsLoading(true);
      const settings = await api.get(`/settings`);
      setFormData(settings.data);
      setIsLoading(false);
    };
    getData();
  }, [props]);

  // Salvar
  const handleSave = async () => {
    setIsLoading(true);
    const formData = getFormData(".form-config");
    const response = await api.post(`/settings`, formData);
    setIsLoading(false);
    // Retorna
    if (response.data.status === "success") {
      router.push("/admin/conteudo");
    } else {
      setIsError(response.data.data);
    }
  };

  return (
    <>
      <Head>
        <title>Configurações - Painel Administrativo - M24</title>
      </Head>
      <Layout loading={isLoading}>
        <div>
          <PageTitle secondary>Configurações</PageTitle>
          <Form className="form-config" margin="16px 0">
            <Input type="hidden" name="id" defaultValue={formData.id} />   
            {/*<Editor name="home" label="Home" defaultValue={formData.home} />*/}
            <Editor name="about" label="Sobre" defaultValue={formData.about} />
            <Editor name="contact" label="Contato" defaultValue={formData.contact} />
            <Button type="Button" onClick={() => handleSave()}>
              Salvar
            </Button>
          </Form>
        </div>
      </Layout>
    </>
  );
};
export default Conteudo;
