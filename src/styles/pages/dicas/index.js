import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  padding: 32px 0;
`;

export const ListPosts = styled.ul`
  & > li {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, auto);
    grid-template-areas: "post-divider" "post-title" "post-image" "post-text";

    @media (min-width: 780px) {
      grid-template-columns: 50% 50%;
      grid-template-rows: auto auto 1fr;
      grid-template-areas: "post-divider post-divider" "post-image post-title" "post-image post-text";
    }
  }
`;

export const PostTitle = styled.div`
  grid-area: post-title;

  margin: 0 0 32px 0;
  @media (min-width: 780px) {
    margin: 0 0 32px 32px;
  }
`;

export const PostDivider = styled.div`
  grid-area: post-divider;
`;

export const PostImage = styled.div`
  grid-area: post-image;
  width: 100%;

  & > img {
    width: 100%;
  }
`;

export const PostText = styled.div`
  grid-area: post-text;
  margin: 16px 0;
  @media (min-width: 780px) {
    margin: 0 0 0 32px;
  }  
`;

export const Pagination = styled.div`
  display: flex;
  padding: 32px 0 0 0;
  justify-content: flex-end;

  & > div {
    width: 50px;
    background: var(--color-secondary);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  & > button {
    width: 50px;
  }
`;
