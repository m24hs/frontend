import styled from "styled-components";

export const Container = styled.div``;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas: "pdf" "check" "button";
  gap: 16px;

  @media (min-width: 780px) {
    grid-template-columns: 1fr 200px;
    grid-template-rows: repeat(2, auto);
    grid-template-areas: "pdf pdf" "check button";
  }

  & > iframe {
    grid-area: pdf;
  }

  & > div {
    grid-area: check;
    align-self: center;
    padding: 16px 0 0 0;

    @media (min-width: 780px) {
      padding: 0;
    }
  }

  & > div > svg {
    margin: 0 10px 4px 0;
    width: 24px;
    color: var(--color-tertiary);
  }

  & > div > input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
`;
