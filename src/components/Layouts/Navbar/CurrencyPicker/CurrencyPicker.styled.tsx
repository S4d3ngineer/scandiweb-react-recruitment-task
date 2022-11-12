import styled from "styled-components";

export const IconContainer = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  gap: 0.25em;
  &:hover {
    cursor: pointer;
    color: ${props => props.theme.colors.primary};
    * {
      stroke: ${props => props.theme.colors.primary};
    }
  }
  .active {
    transform: rotate(180deg);
  }
`
