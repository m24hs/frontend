import { useState, useEffect } from "react";

import { ErrorStyle } from "../styles/global";
import { Close as CloseIcon } from "@styled-icons/material";

const Error = (props) => {
  const [isError, setIsError] = useState("");

  useEffect(() => {
    setIsError(props.text);
  }, [props.text]);

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

export default Error;
