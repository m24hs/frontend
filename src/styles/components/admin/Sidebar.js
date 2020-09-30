import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 0;
  overflow: hidden;
  position: fixed;
  background: var(--color-primary);  
  transition: all 0.3s;

  & > * {
    opacity: 0;
    transition: all 0.3s;
  }

  ${({ open }) =>
    open &&
    `
    width: 300px; 
    padding: calc( 64px + 16px ) 0 16px 0; 
    box-shadow: 0px 0px 17px 6px rgba(0, 0, 0, 0.2);

    & > * {
      opacity: 1;
  }    
  `}
`;

export const Itens = styled.ul`
  & > li > a {
    padding: 12px 6px;
    color: var(--color-text);
    background: var(--color-primary);
    transition: all .3s;    
    display: block;
    padding: 14px 16px;
  }

  & > li > a:hover {
    background: var(--color-primary-hover);
  }

  & > li > a svg { 
    width: 24px;
    margin-right: 6px;
  }
`;
