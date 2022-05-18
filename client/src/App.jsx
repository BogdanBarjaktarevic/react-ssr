import React from "react";
import { Hydrate } from "../../queryClient";
import { QueryClientProvider, queryClient } from "../../queryClient";
import { Component } from "./Component";
import { HelmetProvider } from "react-helmet-async";

const dehydratedState = window.__REACT_QUERY_STATE__;
console.log("~ dehydratedState", dehydratedState);

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={dehydratedState}>
        <HelmetProvider>
          <Component />
        </HelmetProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};
