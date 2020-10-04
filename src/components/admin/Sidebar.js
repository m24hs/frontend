import Link from "next/link";
import { useRouter } from "next/router";

import { Container, Itens } from "../../styles/components/admin/Sidebar";

import { ListUl as ListUlIcon, CartAlt as CartAltIcon } from "@styled-icons/boxicons-regular";
import { Settings as SettingsIcons } from "@styled-icons/ionicons-sharp";

const Sidebar = (props) => {
  return (
    <Container open={props.open}>
      <MenuItems />
    </Container>
  );
};

export default Sidebar;

export const MenuItems = () => {
  const router = useRouter();
  
  return (
    <>
      <Itens activeUrl={`/admin/${router.pathname.split("/")[2]}`}>
        <li>
          <Link href="/admin/assinaturas"><a><CartAltIcon />Assinaturas</a></Link>
        </li>
        <li>
          <Link href="/admin/servicos"><a><ListUlIcon/>Serviços</a></Link>
        </li>
    {/*
        <li>
          <Link href="/admin/configuracoes"><a><SettingsIcons />Configurações</a></Link>
        </li>
    */}
      </Itens>
    </>
  );
};
