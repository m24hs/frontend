// Imports padrão
import React, { useState, useEffect } from "react";
React.useLayoutEffect = React.useEffect;
import ReactSelect from "react-select";
import InputMaskWrapper from "react-input-mask";

// Imports de estilo
import { FormStyle, WrapperStyle } from "../styles/components/Form";
import { Button as ButtonStyle } from "../styles/global"

// Form
const Form = (props) => {
  return <FormStyle {...props}>{props.children}</FormStyle>;
};
export default Form;

// Input
export const Input = (props) => {
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
  else if (type === "textarea")
    return (
      <Wrapper {...restOfProps}>
        <textarea {...props} />
      </Wrapper>
    );

  return <></>;
};

// Wrapper
const Wrapper = (props) => {
  return (
    <WrapperStyle
      style={props.divstyle ? props.divstyle : { width: "100%" }}
      light={props.light ? true : false}
    >
      <label>{props.label}</label>
      {props.children}
    </WrapperStyle>
  );
};

// Select
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
  return (
    <>
      <ReactSelect {...props} styles={customStyles} />
      <input
        type="hidden"
        value={props.value && props.value.value}
        name={props.name}
      />
    </>
  );
};

// Input
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
        error={(propsError !== "" && propsError) || (isError !== "" && isError)}
        onBlur={(e) => {
          if (onBlur) return onBlur(e);
          else if (validate) {
            setIsError(validateInput(validate, e));
            return;
          }
        }}
      />
      <span>{propsError || isError}</span>
    </>
  );
};

// Input mask
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
        error={(propsError !== "" && propsError) || (isError !== "" && isError)}
        onBlur={(e) => {
          if (onBlur) onBlur(e);
          setIsError(validateInput(validate, e));
          return;
        }}
      />
      <span>{propsError || isError}</span>
    </>
  );
};

// Valida o input
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

// Botão
export const Button = (props) => {
  const { validate, ...restOfProps } = props;
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const response = validate();
    setDisabled(!response);
  }, [props]);

  return (
    <ButtonStyle {...restOfProps} disabled={disabled}>
      {props.children}
    </ButtonStyle>
  );
};
