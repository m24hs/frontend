import Link from "next/link";

import { Container, Logo } from "../../styles/components/site/Footer";
import LogoSvg from "../../assets/logo.svg";

import {
  MapMarkerAlt as MapMarkerAltIcon,
  Envelope as EmailIcon,
} from "@styled-icons/fa-solid";
import {
  Whatsapp as WhatsappIcon,
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  LinkedinIn as LinkedinIcon,
} from "@styled-icons/fa-brands";

const Footer = () => {
  return (
    <Container>
      <Logo src={LogoSvg} />
      <ul className="footer-data">
        <li>
          <strong>M24 - GESTÃO PREVENTIVA DE MOTOS</strong>
        </li>
        <li>
          <MapMarkerAltIcon /> R. Prudente de Morais, 581, sala 5, Centro -
          Barra Bonita/SP
        </li>
        <li>
          <WhatsappIcon /> 0800 729 9123
        </li>
        <li>
          <EmailIcon /> atendimento@m24hs.com.br
        </li>
      </ul>
      <ul className="footer-social">
        <li>
          <Link href="https://api.whatsapp.com/send?phone=558007299123&text=*Mensagem%20autom%C3%A1tica*%20|%20Envie%20esta%20mensagem%20para%20confirmar%20seu%20pr%C3%A9-cadastro%20e%20receber%20mais%20informa%C3%A7%C3%B5es.&fbclid=IwAR31FZjOvBMjR-rl4OMPRYJGfjRoQTFscXkxa9dsuKElaqEl3pyG4r6HTOE" target="_blank">
            <a>
              <WhatsappIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://www.facebook.com/m24.gestao" target="_blank">
            <a>
              <FacebookIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://www.instagram.com/m24.gestao/" target="_blank">
            <a>
              <InstagramIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="https://www.linkedin.com/company/m24-gest%C3%A3o-preventiva-de-motocicletas/" target="_blank">
            <a>
              <LinkedinIcon />
            </a>
          </Link>
        </li>
      </ul>
    </Container>
  );
};

export default Footer;
4;
