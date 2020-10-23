// Imports auxiliares
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Imports de estilo
import DataTableWrapper from "react-data-table-component";
import { Custom, Form } from "../../styles/components/admin/DataTable";
import { Button } from "../../styles/global";
import { Plus as PlusIcon } from "@styled-icons/boxicons-regular";

const DataTable = (props) => {
  const router = useRouter();

  const {
    data,
    onRowClicked,
    className,
    search = false,
    add = false,
    baseUrl = "",
    edit = false,
    ...restOfProps
  } = props;
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    setFilteredData(data);
  },[props])

  // Pesquisa no json
  const handleSearch = (e) => {
    const value = e.target.value || "";
    
    if (value !== "") {
      const dataAux = data.filter(item => {
        let text = JSON.stringify(item);
        return text.includes(value);
      });
      setFilteredData(dataAux);
    } else {
      setFilteredData(data);
    }
  };

  return (
    <div className={className}>
      <Form onSubmit={(e) => e.preventDefault()}>
        {search && (
          <input
            type="text"
            name="search"
            placeholder="Pesquisa"
            onChange={(e) => handleSearch(e)}
          />
        )}
        {add && (
          <a href={`${baseUrl}/novo`}>
            <Button type="button">
              <PlusIcon />
              Novo
            </Button>
          </a>
        )}
      </Form>
      <DataTableWrapper
        {...restOfProps}
        customStyles={Custom}
        noDataComponent={
          <>
            <br />
            Nenhum registro encontrado.
          </>
        }
        pagination={true}
        highlightOnHover={true}
        responsive={true}
        data={filteredData}
        onRowClicked={(item) => {
          if (onRowClicked) {
            return onRowClicked(item);
          } else if (edit) {
            window.location.href = `${baseUrl}/${item.id}`;
          }
          return;
        }}
        paginationComponentOptions={{
          rowsPerPageText: "Linhas por página:",
          rangeSeparatorText: "de",
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: "Todos",
        }}
      />
    </div>
  );
};

export default DataTable;
