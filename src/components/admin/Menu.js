import Link from "next/link";

import {
  Header,
  Container,
  Logo,
  ButtonSidebar,
  ButtonUser,
} from "../../styles/components/admin/Menu";

import LogoSvg from "../../assets/logo.svg";
import { Menu as MenuIcon, LogOut as LogOutIcon, UserCircle as UserCircleIcon } from "@styled-icons/boxicons-regular";

const Menu = (props) => {
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
      <ButtonUser>
        <UserCircleIcon />
      </ButtonUser>
    </Header>
    </>
  );
};

export default Menu;
