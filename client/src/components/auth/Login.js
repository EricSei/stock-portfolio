import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const { email, password } = user;

  const handleLogin = async e => {
    e.preventDefault();
    const res = await axios.post('http://localhost:8000/api/auth/login', user);
    console.log(res);
  };

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h4>Log In</h4>
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
