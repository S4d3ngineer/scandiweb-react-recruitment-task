import styled from "styled-components";

interface ButtonProps extends React.HTMLAttributes<HTMLElement> {
  $width: number;
  $height?: number;
  $fontSize: number;
}

const Button = styled.button<ButtonProps>`
  width: ${props => props.$width + 'px'};
  height: ${props => (props.$height ? props.$height : props.$width * 0.15) + 'px'};
  cursor: pointer;
  font-size: ${props => props.$fontSize + 'px'};
  font-family: Raleway;
  font-weight: 600;
`

export const PrimaryButton = styled(Button)`
  border: none;
  outline: none;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  &:hover {
    transform: scale(0.98);
  }
`

export const OutlineButton = styled(Button)`
  border: 1px solid ${props => props.theme.colors.dark};
  outline: none;
  background-color: transparent;
  color: ${props => props.theme.colors.dark};
  &:hover {
    transform: scale(0.98);
  }
`

export const DisabledButton = styled(Button)`
  background-color: ${props => props.theme.colors.grey};
  border: none;
  outline: none;
  cursor: default;
`
