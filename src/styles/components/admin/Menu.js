import styled from "styled-components";

export const Header = styled.header`
  display: grid;
  grid-template-columns:  64px auto auto;
  grid-template-rows: 1fr;
  grid-template-areas: "button-sidebar logo button-user";
  width: 100%;
  position: fixed;
  top: 0px;
  z-index: 100;
  background: var(--color-secondary);
  box-shadow: 0px -10px 17px 13px rgba(0, 0, 0, 0.2);
`;

export const Container = styled.div`
  grid-area: logo;
  height: 64px;
  padding: 10px 0;
  align-self: center;
  cursor: pointer;
`;

export const Logo = styled.img`
  height: 100%;
`;

export const ButtonSidebar = styled.button`
  grid-area: button-sidebar;
  justify-self: center;
  align-self: center;
  width: 40px;
  height: 40px;
  display: block;
  color: var(--color-primary);
`;

export const ButtonUser = styled.button`
  grid-area: button-user;
  justify-self: end;
  align-self: center;
  width: 40px;
  height: 40px;
  display: block;
  color: var(--color-primary);
  margin: 0 10px;
`;