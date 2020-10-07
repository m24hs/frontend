import { useState, useEffect } from "react";
const ReactQuill =
  typeof window === "object" ? require("react-quill") : () => false;
import "react-quill/dist/quill.snow.css";

const Editor = (props) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(props.defaultValue || "");
  },[props])

  return (
    <div style={{width: props.width || "100%", display: "block"}}>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <input name={props.name} type="hidden" value={value}/>
    </div>
  );
};

export default Editor;
