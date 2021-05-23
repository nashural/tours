import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Switch, Route, Redirect } from "react-router";
import { Container } from "reactstrap";
import { TokenStoragesProvider } from "./providers/TokenStoragesProvider";
import { ApiClientProvider } from "./providers/ApiClientProvider";
import { createApiClient } from "./api/createApiClient";
import { CheckAuthentication } from "./components/CheckAuthentication";
import { TopBar } from "./components/TopBar";
import { Main } from "./pages/Main";
import { Guides } from "./pages/Guides";
import { Tours } from "./pages/Tours";
import { AddTour } from "./pages/AddTour";
import { AddGuide } from "./pages/AddGuide";
import { EditGuide } from "./pages/EditGuide";
import { EditTour } from "./pages/EditTour";
import { LoginLayout } from "./components/LoginLayout";
import { Login } from "./pages/Login";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { TokenStorage } from "./classes/TokenStorage";

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
