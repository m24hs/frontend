import { useState } from "react";
import Head from "next/head";
import Layout from "../../../../components/admin/Layout";

const Servicos = () => {
  return (
    <>
      <Head>
        <title>Serviços - Painel Administrativo - M24</title>
      </Head>
      <Layout>
        <div>
          <h1 className="page-title-secondary">Serviços</h1>
          <form className="margin-3x">
            <label>Titulo</label>
            <input type="text" />
            <label>url</label>
            <input type="text" />
            <button className="btn-primary">Salvar</button>
          </form>
        </div>
      </Layout>
    </>
  );
};
export default Servicos;
