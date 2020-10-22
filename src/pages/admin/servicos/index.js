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
import cookieCutter from 'cookie-cutter';

const Servicos = (props) => {
  // Rota
  const router = useRouter();
  
  // Preenche variável data
  const [dataServicos,setDataServicos] = useState({});
  useEffect(() => {
    // Vai para tela de loggin
    if (cookieCutter.get('logged') !== "true") {
      router.push("/admin");
    }

    // Consulta
    const getData = async () => {
      const servicos = await fetchData(api.get("/services"));
      setDataServicos(servicos);
    }
    getData();
  },[props])

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
                  <Moment date={row.updatedAt} format="DD/MM/YYYY HH:mm:ss" />
                ),
              },
            ]}
            data={dataServicos}
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

export default Servicos;