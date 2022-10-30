import React from "react";
// import {useNavigate} from "react-router-dom";
import "./SiteNav.css";
import { Link, useNavigate } from "react-router-dom";
import usersService from "../services/usersService";
import toastr from "toastr";
import debug from "sabio-debug";

const _logger = debug.extend("SiteNav");

function SiteNav(props) {
  const { user } = props;
  _logger(props);

  const navigate = useNavigate();

  const renderPic = () => {
    return <img className="avatarSiteNav" src={user.avatarUrl} alt="avatar" />;
  };

  const onLogoutClick = () => {
    usersService.logout().then(onLogoutSuccess).catch(onLogoutError);
  };

  const onLogoutSuccess = (response) => {
    _logger(response);
    toastr.success("You have logged in successfully", "Login success!");
    const userLogout = response;
    // props.logout();
    // On success of that AJAX call you have to push to the home page and set state at the app level
    // const userLogout = {
    //   type: "current_user",
    //   payload: {
    //     firstName: "Unknown",
    //     lastName: "User",
    //     roles: [""],
    //     email: "",
    //     isConfirmed: false,
    //     avatarUrl: "",
    //   },
    // };
    const loggedOutUser = { type: "current_user", payload: userLogout };
    navigate("/login", { state: loggedOutUser }); // pushing state back to home via navigate
    //so that the user in state is “logged out” and is set back to the default.
  };

  const onLogoutError = (error) => {
    console.warn(error);
  };

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-md navbar-dark bg-dark"
        aria-label="Fourth navbar example"
      >
        <div className="container">
          <Link to="/" className="navbar-brand">
            <img
              src="https://pw.sabio.la/images/Sabio.png"
              width="30" //use this for card images
              height="30"
              className="d-inline-block align-top"
              alt="Sabio"
            />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarsExample04"
            aria-controls="navbarsExample04"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample04">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item">
                <Link to="/" className="nav-link px-2 text-white link-button">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/friends"
                  className="nav-link px-2 text-white link-button"
                >
                  Friends
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/jobs"
                  className="nav-link px-2 text-white link-button"
                >
                  Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/techcompanies"
                  className="nav-link px-2 text-white link-button"
                >
                  Tech Companies
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/events"
                  className="nav-link px-2 text-white link-button"
                >
                  Events
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/testAndAjax"
                  className="nav-link px-2 text-white link-button"
                >
                  Test and Ajax Call
                </Link>
              </li>
            </ul>
            <div className="text-end">
              {user?.isConfirmed && user?.avatarUrl && renderPic()}
              {/* if there's a user value, check for isLoggedIn*/}
              <Link
                to="/"
                className="align-items-center mb-2 me-2 mb-lg-0 text-white text-decoration-none"
              >
                {user.firstName} {user.lastName}
              </Link>
              {user.isConfirmed ? (
                <Link
                  to="/login"
                  type="button"
                  className="btn btn-outline-light me-2"
                  onClick={onLogoutClick}
                >
                  Logout
                </Link>
              ) : (
                <Link
                  to="/login"
                  type="button"
                  className="btn btn-outline-light me-2"
                >
                  Login
                </Link>
              )}
              {!user.isConfirmed && (
                <Link to="/register" type="button" className="btn btn-warning">
                  Register
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </React.Fragment>
  );
}

export default SiteNav;
