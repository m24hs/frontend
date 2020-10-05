import React, { useState, useEffect } from "react";
React.useLayoutEffect = React.useEffect 
import { WrapperStyle } from "../styles/components/Input";

import ReactSelect from "react-select";
import InputMaskWrapper from "react-input-mask";

const Input = (props) => {
  const { type, ...restOfProps } = props;

  if (type === "select")
    return (
      <Wrapper {...restOfProps}>
        <Select {...props} />
      </Wrapper>
    );
  else if (type === "text")
    return (
      <Wrapper {...restOfProps}>
        <HtmlInput type="text" {...props} />
      </Wrapper>
    );
  else if (type === "passoword")
    return (
      <Wrapper {...restOfProps}>
        <HtmlInput type="password" {...props} />
      </Wrapper>
    );
  else if (type === "mask")
    return (
      <Wrapper {...restOfProps}>
        <InputMask {...props} />
      </Wrapper>
    );

  return <></>;
};

export default Input;

const Wrapper = (props) => {
  return (
    <WrapperStyle style={props.divstyle} light={props.light ? 1 : 0}>
      <label>{props.label}</label>
      {props.children}
    </WrapperStyle>
  );
};

const Select = (props) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
    }),
    control: (provided, state) => ({
      ...provided,
      height: "46px",
      background: "none",
      border: "0",
      borderBottom: "2px solid #ffffff60",
      borderRadius: "0",
      boxShadow: 0,
      "&:hover": {},
    }),
    singleValue: (provided, state) => ({ ...provided, color: "#fff" }),
  };
  return <ReactSelect {...props} styles={customStyles} />;
};

const HtmlInput = (props) => {
  const { validate, onBlur, ...restOfProps } = props;
  const [isError, setIsError] = useState("");
  const [propsError, setPropsError] = useState("");

  useEffect(() => {
    if ((props.error || "") !== "") {
      setPropsError(props.error);
    }
  }, [props]);

  return (
    <>
      <input
        {...restOfProps}
        error={( propsError !== "" && propsError ) || (isError !== "" && isError )}
        onBlur={(e) => {
          if (onBlur) return onBlur(e);
          else if (validate) {
            setIsError(validateInput(validate, e));
            return;
          }
        }}
      />
      <span>{ propsError || isError }</span>
    </>
  );
};

const InputMask = (props) => {
  const { validate, onBlur, ...restOfProps } = props;
  const [isError, setIsError] = useState("");
  const [propsError, setPropsError] = useState("");

  useEffect(() => {
    if ((props.error || "") !== "") {
      setPropsError(props.error);
    }
  }, [props]);

  return (
    <>
      <InputMaskWrapper
        {...restOfProps}
        error={( propsError !== "" && propsError ) || (isError !== "" && isError )}
        onBlur={(e) => {
          if (onBlur) onBlur(e);          
          setIsError(validateInput(validate, e)); 
          return;
        }}
      />
      <span>{ propsError || isError }</span>
    </>
  );
};

const validateInput = (f, e) => {
  try {
    // Executa função
    const response = f(e.target);
    // Loop
    for (
      let responseIndex = 0;
      responseIndex < response.length;
      responseIndex++
    ) {
      let item = response[responseIndex];

      // Se o retorno for true, é um erro
      if (item.expression === true) {
        // Retorna a mensagem de erro
        return item.message;
      }

      // Retorna vazio se for o ultimo
      if (responseIndex === response.length) return "";
    }
  } catch (error) {
    // Se der erro
    return "Não foi possivel validar o campo!";
  }
};
