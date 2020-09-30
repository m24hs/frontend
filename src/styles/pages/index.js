import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  & > .main {
    flex: 1;
    color: var(--color-text);
    text-align: center;
    font-size: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  & > .main > h3 {
    font-weight: 100;
  }

  & > .main span {
    background: var(--color-tertiary);
    font-weight: bold;
  }

  @media (min-width: 780px) {
    font-size: 1.5em;

    & > button {
      max-width: 320px;
    }
  }
`;

export const VideoWrapper = styled.div`
  position: fixed;
  z-index: -100;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  & > video {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
`;
