import { useState } from "react";
import Link from "next/link";

import {
  Header,
  Container,
  Logo,
  ButtonMenu,
  Nav,
  Overlay,
} from "../../styles/components/site/Menu";

import LogoSvg from "../../assets/logo.svg";
import { Menu as MenuIcon } from "@styled-icons/boxicons-regular";

const Menu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const handleToogleMenu = (trueFalse = null) => {
    if (trueFalse === null) {
      setShowMenu(!showMenu);
    } else {
      setShowMenu(trueFalse);
    }
  };

  return (
    <>
      <Header>
        <Container>
          <Link href="/">
            <Logo src={LogoSvg} />
          </Link>
        </Container>
        <ButtonMenu
          onClick={() => {
            handleToogleMenu();
          }}
        >
          <MenuIcon />
        </ButtonMenu>
        <Nav className={showMenu ? "showMenu" : ""}>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/servicos">Serviços</Link>
            </li>
            <li>
              <Link href="/parceiros">Parceiros</Link>
            </li>
            <li>
              <Link href="/dicas">Dicas</Link>
            </li>            
            <li>
              <Link href="/sobre">Sobre a M24</Link>
            </li>
            <li>
              <Link href="/contato">Contato</Link>
            </li>
          </ul>
        </Nav>
      </Header>
      {showMenu && (
        <Overlay
          onClick={() => {
            handleToogleMenu(false);
          }}
        />
      )}
    </>
  );
};

export default Menu;
