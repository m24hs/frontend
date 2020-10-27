import styled from "styled-components";

export const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background: var(--color-secondary);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    & > img {
        max-width: 400px;
    }
    & > div {
        color: var(--color-primary);
        padding: 16px 0;
    }
`;