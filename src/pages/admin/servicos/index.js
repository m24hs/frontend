import Head from "next/head";
import { useRouter } from "next/router";
import Moment from "react-moment";

import api from "../../../services/api.js";
import { fetchData } from "../../../services/helpers.js";

import Layout from "../../../components/admin/Layout";
import DataTable from "../../../components/admin/DataTable";

const Servicos = ({ servicos }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Serviços - Painel Administrativo - M24</title>
      </Head>
      <Layout>
        <div>
          <h1 className="page-title-secondary">Serviços</h1>
          <DataTable
            className="margin-3x"
            columns={[
              {
                name: "#",
                selector: "id",
                sortable: true,
              },
              {
                name: "Serviço",
                selector: "name",
                sortable: true,
              },
              {
                name: "Valor",
                sortable: true,
                cell: (row) => <>R$ {row.price.toFixed(2).replace(".", ",")}</>,
              },
              {
                name: "Data e Hora",
                sortable: true,
                cell: (row) => (
                  <Moment date={row.createdAt} format="DD/MM/YYYY HH:mm:ss" />
                ),
              },
            ]}
            data={servicos.data}
            baseUrl={router.pathname}
            search={true}
            add={true}
            edit={true}
          />
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  const servicos = await fetchData(api.get("/services"));

  return {
    props: {
      servicos,
    },
  };
}

export default Servicos;
