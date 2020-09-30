import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import DataTable from "react-data-table-component";
import Moment from "react-moment";
import './style.css';


import api from "../../../services/api.js";
import { checkErrors, fetchData } from "../../../services/helpers.js";

import Layout from "../../../components/admin/Layout";

const Assinaturas = ({ assinaturas }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Assinaturas - Painel Administrativo - M24</title>
      </Head>
      <Layout>
        <div>
          <DataTable
            columns={[
              {
                name: "#",
                selector: "id",
                sortable: true,
              },
              {
                name: "Usuário",
                selector: "user",
                sortable: true,
              },
              {
                name: "Forma de Pagamento",
                sortable: true,
                cell: (row) => (
                  <>
                    {row.payment_method === "credit-card"
                      ? "Cartão de Crédito"
                      : "Boleto"}
                  </>
                ),
              },
              {
                name: "Data e Hora",
                sortable: true,
                cell: (row) => (
                  <Moment date={row.createdAt} format="DD/MM/YYYY HH:mm:ss" />
                ),
              },
            ]}
            data={assinaturas.data}
            responsive={true}
          />
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const assinaturas = await fetchData(api.get("/subscriptions"));

  return {
    props: {
      assinaturas,
    },
  };
}

export default Assinaturas;

/*
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import DataTable from 'react-data-table-component';
import Moment from 'react-moment';

import api from "../../../services/api.js";
import { checkErrors, fetchData } from "../../../services/helpers.js";

import Layout from "../../../components/admin/Layout";

const Assinaturas = ({ assinaturas }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Assinaturas - Painel Administrativo - M24</title>
      </Head>
      <Layout>
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Usuário</th>
                <th>Forma de pagamento</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {assinaturas.data.map((assinatura) => (
                <tr key={assinatura.id}>
                  <td>{assinatura.id}</td>
                  <td>
                    <Link href={`${router.pathname}/${assinatura.id}`}><a>{assinatura.id}</a></Link>
                  </td>
                  <td>{assinatura.payment_method === "credit-card" ? "Cartão de Crédito" : "Boleto" }</td>
                  <td><Moment date={assinatura.createdAt} format="DD/MM/YYYY HH:mm:ss"/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {  
  const assinaturas = await fetchData(api.get("/subscriptions"));

  return {
    props: {
      assinaturas,
    },
  };
}

export default Assinaturas;

*/
