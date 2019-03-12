import React, { Component } from "react";
import { Arwes, ThemeProvider, createTheme } from "arwes";
import { Container } from "semantic-ui-react";
import { Route, Switch } from "react-router-dom";
import CardDashboard from "../../features/card/CardDashboard/CardDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import PlayerCardForm from "../../features/card/PlayerCardForm/PlayerCardForm";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import LootDashboard from "../../features/card/CardOpenings/LootDashboard";
import NotFound from "../../app/layout/NotFound";
import HomePage from "../../features/home/HomePage";
import TestComponent from "../../features/testarea/TestComponent";
import ModalManager from "../../features/modals/ModalManager";
import { UserIsAuthenticated } from "../../features/auth/authWrapper";


const myTheme = {
  color: {
    primary: {
      base: '#9055A2',
      dark: 'rgba(9, 0, 0, 0.5)',
      light: '#50dfdb'
    }
  },
  background: {
    primary: '#011638'
  }
};

class App extends Component {
  render() {
    return (
      <div>
        <ModalManager />
        <Switch>
          <Route exact path="/" component={HomePage} />
        </Switch>

        <Route
          path="/(.+)"
          render={() => (
            <ThemeProvider theme={createTheme(myTheme)}>
              <div>
                <NavBar />
                <Arwes>
                <Container className="main" fluid>
                  <Switch>
                    <Route path="/cards" component={CardDashboard} />
                    <Route path="/test" component={TestComponent} />
                    <Route
                      path="/manage/:id"
                      component={UserIsAuthenticated(PlayerCardForm)}
                    />
                    <Route
                      path="/loot"
                      component={UserIsAuthenticated(LootDashboard)}
                    />
                    <Route
                      path="/profile/:id"
                      component={UserIsAuthenticated(UserDetailedPage)}
                    />
                    <Route
                      path="/settings"
                      component={UserIsAuthenticated(SettingsDashboard)}
                    />
                    <Route
                      path="/create-card"
                      component={UserIsAuthenticated(PlayerCardForm)}
                    />
                    <Route path="/error" component={NotFound} />
                    <Route component={NotFound} />
                  </Switch>
                </Container>
                </Arwes>
              </div>
            </ThemeProvider>
          )}
        />
      </div>
    );
  }
}

export default App;
