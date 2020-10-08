import styled from "styled-components";

export const FormStyle = styled.form`
  display: flex;
  flex-wrap: wrap;

  & > div {
    display: flex;
    flex-direction: column;
  }
  
  ${({ margin }) =>
    margin &&
    `
        margin: ${margin};
    `}
`;

export const WrapperStyle = styled.div`
  ${({ light }) =>
    light === false
      ? `
        & label { 
          color: var(--color-text);
        }    

        & input, & textarea {
          margin: 0 0 8px 0;
          padding: 12px 6px;
          outline: none;
          font-family: "Mulish", sans-serif;
          font-size: 16px;
          border: 0;
          color: var(--color-text);
          border-bottom: 2px solid #ffffff60;
          background: none;
          transition: all 0.3s;
        }

        & input[error], & input[error]:focus, & textarea[error], & textarea[error]:focus {
          color: var(--color-tertiary);
          border-bottom: 2px solid var(--color-tertiary);
        }

        & span {
          color: var(--color-tertiary);
          text-align: right;
          padding: 0 0 4px 0;
        }

        & input:focus,
        & textarea:focus {
          border-bottom: 2px solid var(--color-text);
        }         
    `
      : `
        & label {
          font-weight: bold;
          color: var(--color-primary);
        }      

        & input, & textarea {            
          margin: 2px 0 8px 0;
          padding: 12px 12px;
          outline: none;
          font-family: 'Mulish', sans-serif;
          font-size: 16px;
          color: var(--color-primary);
          border: 1px solid #d8dde3;
          border-radius: 10px;
          transition: all 0.3s;
        } 

        & input[error], & input[error]:focus, & textarea[error], & textarea[error]:focus {
          color: var(--color-tertiary);
          border: 2px solid var(--color-tertiary);
        }        

        & span {
          color: var(--color-tertiary);
          text-align: right;
          padding: 0 0 4px 0;
        }

        & input:focus,
        & textarea:focus {
          border: 1px solid #b1b7bd;
        }       
    `}
`;


export const LabelStyle = styled.label`
  ${({ light }) =>
    light === false
      ? `
        color: var(--color-text);
    `
      : `
        font-weight: bold;
        color: var(--color-primary);
    `}
`;

export const UploaderWrapper = styled.div`
  width: 100%;
  
  & > div img {
    border-radius: 0.25rem;
  }

  & > input {
    display: none !important;
  }
`;