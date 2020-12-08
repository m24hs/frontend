import styled from "styled-components";

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

& > h3 {
  font-weight: 100;
}

& span {
  background: var(--color-tertiary);
  font-weight: bold;
}

@media (min-width: 480px) {
  font-size: 1em;
}

@media (min-width: 780px) {
  font-size: 1.6em;
}
`

export const Label = styled.div`
  color: var(--color-text);
  padding: 16px 0;
  text-align: center;

  @media (min-width: 780px) {
    max-width: 400px;
  }  
`

export const VideoWrapper = styled.div`
  position: fixed;
  z-index: -100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('../../src/assets/home/bannerInicio.jpeg')

  & > video {
    object-fit: cover;
    width: 100%;
    height: 100%;
    -o-filter: blur(8px);
    filter: blur(8px);    
  }
`;
