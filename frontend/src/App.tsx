import React from "react";
import "./App.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateGame from "./pages/CreateGame";
import JoinGame from "./pages/JoinGame";
import PlayGame from "./pages/PlayGame";
import CompleteGame from "./pages/CompleteGame";
import { Login } from "./pages/Login";
import { RequireAuth } from "./components/RequiresAuth";
import { createClient } from "graphql-ws";
import { ClientPrincipalContextProvider } from "@aaronpowell/react-static-web-apps-auth";
import WaitingToStart from "./pages/WaitingToStart";

const httpLink = new HttpLink({
  uri: `${
    import.meta.env.VITE_GRAPHQL_HTTP_ENDPOINT || window.location.origin
  }/api/graphql`,
});

const swaCookie = document.cookie.split("; ").reduce<Record<string, string>>(
  (obj, cookie) => ({
    ...obj,
    [cookie.split("=")[0]]: cookie.split("=").slice(1).join("="),
  }),
  {}
)["StaticWebAppsAuthCookie"];

const wsLink = new GraphQLWsLink(
  createClient({
    url: `${import.meta.env.VITE_GRAPHQL_WS_ENDPOINT}/api/graphql`,
    connectionParams: {
      swaCookie,
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ClientPrincipalContextProvider>
      <ApolloProvider client={client}>
        <Router>
          <div className="App">
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <CreateGame />
                  </RequireAuth>
                }
              />
              <Route
                path="/game/join/:id"
                element={
                  <RequireAuth>
                    <JoinGame />
                  </RequireAuth>
                }
              />
              <Route
                path="/game/waiting/:id"
                element={
                  <RequireAuth>
                    <WaitingToStart />
                  </RequireAuth>
                }
              />
              <Route
                path="/game/play/:id"
                element={
                  <RequireAuth>
                    <PlayGame />
                  </RequireAuth>
                }
              />
              <Route
                path="/game/finish/:id"
                element={
                  <RequireAuth>
                    <CompleteGame />
                  </RequireAuth>
                }
              />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </ClientPrincipalContextProvider>
  );
}

export default App;
