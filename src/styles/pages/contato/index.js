import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 1fr auto;
  grid-template-areas: "form" ".";

  & > form {
      grid-area: form;
  }
  
  & > div {
    text-align: right;
    grid-area: img;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
  }
  & > div > img {
    display: none;
  }

  @media (min-width: 780px) {
    grid-template-columns: 400px auto;
    grid-template-rows: 1fr;
    grid-template-areas: "form img";
    column-gap: 32px;

    & > div {
      align-self: center;
    }
    & > div > img {
      display: block;
      box-shadow: 8px 8px 0px 0px var(--color-tertiary);
      width: calc(100% - 64px);
      height: calc(100% - 8px);
      object-fit: cover;
    }
  }
`;
