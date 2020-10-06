import styled from "styled-components";

export const Container = styled.div`
  width: 100%;

  & .services {
    display: grid;
    grid-template-rows: repeat(4, auto);
    grid-template-columns: 1fr;
    grid-template-areas: "title" "img" "text" "button";
    row-gap: 16px;
    column-gap: 32px;
  }

  & .services > .service-title {
    grid-area: title;
    color: var(--color-text);
  }

  & .services > .service-img {
    grid-area: img;
  }

  & .services > .service-img > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  & .services > .service-button {
    grid-area: button;
    align-self: end;
  }

  @media (min-width: 780px) {
    & .services {
      grid-template-rows: repeat(3, auto);
      grid-template-columns: 1fr 1fr;
      grid-template-areas: "img title" "img text" "img button";
    }

    & .services.right {
      grid-template-areas: "title img" "text img" "button img";
    }
  }
`;

export const ViewHtml = styled.div`
  grid-area: text;
  color: var(--color-text);

  & > ul {
    margin-top: -14px;
    padding: 16px 1em;
  }

  & > ul > li > strong:before {
    content: "";
    border-color: transparent var(--color-tertiary);
    border-style: solid;
    border-width: 0.35em 0 0.35em 0.45em;
    display: block;
    height: 0;
    width: 0;
    left: -1em;
    top: 0.9em;
    position: relative;
  }

  & > ul > li > strong {
    font-weight: bold;
  }

  & > ul > li > p {
    text-align: left;
  }
`;
