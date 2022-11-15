import styled from "styled-components";

export const DropdownContent = styled.div`
  position: absolute;
  z-index: 5;
  left: -20px;
  min-width: 120px;
  margin-top: 20px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  background-color: white;
  cursor: pointer;
  span {
    display: block;
    color: black;
    padding: 20px;
    font-size: 18px;
    font-weight: 500;
    text-decoration: none;
  }
  span:hover {
    background-color: ${props => props.theme.colors.grey};
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
  z-index: 4;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

