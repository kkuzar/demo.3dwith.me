import React from 'react';

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';
import Home from './pages/home';
import DemoScene from './pages/DemoScene';
import WithPBR from "./pages/WithPBR";
import SingleScene from "./pages/SingleScene";

function App() {
  return (
      <BrowserRouter>
        <Switch>
            <Route exact path={"/"} component={Home} />
            <Route exact path={"/demoscene"} component={DemoScene} />
            <Route exact path={"/single"} component={SingleScene} />
            <Route exact path={"/pbr"} component={WithPBR} />
            <Redirect to={'/'}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
