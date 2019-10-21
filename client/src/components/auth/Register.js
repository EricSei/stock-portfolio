import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import history from '../../history';

const Register = props => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const { name, email, password } = user;

  const handleRegister = async e => {
    e.preventDefault();
    const res = await axios.post(
      '/api/users/register',
      user
    );
    localStorage.setItem('token', res.data.token);
    props.setToken(res.data.token);
    history.push('/');
  };

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
        <input
          type='text'
          name='name'
          placeholder='enter name'
          onChange={handleChange}
          required
        />
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
    </>
  );
};

export default Register;
