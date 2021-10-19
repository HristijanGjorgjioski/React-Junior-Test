import { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from "./Components/Home/Home";

class App extends Component {

  render() {
    return (
      <>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </>
    )
  }
}

export default App
