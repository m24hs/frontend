import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import api from "../../../../../services/api";
import { getFormData } from "../../../../../services/helpers";

import Layout from "../../../../../components/site/Layout";

import {
  Container,
  Wrapper,
} from "../../../../../styles/pages/servicos/cadastro/user/pagamento";

import {
  CreditCard as CreditCardIcon,
  BarcodeReader as BarcodeReaderIcon,
  ArrowBack as ArrowBackIcon,
} from "@styled-icons/boxicons-regular";

const Servicos = (props) => {
  const router = useRouter();
  const { servico, user } = router.query;
  const [paymentType, setPaymentType] = useState("");

  const handleContinue = async (type) => {
    if (type === "cartao") {
      // Pega os dados do form
      const formData = getFormData(".credit-card");

      const response = await api.post(`/subscriptions/${user}/credit-card`, formData);
      console.log(response.data);
      if (response.data.status == "success") {
        router.push(`/servicos/${servico}/cadastro/${user}/finalizacao/aprovado`);
      }
    } else {
      const response = await api.post(`/subscriptions/${user}/boleto`);
      console.log(response.data);
      if (response.data.status === "success") {
        router.push({
          pathname: `/servicos/${servico}/cadastro/${user}/finalizacao/analise`,
          query: {
            boleto: response.data.data.recent_invoices[0].secure_url
          },
        });
      }
    }
  };

  return (
    <>
      <Head>
        <title>Pagamento - M24</title>
      </Head>
      <Layout hideFB backgroundColor="var(--color-text)">
        <Container>
          <h1 className="page-title-secondary">Assinatura</h1>
          <Wrapper>
            {paymentType === "" ? (
              <>
                <p className="margin-3x">
                  Por favor, selecione a forma de pagamento para assinatura:
                </p>
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
                    <p className="margin-3x">
                      Por favor, informe os dados do cartão e clique em
                      confirmar assiantura
                    </p>
                    <form className="credit-card form-light">
                      <div>
                        <label>Número do Cartão</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label>CVV</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label>Titular do Cartão</label>
                        <input type="text" />
                      </div>
                      <div>
                        <label>Data de Vencimento</label>
                        <input type="text" />
                      </div>
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
                    <button
                      className="btn-default margin-3x"
                      onClick={() => handleContinue("cartao")}
                    >
                      Confirmar assinatura
                    </button>
                  </>
                ) : (
                  <>
                    <p className="margin-3x">
                      O pagamento por boleto é uma ótima pedida pra quem não
                      possui cartão de crédito, será enviado para seu email
                      mensalmente a fatura para o pagamento, fique atento a data
                      de vencimento. Ao confirmar será enviado para o seu email
                      o boleto para a confirmação da assinatura.
                    </p>
                    <button
                      className="btn-default margin-3x"
                      onClick={() => handleContinue("boleto")}
                    >
                      Confirmar assinatura por boleto
                    </button>
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
