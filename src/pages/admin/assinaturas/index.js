// Imports padrão
import Head from "next/head";
import { useRouter } from "next/router";
import Moment from "react-moment";

// Imports auxiliares
import api from "../../../services/api.js";
import { fetchData } from "../../../services/helpers.js";
import Layout from "../../../components/admin/Layout";
import DataTable from "../../../components/admin/DataTable";

const Assinaturas = ({ assinaturas }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Assinaturas - Painel Administrativo - M24</title>
      </Head>
      <Layout>
        <div>
          <h1 className="page-title-secondary">Assinaturas</h1>
          <DataTable
            className="margin-3x"
            columns={[
              {
                name: "#",
                selector: "id",
                sortable: true,
              },
              {
                name: "Usuário",
                selector: "User.name",
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
            data={assinaturas}
            search={true}
          />
        </div>
      </Layout>
    </>
  );
};

export async function getStaticProps() {
  // Carregar
  const assinaturas = await fetchData(api.get("/subscriptions"));

  return {
    props: {
      assinaturas,
    },
  };
}

export default Assinaturas;