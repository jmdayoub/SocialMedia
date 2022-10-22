import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import SiteNav from "./components/SiteNav";
import Footer from "./components/Footer";
import usersService from "./services/usersService";
import routes from "./services/routeService";
import "./App.css";
import { Suspense } from "react";
import debug from "sabio-debug";
import Login from "./components/user/Login";

const _logger = debug.extend("App");

function App() {
  const [currentUser, setUserData] = useState({
    firstName: "Unknown",
    lastName: "User",
    roles: [""],
    isConfirmed: false,
    email: "",
    avatarUrl: "",
  });

  const updateCurrentUser = (userData) => {
    setUserData((prevState) => {
      const loggedInUser = { ...prevState };
      loggedInUser.firstName = userData.firstName;
      loggedInUser.lastName = userData.lastName;
      loggedInUser.isConfirmed = userData.isConfirmed;
      loggedInUser.roles = ["User"];
      loggedInUser.avatarUrl = userData.avatarUrl;
      loggedInUser.email = userData.email;
      return loggedInUser;
    });
  };

  const [filteredRoutes, setFilteredRoutes] = useState([]);

  useEffect(() => {
    usersService
      .getCurrentUser()
      .then(onGetCurrentSuccess)
      .catch(onGetCurrentError);
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.roles.length > 0) {
      setFilteredRoutes((prevState) => {
        let filteredRoutes = { ...prevState };
        filteredRoutes = routes.filter((route) =>
          route.roles.some((routeRole) => currentUser.roles.includes(routeRole))
        );
        return filteredRoutes;
      });
    }
  }, [currentUser]);

  const onGetCurrentSuccess = (response) => {
    _logger("onGetCurrentSuccessApp", response);
    usersService
      .getUserById(response)
      .then(onGetUserByIdSuccess)
      .catch(onGetUserByIdError);
  };

  const onGetCurrentError = (error) => {
    console.warn(error);
  };

  const onGetUserByIdSuccess = (response) => {
    _logger("onGetUserByIdSuccessApp", response);
    updateCurrentUser(response);
  };

  const onGetUserByIdError = (error) => {
    _logger("onGetUserByIdError", error);
  };

  return (
    <React.Fragment>
      <SiteNav user={currentUser} />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {filteredRoutes.map((route) => (
            <Route
              path={route.path}
              exact
              roles={route.roles}
              element={<route.element />}
              key={Math.random() * 10000}
            />
          ))}
          <Route
            path="/"
            element={<Home user={currentUser} updateUser={updateCurrentUser} />}
          />
          <Route
            path="/login"
            element={
              <Login user={currentUser} updateUser={updateCurrentUser} />
            }
          />
        </Routes>
      </Suspense>
      <Footer />
    </React.Fragment>
  );
}

export default App;
