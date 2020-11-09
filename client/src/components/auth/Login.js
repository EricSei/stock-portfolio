import React, { useState, useContext } from "react";
import history from "../../history";
import axios from "axios";
//import setAuthToken from '../../utils/setAuthToken';

import AuthContext from "../../context/AuthContex";

const Login = (props) => {
  const { setIsAuth } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/auth/login", user);

    localStorage.setItem("token", res.data.token);
    props.setToken(res.data.token);

    setIsAuth(true);
    history.push("/portfolio");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="form-container">
      <h1>
        {" "}
        Account <span className="text-success">Log In </span>
      </h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="name"> Email Address </label>
          <input
            type="email"
            name="email"
            placeholder="enter email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="name"> Password </label>
          <input
            type="password"
            name="password"
            placeholder="enter password"
            onChange={handleChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-success btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
