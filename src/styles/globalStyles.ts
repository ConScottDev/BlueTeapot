import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2 {
    color: #333;
  }

  input {
    margin: 5px;
    padding: 8px;
  }

  button {
    margin: 5px;
    padding: 8px 12px;
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
      background-color: #0056b3;
    }
  }
`;

export default GlobalStyles;
