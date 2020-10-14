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

const Configuracoes = (props) => {
  // Rotas
  const router = useRouter();

  // State
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Carregar
  useEffect(() => {
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
      router.push("/admin/configuracoes");
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
            <Input
              type="text"
              label="Nome email"
              name="name"
              light={true}
              defaultValue={formData.name}
            />
            <Input
              type="text"
              label="Email"
              name="email"
              light={true}
              defaultValue={formData.email}
            />
            <Input
              type="text"
              label="Senha"
              name="email_pass"
              light={true}
              defaultValue={formData.email_pass}
            />
            <Input
              type="text"
              label="Host"
              name="email_server"
              light={true}
              defaultValue={formData.email_server}
            />
            <Input
              type="text"
              label="Porta"
              name="email_port"
              light={true}
              defaultValue={formData.email_port}
            />
            <Button type="Button" onClick={() => handleSave()}>
              Salvar
            </Button>
          </Form>
        </div>
      </Layout>
    </>
  );
};
export default Configuracoes;
