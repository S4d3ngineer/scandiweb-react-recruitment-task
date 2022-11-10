import styled from "styled-components";
import { ReactComponent as Cart } from 'assets/icons/Cart.svg';

export const DimmedBackground = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0,0,0,0.5);
  z-index: -1;
  top: 0;
  left: 0;
`

export const Container = styled.div`
  position: relative;
  display: inline-block;
  & > button {
    all: unset;
  }
`

export const CartIcon = styled(Cart)`
  &:hover * {
    fill: ${props => props.theme.colors.primary};
  }
`

export const Overlay = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #FFF;
  width: 325px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 3;
  right: -20px;
  margin-top: 20px;
  padding: 32px 16px;
  cursor: pointer;
  /* button { all: unset; } */
`

export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

export const Item = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 32px;
  img {
    max-width: 120px;
    object-fit: contain;
  }
`

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  gap: 8px;
  h5 {
    padding-top: 8px;
  }
`

export const NameContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-size: 16px;
  font-weight: 300;
`

export const Price = styled.div`
  font-size: 16px;
  font-weight: 500;
`

export const AttributeItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
`

export const AttributeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 400px;
  border: 1px solid #1D1F22;
  min-width: 24px;
  height: 24px;
  padding: 2px 4px;
  cursor: pointer;
  &.selected {
    background-color: black;
    color: white;
  }
`

// TODO use theme for #1D1F22 or change it to black
export const SwatchAttributeBox = styled.div`
  border: 1px solid #1D1F22;
  width: 16px;
  height: 16px;
  cursor: pointer;
  &.selected {
    border: 1px solid white;
    outline: 2px solid ${props => props.theme.colors.primary};
  }
`
export const CountManipulator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  button {
    all: unset;
  }
  button:hover {
    transform: scale(0.98);
  }
`

export const Summary = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 32px;
`

// TODO maybe it is not needed?
export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 34px;
`
