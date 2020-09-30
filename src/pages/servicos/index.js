import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import { Divider } from "../../styles/global";
import { Container } from "../../styles/pages/servicos/index.js";
import Layout from "../../components/site/Layout";
import ImgMotor from "../../assets/servicos/motor.jpg";
import ImgRoda from "../../assets/servicos/roda.jpg";
import ImgDirecao from "../../assets/servicos/direcao.jpg";

const Servicos = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Serviços - M24</title>
      </Head>
      <Layout>
        <Container>
          <h1 className="page-title">Serviços</h1>
          <ul className="margin-3x">
            <li>
              <div className="services margin-2x">
                <h2 className="service-title page-title">
                  Gestão Preventiva de Motos
                </h2>
                <div className="service-img">
                  <img src={ImgRoda} />
                </div>
                <p className="service-description page-description">
                  Nossa missão consiste em dar ao cliente mais segurança e
                  comodidade ao sair de sua casa. A assessoria tem como objetivo
                  principal fazer a gestão da sua motocicleta através da
                  manutenção preventiva.
                  <ul>
                    <li>
                      <strong>Custa menos de R$ 1,70 por dia</strong>
                      <p>
                        Nós cuidamos da sua moto com todo zelo e
                        responsabilidade que só a M24 tem
                      </p>
                    </li>
                    <li>
                      <strong>Central de atendimento 24 horas</strong>
                      <p>
                        Ligue para 0800 729 9123, estaremos prontos para
                        atendê-lo
                      </p>
                    </li>
                    <li>
                      <strong>
                        Sua moto de volta em no máximo de 72 horas
                      </strong>
                      <p>
                        Todo e qualquer serviço na motocicleta é de
                        responsabilidade da M24, sua moto estará com você o
                        quanto antes
                      </p>
                    </li>
                    <li>
                      <strong>Serviço de guincho</strong>
                      <p>24 horas, disponível no raio de até 200km</p>
                    </li>
                  </ul>
                </p>
                <Link href={`${router.pathname}/gestao-preventiva-motos`}>
                  <button className="service-button btn-default">
                    Saiba mais
                  </button>
                </Link>
              </div>
            </li>
            <li>
              <Divider />
            </li>
            <li>
              <div className="services right margin-2x">
                <h2 className="service-title page-title">
                  Treinamento de Pilotagem Defensiva de Motos
                </h2>
                <div className="service-img">
                  <img src={ImgDirecao} />
                </div>
                <p className="service-description page-description">
                  Pequenos detalhes fazem toda diferença, fique atento aos
                  cuidados com sua motocicleta, e claro, conheça nossa proposta
                  de gestão corretiva!
                </p>
                <Link href={`${router.pathname}/gestao-preventiva-motos`}>
                  <button className="service-button btn-default">
                    Saiba mais
                  </button>
                </Link>
              </div>
            </li>
          </ul>
        </Container>
      </Layout>
    </>
  );
};
export default Servicos;
