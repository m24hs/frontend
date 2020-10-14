import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

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

import cookieCutter from 'cookie-cutter';

const Menu = (props) => {
  const router = useRouter();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleToogleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  }

  const handleLoggout = (e) => {
    e.preventDefault();
    cookieCutter.set('logged', false);
    router.push("/");
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
            <a href="#" onClick={(e) => handleLoggout(e)}>Sair</a>
          </li>
        </DropDown>
      </UserMenu>
    </Header>
    </>
  );
};

export default Menu;
