import styled from "styled-components";

interface ButtonProps {
  $width: number;
  $fontSize: number;
}

// TODO create outline class
export const BasicButton = styled.button<ButtonProps>`
  font-family: Raleway;
  font-weight: 600;
  font-size: ${props => props.$fontSize + 'px'};
  width: ${props => props.$width + 'px'};
  height: ${props => props.$width * 0.15 + 'px'};
  cursor: pointer;
  &.primary {
    color: white;
    background-color: ${props => props.theme.colors.primary};
    border: none;
  }
`
