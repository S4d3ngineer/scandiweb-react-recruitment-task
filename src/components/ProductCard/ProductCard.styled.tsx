import styled from "styled-components";
import { ReactComponent as Cart } from 'assets/icons/Cart.svg';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`
export const PhotoContainer = styled.div`
  position: relative; 
`

export const ProductPhoto = styled.img`
  max-height: 338px;
  height: 100%;
  object-fit: contain;
`
export const Overlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.5;
  background-color: white;
  color: #8D8F9A;
  font-size: 24px;
  font-weight: 400;
`

export const ProductInfo = styled.div`
  position: relative;
  margin-top: 1.5em;
  font-size: 18px;
`

export const ProductName = styled.div`
  font-weight: 300;
`

export const Price = styled.div`
  font-weight: 500;
`

export const AddToCart = styled.button`
  position: absolute;
  right: 10px;
  bottom: -15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%; 
  border: none;
  background-color: ${props => props.theme.colors.primary};
  cursor: pointer;
  &:hover {
    transform: scale(0.98);
  }
`

export const CartIcon = styled(Cart)`
  * {
    fill: white;
  }
`
