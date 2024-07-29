import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    font-family: Arial, sans-serif;
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
