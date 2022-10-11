import styled from "styled-components";

export const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;  
  align-items: end;
  padding: 30px 100px;
`

export const Button = styled.button`
  background: transparent;
  font-weight: 600;
  border: 2px solid transparent;
  padding-bottom: 2em;
  &:hover {
    color: #5ECE7B;
    border-bottom-color: #5ECE7B; 
  }
`

export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
`

export const CurrencyPicker = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25em;
`
