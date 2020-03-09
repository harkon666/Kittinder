import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./pages/landing";
import Home from "./pages/home";
import Profile from "./pages/profile";
import Edit from "./pages/edit";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Landing} />
        <Route path="/home" exact component={Home} />
        <Route path="/home/profile" exact component={Profile} />
        <Route path="/home/profile/edit" exact component={Edit} />
      </Switch>
    </Router>
  );
}

export default App;
