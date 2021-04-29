import * as React from 'react';
import { createGlobalStyle } from 'styled-components';
import { useQuery } from 'react-query';
import EarthView from '../components/EarthView/EarthView.component';
import fetchSatellites from '../api/fetch-satellites';

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

const Index = () => {
  const { data } = useQuery('satellites', fetchSatellites);

  return (
    <>
      <GlobalStyle />
      <EarthView satelliteData={data} />
    </>
  );
};
export default Index;
