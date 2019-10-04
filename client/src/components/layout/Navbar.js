import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import history from '../../history';
import setAuthToken from '../../utils/setAuthToken';

const Navbar = ({ title, icon, token }) => {
  const isAuth = token ? true : false;
  const [auth, setAuth] = useState(isAuth);

  useEffect(() => {
    const isAuth = token ? true : false;
    setAuth(isAuth);
  }, [token]);

  const logOut = () => {
    localStorage.removeItem('token');
    setAuth(false);
    history.push('/logout');
  };

  const authLinks = (
    <Fragment>
      <li>
        <Link to='/portfolio'>Porfolio</Link>
      </li>
      <li>
        <Link to='/transactions'>Transactions</Link>
      </li>
      <li>
        <Link onClick={logOut}>Sign Out</Link>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <li>
        <Link to='/'>Home</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Log In</Link>
      </li>
    </Fragment>
  );

  return (
    <div className='navbar bg-success'>
      <h1>
        <i className={icon}></i> {title}
      </h1>
      <ul>{auth ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'Stock Porfolio',
  icon: 'fas fa-coins'
};

export default Navbar;
