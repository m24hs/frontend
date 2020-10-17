// Imports padrão
import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Imports de estilo
import Layout from "../../../../components/site/Layout";
import { Container } from "../../../../styles/pages/servicos/cadastro";
import { PageTitle, PageDescription } from "../../../../styles/global";
import Img from "../../../../assets/cadastro.jpg";

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
    neighborhood: emptyState,
    state: emptyState,
  });

  // Auxiliares
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState("");

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

  // Valida Renavam
  const isValidRenavam = (renavam) => {
    // https://github.com/eliseuborges/Renavam/blob/9a005330f12817d4e8ca8a334f815282dde073fb/Renavam.js
    // Valida se possui 11 digitos pos formatacao
    renavam = "00000000000" + renavam;
    renavam = renavam.slice(-11);

    if (!renavam.match("[0-9]{11}")) {
      return false;
    }

    // Remove o digito (11 posicao)
    var renavamSemDigito = renavam.substring(0, 10);

    // Inverte os caracteres (reverso)
    var renavamReversoSemDigito = renavamSemDigito.split("").reverse().join("");

    // Multiplica as strings reversas do renavam pelos numeros multiplicadores
    // Exemplo: renavam reverso sem digito = 69488936
    // 6, 9, 4, 8, 8, 9, 3, 6
    // * * * * * * * *
    // 2, 3, 4, 5, 6, 7, 8, 9 (numeros multiplicadores - sempre os mesmos [fixo])
    // 12 + 27 + 16 + 40 + 48 + 63 + 24 + 54
    // soma = 284

    var soma = 0;
    var multiplicador = 2;
    for (var i = 0; i < 10; i++) {
      var algarismo = renavamReversoSemDigito.substring(i, i + 1);
      soma += algarismo * multiplicador;

      if (multiplicador >= 9) {
        multiplicador = 2;
      } else {
        multiplicador++;
      }
    }

    // mod11 = 284 % 11 = 9 (resto da divisao por 11)
    var mod11 = soma % 11;

    // Faz-se a conta 11 (valor fixo) - mod11 = 11 - 9 = 2
    var ultimoDigitoCalculado = 11 - mod11;

    // ultimoDigito = Caso o valor calculado anteriormente seja 10 ou 11, transformo ele em 0
    // caso contrario, eh o proprio numero
    ultimoDigitoCalculado =
      ultimoDigitoCalculado >= 10 ? 0 : ultimoDigitoCalculado;

    // Pego o ultimo digito do renavam original (para confrontar com o calculado)
    var digitoRealInformado = parseInt(
      renavam.substring(renavam.length - 1, renavam.length)
    );

    // Comparo os digitos calculado e informado
    if (ultimoDigitoCalculado === digitoRealInformado) {
      return true;
    }

    return false;
  };

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
              divstyle={{ width: "40%", paddingLeft: "16px" }}
              name="motorcycle_year"
              label="Ano/Modelo *"
              type="mask"
              mask="9999/9999"
              maskPlaceholder=" "
              validate={(e) => {
                const value = e.value.trim().replace("/", "");
                const year = value.substr(0, 4);
                const model = value.substr(4, 4);
                const date = new Date();

                return [
                  {
                    expression: value.length === 0,
                    message: "Preencha a Ano/Modelo!",
                  },
                  {
                    expression: value.length < 8,
                    message: "Preencha a Ano/Modelo corretamente!",
                  },
                  {
                    expression:
                      year < 1970 ||
                      year > date.getFullYear() ||
                      model < 1970 ||
                      model > date.getFullYear() + 1,
                    message: "Preencha a Ano/Modelo corretamente!",
                  },
                ];
              }}
            />
            <Input
              divstyle={{ width: "50%" }}
              name="motorcycle_placa"
              label="Placa *"
              type="mask"
              mask="aaa-9999"
              maskPlaceholder=" "
              validate={(e) => {
                return [
                  {
                    expression: e.value.length === 0,
                    message: "Preencha a placa!",
                  },
                ];
              }}
            />
            <Input
              divstyle={{ width: "50%", paddingLeft: "16px" }}
              name="motorcycle_renavam"
              label="Renavam *"
              type="mask"
              mask="99999999999"
              maskPlaceholder=" "
              validate={(e) => {
                const value = e.value.trim();
                return [
                  {
                    expression: value.length === 0,
                    message: "Preencha o Renavam!",
                  },
                  {
                    expression: !isValidRenavam(value),
                    message: "Renavam inválido!",
                  },
                ];
              }}
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
        </Container>
      </Layout>
    </>
  );
};
export default Servicos;
