import Link from "next/link";

import Menu from "./Menu";
import Footer from "./Footer";
import Loading from "../Loading";
import Error from "../Error";

import {
  Wrapper,
  Container,
  FloatButton,
} from "../../styles/components/site/Layout";

import { Whatsapp as WhatsappIcon } from "@styled-icons/icomoon";

const Layout = (props) => {
  return (
    <Container>
      <Menu />
      <Wrapper {...props}>{props.children}</Wrapper>
      <Footer />
      {!props.hideFB && (
        <Link
          href="https://api.whatsapp.com/send?phone=558007299123&text=*Mensagem%20autom%C3%A1tica*%20|%20Envie%20esta%20mensagem%20para%20confirmar%20seu%20pr%C3%A9-cadastro%20e%20receber%20mais%20informa%C3%A7%C3%B5es.&fbclid=IwAR31FZjOvBMjR-rl4OMPRYJGfjRoQTFscXkxa9dsuKElaqEl3pyG4r6HTOE"
          target="_blank"
        >
          <FloatButton>
            <WhatsappIcon />
          </FloatButton>
        </Link>
      )}
      <Loading show={props.loading} />
      <Error text={props.error} />
    </Container>
  );
};

export default Layout;
