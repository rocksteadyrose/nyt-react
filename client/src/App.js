import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchArticles from "./pages/search/";
import SavedArticles from "./pages/saved/";
import NoMatch from "./pages/nomatch";
import Nav from "./components/Nav";

const App = () => (
  <Router>
    <div>
      <Nav />
      <Switch>
        <Route exact path="/" component={SearchArticles} />
        <Route exact path="/Articles" component={SearchArticles} />
        <Route exact path="/Articles/:id" component={SavedArticles} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  </Router>
);

export default App;
