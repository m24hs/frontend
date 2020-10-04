import styled from "styled-components";

export const WrapperStyle = styled.div`
  & input {
    margin: 0 0 8px 0;
    padding: 12px 6px;
    outline: none;
    font-family: "Mulish", sans-serif;
    font-size: 16px;
    border: 0;
    color: var(--color-text);
    border-bottom: 2px solid #ffffff60;
    background: none;
    transition: all 0.3s;
  }

  & input[error], & input[error]:focus {
    color: var(--color-tertiary);
    border-bottom: 2px solid var(--color-tertiary);
  }

  & span {
    color: var(--color-tertiary);
    text-align: right;
  }

  & input:focus,
  & textarea:focus {
    border-bottom: 2px solid var(--color-text);
  }
`;
