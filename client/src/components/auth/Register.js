import React, { useState, useContext } from 'react';
import axios from 'axios';
import history from '../../history';
import AuthContext from '../../context/AuthContex';
import TokenContext from '../../context/TokenContext';



const Register = props => {

  const {  setIsAuth } = useContext(AuthContext);
  const {  setToken } = useContext(TokenContext);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  //const { name, email, password } = user;

  const handleRegister = async e => {
    e.preventDefault();
    const res = await axios.post(
      '/api/users/register',
      user
    );
    localStorage.setItem('token', res.data.token);
    setToken(res.data.token);
    setIsAuth(true);
    history.push('/portfolio');
  };

  const handleChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="form-container ">
        <h3>Register</h3>
        <form onSubmit={handleRegister}>
        <div className="form-group">
          <input
              type='text'
              name='name'
              placeholder='enter name'
              onChange={handleChange}
              required
          />
        </div>
          
          <input
            type='email'
            name='email'
            placeholder='enter email'
            onChange={handleChange}
            required
            className="form-control"
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
    </>
  );
};

export default Register;
