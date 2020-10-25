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
  const { dica: id } = router.query;

  // State
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  // Carregar
  useEffect(() => {
    const getData = async () => {
      if (!id || id === "novo") return;
      setIsLoading(true);
      const dicas = await api.get(`/posts/${id}`);
      setFormData(dicas.data);
      setIsLoading(false);
    };
    getData();
  }, [props]);

  // Salvar
  const handleSave = async () => {
    setIsError("");

    // Se houver error no form
    const numberErrors = await countError(".form-posts");
    if (numberErrors > 0) {
      return;
    }

    // Marca como loading
    setIsLoading(true);

    // Envia
    const formData = getFormData(".form-posts");

    // Converte em formdata
    var postForm = new FormData();
    for (var key in formData) {
      postForm.append(key, formData[key]);
    }

    const response = await api.post(`/posts`, postForm, {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${postForm._boundary}`,
      },
    });

    // Remove loading
    setIsLoading(false);

    // Retorna
    if (response.data.status === "success") {
      router.push("/admin/dicas");
    } else {
      setIsError(response.data.data);
    }
  };

  const handleDelete = async () => {
    //
    if (!confirm("Confirma a exclusão?")) return;

    // Marca como loading
    setIsLoading(true);

    // Envia
    const formData = getFormData(".form-posts");
    const response = await api.delete(`/posts/${formData.id}`);

    // Remove loading
    setIsLoading(false);

    // Retorna
    if (response.data.status === "success") {
      router.push("/admin/dicas");
    } else {
      setIsError(response.data.data);
    }
  };

  return (
    <NoSsr>
      <Head>
        <title>Dicas - Painel Administrativo - M24</title>
      </Head>
      <Layout loading={isLoading || false} error={isError}>
        <div>
          <PageTitle secondary>Dicas</PageTitle>
          <Form className="form-posts" margin="16px 0">
            <Input name="id" type="hidden" defaultValue={formData.id} />
            <Input
              light={true}
              name="title"
              label="Título"
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
            <InputUploader
              light={true}
              image
              label="Imagem"
              name="image"
              accept="image/jpeg,image/gif,image/png"
              defaultValue={formData.image}
            />
            <Editor
              name="content"
              label="Conteúdo"
              defaultValue={formData.content}
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
