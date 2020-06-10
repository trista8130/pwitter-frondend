import React, { useState } from "react";
import "./index.scss";
import Axios from "axios";
import { Link } from "react-router-dom";
import AuthServices from "../../service/auth";

export default function LoginPage({ history }) {
  const [values, setValues] = useState({});
  const [remember, setRemember] = useState(null);
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
    setRemember(!values.isRemembered);
  };

  // const [phoneValue, passwordValue] = Object.values(values);

  const handleLogin = async () => {
    try {
    
      const loginResult = await AuthServices.handleLogin(values)
      if (loginResult.data.success) {
        window.localStorage.setItem("token", loginResult.data.data);
        // window.localStorage.setItem('userId', loginResult.data.data._id);
        history.push("/");
        window.location.reload();
        // if (remember) {
        // window.localStorage.removeItem("phone");
        // window.localStorage.removeItem("password");
        // }
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-page page">
      <h1>Pwitter</h1>
      <div className="login-container">
        <h2>Sign in</h2>
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <input
            name="phone"
            type="tel"
            placeholder="Enter your phone here"
            onChange={handleInputChange}
            value={values.phone}
          />
          <input
            name="password"
            type="number"
            placeholder="Enter your passwordhere"
            onChange={handleInputChange}
            value={values.password}
          />
          <div className="check-box">
            <input
              type="checkbox"
              name="rememberPassword"
              checked={values.isRemembered}
              onChange={handleInputChange}
            />
            <span>Remember Password</span>
          </div>

          <button onClick={handleLogin}>Log In</button>
        </form>
        <Link to="/register">Don’t have an account? Register for one now.</Link>
      </div>
    </div>
  );
}
