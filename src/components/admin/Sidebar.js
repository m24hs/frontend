import Link from "next/link";
import { useRouter } from "next/router";

import { Container, Itens } from "../../styles/components/admin/Sidebar";

import { ListUl as ListUlIcon, CartAlt as CartAltIcon, Text as TextIcon } from "@styled-icons/boxicons-regular";
import { Settings as SettingsIcon } from "@styled-icons/ionicons-sharp";
import { UserTie as UserTieIcon } from "@styled-icons/icomoon"

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
        <li>
          <Link href="/admin/parceiros"><a><UserTieIcon/>Parceiros</a></Link>
        </li>
        <li>
          <Link href="/admin/conteudo"><a><TextIcon />Conteúdo</a></Link>
        </li>
        <li>
          <Link href="/admin/configuracoes"><a><SettingsIcon />Configurações</a></Link>
        </li>        
      </Itens>
    </>
  );
};
