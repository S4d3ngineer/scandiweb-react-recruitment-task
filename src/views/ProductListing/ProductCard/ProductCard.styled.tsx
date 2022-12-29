import styled from "styled-components";
import { ReactComponent as Cart } from "assets/icons/Cart.svg";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

export const AddToCartButton = styled.button`
  visibility: hidden;
  position: absolute;
  bottom: -15px;
  right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 50%;
  width: 52px;
  height: 52px;
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  &:hover {
    visibility: visible;
  }
  @media (hover: none) and (pointer: coarse) {
    visibility: visible;
  }
`;

export const PhotoContainer = styled.div`
  position: relative;
  &:hover ${AddToCartButton} {
    visibility: visible;
  }
`;

export const ProductPhoto = styled.img`
  height: 338px;
  width: 356px;
  object-fit: contain;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  opacity: 0.5;
  font-size: 24px;
  font-weight: 400;
  color: #8d8f9a;
`;

export const ProductInfo = styled.div`
  position: relative;
  margin-top: 1.5em;
  font-size: 18px;
`;

export const ProductName = styled.div`
  font-weight: 300;
`;

export const Price = styled.div`
  font-weight: 500;
`;

export const CartIcon = styled(Cart)`
  * {
    fill: white;
  }
`;
