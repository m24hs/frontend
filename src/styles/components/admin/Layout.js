import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 50;
`;

export const Wrapper = styled.div`
  & > div {
    min-height: 100vh;
    transition: all .3s;
    ${({ sidebarOpen }) =>
      !sidebarOpen
        ? `
        padding: calc(64px + 32px) 32px 32px 32px;            
    `
        : `
        padding: calc(64px + 32px) 32px 32px 332px;
    `}
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  table > thead > tr > th {
    text-align: left;
    border-bottom: 2px solid #DEE2E6;
    color: var(--color-primary);
  }

  table > thead > tr > th, table > tbody > tr > td {
    padding: 10px 0;
  }  

  table > tbody > tr > td {
    border-bottom: 1px solid #DEE2E6;
  }

  table > tbody > tr > td > a {
    cursor: pointer;
  }

  table > tbody > tr > td > a:hover {
    color: #52A0D0;
  }  

  form > input {
    display: block;
    width: 100%;
    height: 42px;
    padding: .375rem .75rem;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: .25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
  }
`;