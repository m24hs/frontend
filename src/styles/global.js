import styled, { createGlobalStyle } from "styled-components";

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

    .page-title {
        color: var(--color-text);
        border-left: 8px solid var(--color-tertiary);
        padding: 0 0 0 16px;
    }

    .page-title-secondary {
        color: var(--color-primary);
        border-left: 8px solid var(--color-tertiary);
        padding: 0 0 0 16px;
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

    .page-description {
        color: var(--color-text);
        text-align: justify;
    }

    .page-description-secondary {
        color: var(--color-primary);
        text-align: justify;
    }    

    .form-contact {
        display: flex;
        flex-wrap: wrap;
    }

    .form-contact > div {
        display: flex;
        flex-direction: column;
    }

    .form-contact > div.margin-right {
        padding-right: 16px;
    }    

    .form-contact label { 
        color: var(--color-text);
    }

    .form-contact input, .form-contact textarea {
        margin: 0 0 8px 0;
        padding: 12px 6px;
        outline: none;
        font-family: 'Mulish', sans-serif;
        font-size: 16px;
        border: 0;
        color: var(--color-text);
        border-bottom: 2px solid #ffffff60;
        background: none;
    }

    .form-contact > input:focus, .form-contact > textarea:focus {
        border-bottom: 2px solid var(--color-tertiary);
    }

    .form-contact > input::placeholder, .form-contact > textarea::placeholder {
        color: #ffffff80;
    }

.btn-default {
    grid-area: button;
    width: 100%;
    height: 42px;
    font-size: 18px;
    font-weight: 800;
    color: var(--color-text);
    background: var(--color-tertiary);
    border-radius: 10px;
    transition: all 0.5s;
  }

  .btn-default:disabled {
    cursor: not-allowed;
    background: var(--color-tertiary-disabled);
  }

  .btn-default:hover:enabled {
    background: var(--color-tertiary-hover);
  }

  .btn-primary svg {
      width: 18px;
  }

  .btn-primary {
    width: 100%;
    height: 42px;
    font-size: 18px;
    font-weight: 800;
    color: var(--color-text);
    background: var(--color-primary);
    border-radius: .25rem;
    transition: all 0.5s;
  }

  .btn-primary:disabled {
    cursor: not-allowed;
    background: var(--color-primary-disabled);
  }

  .btn-primary:hover:enabled {
    background: var(--color-primary-hover);
  }

  .form-light label {
        font-weight: bold;
        color: var(--color-primary);
    }

    .form-light input {
        margin: 2px 0 8px 0;
        padding: 12px 12px;
        outline: none;
        font-family: 'Mulish', sans-serif;
        font-size: 16px;
        color: var(--color-primary);
        border: 1px solid var(--color-primary-hover-light);
        border-radius: 10px;
    }    
`;

export const Divider = styled.hr`
  width: 50%;
  border: 0;
  height: 1px;
  ${({ dark }) => dark ?  `
    background: var(--color-primary-hover-light);
  ` : `
    background: var(--color-secondary);
  `
  }
  margin: 64px auto;
`;