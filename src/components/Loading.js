import { LoadingStyle } from "../styles/global";

import { Spinner10 as SpinnerIcon } from "@styled-icons/icomoon";

const Loading = (props) => {
  return (
    <>
      {props.show && (
        <LoadingStyle>
          <SpinnerIcon />
        </LoadingStyle>
      )}
    </>
  );
};

export default Loading;
