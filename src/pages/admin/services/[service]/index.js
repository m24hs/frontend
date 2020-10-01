import { useState } from "react";
import Head from "next/head";
import Layout from "../../../../components/admin/Layout";

import Editor from "../../../../components/admin/Editor";

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
            <div>
              <label>Titulo</label>
              <input type="text" />
            </div>
            <div>
              <label>Url</label>
              <input type="text" />
            </div>
            <div>
              <label>Descrição</label>
              <Editor />
            </div>
            <div>
              <label>Valor</label>
              <input type="text" />
            </div>            
            <button className="btn-primary">Salvar</button>
          </form>
        </div>
      </Layout>
    </>
  );
};
export default Servicos;
