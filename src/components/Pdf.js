const Pdf = (props) => {
  return (
    <iframe width="100%" height="600px"
      src={
        "https://docs.google.com/viewerng/viewer?url=" +
        props.url +
        "&embedded=true"
      }
    ></iframe>
  );
};

export default Pdf;
