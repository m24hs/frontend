import styled, { createGlobalStyle, keyframes } from "styled-components";

export default createGlobalStyle`
    :root {
        --color-primary: #2E4458;
        --color-primary-hover: #516578;
        --color-primary-hover-light: #2E44581A;
        --color-secondary: #E1E1E1;
        --color-secondary-shadow: #D0D0D0;
        --color-tertiary: #C6091B;
        --color-tertiary-hover: #B60808;
        --color-tertiary-disabled: #E6939B;
        --color-success: #27AE60;
        --color-warning: #fdcb6e;
        --color-text: #ffffff;
        --color-text-dark: #5c5c5c;
    }   

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Mulish', sans-serif;
    }

    body {
        width: 100%;
        height: 100vh;
    }

    ul {
     list-style: none;   
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    button {
        background: none;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .margin-1x {
        margin: 8px 0;
    }

    .margin-2x {
        margin: 16px 0;
    }

    .margin-3x {
        margin: 32px 0;
    } 
`;

export const Divider = styled.hr`
  width: 50%;
  border: 0;
  height: 1px;
  ${({ dark }) =>
    dark
      ? `
    background: var(--color-primary-hover-light);
  `
      : `
    background: var(--color-secondary);
  `}
  margin: 64px auto;
`;

const SpinnerAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const LoadingStyle = styled.div`
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
    transition: all 0.3s;
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

export const PageTitle = styled.h1`
  border-left: 8px solid var(--color-tertiary);
  padding: 0 0 0 16px;

  ${({ small = false }) => small && `font-size: 26px;`}

  ${({ secondary = false }) =>
    !secondary
      ? `
        color: var(--color-text);
    `
      : `
        color: var(--color-primary);
    `}
`;

export const PageDescription = styled.p`
  margin: 32px 0;
  text-align: justify;

  ${({ secondary = false }) =>
    !secondary
      ? `
        color: var(--color-text);
    `
      : `
      color: var(--color-primary);
    `}
`;

export const Button = styled.button`
  width: 100%;
  height: 42px;
  font-size: 18px;
  font-weight: 800;
  color: var(--color-text);
  background: var(--color-primary);
  border-radius: 0.25rem;
  transition: all 0.3s;

  &:disabled {
    cursor: not-allowed;
  }

  &:hover:enabled {
    background: var(--color-primary-hover);
  }

  & svg {
    width: 18px;
  }

  ${({ secondary = false }) =>
    !secondary
      ? `
        color: var(--color-text);
        background: var(--color-primary);

        &:disabled {
          background: var(--color-primary-disabled);
        }

        &:hover:enabled {
          background: var(--color-primary-hover);
        }      
    `
      : `
        color: var(--color-text);
        background: var(--color-tertiary);

        &:disabled {
          background: var(--color-tertiary-disabled);
        }

        &:hover:enabled {
          background: var(--color-tertiary-hover);
        }      
    `}

  ${({ margin }) =>
    margin &&
    `
        margin: ${margin};
    `}

${({ width }) =>
    width &&
    `
    width: ${width};
    `}
`;

export const ViewHtml = styled.div`
  grid-area: text;
  color: var(--color-text);

  & > ul {
    margin-top: -14px;
    padding: 16px 1em;
  }

  & > ul > li:before {
    content: "";
    border-color: transparent var(--color-tertiary);
    border-style: solid;
    border-width: 0.35em 0 0.35em 0.45em;
    display: block;
    height: 0;
    width: 0;
    left: -1em;
    top: 0.9em;
    position: relative;
  }

  & > ul > li > p {
    text-align: left;
  }
`;
