import styled from "styled-components";

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