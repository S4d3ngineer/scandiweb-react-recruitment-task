import styled from "styled-components";

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
