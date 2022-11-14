import styled from "styled-components";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  $width: number;
  $height?: number;
  $fontSize: number;
}

const Button = styled.button<ButtonProps>`
  font-family: Raleway;
  font-weight: 600;
  font-size: ${props => props.$fontSize + 'px'};
  width: ${props => props.$width + 'px'};
  height: ${props => (props.$height ? props.$height : props.$width * 0.15) + 'px'};
  cursor: pointer;
`

export const PrimaryButton = styled(Button)`
  color: white;
  background-color: ${props => props.theme.colors.primary};
  border: none;
  outline: none;
  &:hover {
    transform: scale(0.98);
  }
`

export const OutlineButton = styled(Button)`
  background-color: white;
  border: 1px solid black;
  outline: none;
  &:hover {
    transform: scale(0.98);
  }
`

export const DisabledButton = styled(Button)`
  background-color: #EEE;
  border: none;
  outline: none;
  cursor: default;
`
