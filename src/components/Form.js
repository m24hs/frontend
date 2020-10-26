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
import {
  FormStyle,
  WrapperStyle,
  LabelStyle,
  UploaderWrapper,
  CheckBoxWrapper,
} from "../styles/components/Form";
import { Button as ButtonStyle } from "../styles/global";
import {
  Square as SquareIcon,
  CheckSquareFill as CheckSquareFillIcon,
} from "@styled-icons/bootstrap/";

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
  else
    return (
      <Wrapper {...restOfProps}>
        <input {...props} />
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
      <LabelStyle light={props.light ? true : false}>{props.label}</LabelStyle>
      {props.children}
    </WrapperStyle>
  );
};

// Select
const Select = (props) => {
  const { validate, onBlur, onChange, ...restOfProps } = props;
  const [isError, setIsError] = useState("");
  const [propsError, setPropsError] = useState("");

  useEffect(() => {
    if ((props.error || "") !== "") {
      setPropsError(props.error);
    }
  }, [props.error]);

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

  useEffect(() => {
    if (props.value) setValue(props.value.value);
  }, [props.value]);

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
            setIsError(validateInput(validate, e || ""));
            return;
          }
        }}
        onChange={(e) => {
          if (onChange) return onChange(e);
        }}
      />
      {(propsError || isError) && (
        <span className="form-error">{propsError || isError}</span>
      )}
    </>
  );
};

// Input
const HtmlInput = (props) => {
  const { validate, onBlur, defaultValue, ...restOfProps } = props;
  const [isError, setIsError] = useState("");

  const [propsError, setPropsError] = useState("");
  useEffect(() => {
    if ((props.error || "") !== "") {
      setPropsError(props.error);
    }
  }, [props]);

  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

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
        onChange={(e) => setValue(e.target.value)}
        value={value}
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
  const { validate, onBlur, defaultValue, ...restOfProps } = props;
  const [isError, setIsError] = useState("");
  const [propsError, setPropsError] = useState("");

  useEffect(() => {
    if ((props.error || "") !== "") {
      setPropsError(props.error);
    }
  }, [props]);

  const [value, setValue] = useState("");
  useEffect(() => {
    setValue(defaultValue || "");
  }, [defaultValue]);

  return (
    <>
      <InputMaskWrapper
        {...restOfProps}
        error={(propsError !== "" && propsError) || (isError !== "" && isError)}
        onBlur={(e) => {
          if (onBlur) onBlur(e);
          else if (validate) setIsError(validateInput(validate, e));
          return;
        }}
        onChange={(e) => setValue(e.target.value)}
        value={value}
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
    setValueChange(defaultValue || 0);
  }, [defaultValue]);

  return (
    <>
      <CurrencyFormat
        {...restOfProps}
        type="text"
        decimalSeparator=","
        decimalScale={2}
        onChange={(e) => setValueChange(e.target.value)}
        value={valueChange}
      />
    </>
  );
};

// Valida o input
const validateInput = (f, e) => {
  try {
    console.log(e);
    // Executa função
    const response = f(e.hasOwnProperty("target") ? e.target : e);
    // Loop
    for (
      let responseIndex = 0;
      responseIndex < response.length;
      responseIndex++
    ) {
      let item = response[responseIndex];
      console.log(item);

      // Se o retorno for true, é um erro
      if (item.expression === true) {
        // Retorna a mensagem de erro
        return item.message;
      }

      // Retorna vazio se for o ultimo
      if (responseIndex === response.length) return "";
    }
  } catch (error) {
    console.error(error);
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
  const [defaultFile, setDefaultFile] = useState("");

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleOnChange = async (e) => {
    try {
      const base64 = await toBase64(e.target.files[0]);
      setFile(base64);
    } catch (error) {
      alert("erro");
    }
  };

  const handleUpload = () => {
    inputRef.current.click();
  };

  useEffect(() => {
    const getFile = async () => {
      if ((props.defaultValue || "") !== "") {
        const path = process.env.NEXT_PUBLIC_SERVER_URL;
        setDefaultFile(path + props.defaultValue);
      }
    };
    getFile();
  }, [props.defaultValue]);

  const inputRef = useRef();

  return (
    <>
      <UploaderWrapper {...props}>
        <LabelStyle>{props.label}</LabelStyle>
        <div>
          {props.image && <img src={file || defaultFile} />}
          {props.pdf && (file || defaultFile || "") !== "" && (
            <object
              width="100%"
              height="600px"
              data={file || defaultFile}
              type="application/pdf"
            >
              {" "}
            </object>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          id={`upload-${props.name}`}
          onChange={(e) => handleOnChange(e)}
          {...props}
          name={props.name}
        />
        <ButtonStyle type="button" onClick={() => handleUpload()}>
          Upload
        </ButtonStyle>
      </UploaderWrapper>
    </>
  );
};

export const Editor = (props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(props.defaultValue || "");
  }, [props.defaultValue]);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ align: [] }],
      [{ background: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      ["clean"],
    ],
  };
  /*
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [ 'direction', { 'align': [] }],
      ["link", "image"],
      ["clean"],
    ],
*/

  return (
    <div style={{ width: props.width || "100%", display: "block" }}>
      <LabelStyle>{props.label}</LabelStyle>
      <ReactQuill
        modules={modules}
        theme="snow"
        value={value}
        onChange={(e) => setValue(e)}
      />
      <input name={props.name} type="hidden" value={value} />
    </div>
  );
};

export const CheckBox = (props) => {
  const { defaultValue, ...restOfProps } = props;
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (defaultValue)
      setEnabled(defaultValue);
  }, [defaultValue]);

  const handleChangeState = () => {
    setEnabled(!enabled);
  }

  return (
    <CheckBoxWrapper {...restOfProps} onClick={() => handleChangeState()}>
      <div>{enabled ? <CheckSquareFillIcon /> : <SquareIcon />}</div>
      <LabelStyle>{props.label}</LabelStyle>
      <input name={props.name} type="hidden" value={enabled} />
    </CheckBoxWrapper>
  );
};
