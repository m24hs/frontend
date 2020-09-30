import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const Wrapper = styled.div`
  flex: 1;

  .payment-type {
    width: 100%;
    color: var(--color-text-dark);
  }

  .payment-type > li {
    border-radius: 10px;
    padding: 16px;
    display: block;
    cursor: pointer;
    transition: all 0.3s;
  }
  .payment-type > li:hover {
    background: var(--color-primary-hover-light);
  }
  .payment-type > li > svg {
    color: var(--color-primary);
    width: 64px;
  }

  .credit-card {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: repeat(4, 1fr);
    grid-template-areas: "number number" "cvv cvv" "name name" "date date" "cards iugu";
    gap: 16px;
  }
  .credit-card > div {
    display: flex;
    flex-direction: column;
  }

  .credit-card > div:nth-child(1) {
    grid-area: number;
  }

  .credit-card > div:nth-child(2) {
    grid-area: cvv;
  }

  .credit-card > div:nth-child(3) {
    grid-area: name;
  }

  .credit-card > div:nth-child(4) {
    grid-area: date;
  }

  .credit-card > div:nth-child(5) {
    grid-area: cards;
  }

  .credit-card > div:nth-child(6) {
    grid-area: iugu;
    text-align: right;
  }

  .credit-card img {
    height: 20px;
    width: auto;
  }

  .change-payment-type {
      width: 100%;
      border-radius: 10px;
      display: flex;
      font-size: 16px;
      align-items: center;
      color: var(--color-text-dark);
      padding: 16px;
      transition: all .3s;
  }

  .change-payment-type > svg { 
      width: 40px;
      margin-right: 8px;
      color: var(--color-primary);
  }

  .change-payment-type:hover {
    background: var(--color-primary-hover-light);
  }

  @media (min-width: 780px) {
    .credit-card {
      grid-template-columns: 1fr 160px;
      grid-template-rows: repeat(2, 1fr) auto;
      grid-template-areas: "number cvv" "name date" "cards iugu";
    }
  }  
`;
