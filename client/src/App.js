import React, { Fragment, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import Portfolio from './components/auth/Portfolio';
import Transactions from './components/auth/Transactions';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Logout from './components/auth/Logout';
import history from './history';

import './App.css';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App(props) {
  const [token, setToken] = useState(null);

  return (
    <div className='App'>
      <Router history={history}>
        <Navbar token={token} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/portfolio' component={Portfolio} />
          <Route exact path='/transactions' component={Transactions} />
          <Route exact path='/register' component={Register} />
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

export default App;
