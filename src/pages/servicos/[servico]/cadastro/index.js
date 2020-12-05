// Imports padrão
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Imports de estilo
import Layout from "../../../../components/site/Layout";
import { Container } from "../../../../styles/pages/servicos/cadastro";
import { PageTitle, PageDescription } from "../../../../styles/global";
import { WrapperStyle, WrapperRadio } from "../../../../styles/components/Form";

// Imports auxiliares
import Form, { Input, Button, InputMask } from "../../../../components/Form";
import {
  countError,
  getFormData,
  validateEmail,
} from "../../../../services/helpers";
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
    neighborhood: emptyState,
    state: emptyState,
  });

  // Auxiliares
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");
  const [cpfOrCnpj, setCpfOrCnpj] = useState("cpf");

  // Busca CEP
  const handleCEP = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Variáveis auxiliares
    const emptyCep = { city: "", street: "", neighborhood: "", state: "" };

    // Consulta CepPromise
    const cep = e.target.value;
    if (cep.length === 0) {
      setIsLoading(false);
      return;
    }

    // Tenta consultar
    try {
      const response = await cepPromise(cep);
      setInputValue({
        city: { value: response.city, disabled: true },
        street: {
          value: response.street,
          disabled: response.street.trim() !== "",
        },
        neighborhood: {
          value: response.neighborhood,
          disabled: response.neighborhood.trim() !== "",
        },
        state: { value: response.state, disabled: true },
      });
      if (response.street.trim() !== "") {
        const number = document.querySelector("input[name=number]");
        number.focus();
      }
    } catch (e) {
      setInputValue({
        city: emptyState,
        street: emptyState,
        neighborhood: emptyState,
        state: { value: inputValue.state.value, disabled: false },
      });
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
    formData["service_url"] = servico;

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

  // Valida CNPJ
  function isValidCNPJ(cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, "");

    if (cnpj == "") return false;

    if (cnpj.length != 14) return false;

    // Elimina CNPJs invalidos conhecidos
    if (
      cnpj == "00000000000000" ||
      cnpj == "11111111111111" ||
      cnpj == "22222222222222" ||
      cnpj == "33333333333333" ||
      cnpj == "44444444444444" ||
      cnpj == "55555555555555" ||
      cnpj == "66666666666666" ||
      cnpj == "77777777777777" ||
      cnpj == "88888888888888" ||
      cnpj == "99999999999999"
    )
      return false;

    // Valida DVs
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(0)) return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado != digitos.charAt(1)) return false;

    return true;
  }

  return (
    <>
      <Head>
        <title>Cadastro - M24</title>
      </Head>
      <Layout hideFB loading={isLoading ? true : false} error={isError}>
        <Container>
          <PageTitle>Cadastro</PageTitle>
          <PageDescription>
            Nossa proposta é exclusiva e inovadora, somos pioneiros neste novo
            nicho e estamos ansiosos para ter você no nosso time. Preencha seus
            dados corretamente e leia tudo com atenção, você será
            automaticamente direcionado para o nosso contrato de adesão.
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
            <WrapperStyle
              light={false}
              style={{ width: "50%", paddingLeft: "16px" }}
            >
              <WrapperRadio>
                <input
                  type="radio"
                  id="radio-cpf"
                  name="age"
                  value="cpf"
                  checked={cpfOrCnpj === "cpf"}
                  onChange={(e) => {
                    setCpfOrCnpj(e.target.value);
                  }}
                />
                <label htmlFor="radio-cpf">CPF</label>
                <input
                  type="radio"
                  id="radio-cnpj"
                  name="age"
                  value="cnpj"
                  checked={cpfOrCnpj === "cnpj"}
                  onChange={(e) => {
                    setCpfOrCnpj(e.target.value);
                  }}
                />
                <label htmlFor="radio-cnpj">CNPJ</label>
              </WrapperRadio>
              {cpfOrCnpj === "cnpj" ? (
                <InputMask
                  type="mask"
                  name="cpf_cnpj"
                  mask="99.999.999/9999-99"
                  maskPlaceholder=" "
                  validate={(e) => {
                    return [
                      {
                        expression: e.value.length === 0,
                        message: "Preencha o CNPJ!",
                      },
                      {
                        expression: !isValidCNPJ(e.value),
                        message: "CNPJ inválido!",
                      },
                    ];
                  }}
                />
              ) : (
                <InputMask
                  type="mask"
                  name="cpf_cnpj"
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
              )}
            </WrapperStyle>

            {/*                      
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
            */}
            <Input
              type="mask"
              label="CEP *"
              name="zip_code"
              mask="99999-999"
              maskPlaceholder=" "
              onBlur={(e) => handleCEP(e)}
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
              defaultValue={inputValue.street.value}
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
            <Input
              divstyle={{ width: "60%" }}
              name="complement"
              label="Complemento"
              type="text"
            />
            <Input
              divstyle={{ width: "40%", paddingLeft: "16px" }}
              type="text"
              label="Bairro *"
              name="district"
              defaultValue={inputValue.neighborhood.value}
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
              defaultValue={inputValue.city.value}
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
              isReadOnly={inputValue.state.disabled}
            />
            <Input
              divstyle={{ width: "60%" }}
              label="Categoria da Moto *"
              type="select"
              name="motorcycle_category"
              options={[
                { value: "Moto até 100cc", label: "Moto até 100cc" },
                { value: "Moto até 150cc", label: "Moto até 150cc" },
                { value: "Moto até 300cc", label: "Moto até 300cc" },
              ]}
              validate={(e) => {
                return [
                  {
                    expression: e.length === 0,
                    message: "Preencha a Categoria!",
                  },
                ];
              }}
              placeholder=""
            />
            <Input
              divstyle={{ width: "39%", paddingLeft: "16px" }}
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
              Contrate nosso plano
            </Button>
          </Form>
        </Container>
      </Layout>
    </>
  );
};
export default Servicos;
