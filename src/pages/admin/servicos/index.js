// Imports padrão
import Head from "next/head";
import { useRouter } from "next/router";
import Moment from "react-moment";

// Imports de estilo
import Layout from "../../../components/admin/Layout";
import { PageTitle } from "../../../styles/global";

// Import auxiliares
import api from "../../../services/api.js";
import { fetchData } from "../../../services/helpers.js";
import DataTable from "../../../components/admin/DataTable";

const Servicos = ({ servicos }) => {
  // Rota
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Serviços - Painel Administrativo - M24</title>
      </Head>
      <Layout>
        <div>
          <PageTitle secondary>Serviços</PageTitle>
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
                selector: "title",
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
            data={servicos}
            search={true}
            baseUrl={router.pathname}
            add={true}
            edit={true}
          />
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  // Carregar
  const servicos = await fetchData(api.get("/services"));

  return {
    props: {
      servicos,
    },
  };
}

export default Servicos;
