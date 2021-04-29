/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const wrapPageElement = ({ element, props }) => (
  <QueryClientProvider client={queryClient} {...props}>
    {element}
  </QueryClientProvider>
);

export default wrapPageElement;
