import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const ListService = styled.ul`
  padding: 16px 0;
`;

export const ListItem = styled.li`
  display: grid;
  grid-template-rows: repeat(4, auto);
  grid-template-columns: 1fr;
  grid-template-areas: "title" "img" "text" "button";
  row-gap: 16px;
  column-gap: 32px;

  & > h1 {
    grid-area: title;
    color: var(--color-text);
  }

  & > button {
    grid-area: button;
    align-self: end;
  }

  @media (min-width: 780px) {
    grid-template-rows: repeat(3, auto);
    grid-template-columns: 1fr 1fr;

    ${({ right }) =>
      right
        ? `    
        grid-template-areas: "title img" "text img" "button img";
      `
        : `
        grid-template-areas: "img title" "img text" "img button";
    `}
  }
`;

export const ListImage = styled.div`
  grid-area: img;
  
  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
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
