import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import EarthView from '../components/EarthView/EarthView.component';

const GlobalStyle = createGlobalStyle`
  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }

  
  body {
    background: black;
    font-family: sans-serif;
    margin: 0;
  }
`;

const Index = () => (
  <>
    <GlobalStyle />
    <EarthView />
  </>
);

export default Index;
