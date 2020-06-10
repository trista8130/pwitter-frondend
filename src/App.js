import React, { useState, useEffect } from "react";
import "./App.css";
import "./style/global.scss";

import { BrowserRouter as Router, Redirect } from "react-router-dom";
import Routes from "./Routes";

import { AppContext } from "./context";

import NavBar from "./components/NavBar";
import UserServices from "./service/users";

function App() {

  const [user, setUser] = useState({});
  console.log(user)
  const token = window.localStorage.getItem("token");
  console.log(token)
  useEffect(() => {
    const fetchUser = async () => {
      const data = await UserServices.handleGetCurrentUser();
      setUser({ ...data.data.data });
    };
    if (token) {
      fetchUser();
    }
  }, []);

  return (
    <Router>
      {!token && <Redirect to="/login" />}
      <AppContext.Provider value={{ user }}>
        <div className="App">
          <NavBar />
          <Routes />
        </div>
      </AppContext.Provider>
    </Router>
  );
}

export default App;
