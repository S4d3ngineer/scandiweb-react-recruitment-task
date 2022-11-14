import styled from "styled-components";

// TODO edit (move EEE to themes?)
// TODO change colors
export const DropdownContent = styled.div`
  position: absolute;
  background-color: #FFF;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 5;
  left: -20px;
  margin-top: 20px;
  cursor: pointer;
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

// Overlay preventing from firing other events until menu is closed
export const EventShield = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 4;
  top: 0;
  left: 0;
`

