import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px; 
  margin: auto;
  padding: 100px 80px;
  h2 {
    font-size: 32px; 
    font-weight: 700;
    padding-bottom: 55px;
  }
  hr {
    color: #E5E5E5;
  }
  button,
  svg {
    cursor: pointer;
  }
  @media (max-width: 500px) {
    padding: 25px 40px;
  }
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
  img {
    max-width: 200px;
    object-fit: contain;
  }
  @media (max-width: 500px) {
    flex-direction: column;
    gap: 25px;
    img {
      margin: 0 auto;
    }
  }
`

export const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-right: 30px;
  h5 {
    padding-top: 8px;
  }
  @media (max-width: 500px) {
    order: 3;
    padding: 0;
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
  min-width: 63px;
  height: 45px;
  padding: 2px 4px;
  cursor: default;
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
  cursor: default;
  &.selected {
    border: 2px solid white;
    outline: 2px solid ${props => props.theme.colors.primary};
  }
`
export const CountManipulator = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: auto;
  margin-right: 24px;
  button {
    all: unset;
  }
  button:hover {
    transform: scale(0.98);
  }
  @media (max-width: 500px) {
    flex-direction: row;
    gap: 25px;
    order: 2;
    margin: 0 auto;
  }
`
export const SummaryTable = styled.table`
  margin-right: auto;
  text-align: left;
  padding-top: 32px;
  th, td {
    padding-bottom: 8px;
  }
  th {
    font-weight: 400;
  }
  td {
    font-weight: 700;
    padding-left: 8px;
  }
`

export const ButtonContainer = styled.div`
  padding-top: 20px;
`
