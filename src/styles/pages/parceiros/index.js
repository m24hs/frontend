import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div``;

export const ListPartners = styled.ul`
  display: flex;
  flex-direction: column;

  & > li {
    margin: 0 0 16px 0;
  }

  & > li > img {
    width: 100%;
  }

  @media (min-width: 780px) {
    flex-direction: row;
    & > li {
      margin: 0 8px 0 0;
    }

    & > li > img {
        width: auto;
      height: 200px;
    }
  }
`;
