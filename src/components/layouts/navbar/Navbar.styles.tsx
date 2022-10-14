import styled from "styled-components";
import { ReactComponent as Cart } from 'assets/icons/Cart.svg';
import { ReactComponent as Logo } from 'assets/icons/Logo.svg';

// TODO move constants to another file if it gets big enough
const primary = "#5ECE7B"

export const FlexBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  padding: 30px 100px;
  @media (max-width: 1440px) {
    padding: 30px 7vw;
  }
  max-width: 1440px;
  svg,
  button {
    cursor: pointer;
  }
`

export const CategoryFilters = styled.div`
  display: flex;
  gap: 2em;
  justify-self: start;
`

export const CategoryButton = styled.button`
  background: transparent;
  font-weight: 600;
  border: 2px solid transparent;
  padding-bottom: 2em;
  text-transform: uppercase;
  &:hover {
    color: ${primary};
    border-bottom-color: ${primary}; 
  }
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

// TODO make hamburger
export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 0.5em;
  justify-self: end;
`

export const CurrencyPicker = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25em;
  &:hover {
    cursor: pointer;
    color: ${primary};
      * {
        stroke: ${primary};
    }
  }
`

export const StyledLogo = styled(Logo)`
  justify-self: center;
`

export const StyledCart = styled(Cart)`
  &:hover * {
    fill: ${primary};
  }
`
