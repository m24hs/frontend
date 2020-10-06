import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: row;

  & input {
    flex: 1;
  }

  & > a {
    margin-left: 16px;
    width: 90px;
  }

  @media (min-width: 780px) {
    & > a {
      width: 200px;
    }
  }
`;

export const Custom = {
  header: {
    style: {
      display: "none",
    },
  },
  subHeader: {
    style: {
      backgroundColor: "red",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      cursor: "pointer",
    },
  },
  headCells: {
    style: {
      padding: "0 8px",
      fontSize: "15px",
      fontWeight: "800",
      color: "var(--color-primary)",
    },
  },
  cells: {
    style: {
      padding: "0 8px",
    },
  },
};
