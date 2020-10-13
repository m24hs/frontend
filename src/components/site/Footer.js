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
          <EmailIcon /> contato@m24h.com.br
        </li>
      </ul>
      <ul className="footer-social">
        <li>
          <Link href="#" target="_blank">
            <a>
              <WhatsappIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#" target="_blank">
            <a>
              <FacebookIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#" target="_blank">
            <a>
              <InstagramIcon />
            </a>
          </Link>
        </li>
        <li>
          <Link href="#" target="_blank">
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
