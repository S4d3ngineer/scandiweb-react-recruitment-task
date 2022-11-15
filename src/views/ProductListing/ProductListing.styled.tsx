import styled from "styled-components";

const breakpoint = '1440px';

export const Container = styled.div`
  margin: 5vw 0;
`

export const HeadingContainer = styled.div`
  display: flex;
  align-self: start;
  margin: 0 auto;
  max-width: ${breakpoint};
  padding-bottom: 5vw;
  padding-left: 80px;
  @media (max-width: ${breakpoint}) {
    padding-left: 6vw;
  }
  h2 {
    text-transform: capitalize;
    font-weight: 400;
  }
`

export const ProductList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: calc(0.05 * ${breakpoint});
  row-gap: calc(0.15 * ${breakpoint});
  margin: 0 auto;
  max-width: ${breakpoint};
  padding: 0 30px;
  @media (max-width: ${breakpoint}) {
    column-gap: 5vw;
    row-gap: 15vw;
  }
` 
