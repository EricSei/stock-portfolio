import React, { useState, useContext, useEffect } from 'react';
//import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import axios from 'axios';

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
      'http://localhost:8000/api/users/register',
      user
    );
    console.log(res);
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
