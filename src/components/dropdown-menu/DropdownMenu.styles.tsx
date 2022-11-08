import styled from "styled-components";

// TODO edit (move EEE to themes?)
export const DropdownContent = styled.div`
  position: absolute;
  background-color: #FFF;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  left: -20px;
  margin-top: 20px;
  cursor: pointer;
  /* button { all: unset; } */
  span {
    color: black;
    font-size: 18px;
    font-weight: 500;
    padding: 20px;
    text-decoration: none;
    display: block;
  }
  span:hover {
    background-color: #EEE;
  }
`

export const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  & > button {
    all: unset;
  }
`

