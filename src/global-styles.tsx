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
    primary: '#5ECE7B',
    dark: '#1D1F22',
    grey: '#EEE',
    warning: 'red',
    scrollbar: {
      thumb: '#444',
      track: '#777'
    }
  }
}
