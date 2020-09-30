import { useState, useEffect } from "react";
import Menu from "./Menu";
import Footer from "./Footer";

import {
  Wrapper,
  Container,
  FloatButton,
  Loading,
  ErrorStyle,
} from "../../styles/components/site/Layout";
import {
  Whatsapp as WhatsappIcon,
  Spinner10 as SpinnerIcon,
} from "@styled-icons/icomoon";
import { Close as CloseIcon } from "@styled-icons/material";

const Layout = (props) => {
  return (
    <Container>
      <Menu />
      <Wrapper {...props}>{props.children}</Wrapper>
      <Footer />
      {!props.hideFB && (
        <FloatButton
          href="https://api.whatsapp.com/send?phone=558007299123&text=*Mensagem%20autom%C3%A1tica*%20|%20Envie%20esta%20mensagem%20para%20confirmar%20seu%20pr%C3%A9-cadastro%20e%20receber%20mais%20informa%C3%A7%C3%B5es.&fbclid=IwAR31FZjOvBMjR-rl4OMPRYJGfjRoQTFscXkxa9dsuKElaqEl3pyG4r6HTOE"
          target="_blank"
        >
          <WhatsappIcon />
        </FloatButton>
      )}
      {props.loading && (
        <Loading>
          <SpinnerIcon />
        </Loading>
      )}
      <Error text={props.error} />
    </Container>
  );
};

const Error = (props) => {
  const [isError, setIsError] = useState("");

  useEffect(() => {
    setIsError(props.text);
  },[props]);

  const handleCloseError = () => {    
    setIsError("");
  };

  return (
    <>
      {isError && (
        <ErrorStyle>
          <div>
            <p>{isError}</p>
            <button onClick={() => handleCloseError()}>
              <CloseIcon />
            </button>
          </div>
        </ErrorStyle>
      )}
    </>
  );
};

export default Layout;
