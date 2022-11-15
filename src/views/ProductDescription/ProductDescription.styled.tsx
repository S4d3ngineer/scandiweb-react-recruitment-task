import styled from "styled-components";

const firstBreakpoint = '1150px';
const secondBreakpoint = '800px';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 50px auto;
  max-width: 1440px; 
  @media (max-width: ${firstBreakpoint}) {
    flex-direction: column;
    align-items: center;
  }
`

export const ImgContainer = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: ${secondBreakpoint}){
    flex-direction: column;
  }
`

const scrollbarThumbColor = "#444"; 
const scrollbarTrackColor = "#777";

export const ImgGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  overflow-x: hidden;
  overflow-y: auto;
  width: 150px;
  height: 511px;
  padding-right: 10px;
  /* Standardized scrollbar properties for Firefox support */
  scrollbar-width: 8px;
  scrollbar-color: ${scrollbarTrackColor} ${scrollbarThumbColor};
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
  @media (max-width: ${secondBreakpoint}) {
    flex-direction: row;
    order: 2;
    overflow-x: auto;
    overflow-y: hidden;
    margin: 0 auto;
    width: 80vw;
    height: 130px;
    padding: 0;
  }
`

export const SelectedImg = styled.img`
  max-width: 610px;
  width: 100%;
  max-height: 511px;
  object-fit: contain;
  padding-left: 20px;
  padding-right: 80px;
  @media (max-width: ${secondBreakpoint}) {
    width: 80vw;
    padding: 0 0 40px 0;
  }
`

export const Panel = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  h2 {
    padding-top: 16px;
    padding-bottom: 20px;
    font-size: 30px;
    font-weight: 400;
  }
  h5 {
    padding-top: 24px;
    font-size: 18px;
    font-weight: 700;
  }
  h6 {
    padding-top: 36px;
    font-size: 16px;
    font-weight: 700;
  }
  button {
    margin-top: 20px;
  }
  @media (max-width: ${firstBreakpoint}) {
    padding-top: 40px;
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
  margin-top: 8px;
  border: 1px solid ${props => props.theme.colors.dark};
  min-width: 63px;
  height: 45px;
  cursor: pointer;
  font-size: 16px;
  &.selected {
    background-color: ${props => props.theme.colors.dark};
    color: white;
  }
`

export const SwatchAttributeBox = styled.div`
  margin-top: 10px;
  border: 1px solid ${props => props.theme.colors.dark};
  width: 36px;
  height: 36px;
  cursor: pointer;
  &.selected {
    border: 2px solid white;
    outline: 3px solid ${props => props.theme.colors.primary};
  }
`

export const Price = styled.div`
  padding-top: 10px;
  font-size: 24px;
  font-weight: 700;
`

export const WarningMessage = styled.span`
  padding-top: 10px;
  color: red;
`

export const Description = styled.div`
  padding-top: 40px;
  font-size: 16px;
  font-family: Roboto;
  font-weight: 400px;
  li:not(:last-child) {
    padding-bottom: 10px;
  }
`
