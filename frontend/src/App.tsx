import React from 'react';
import './App.css';
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Auth from './components/Auth';
import Main from './components/MainPage';
import User from './components/User';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Auth} />
          <Route exact path="/main" component={Main} />
          <Route exact path="/user" component={User} />
        </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
