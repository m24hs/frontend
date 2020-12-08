import styled from "styled-components";
import Background from "../../../src/assets/home/bannerInicio.jpeg";
export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: .8em;

  @media (min-width: 780px) { 
    & > button {
      max-width: 320px;
    }
  }  
`;

export const Main = styled.main`
flex: 1;
color: var(--color-text);
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;
display:block;
& > h3 {
  font-weight: 100;
}

& span {
  background: var(--color-tertiary);
  font-weight: bold;
}

@media (min-width: 480px) {
  font-size: 1em;
  display:none;
}

@media (min-width: 780px) {
  font-size: 1.6em;
  display:none;
}
`

export const Label = styled.div`
  color: var(--color-text);
  padding: 16px 0;
  text-align: center;
display:block;
  @media (min-width: 780px) {
    max-width: 400px;display:none;
  }  
`

export const VideoWrapper = styled.div`
  position: absolute;
  z-index: -100;
  top: 0;
  left: 0;
  overflow: hidden;
  background-image:url(${Background}) ;
    background-repeat: no-repeat;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-size: cover;
    background-attachment: fixed;

  & > video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    -o-filter: blur(8px);
    filter: blur(8px);    
  }

  @media (min-width: 768px){
    background-image: url('https://i.pinimg.com/originals/9a/db/6b/9adb6b3abf78af04193857799d0bb883.jpg');
  }
`;
