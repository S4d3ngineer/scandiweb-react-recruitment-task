import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Raleway';
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

export const theme = {
  colors: {
    primary: '#5ECE7B'
  }
}
