import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div``;

export const ListPartners = styled.ul`
  display: flex;
  flex-direction: column;

  & > li {
    color: var(--color-text);
    padding: 0 0 48px 0;
  }

  & > li > h3 {
    padding: 8px 0;
    position: absolute;
  }

  & > li > div {
    width: 100%;
    height: 100%;
  }

  & > li > div > img {
    width: 100%;
  }

  @media (min-width: 780px) {
    flex-direction: row;
    flex-wrap: wrap;

    & > li {
      width: calc(25% - 16px);
      margin: 0 16px 0 0;
    }

    & > li > div > img {
      display: block;
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
`;
