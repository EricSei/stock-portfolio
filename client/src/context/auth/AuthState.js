import React from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS
} from '../types';

const AuthState = () => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    error: null
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //load user after register
  const loaduser = () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    try {
      const res = axios.get('/api/auth');
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR
      });
    }
  };

  // load user after sign in

  //register user
  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      const res = await axios.post('api/auth', formData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      });
      loaduser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg
      });
    }
  };

  //
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        register,
        loaduser
      }}
    >
      {props.childern}
    </AuthContext.Provider>
  );
};

export default AuthState;
