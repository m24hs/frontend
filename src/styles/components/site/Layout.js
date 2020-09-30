import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  position: relative;
  z-index: 50;
`;

export const Wrapper = styled.div`
  background: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "var(--color-primary)"};
  & > div {
    max-width: 1140px;
    min-height: calc(100vh - 150px);
    margin: 0 auto;
    ${({ withoutPadding }) =>
      !withoutPadding
        ? `
        padding: calc(64px + 32px) 32px 32px 32px;            
    `
        : `
        padding: 64px 0 0 0;            
    `}
  }

  @media all and (min-width: 960px) {
  }
`;

export const FloatButton = styled.a`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 16px;
  background: var(--color-success);
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.2);
  transition: all 0.5s;

  &:hover {
    background: #229750;
  }

  & > svg {
    width: 32px;
    height: 32px;
  }
`;

const SpinnerAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Loading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background: #2e4458ae;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;

  & > svg {
    width: 128px;
    color: var(--color-tertiary);
    animation: 2s linear ${SpinnerAnimation} infinite;
  }
`;

export const ErrorStyle = styled.div`
  position: fixed;
  top: calc(64px + 32px);
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 100;

  & > div {
    display: flex;    
    align-items: center;
    width: calc(100% - 64px);
    background: var(--color-tertiary);
    padding: 32px;
    color: var(--color-text);
    text-align: center;
    box-shadow: 2px 2px 10px 2px rgba(0, 0, 0, 0.2);
  }
  & > div > p { 
    flex: 1;
  }

  & > div > button {
    transition: all .3s;
  }

  & > div > button:hover {
    background: var(--color-tertiary-hover);
  }

  & > div > button > svg { 
    width: 32px;
    color: var(--color-text);
  }

  @media (min-width: 780px) {
    & > div {
      max-width: 600px;

    }
  }
`;
