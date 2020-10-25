import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const ListService = styled.ul`
  padding: 16px 0;
`;

export const ListItem = styled.li`
  display: grid;
  grid-template-rows: repeat(5, auto);
  grid-template-columns: 1fr;
  grid-template-areas: "divider" "title" "img" "text" "button";
  row-gap: 16px;
  column-gap: 32px;

  & > span {
    grid-area: divider;
  }

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
        grid-template-areas: "divider divider" "title img" "text img" "button img";
      `
        : `
        grid-template-areas: "divider divider" "img title" "img text" "img button";
    `}
  }
`;

export const ListImage = styled.div`
  grid-area: img;
  width: 100%;
  height: 100%;
  box-shadow: 8px 8px 0px 0px var(--color-tertiary);

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;
