// Imports padrão
import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Moment from "react-moment";

// Imports de estilo
import Layout from "../../../components/admin/Layout";
import DataTable from "../../../components/admin/DataTable";
import { PageTitle } from "../../../styles/global";

// Imports auxiliares
import api from "../../../services/api.js";
import { fetchData } from "../../../services/helpers.js";
import cookieCutter from 'cookie-cutter';

const Assinaturas = (props) => {
  // Rota
  const router = useRouter();

  // Preenche variável data
  const [dataAssinaturas, setDataAssinaturas] = useState({});
  useEffect(() => {
    // Vai para tela de loggin
    if (cookieCutter.get('logged') !== "true") {
      router.push("/admin");
    }

    // Consulta        
    const getData = async () => {
      const assinaturas = await fetchData(api.get("/subscriptions"));
      setDataAssinaturas(assinaturas);
    };
    getData();
  }, [props]);

  return (
    <>
      <Head>
        <title>Assinaturas - Painel Administrativo - M24</title>
      </Head>
      <Layout>
        <div>
          <PageTitle secondary>Assinaturas</PageTitle>
          <DataTable
            className="margin-3x"
            columns={[
              {
                name: "Usuário",
                selector: "User.name",
                sortable: true,
              },
              {
                name: "Serviço",
                selector: "Service.title",
                sortable: true,
              },
              {
                name: "Forma de Pagamento",
                sortable: true,
                selector: "payment_method",
              },
              {
                name: "Situação",
                sortable: true,
                selector: "status",
              },
              {
                name: "Data e Hora",
                selector: "updatedAt",
                sortable: true,
              },
            ]}
            data={dataAssinaturas}
            baseUrl={router.pathname}
            search={true}
            onRowClicked={(item) => {
              window.location.href = `${router.pathname}/${item.User.id_iugu}`;
              return;
            }}
          />
        </div>
      </Layout>
    </>
  );
};

export default Assinaturas;
