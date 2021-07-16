import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { LoginContainer, HomeContainer, SearchContainer } from "./containers";

import { NavBar } from "./components";
import { HeroProvider } from "./context/HeroContext";
import { StatsProvider } from "./context/StatsContext";
function App() {
  return (
    <Router>
      <StatsProvider>
        <HeroProvider>
          <Switch>
            <Route exact path="/search">
              <NavBar />
              <SearchContainer />
            </Route>
            <Route exact path="/">
              <LoginContainer />
            </Route>
            <Route exact path="/home">
              <NavBar />
              <HomeContainer />
            </Route>
          </Switch>
        </HeroProvider>
      </StatsProvider>
    </Router>
  );
}

export default App;
