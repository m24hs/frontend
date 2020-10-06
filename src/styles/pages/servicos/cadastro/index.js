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
  }
  & > div > img {
    width: 100%;
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
      width: 80%;
    }
  }
`;
