// Imports padrão
import React, { useRef, useState, useEffect } from "react";
React.useLayoutEffect = React.useEffect;
import ReactSelect from "react-select";
import InputMaskWrapper from "react-input-mask";
import CurrencyFormat from "react-currency-format";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
import "react-quill/dist/quill.snow.css";

// Imports de estilo
import { FormStyle, WrapperStyle, LabelStyle, UploaderWrapper } from "../styles/components/Form";
import { Button as ButtonStyle } from "../styles/global";

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
  else if (type === "text" || type === "password")
    return (
      <Wrapper {...restOfProps}>
        <HtmlInput {...props} />
      </Wrapper>
    );
  else if (type === "mask")
    return (
      <Wrapper {...restOfProps}>
        <InputMask {...props} />
      </Wrapper>
    );
  else if (type === "currency")
    return (
      <Wrapper {...restOfProps}>
        <InputCurrency {...props} />
      </Wrapper>
    );
  else if (type === "textarea")
    return (
      <Wrapper {...restOfProps}>
        <textarea {...props} />
      </Wrapper>
    );
  else if (type === "hidden") return <input {...props} />;

  return <></>;
};

// Wrapper
const Wrapper = (props) => {
  return (
    <WrapperStyle
      style={props.divstyle ? props.divstyle : { width: "100%" }}
      light={props.light ? true : false}
    >
      <LabelStyle light={props.light ? true : false}>{props.label}</LabelStyle>
      {props.children}
    </WrapperStyle>
  );
};

// Select
const Select = (props) => {
  const { validate, onBlur, ...restOfProps } = props;
  const [isError, setIsError] = useState("");
  const [propsError, setPropsError] = useState("");

  useEffect(() => {
    if ((props.error || "") !== "") {
      setPropsError(props.error);
    }
  }, [props]);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
    }),
    control: (provided, state) => ({
      ...provided,
      height: "46px",
      background: "none",
      border: "0",
      borderBottom: `2px solid ${
        propsError || isError ? "var(--color-tertiary)" : "#ffffff60"
      }`,
      marginBottom: propsError || isError ? 8 : 0,
      borderRadius: "0",
      boxShadow: 0,
      "&:hover": {},
    }),
    singleValue: (provided, state) => ({ ...provided, color: "#fff" }),
  };

  const selectRef = useRef();
  const [value, setValue] = useState("");

  return (
    <>
      <ReactSelect
        ref={selectRef}
        {...restOfProps}
        styles={customStyles}
        className="form-component"
        onBlur={() => {
          let e = selectRef.current.select.props.value;
          if (onBlur) return onBlur(e);
          else if (validate) {
            setIsError(validateInput(validate, e));
            return;
          }
        }}
      />
      <input
        type="hidden"
        value={props.value && props.value.value}
        name={props.name}
      />
      {(propsError || isError) && (
        <span className="form-error">{propsError || isError}</span>
      )}
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
          if (onBlur) onBlur(e);
          else if (validate) {
            setIsError(validateInput(validate, e));
            return;
          }
        }}
        className="form-component"
      />
      {(propsError || isError) && (
        <span className="form-error">{propsError || isError}</span>
      )}
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
        className="form-component"
      />
      {(propsError || isError) && (
        <span className="form-error">{propsError || isError}</span>
      )}
    </>
  );
};

// InputCurrency
const InputCurrency = (props) => {
  const { type, validate, onBlur, defaultValue, ...restOfProps } = props;
  const [isError, setIsError] = useState("");
  const [propsError, setPropsError] = useState("");
  const [valueChange, setValueChange] = useState("");

  useEffect(() => {
    if ((props.error || "") !== "") {
      setPropsError(props.error);
    }
  }, [props]);

  useEffect(() => {
    setValueChange(defaultValue);
  }, [props]);

  return (
    <>
      <CurrencyFormat
        {...restOfProps}
        type="text"
        decimalSeparator=","
        decimalScale={2}
        value={defaultValue}
      />
    </>
  );
};

// Valida o input
const validateInput = (f, e) => {
  try {
    // Executa função
    const response = f(e.hasOwnProperty("target") ? e.target : e);
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
    if (validate) {
      const response = validate();
      setDisabled(!response);
    }
  }, [props]);

  return (
    <ButtonStyle {...restOfProps} disabled={disabled}>
      {props.children}
    </ButtonStyle>
  );
};

// Uploader
export const InputUploader = (props) => {
  const [file, setFile] = useState("");

  const handleOnChange = async (e) => {
    try {
      const base64 = await toBase64(e.target.files[0]);
      setFile(base64); 
    } catch (error) {
      alert("erro");
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleUpload = () => {
    inputRef.current.click();
  }

  const inputRef = useRef();

  return (
    <>
      <UploaderWrapper {...props}>
        <LabelStyle>{props.label}</LabelStyle>
        <div>
          {props.image && <img width="100%" src={file || props.defaultValue} />}
          {props.pdf && (file || props.defaultValue || "") !== "" && (            
            <object
              data={file || props.defaultValue}
              type="application/pdf"
              width="100%"
              height="600px"
            ></object>
          )}          
        </div>
        <input ref={inputRef} type="file" id={`upload-${props.name}`} onChange={(e) => handleOnChange(e)} {...props} />
        <input
          type="hidden"
          name={props.name}
          value={file || props.defaultValue}
        />
        <ButtonStyle type="button" onClick={() => handleUpload()}>Upload</ButtonStyle>
      </UploaderWrapper>
    </>
  );
};

export const Editor = (props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(props.defaultValue || "");
  }, [props]);

  return (
    <div style={{ width: props.width || "100%", display: "block" }}>
      <LabelStyle>{props.label}</LabelStyle>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <input name={props.name} type="hidden" value={value} />
    </div>
  );
};
