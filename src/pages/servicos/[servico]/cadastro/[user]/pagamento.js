// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

// Imports de estilo
import Layout from "../../../../../components/site/Layout";
import {
  PageTitle,
  PageDescription,
  Button,
} from "../../../../../styles/global";
import {
  Container,
  Wrapper,
} from "../../../../../styles/pages/servicos/cadastro/user/pagamento";
import {
  CreditCard as CreditCardIcon,
  BarcodeReader as BarcodeReaderIcon,
  ArrowBack as ArrowBackIcon,
} from "@styled-icons/boxicons-regular";

// Imports auxiliares
import api from "../../../../../services/api";
import { getFormData } from "../../../../../services/helpers";
import { Input } from "../../../../../components/Form";
import cardValidator from "card-validator";

const Servicos = (props) => {
  // Rotas
  const router = useRouter();
  const { servico, user } = router.query;

  // State
  const [paymentType, setPaymentType] = useState("");
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Verifica se o usuário já fez o pagamento
  useEffect(() => {
    const getData = async () => {
      if (user) {
        const subscription = await api.get(`/subscriptions/${user}?where=iugu`);
        if (subscription.data.payment_method !== "") {
          router.push("/");
        }
      }
    };
    getData();
  }, [user]);

  // Envia formulário
  const handleContinue = async (type) => {
    setIsLoading(true);

    try {
      setIsError("");
      let response = {};
      if (type === "cartao") {
        // Pega os dados do form
        const formData = getFormData(".credit-card");

        // Tratamento dados
        formData["number"] = formData.number.replaceAll(" ", "");
        formData["first_name"] = formData.name
          .trim()
          .split(" ")
          .slice(0, -1)
          .join(" ");
        formData["last_name"] = formData.name
          .trim()
          .split(" ")
          .slice(-1)
          .join(" ");
        formData["month"] = formData.date.substr(0, 2);
        formData["year"] = `20${formData.date.substr(3, 2)}`;
        delete formData["name"];
        delete formData["date"];

        response = await api.post(
          `/subscriptions/${user}/credit_card?service=${servico}`,
          formData
        );
        if (response.data.status == "success") {
          setIsLoading(false);
          router.push(
            `/servicos/${servico}/cadastro/${user}/finalizacao/aprovado`
          );
          return;
        }
      } else {
        response = await api.post(
          `/subscriptions/${user}/bank_slip?service=${servico}`
        );
        if (response.data.status === "success") {
          setIsLoading(false);
          router.push({
            pathname: `/servicos/${servico}/cadastro/${user}/finalizacao/analise`,
            query: {
              boleto: response.data.data.recent_invoices[0] ? response.data.data.recent_invoices[0].secure_url : "",
            },
          });
          return;
        }
      }
      throw new Error(response.data.data);
    } catch (error) {
      setIsLoading(false);
      setIsError(error.message);
    }
  };

  return (
    <>
      <Head>
        <title>Pagamento - M24</title>
      </Head>
      <Layout
        hideFB
        loading={isLoading || false}
        error={isError}
        backgroundColor="var(--color-text)"
      >
        <Container>
          <PageTitle secondary>Assinatura</PageTitle>
          <Wrapper>
            {paymentType === "" ? (
              <>
                <PageDescription secondary>
                  Por favor, selecione a forma de pagamento para assinatura:
                </PageDescription>
                <ul className="payment-type">
                  <li onClick={() => setPaymentType("cartao")}>
                    <CreditCardIcon /> Cartão de crédito
                  </li>
                  <li onClick={() => setPaymentType("boleto")}>
                    <BarcodeReaderIcon /> Boleto
                  </li>
                </ul>
              </>
            ) : (
              <>
                {paymentType === "cartao" ? (
                  <>
                    <PageDescription secondary>
                      Por favor, informe os dados do cartão e clique em
                      confirmar assiantura
                    </PageDescription>
                    <form className="credit-card">
                      <Input
                        light={true}
                        type="mask"
                        label="Número do Cartão"
                        name="number"
                        mask="9999 9999 9999 9999"
                        maskPlaceholder=" "
                        validate={(e) => {
                          const number = e.value.replaceAll(" ", "").trim();
                          return [
                            {
                              expression: number === "",
                              message: "Preencha o número do cartão!",
                            },
                            {
                              expression: !cardValidator.number(number)
                                .isPotentiallyValid,
                              message: "Número inválido!",
                            },
                          ];
                        }}
                      />
                      <Input
                        light={true}
                        type="mask"
                        label="CVV"
                        name="verification_value"
                        mask="9999"
                        maskPlaceholder=" "
                        validate={(e) => {
                          const cvv = e.value.trim();
                          return [
                            {
                              expression: cvv === "",
                              message: "Preencha o CVV",
                            },
                          ];
                        }}
                      />
                      <Input
                        light={true}
                        type="mask"
                        label="Titular do Cartão"
                        name="name"
                        mask={"a".repeat(50)}
                        maskPlaceholder=" "
                        validate={(e) => {
                          return [
                            {
                              expression: e.value.trim() === "",
                              message: "Preencha o titular do cartão",
                            },
                            {
                              expression: !cardValidator.cardholderName(
                                e.value.trim()
                              ).isPotentiallyValid,
                              message: "Nome do titular inválido!",
                            },
                          ];
                        }}
                      />
                      <Input
                        light={true}
                        type="mask"
                        label="Data de Vencimento"
                        name="date"
                        mask="99/99"
                        maskPlaceholder=" "
                        validate={(e) => {
                          return [
                            {
                              expression: e.value.trim() === "",
                              message: "Preencha a data de vencimento",
                            },
                            {
                              expression: !cardValidator.expirationDate(
                                e.value.trim()
                              ).isPotentiallyValid,
                              message: "Data inválida!",
                            },
                          ];
                        }}
                      />
                      <div>
                        <div>
                          <img
                            src="https://s3-sa-east-1.amazonaws.com/storage.pupui.com.br/9CA0F40E971643D1B7C8DE46BBC18396/assets/cc-icons.e8f4c6b4db3cc0869fa93ad535acbfe7.png"
                            alt="Visa, Master, Diners. Amex"
                            border="0"
                          />
                        </div>
                      </div>
                      <div>
                        <a
                          className="iugu-btn"
                          href="http://iugu.com"
                          target="_blank"
                        >
                          <img
                            src="https://s3-sa-east-1.amazonaws.com/storage.pupui.com.br/9CA0F40E971643D1B7C8DE46BBC18396/assets/payments-by-iugu.1df7caaf6958f1b5774579fa807b5e7f.png"
                            alt="Pagamentos por Iugu"
                            border="0"
                          />
                        </a>
                      </div>
                    </form>
                    <Button
                      secondary
                      onClick={() => handleContinue("cartao")}
                      margin="32px 0"
                    >
                      Confirmar assinatura
                    </Button>
                  </>
                ) : (
                  <>
                    <PageDescription secondary>
                      O pagamento por boleto é uma ótima pedida pra quem não
                      possui cartão de crédito, será enviado para seu email
                      mensalmente a fatura para o pagamento, fique atento a data
                      de vencimento. Ao confirmar será enviado para o seu email
                      o boleto para a confirmação da assinatura.
                    </PageDescription>
                    <Button
                      secondary
                      onClick={() => handleContinue("boleto")}
                      margin="32px 0"
                    >
                      Confirmar assinatura por boleto
                    </Button>
                  </>
                )}
                <button
                  className="change-payment-type"
                  onClick={() => setPaymentType("")}
                >
                  <ArrowBackIcon />
                  Selecionar outra forma de pagamento
                </button>
              </>
            )}
          </Wrapper>
        </Container>
      </Layout>
    </>
  );
};
export default Servicos;
