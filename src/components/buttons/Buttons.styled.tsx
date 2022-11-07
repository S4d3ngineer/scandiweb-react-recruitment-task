import styled from "styled-components";

interface ButtonProps {
  $width: number;
  $fontSize: number;
}

// TODO create outline class
const Button = styled.button<ButtonProps>`
  font-family: Raleway;
  font-weight: 600;
  font-size: ${props => props.$fontSize + 'px'};
  width: ${props => props.$width + 'px'};
  height: ${props => props.$width * 0.15 + 'px'};
  cursor: pointer;
  &:hover {
    transform: scale(0.98);
  }
`

export const PrimaryButton = styled(Button)`
  color: white;
  background-color: ${props => props.theme.colors.primary};
  border: none;
  outline: none;
`