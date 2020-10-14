// Imports padrão
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

// Imports de estilo
import Layout from "../../../../components/admin/Layout";
import { PageTitle, Button } from "../../../../styles/global";
import NoSsr from "../../../../components/NoSsr";

// Imports auxiliares
import api from "../../../../services/api.js";
import { getFormData, countError } from "../../../../services/helpers.js";
import Form, {
  Input,
  InputUploader,
  Editor,
} from "../../../../components/Form";

const Servicos = (props) => {
  // Rotas
  const router = useRouter();
  const { servico } = router.query;

  // State
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

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
    setIsError("");

    // Se houver error no form
    const numberErrors = await countError(".form-service");
    if (numberErrors > 0) {
      return;
    }

    // Marca como loading
    setIsLoading(true);

    // Envia
    const formData = getFormData(".form-service");
    formData["price"] = formData["price"].replace(",", ".");
    formData["price"] = formData["price"] || "0";
    const response = await api.post(`/services`, formData);

    // Remove loading
    setIsLoading(false);

    // Retorna
    if (response.data.status === "success") {
      router.push("/admin/servicos");
    } else {
      setIsError(response.data.data);
    }
  };

  const handleDelete = async () => {
    // Marca como loading
    setIsLoading(true);

    // Envia
    const formData = getFormData(".form-service");
    const response = await api.delete(`/services/${formData.id}`);

    // Remove loading
    setIsLoading(false);

    // Retorna
    if (response.data.status === "success") {
      router.push("/admin/servicos");
    } else {
      setIsError(response.data.data);
    }
  };

  return (
    <NoSsr>
      <Head>
        <title>Serviços - Painel Administrativo - M24</title>
      </Head>
      <Layout loading={isLoading || false} error={isError}>
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
              light={true}
              image
              label="Imagem"
              name="image"
              accept="image/jpeg,image/gif,image/png"
              defaultValue={formData.image}
            />
            <InputUploader
              label="PDF do contrato"
              pdf
              light={true}
              name="contract"
              accept="application/pdf"
              defaultValue={formData.contract}
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
