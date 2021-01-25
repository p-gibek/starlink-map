import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import EarthView from '../components/EarthView.component';

const GlobalStyle = createGlobalStyle`
  html, body, #___gatsby, #gatsby-focus-wrapper {
    height: 100%;
  }

  
  body {
    background: black;
  }
`;

const Index = () => (
  <>
    <GlobalStyle />
    <EarthView />
  </>
);

export default Index;
