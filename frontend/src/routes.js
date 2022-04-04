import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Logon from './pages/Logon';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Register from './pages/Register';
import Data from './pages/Data';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Logon} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/home" exact component={Home} />
        <Route path="/register" exact component={Register} />
        <Route path="/data" exact component={Data} />
      </Switch>
    </BrowserRouter>
  )
}