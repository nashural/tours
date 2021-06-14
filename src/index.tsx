import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";

import { Redirect, Route, Switch } from "react-router";

import { AddGuide } from "./pages/AddGuide";
import { AddTour } from "./pages/AddTour";
import { ApiClientProvider } from "./providers/ApiClientProvider";
import { BrowserRouter } from "react-router-dom";
import { CheckAuthentication } from "./components/CheckAuthentication";
import { Container } from "reactstrap";
import { EditGuide } from "./pages/EditGuide";
import { EditTour } from "./pages/EditTour";
import { Guides } from "./pages/Guides";
import { Login } from "./pages/Login";
import { LoginLayout } from "./components/LoginLayout";
import { Main } from "./pages/Main";
import ReactDOM from "react-dom";
import { Register } from './pages/Register'
import { StrictMode } from "react";
import { TokenStorage } from "./classes/TokenStorage";
import { TokenStoragesProvider } from "./providers/TokenStoragesProvider";
import { TopBar } from "./components/TopBar";
import { Tours } from "./pages/Tours";
import { createApiClient } from "./api/createApiClient";

const accessTokenStorage = new TokenStorage("accessToken");
const refreshTokenStorage = new TokenStorage("refreshToken");
const apiClient = createApiClient(accessTokenStorage, refreshTokenStorage);

ReactDOM.render(
  <StrictMode>
    <TokenStoragesProvider
      accessTokenStorage={accessTokenStorage}
      refreshTokenStorage={refreshTokenStorage}
    >
      <ApiClientProvider apiClient={apiClient}>
        <BrowserRouter>
          <CheckAuthentication>
            {(isAuthenticated) => {
              if (isAuthenticated) {
                return (
                  <>
                    <TopBar />
                    <Container>
                      <Switch>
                        <Route exact path="/" component={Main} />
                        <Route exact path="/guides" component={Guides} />
                        <Route exact path="/guides/add" component={AddGuide} />
                        <Route exact path="/guides/:id" component={EditGuide} />
                        <Route exact path="/tours" component={Tours} />
                        <Route exact path="/tours/add" component={AddTour} />
                        <Route exact path="/tours/:id" component={EditTour} />
                      </Switch>
                    </Container>
                  </>
                );
              } else {
                return (
                  <LoginLayout>
                    <Switch>
                      <Route exact path="/login" component={Login} />
                      <Route exact path="/register" component={Register} />
                      <Redirect from="*" to="/login" />
                    </Switch>
                  </LoginLayout>
                );
              }
            }}
          </CheckAuthentication>
        </BrowserRouter>
      </ApiClientProvider>
    </TokenStoragesProvider>
  </StrictMode>,
  document.getElementById("root")
);
