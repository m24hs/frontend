import styled from "styled-components";

export const Header = styled.header`
  display: grid;
  grid-template-columns: auto 64px;
  grid-template-rows: auto 1fr;
  grid-template-areas: "logo button" "menu menu";
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 100;
  background: var(--color-secondary);
  box-shadow: 0px -10px 17px 13px rgba(0, 0, 0, 0.2);

  @media (min-width: 780px) {
    grid-template-columns: auto 1fr;
    grid-template-rows: 1fr;
    grid-template-areas: "logo menu";
    padding: 0 32px;
  }
`;

export const Container = styled.div`
  grid-area: logo;
  height: 64px;
  padding: 10px 16px;
  align-self: center;
  cursor: pointer;

  @media (min-width: 780px) {
    padding: 10px 0;
  }  
`;

export const Logo = styled.img`
  height: 100%;
`;

export const ButtonMenu = styled.button`
  grid-area: button;
  justify-self: center;
  align-self: center;
  width: 40px;
  height: 40px;
  display: block;
  color: var(--color-primary);

  @media (min-width: 780px) {
    display: none;
  }
`;

export const Nav = styled.nav`
  grid-area: menu;
  height: 0px;
  overflow: hidden;
  transition: all 0.3s;

  @media (max-width: 780px) {
    &.showMenu {
      height: 350px;
      overflow: initial;
      padding: 10px 16px;
    }
  }

  & > ul {
    display: flex;
    flex-direction: column;
  }

  & > ul > li > a {
    width: 100%;
    line-height: 64px;
    display: block;
    text-align: center;
    color: var(--color-primary);
    font-size: 16px;
    font-weight: 600;

    transition: all 0.5s;
  }

  & > ul > li > a:hover {
    background: var(--color-secondary-shadow);
  }

  @media (min-width: 780px) {
    height: initial;
    align-self: center;
    justify-self: end;

    & > ul {
      flex-direction: row;
    }
    & > ul > li > a {
      padding: 0 8px;
    }
  }
`;

export const Overlay = styled.div`
  position: fixed;
  z-index: 50;  
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
`;
