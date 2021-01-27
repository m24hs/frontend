import styled from "styled-components";
import Background from "https://4kwallpapers.com/images/wallpapers/biker-dark-motorcycle-3371x2160-1480.jpg";
import BackgroundMobile from "https://4kwallpapers.com/images/wallpapers/biker-dark-motorcycle-3371x2160-1480.jpg";
export const Container = styled.div `
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

export const Main = styled.main `
flex: 1;
color: var(--color-text);
text-align: center;
display: flex;
flex-direction: column;
justify-content: center;
display:none;
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
  padding-top:20%;
}
`

export const Label = styled.div `
  color: var(--color-text);
  padding: 16px 0;
  text-align: center;
  display:none;
`

export const VideoWrapper = styled.div `
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

  @media(max-width:768px){
    background-image:url(${BackgroundMobile});
  }
`;