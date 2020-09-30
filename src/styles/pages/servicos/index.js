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
    box-shadow: 4px 4px 0px 0px rgba(198, 9, 28, 1);
  }

  & .services > .service-img > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  & .services > .service-description {
    grid-area: text;
  }

  & .services > .service-description > ul {
    margin-top: -14px;
    padding: 16px 1em;
  }

  & .services > .service-description > ul > li:before {
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

  & .services > .service-description > ul > li > strong {
    font-weight: bold;
  }

  & .services > .service-description > ul > li > p {
    text-align: left;
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

