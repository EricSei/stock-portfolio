import React, { useState, useContext } from "react";
import axios from "axios";
import history from "../../history";
import AuthContext from "../../context/AuthContex";
import TokenContext from "../../context/TokenContext";

const Register = (props) => {
  const { setIsAuth } = useContext(AuthContext);
  const { setToken } = useContext(TokenContext);

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/users/register", user);
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setIsAuth(true);
    history.push("/portfolio");
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="form-container ">
        <h1>
          Account <span className="text-success"> Register</span>{" "}
        </h1>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name"> Name </label>
            <input
              type="text"
              name="name"
              placeholder="enter name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="name"> Email </label>
            <input
              type="email"
              name="email"
              placeholder="enter email"
              onChange={handleChange}
              required
              className="form-control"
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
            value="Register"
            className="btn btn-success btn-block "
          />
        </form>
      </div>
    </>
  );
};

export default Register;
