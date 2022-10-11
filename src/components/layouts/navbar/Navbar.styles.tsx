import styled from "styled-components";
import { ReactComponent as Cart } from 'assets/icons/Cart.svg';

// TODO move constants to another file if it gets big enough
const primary = "#5ECE7B"

export const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;  
  align-items: end;
  padding: 30px 100px;
  svg,
  button {
    cursor: pointer;
  }
`

export const CategoryFilters = styled.div`
  display: flex;
  gap: 2em;
`

export const CategoryButton = styled.button`
  background: transparent;
  font-weight: 600;
  border: 2px solid transparent;
  padding-bottom: 2em;
  &:hover {
    color: ${primary};
    border-bottom-color: ${primary}; 
  }
`

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
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

export const StyledCart = styled(Cart)`
  cursor: pointer;
  &:hover * {
    fill: ${primary};
  }
`


