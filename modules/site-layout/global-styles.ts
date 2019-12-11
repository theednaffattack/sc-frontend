import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
html {
  box-sizing: border-box;
}
body {
  margin: 0;
  text-size-adjust: 100%;
  font-family: "Montserrat", sans-serif;
}
*,
*:before,
*:after {
  box-sizing: inherit;
}

#__next { width: 100vw; height: 100%; min-height: 100vh; display: flex; justify-content: center; }
`;
