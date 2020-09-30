import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import api from "../../../services/api.js";
import { checkErrors, fetchData } from "../../../services/helpers.js";

import Layout from "../../../components/admin/Layout";

const Servicos = ({ servicos }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Serviços - Painel Administrativo - M24</title>
      </Head>
      <Layout>
        <div>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Serviço</th>
              </tr>
            </thead>
            <tbody>
              {servicos.data.map((servico) => (
                <tr key={servico._id}>
                  <td>1</td>
                  <td>
                    <Link href={`${router.pathname}/${servico.url}`}>{servico.titulo}</Link>
                  </td>
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
  const servicos = { data: [] };
  //const servicos = await fetchData(api.get("/servico")) || { data:{} };

  return {
    props: {
      servicos,
    },
  };
}

export default Servicos;
