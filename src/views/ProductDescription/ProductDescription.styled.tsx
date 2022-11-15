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

export const ImgGallery = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  flex-grow: 0;
  flex-shrink: 0;
  overflow-x: hidden;
  overflow-y: auto;
  margin-right: 30px;
  max-height: 511px;
  /* Standardized scrollbar properties for Firefox support */
  scrollbar-width: 8px;
  scrollbar-color: ${props => props.theme.colors.scrollbar.track} ${props => props.theme.colors.scrollbar.thumb};
  /* Webkit prefixed scrollbar properties to cover most of remaining cases */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.scrollbar.thumb};
  }
  &::-webkit-scrollbar-track {
    background-color: ${props => props.theme.colors.scrollbar.track};
  }
  img {
    margin-right: 20px;
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
    margin: 40px auto 0 auto;
    max-width: 80vw;
    scrollbar-height: 8px;
    &::-webkit-scrollbar {
      height: 8px;
    }
    img {
      margin-right: 0;
      margin-bottom: 10px;
    }
  }
`

export const SelectedImg = styled.img`
  margin-right: 80px;
  max-width: 610px;
  width: 100%;
  max-height: 511px;
  object-fit: contain;
  @media (max-width: ${firstBreakpoint}) {
    margin-right: 0;
    width: 400px;
  }
  @media (max-width: ${secondBreakpoint}) {
    width: 80vw;
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
