import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas: "title" "description" "form" "img";

  & > h1 {
    grid-area: title;
  }

  & > p {
    grid-area: description;
  }

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
    grid-template-rows: repeat(3, auto);
    grid-template-areas: "title title" "description description" "form img";
    column-gap: 32px;

    & > div {
      align-self: center;
    }
    & > div > img {
      display: block;
      box-shadow: 8px 8px 0px 0px var(--color-tertiary);
      width: calc(100% - 64px);
      height: calc(100% - 15px);
      object-fit: cover;
    }
  }
`;
