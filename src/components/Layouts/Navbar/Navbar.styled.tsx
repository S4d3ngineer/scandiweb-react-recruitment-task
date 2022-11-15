import styled from "styled-components";
import { ReactComponent as Logo } from 'assets/icons/Logo.svg';

export const Wrapper = styled.div`
  position: relative;
  z-index: 2;
  margin: 0 auto;
  background-color: white;
`

export const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 0 auto;
  max-width: 1440px;
  padding: 30px 100px 0 100px;
  @media (max-width: 1440px) {
    padding: 30px 7vw 0 7vw;
  }
  svg,
  button {
    cursor: pointer;
  }
`

export const CategoryFilters = styled.div`
  display: flex;
  justify-self: start;
  gap: 32px;
  .active button {
    border-bottom-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }
`

export const CategoryButton = styled.button`
  border: 2px solid transparent;
  padding-bottom: 32px;
  background: transparent;
  font-weight: 600;
  text-transform: uppercase;
  &:hover {
    border-bottom-color: ${props => props.theme.colors.primary}; 
    color: ${props => props.theme.colors.primary};
  }
`

export const LogoContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
`

// TODO make hamburger
export const Menu = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-self: end;
  gap: 0.5em;
`

export const LogoIcon = styled(Logo)`
  justify-self: center;
`
