import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  max-width: 1440px; 
  justify-content: center;
  margin: 50px auto;
`

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
`

const scrollbarThumbColor = "#444"; 
const scrollbarTrackColor = "#777";

export const ImgGallery = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;
  width: 150px;
  max-height: 511px;
  padding-right: 10px;
  overflow-x: hidden;
  overflow-y: auto;
  /* Standardized scrollbar properties for Firefox support */
  scrollbar-color: ${scrollbarTrackColor} ${scrollbarThumbColor};
  scrollbar-width: 8px;
  /* Webkit prefixed scrollbar properties to cover most of remaining cases */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${scrollbarThumbColor};
  }
  &::-webkit-scrollbar-track {
    background-color: ${scrollbarTrackColor};
  }
  img {
    width: 85px;
    height: 85px;
    object-fit: contain;
    cursor: pointer;
  }
`

export const SelectedImg = styled.img`
  max-width: 610px;
  max-height: 511px;
  width: 100%;
  object-fit: contain;
  padding-left: 20px;
  padding-right: 80px;
`

// TODO maybe declare p in global styles
export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  h2 {
    font-size: 30px;
    font-weight: 400;
    padding-top: 16px;
    padding-bottom: 20px;
  }
  h5 {
    font-size: 18px;
    font-weight: 700;
    padding-top: 24px;
  }
  h6 {
    font-size: 16px;
    font-weight: 700;
    padding-top: 36px;
  }
  button {
    margin-top: 20px;
  }
`

export const Brand = styled.div`
  font-size: 30px;
  font-weight: 600;
`

export const AttributeItems = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
`

export const AttributeBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #1D1F22;
  width: 63px;
  height: 45px;
  margin-top: 8px;
  cursor: pointer;
  &.selected {
    background-color: black;
    color: white;
  }
`

// TODO use theme for #1D1F22 or change it to black
export const SwatchAttributeBox = styled.div`
  border: 1px solid #1D1F22;
  width: 36px;
  height: 36px;
  margin-top: 10px;
  cursor: pointer;
  &.selected {
    border: 2px solid white;
    outline: 3px solid ${props => props.theme.colors.primary};
  }
`

export const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
  padding-top: 10px;
`

export const Description = styled.div`
  font-family: Roboto;
  font-size: 16px;
  font-weight: 400px;
  padding-top: 40px;
  li:not(:last-child) {
    padding-bottom: 10px;
  }
`
