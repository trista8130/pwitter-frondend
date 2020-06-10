import React from "react";
import { Route, Redirect } from "react-router-dom";

import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import FriendsPage from "./pages/Friends";
import ProfilePage from "./pages/Profile";
import ProfileSettingPage from "./pages/ProfileSetting";
import StatusPage from "./pages/Status";

// const friendId = window.localStorage.getItem("friend");
const friendId = 1;
export const routes = [
  {
    path: "/",
    component: HomePage,
    isExact: true,
  },
  {
    path: "/login",
    component: LoginPage,
    isExact: true,
  },
  {
    path: "/register",
    component: RegisterPage,
    isExact: true,
  },
  {
    path: "/status",
    component: StatusPage,
    isExact: true,
  },

  {
    path: "/friends",
    component: FriendsPage,
    isExact: true,
  },
  {
    path: "/profile",
    component: ProfilePage,
    isExact: true,
  },
  {
    path: "/profile-setting",
    component: ProfileSettingPage,
    isExact: true,
  },
];

export default function Routes() {
  return (
    <div>
      {routes.map((route) => (
        <Route
          key={route.path}
          exact={route.isExact}
          path={route.path}
          component={route.component}
        />
      ))}
    </div>
  );
}
