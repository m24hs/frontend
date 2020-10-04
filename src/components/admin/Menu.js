import { useState } from "react";
import Link from "next/link";

import {
  Header,
  Container,
  Logo,
  ButtonSidebar,
  UserMenu,
  DropDown,
} from "../../styles/components/admin/Menu";

import LogoSvg from "../../assets/logo.svg";
import { Menu as MenuIcon, LogOut as LogOutIcon, UserCircle as UserCircleIcon } from "@styled-icons/boxicons-regular";

const Menu = (props) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleToogleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  }

  return (
    <>
    <Header>
      <Container>
        <Link href="/admin">
          <Logo src={LogoSvg} />
        </Link>
      </Container>
      <ButtonSidebar onClick={() => {props.handleToggleSidebar()}}>
        <MenuIcon />
      </ButtonSidebar>  
      <UserMenu onClick={() => handleToogleUserMenu()}>
        <UserCircleIcon />
        <DropDown open={userMenuOpen}>
          <li>
            <Link href="/admin/configuracoes">Configurações</Link>
          </li>
          <li>
            <Link href="/admin/logout">Sair</Link>
          </li>
        </DropDown>
      </UserMenu>
    </Header>
    </>
  );
};

export default Menu;
