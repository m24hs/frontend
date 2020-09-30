import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .icon > svg {
    width: 256px;
    ${({ tipo }) =>
      tipo === "aprovado"
        ? `color: var(--color-success);`
        : `color: var(--color-warning);`}
  }

  p {
    font-size: 18px;
    padding: 32px 0px;
  }

  & iframe {
    width: 100%;
    min-height: 700px;
    border: 0;
  }

  @media (min-width: 780px) {
    flex-direction: row;

    p {
      font-size: 24px;
      padding: 0px 32px;
    }

    & > iframe {
      min-height: 1000px;
    }
  }
`;
