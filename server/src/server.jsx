// server.tsx
import React from "react";
import express from "express";
import * as ReactDOMServer from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import {
  queryClient,
  dehydrate,
  Hydrate,
  QueryClientProvider,
} from "../../queryClient";
import { Component, preload } from "../../client/src/Component";

const helmetContext = {};
const app = express();

app.get("/", async (req, res) => {
  if (preload) {
    console.log("na serveru sam");
    await preload(queryClient);
  }

  const dehydratedState = dehydrate(queryClient);
  console.log("~ dehydratedState", dehydratedState);

  const app = ReactDOMServer.renderToString(
    <HelmetProvider context={helmetContext}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <Component />
        </Hydrate>
      </QueryClientProvider>
    </HelmetProvider>
  );
  const { helmet } = helmetContext;

  const html = `
        <html lang="en">
        <head>
        <head>
    ${helmet.title.toString()}
    ${helmet.priority.toString()}
    ${helmet.meta.toString()}
    ${helmet.link.toString()}
    ${helmet.script.toString()}
  </head>
            <script src="app.js" async defer></script>
        </head>
        <body>
            <div id="root">${app}</div>
            <script>
            window.__REACT_QUERY_STATE__ = ${JSON.stringify(dehydratedState)};
          </script>
        </body>
        </html>
    `;
  queryClient.clear();
  res.send(html);
});

app.use(express.static("./built"));

app.listen(4242);
