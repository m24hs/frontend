import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DataTableWrapper from "react-data-table-component";

import { Custom, Form } from "../../styles/components/admin/DataTable";
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

  // Pesquisa no json
  const handleSearch = (e) => {
    const value = e.target.value || "";

    if (value !== "") {
      setFilteredData(filterIt(data, value));
    } else {
      setFilteredData(data );
    }
  };

  const filterIt = (object, search) => {
    return object.filter((obj) =>
      Object.values(obj).some((val) =>
        val ? val.toString().toLowerCase().includes(search) : false
      )
    );
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
            <button className="btn-primary" type="button">
              <PlusIcon />
              Novo
            </button>
          </a>
        )}
      </Form>
      <DataTableWrapper
        {...restOfProps}
        customStyles={Custom}
        noDataComponent={(<><br/>Nenhum registro encontrado.</>)}
        pagination={true}
        highlightOnHover={true}
        responsive={true}
        data={filteredData}
        onRowClicked={(item) => {
          if (onRowClicked) {
            return onRowClicked();
          } else if (edit) {
            //router.push(`${baseUrl}/${item.id}`);
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
