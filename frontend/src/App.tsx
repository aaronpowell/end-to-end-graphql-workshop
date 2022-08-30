import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateGame from "./pages/CreateGame";
import JoinGame from "./pages/JoinGame";
import PlayGame from "./pages/PlayGame";
import CompleteGame from "./pages/CompleteGame";
import { Login } from "./pages/Login";
import { RequireAuth } from "./components/RequiresAuth";
import { ClientPrincipalContextProvider } from "@aaronpowell/react-static-web-apps-auth";
import WaitingToStart from "./pages/WaitingToStart";
import { createLink } from "./createLink";

const link = createLink();

const client = new ApolloClient({
  link,
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
