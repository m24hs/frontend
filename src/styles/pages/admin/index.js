import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
`;

export const Login = styled.div`
    width: 100%;
    height: 100vh;
    background: var(--color-primary);
    display: flex;
    justify-content: center;
    align-items: center;

    & > form {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 32px;
        padding: 32px;
        border-radius: 2px;
        background: var(--color-secondary);
        box-shadow: 0px 0px 36px 3px rgba(0,0,0,0.2);

        @media (min-width: 780px) { 
            max-width: 380px;
        }        
    }

    & > form > img {
        max-width: 256px;
        margin: 0 auto;
        padding: 0 0 64px 0;
    }

    & > form > label {
        font-weight: bold;
        color: var(--color-primary);
    }

    & > form > input {
        margin: 2px 0 8px 0;
        padding: 12px 12px;
        outline: none;
        font-family: 'Mulish', sans-serif;
        font-size: 16px;
        color: var(--color-primary);
        border: 1px solid #00000005;
        border-radius: 10px;
    }    

    & > form > button {
        margin: 32px 0 0 0;
    }   
`;