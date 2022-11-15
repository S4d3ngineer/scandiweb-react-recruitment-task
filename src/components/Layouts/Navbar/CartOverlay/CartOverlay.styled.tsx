import styled from "styled-components";
import { ReactComponent as Cart } from 'assets/icons/Cart.svg';

export const Container = styled.div`
  position: relative;
  display: inline-block;
  & > button {
    all: unset;
    cursor: pointer;
  }
`

export const CartIcon = styled(Cart)`
  &:hover * {
    fill: ${props => props.theme.colors.primary};
  }
`

export const CounterIcon = styled.div`
  position: absolute;
  z-index: 3;
  top: -7px;
  right: -6px;
  display: flex;
  justify-content: center;
  border-radius: 50%;
  width: 15px;
  height: 15px;
  background-color: ${props => props.theme.colors.dark};
  font-size: 11px;
  font-weight: 600;
  color: white;
`

export const Overlay = styled.div`
  position: absolute;
  z-index: 3;
  right: -20px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  width: 325px;
  padding: 32px 16px;
  background-color: white;
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
  gap: 8px;
  width: 120px;
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
  border: 1px solid ${props => props.theme.colors.dark};
  min-width: 24px;
  height: 24px;
  padding: 2px 4px;
  cursor: default;
  font-size: 14px;
  font-weight: 400px;
  &.selected {
    background-color: ${props => props.theme.colors.dark};
    color: white;
  }
`

export const SwatchAttributeBox = styled.div`
  border: 1px solid ${props => props.theme.colors.dark};
  width: 16px;
  height: 16px;
  cursor: default;
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

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 34px;
`

export const EventShield = styled.div`
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
