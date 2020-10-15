import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  font-size: .8em;

  & > .main {
    flex: 1;
    color: var(--color-text);
    text-align: center;
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

  @media (min-width: 480px) {
    font-size: 1em;
  }

  @media (min-width: 780px) {
    font-size: 1.6em;

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
