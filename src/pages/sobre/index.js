// Imports padrão
import Head from "next/head";
import Layout from "../../components/site/Layout";

// Imports de estilo
import { Container } from "../../styles/pages/sobre";
import { PageTitle, PageDescription, ViewHtml } from "../../styles/global";

const Sobre = () => {
  return (
    <>
      <Head>
        <title>Sobre - M24</title>
      </Head>
      <Layout>
        <Container>
          <PageTitle>Sobre</PageTitle>
          <PageDescription>
            <ViewHtml>
              M24 é uma empresa de assessoria para motocicletas, criada para dar
              ao cliente mais segurança e comodidade ao sair de sua casa, a
              assessoria tem como objetivo principal fazer a gestão da sua
              motocicleta e assim realizar manutenção preventiva evitando
              transtorno com uma possível manutenção corretiva. Mas também
              assessorando na parte de manutenção corretiva. Esse projeto foi
              idealizado e estruturado pelos sócios Luis Ricardo Spirito, João
              Guilherme de Carvalho e Ronaldo Lima com muito zelo para oferecer
              o melhor serviço aos clientes.
              <br />
              <br />
              Em 2009, o sócio Ricardo observou a dificuldade em ser bem
              atendido em determinadas oficinas, borracharias, chaveiros, auto
              elétricas e outros serviços essenciais para manter sua moto
              comtudo em dia. Deste modo, o que mais incomodava era a falta de
              credibilidade e veracidade das informações repassadas para o
              cliente, pois não contemos propriedade para debater fora da nossa
              área e atuação com um especialista que teoricamente era para
              prestar e dar totalmente as informações necessárias para que você
              entendesse de fato o que era a manutenção / reparos a serem feito,
              aceitando assim, a oficina a fazer “o que bem entender, e cobrar o
              que acha ser justo”.
              <br />
              <br />
              Foi assim que surgiu em 2010 a ideia de facilitar e unificar todas
              essas manutenções em um só lugar sem se preocupar com gastos
              desnecessários ou até mesmo manutenções impróprias e/ou
              inverídicas apontadas pelos prestadores. Durante esses anos,
              estudos, pesquisas, conferências com motoqueiros de diversas
              áreas, foram realizadas, chegando de fato que não era somente eu
              que tinha esses problemas em querer ser bem atendido.
              <br />
              <br />
              Em 2020 fomos surpreendidos por uma pandemia que deixou todo o
              mundo desestruturado, e mais uma vez, ficava notório o déficit que
              existe nesta área em prestar um bom atendimento. No dia
              04/07/2020, a M24hs dá inicio nos projetos e sai do papel,
              contando com os sócios João e Ronaldo, formamos um time único, com
              os mesmos objetivos e foco total no cliente e parceiro.
              <br />
              <br />
              <ul>
                <li>
                  <strong><h2>Missão</h2></strong>
                </li>
                <li>
                  Impactar nosso cliente com inovação, segurança e comodidade.
                </li>
                <li>
                  <strong><h2>Visão</h2></strong>
                </li>
                <li>
                  Impactar pessoas com a nossa gestão e criar uma marca forte e
                  pioneira no mercado.
                </li>
                <li>
                  <strong><h2>Valores</h2></strong>
                </li>
                <li>Transparência, ética e muita responsabilidade.</li>
              </ul>
              <br />
              Chegamos para revolucionar esta gestão, dando total apoio ao
              cliente/parceiro, deixando-o confortável e ciente de fato de todos
              os acontecimentos tanto na corretiva e preventiva. Estaremos 24hs
              por dia com você, sem se preocupar com nenhum outro tipo de gasto,
              a M24hs faz toda a diferença no seu dia a dia. Venha fazer parte
              desta inovação e ficar tranquilo com todos os nossos os serviços,
              venha ser M24hs! #agentecuidaparavoce
            </ViewHtml>
          </PageDescription>
        </Container>
      </Layout>
    </>
  );
};
export default Sobre;
