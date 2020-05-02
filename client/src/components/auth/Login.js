import React, { useState, useEffect, useContext } from 'react';
import history from '../../history';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import AuthContext from '../../context/AuthContex';

const Login = props => {
  
  const { setIsAuth } = useContext(AuthContext);

  // useEffect(() => {
  //   if (localStorage.getItem('token')) {
  //     history.push('/');
  //   }

  //   // eslint-disable-next-line
  // }, []);

  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const handleLogin = async e => {
    e.preventDefault();
    const res = await axios.post('/api/auth/login', user);

    localStorage.setItem('token', res.data.token);
    props.setToken(res.data.token);
    
    setIsAuth(true);
    history.push('/portfolio');
  };

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className='form-container'>
      <h3>Log In</h3>
      <form onSubmit={handleLogin}>
        <input
          type='email'
          name='email'
          placeholder='enter email'
          onChange={handleChange}
          required
        />
        <input
          type='password'
          name='password'
          placeholder='enter password'
          onChange={handleChange}
          required
        />

        <input type='submit' />
      </form>
    </div>
  );
};

export default Login;
