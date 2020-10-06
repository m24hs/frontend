// Imports padrão
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Imports de estilo
import Layout from "../../../../components/site/Layout";
import { Container } from "../../../../styles/pages/servicos/cadastro";
import { PageTitle, PageDescription } from "../../../../styles/global";
import Img from "../../../../assets/cadastro.png";

// Imports auxiliares
import Form, { Input, Button } from "../../../../components/Form";
import { countError, getFormData } from "../../../../services/helpers";
import api from "../../../../services/api";
import cepPromise from "cep-promise";

// Componente
const Servicos = () => {
  // Rotas
  const router = useRouter();
  const { servico } = router.query;

  const emptyState = { value: "", disabled: false };
  const [inputValue, setInputValue] = useState({
    city: emptyState,
    street: emptyState,
    number: emptyState,
    neighborhood: emptyState,
    state: emptyState,
  });

  // Auxiliares
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

  // Busca CEP
  const [errorCep, setErrorCep] = useState("");
  const handleCEP = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Variáveis auxiliares
    const emptyCep = { city: "", street: "", neighborhood: "", state: "" };

    // Consulta CepPromise
    const cep = e.target.value;
    if (cep.length === 0) {
      setInputValue({
        city: emptyState,
        street: emptyState,
        number: emptyState,
        neighborhood: emptyState,
        state: emptyState,
      });
      setIsLoading(false);
      return;
    }

    // Tenta consultar
    try {
      const response = await cepPromise(cep);
      setInputValue({
        city: { value: response.city, disabled: true },
        street: { value: response.street, disabled: true },
        number: { value: response.number, disabled: true },
        neighborhood: { value: response.neighborhood, disabled: true },
        state: { value: response.state, disabled: true },
      });
      const number = document.querySelector("input[name=number]");
      number.focus();
    } catch (e) {
      setInputValue({
        city: emptyState,
        street: emptyState,
        number: emptyState,
        neighborhood: emptyState,
        state: emptyState,
      });
      setErrorCep("CEP não encontrado, por favor, cadastre manualmente.");
    }
    setIsLoading(false);
    return;
  };

  // Ao enviar
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsError("");

    // Se houver error no form
    const numberErrors = await countError(".form-contact");
    if (numberErrors > 0) {
      return;
    }

    // Pega os dados do form
    const formData = getFormData(".form-contact");

    // Tratamento de dados
    formData["name"] = formData.name;
    formData["phone_prefix"] = formData.phone.substr(1, 2);
    formData["phone"] = formData.phone.substr(5, 9);

    // Consome a API
    setIsLoading(true);
    const response = await api.post("/users", formData);

    // Avança para a proxima página
    setIsLoading(false);
    if (response.data.status == "success") {
      const user = response.data.data.id_iugu;
      router.replace(`/servicos/${servico}/cadastro/${user}/contrato`);
    } else {
      setIsError(response.data.data);
    }
  };

  // Valida email
  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // Valida CPF
  const isValidCPF = (cpf) => {
    if (typeof cpf !== "string") return false;
    cpf = cpf.replace(/[\s.-]*/gim, "");
    if (
      !cpf ||
      cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999"
    ) {
      return false;
    }
    var soma = 0;
    var resto;
    for (var i = 1; i <= 9; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(9, 10))) return false;
    soma = 0;
    for (var i = 1; i <= 10; i++)
      soma = soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto == 10 || resto == 11) resto = 0;
    if (resto != parseInt(cpf.substring(10, 11))) return false;
    return true;
  };

  return (
    <>
      <Head>
        <title>Cadastro - M24</title>
      </Head>
      <Layout hideFB loading={isLoading} error={isError}>
        <Container>
          <PageTitle>Cadastro</PageTitle>
          <PageDescription>
            Chegamos no mercado com uma proposta inovadora para cuidar da sua
            moto sem burocracia e com muitas vantagens. Trabalhamos com a gestão
            preventiva, evitando que você gaste tempo, dinheiro e energia com
            imprevistos. Entretanto, caso haja qualquer problema, você estará
            amparado 24h por dia, sem dor de cabeça e sem estresse!
          </PageDescription>
          <Form className="form-contact">
            <Input
              type="mask"
              label="Nome completo *"
              name="name"
              mask={"a".repeat(100)}
              maskPlaceholder=" "
              validate={(e) => {
                return [
                  {
                    expression: e.value.length === 0,
                    message: "Preencha o nome!",
                  },
                  {
                    expression: !e.value.trim().includes(" "),
                    message: "Por favor, insira o nome completo!",
                  },
                ];
              }}
            />
            <Input
              type="text"
              label="Email *"
              name="email"
              validate={(e) => {
                return [
                  {
                    expression: e.value.length === 0,
                    message: "Preencha o Email!",
                  },
                  {
                    expression: !validateEmail(e.value),
                    message: "Email inválido!",
                  },
                ];
              }}
            />
            <Input
              type="mask"
              label="Telefone/Celular *"
              divstyle={{ width: "50%" }}
              name="phone"
              mask="(99) 999999999"
              maskPlaceholder=" "
              validate={(e) => {
                const phone = e.value
                  .replaceAll("(", "")
                  .replaceAll(")", "")
                  .replaceAll(" ", "")
                  .trim();
                return [
                  {
                    expression: phone === "",
                    message: "Preencha o celular!",
                  },
                  {
                    expression: phone.length < 10,
                    message: "Número inválido!",
                  },
                ];
              }}
            />
            <Input
              type="mask"
              label="CPF *"
              name="cpf_cnpj"
              divstyle={{ width: "50%", paddingLeft: "16px" }}
              mask="999.999.999-99"
              maskPlaceholder=" "
              validate={(e) => {
                return [
                  {
                    expression: e.value.length === 0,
                    message: "Preencha o CPF!",
                  },
                  {
                    expression: !isValidCPF(e.value),
                    message: "CPF inválido!",
                  },
                ];
              }}
            />
            <Input
              type="mask"
              label="CEP *"
              name="zip_code"
              mask="99999-999"
              maskPlaceholder=" "
              onBlur={(e) => handleCEP(e)}
              error={errorCep}
              validate={(e) => {
                return [
                  {
                    expression:
                      e.value.replaceAll("-", "").replaceAll(" ", "").trim() ===
                      "",
                    message: "Preencha o CEP!",
                  },
                ];
              }}
            />
            <Input
              type="text"
              name="street"
              label="Endereço *"
              divstyle={{ width: "60%" }}
              value={inputValue.street.value}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  street: { value: e.target.value, disabled: false },
                })
              }
              readOnly={inputValue.street.disabled}
              validate={(e) => {
                return [
                  {
                    expression: e.value.length === 0,
                    message: "Preencha o Endereço!",
                  },
                ];
              }}
            />
            <Input
              type="text"
              label="Número *"
              name="number"
              divstyle={{ width: "40%", paddingLeft: "16px" }}
              validate={(e) => {
                return [
                  {
                    expression: e.value.length === 0,
                    message: "Preencha o Número!",
                  },
                ];
              }}
            />
            <Input name="complement" label="Complemento" type="text" />
            <Input
              type="text"
              label="Bairro *"
              name="district"
              value={inputValue.neighborhood.value}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  neighborhood: { value: e.target.value, disabled: false },
                })
              }
              validate={(e) => {
                return [
                  {
                    expression: e.value.length === 0,
                    message: "Preencha o Bairro!",
                  },
                ];
              }}
              readOnly={inputValue.neighborhood.disabled}
            />
            <Input
              type="text"
              label="Cidade *"
              name="city"
              divstyle={{ width: "60%" }}
              value={inputValue.city.value}
              onChange={(e) =>
                setInputValue({
                  ...inputValue,
                  city: { value: e.target.value, disabled: false },
                })
              }
              validate={(e) => {
                return [
                  {
                    expression: e.value.length === 0,
                    message: "Preencha a Cidade!",
                  },
                ];
              }}
              readOnly={inputValue.city.disabled}
            />
            <Input
              divstyle={{ width: "40%", paddingLeft: "16px" }}
              label="Estado *"
              type="select"
              name="state"
              options={[
                { value: "AC", label: "AC" },
                { value: "AL", label: "AL" },
                { value: "AP", label: "AP" },
                { value: "AM", label: "AM" },
                { value: "BA", label: "BA" },
                { value: "CE", label: "CE" },
                { value: "ES", label: "ES" },
                { value: "GO", label: "GO" },
                { value: "MA", label: "MA" },
                { value: "MT", label: "MT" },
                { value: "MS", label: "MS" },
                { value: "MG", label: "MG" },
                { value: "PA", label: "PA" },
                { value: "PB", label: "PB" },
                { value: "PR", label: "PR" },
                { value: "PE", label: "PE" },
                { value: "PI", label: "PI" },
                { value: "RJ", label: "RJ" },
                { value: "RN", label: "RN" },
                { value: "RS", label: "RS" },
                { value: "RO", label: "RO" },
                { value: "RR", label: "RR" },
                { value: "SC", label: "SC" },
                { value: "SP", label: "SP" },
                { value: "SE", label: "SE" },
                { value: "TO", label: "TO" },
                { value: "DF", label: "DF" },
              ]}
              value={{
                value: inputValue.state.value,
                label: inputValue.state.value,
              }}
              onChange={(data) => {
                setInputValue({
                  ...inputValue,
                  state: { value: data.value, disabled: false },
                });
              }}
              validate={(e) => {
                return [
                  {
                    expression: e.value.length === 0,
                    message: "Preencha o Estado!",
                  },
                ];
              }}
              isDisabled={inputValue.state.disabled}
            />
            <Input
              type="select"
              label="Como conheceu a M24?"
              name="origin"
              options={[
                {
                  value: "Facebook / Instagram",
                  label: "Facebook / Instagram",
                },
                { value: "Amigo / Parente", label: "Amigo / Parente" },
                { value: "Planfleto", label: "Planfleto" },
                { value: "Oficina parceira", label: "Oficina parceira" },
              ]}
              placeholder=""
            />
            <div>
              <PageDescription>
                Obs: Os campos * são obrigatórios.
              </PageDescription>
            </div>
            <Button
              secondary
              type="button"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Continuar
            </Button>
          </Form>
          <div>
            <img src={Img} />
          </div>
        </Container>
      </Layout>
    </>
  );
};
export default Servicos;
