import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import SignUP from './components/SignUp.jsx';
import SignIn from './components/SignIn.jsx';
import Landing from './components/Landing.jsx';

const App = () => {
  return (
    <div className="app">
      <Switch>

        <Route path="/" exact>
          <Landing />
        </Route>

        <Route path='/signup'>
          <SignUP />
        </Route>

        <Route>
          <SignIn />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
