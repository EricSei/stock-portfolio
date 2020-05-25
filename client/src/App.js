import React, { Fragment, useState, useEffect } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';

import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';

import Portfolio from './components/portfolio/Portfolio';
import Transactions from './components/stock/Transactions';
import Purchase from './components/stock/Purchase';


import history from './history'; 

import {AuthProvider} from './context/AuthContex';
import {TokenProvider} from './context/TokenContext';

import setAuthToken from './utils/setAuthToken';

import './App.css';

//Set Auth Token At Req Header
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

 const App = (props) => {
   
  //App Stores Token State
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem('token'));
  }, []);

  return (
    <div className='App'>
      <Router history={history}>
        <Navbar token={token} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            exact
            path='/purchase'
            render={() => <Purchase {...props} token={token} />}
          />
          <Route
            exact
            path='/portfolio'
            render={() => <Portfolio {...props} token={token} />}
          />
          <Route
            exact
            path='/transactions'
            render={() => <Transactions {...props} token={token} />}
          />
          <Route
            exact
            path='/register'
            render={() => <Register {...props} setToken={setToken} />}
          />
          <Route
            exact
            path='/login'
            render={() => <Login {...props} setToken={setToken} />}
          />
          <Route exact path='/logout' component={Logout} />
        </Switch>
      </Router>
    </div>
  );
}

export default () => (
  <AuthProvider>
    <TokenProvider>
      <App />
    </TokenProvider>
  </AuthProvider>
)
 
