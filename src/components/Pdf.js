import { useState, useEffect } from "react";
import { Pdf as PdfWrapper } from "../styles/global";

import { getBrowser } from "../services/helpers";

const Pdf = (props) => {
const [browser,setBrowser] = useState("");
  useEffect(() => {
    setBrowser(getBrowser());
  }, [props]);

  return (
    <PdfWrapper className="pdf">
    {browser === "mobile" ? (
        <iframe src={"http://docs.google.com/gview?url="+props.url+"&embedded=true"}></iframe>
    )
    : (
        <iframe src={props.url}></iframe>
    )
    }
      <a href={props.url} target="_blank">
        Se o contrato não estiver sendo exibido, clique aqui.
      </a>
    </PdfWrapper>
  );
};

export default Pdf;
