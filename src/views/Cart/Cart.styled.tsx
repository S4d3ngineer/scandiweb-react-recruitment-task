import styled from "styled-components";

const breakpoint = '500px';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: auto;
  max-width: 1440px; 
  padding: 100px 80px;
  h2 {
    padding-bottom: 55px;
    font-size: 32px; 
    font-weight: 700;
  }
  hr {
    color: #E5E5E5;
  }
  button,
  svg {
    cursor: pointer;
  }
  @media (max-width: ${breakpoint}) {
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
  @media (max-width: ${breakpoint}) {
    flex-direction: column;
    flex-grow: 0;
    flex-shrink: 0;
    gap: 25px;
    img {
      max-width: 100%;
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
  @media (max-width: ${breakpoint}) {
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
  border: 1px solid ${props => props.theme.colors.dark};
  min-width: 63px;
  height: 45px;
  padding: 2px 4px;
  cursor: default;
  font-size: 14px;
  font-family: 'Source Sans Pro';
  font-weight: 400;
  &.selected {
    background-color: ${props => props.theme.colors.dark};
    color: white;
  }
`

export const SwatchAttributeBox = styled.div`
  border: 1px solid ${props => props.theme.colors.dark};
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
    width: 24px;
    height: 24px;
  }
  button:hover {
    transform: scale(0.98);
  }
  @media (max-width: ${breakpoint}) {
    flex-direction: row;
    gap: 25px;
    order: 2;
    margin: 0 auto;
  }
`
export const SummaryTable = styled.table`
  margin-right: auto;
  padding-top: 32px;
  text-align: left;
  th, td {
    padding-bottom: 8px;
  }
  th {
    font-weight: 400;
  }
  td {
    padding-left: 8px;
    font-weight: 700;
  }
`

export const ButtonContainer = styled.div`
  padding-top: 20px;
`
