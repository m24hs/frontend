import { useState } from "react";

import { WrapperStyle } from "../styles/components/Input";

import ReactSelect from "react-select";
import InputMask from "react-input-mask";

const Input = (props) => {
  const { type, label, divStyle, ...restOfProps } = props;

  if (type === "select")
    return (
      <Wrapper style={divStyle} label={label}>
        <Select {...props} />
      </Wrapper>
    );
  else if (type === "text")
    return (
      <Wrapper style={divStyle} label={label}>
        <HtmlInput type="text" {...props} />
      </Wrapper>
    );
  else if (type === "passoword")
    return (
      <Wrapper style={divStyle} label={label}>
        <HtmlInput type="password" {...props} />
      </Wrapper>
    );
  else if (type === "mask")
    return (
      <Wrapper style={divStyle} label={label}>
        <InputMask {...props} />
      </Wrapper>
    );

  return <></>;
};

export default Input;

const Wrapper = (props) => {
  return (
    <WrapperStyle style={props.style}>
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

  return (
    <>
      <input
        {...restOfProps}
        error={isError !== "" && isError}
        onBlur={(e) => {
          if (onBlur) return onBlur();
          else if (validate) {
            const response = validate(e);
            setIsError(response.expression === false ? response.message : "");
            return;
          }
        }}
      />
      {isError !== "" && <span>{isError}</span>}
    </>
  );
};
