// Imports padrão
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Imports de estilo
import Layout from "../../../../components/admin/Layout";
import { PageTitle, Button } from "../../../../styles/global";
import NoSsr from "../../../../components/NoSsr";
import Editor from "../../../../components/admin/Editor";

// Imports auxiliares
import api from "../../../../services/api.js";
import { getFormData } from "../../../../services/helpers.js";
import Form, { Input, InputUploader } from "../../../../components/Form";

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
      if (servico === "novo") return;
      setIsLoading(true);
      const servicos = await api.get(`/services/${servico}`);
      setFormData(servicos.data);
      setIsLoading(false);
    };
    getData();
  }, [servico]);

  // Salvar
  const handleSave = async () => {
    setIsLoading(true);
    const formData = getFormData(".form-service");
    formData["price"] = formData["price"].replace(",", ".");
    const response = await api.post(`/services`, formData);
    console.log(response);
    setIsLoading(false);
    //router.push("/admin/servicos");
  };

  const handleDelete = async () => {
    setIsLoading(true);
    const formData = getFormData(".form-service");
    const response = await api.delete(`/services/${formData.id}`);
    console.log(response);
    setIsLoading(false);
    router.push("/admin/servicos");
  };

  return (
    <NoSsr>
      <Head>
        <title>Serviços - Painel Administrativo - M24</title>
      </Head>
      <Layout loading={isLoading || false}>
        <div>
          <PageTitle secondary>Serviços</PageTitle>
          <Form className="form-service" margin="16px 0">
            <Input name="id" type="hidden" defaultValue={formData.id} />
            <Input
              light={true}
              name="title"
              label="Titulo"
              type="text"
              defaultValue={formData.title}
              validate={(e) => {
                return [
                  {
                    expression: e.value.length === 0,
                    message: "Preencha o título!",
                  },
                ];
              }}
            />
            <InputUploader image label="Imagem" light={true} name="image" defaultValue={formData.image}/>
            <Editor
              name="description"
              label="Descrição"
              defaultValue={formData.description}
            />
            <Editor name="page" label="Página" defaultValue={formData.page} />
            <Input
              light={true}
              name="price"
              label="Valor"
              type="currency"
              defaultValue={
                formData.price && formData.price.toFixed(2).replace(".", ",")
              }
            />
            <InputUploader
              label="PDF do contrato"
              light={true}
              name="contract"
            />
            <Button
              type="button"
              width="calc(50% - 8px)"
              margin="0 8px 0 0"
              onClick={() => handleSave()}
            >
              Salvar
            </Button>
            <Button
              secondary
              width="calc(50% - 8px)"
              margin="0 0 0 8px"
              type="button"
              onClick={() => handleDelete()}
            >
              Excluir
            </Button>
          </Form>
        </div>
      </Layout>
    </NoSsr>
  );
};
export default Servicos;
