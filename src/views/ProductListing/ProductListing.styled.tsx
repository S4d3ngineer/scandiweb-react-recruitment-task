import styled from "styled-components";

export const Container = styled.div`
  margin: 5vw 0;
`

export const HeadingContainer = styled.div`
  display: flex;
  align-self: start;
  max-width: 1440px;
  padding-left: 80px;
  padding-bottom: 5vw;
  margin: 0 auto;
  @media (max-width: 1440px) {
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
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 30px;
  row-gap: calc(0.15 * 1440px);
  column-gap: calc(0.05 * 1440px);
  @media (max-width: 1440px) {
    row-gap: 15vw;
    column-gap: 5vw;
  }
` 
