import styled from "styled-components";

export const Container = styled.div`
  background: var(--color-tertiary);
  min-height: 150px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas: "logo" "data" "social";
  gap: 32px;
  padding: 32px;
  color: var(--color-text);

  & > .footer-data {
    font-size: 14px;
    text-align: center;
  }

  & > .footer-data svg {
    grid-area: data;
    width: 16px;
    margin-right: 4px;
  }

  & > .footer-social {
    grid-area: social;
    display: flex;
    justify-self: center;
  }

  & > .footer-social > li {
    padding: 0 6px;
  }

  & > .footer-social svg {
    height: 32px;
  }

  @media (min-width: 780px) {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr;
    grid-template-areas: "logo data social";

    & > .footer-data {
      font-size: 14px;
      text-align: left;
      line-height: 20px;
    }

    & > .footer-social {
      grid-area: social;
      display: flex;
      justify-self: end;
      align-self: center;
    }
  }
`;

export const Logo = styled.img`
  grid-area: logo;
  height: 90px;
  justify-self: center;
  filter: brightness(10000%);

  @media (min-width: 780px) {
    justify-self: start;
    align-self: center;
    height: 64px;
  }
`;
