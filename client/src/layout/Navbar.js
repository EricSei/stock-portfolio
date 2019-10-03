import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  let isAuthenticated = false;
  const authLinks = (
    <Fragment>
      <li>Hello {}</li>
      <div>Home</div>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
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
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'Stock Porfolio',
  icon: 'fas fa-coins'
};

export default Navbar;
