// Imports padrão
import { useState, useEffect } from "react";
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

const Dicas = (props) => {
  // Rota
  const router = useRouter();
  
  // Preenche variável data
  const [dataDicas,setDataDicas] = useState({});
  useEffect(() => {
    const getData = async () => {
      const dicas = await fetchData(api.get("/posts"));
      setDataDicas(dicas);
    }
    getData();
  },[props])

  return (
    <>
      <Head>
        <title>Dicas - Painel Administrativo - M24</title>
      </Head>
      <Layout>
        <div>
          <PageTitle secondary>Dicas</PageTitle>
          <DataTable
            className="margin-3x"
            columns={[
              {
                name: "#",
                selector: "id",
                sortable: true,
              },
              {
                name: "Título",
                selector: "title",
                sortable: true,
              },
              {
                name: "Data e Hora",
                sortable: true,
                cell: (row) => (
                  <Moment date={row.updatedAt} format="DD/MM/YYYY HH:mm:ss" />
                ),
              },
            ]}
            data={dataDicas}
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

export default Dicas;