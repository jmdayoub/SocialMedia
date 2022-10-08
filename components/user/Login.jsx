import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import usersService from "../../services/usersService";
import toastr from "toastr";
import debug from "sabio-debug";
import * as Yup from "yup";

const _logger = debug.extend("Login");

function Login(props) {
  const location = useLocation();
  const { state } = useLocation();

  const [loginFormData] = useState({
    email: "",
    password: "",
    roles: [""],
    tenantId: "U03NCNQ6QAX",
  });

  // const location = useLocation();
  const navigate = useNavigate(); // used to send state data to other components

  // const onLoginFormChange = (event) => {
  //   _logger("event", event);
  //   const target = event.target;
  //   const value = target.value;
  //   const inputFormField = target.name; // this comes from the name attribute of the input field

  //   setLoginFormData((prevState) => {
  //     const loginObject = {
  //       ...prevState,
  //     };

  //     loginObject[inputFormField] = value;

  //     return loginObject;
  //   });
  // };

  const basicValidation = Yup.object().shape({
    email: Yup.string().min(2).max(100).required("Email is required"),
    password: Yup.string().min(2).max(64).required("Password is required"),
  });

  const onLoginClicked = (values) => {
    _logger("login was clicked", values);
    usersService.login(values).then(onLoginSuccess).catch(onLoginError);
  };

  const onLoginSuccess = (response) => {
    _logger("login success", response);
    toastr.success("You have logged in successfully", "Login success!");

    // get current user on login success
    usersService
      .getCurrentUser()
      .then(onGetCurrentSuccess)
      .catch(onGetCurrentError);
  };

  const onLoginError = (error) => {
    _logger("login error", error);
    toastr.error("Please verify your information!", "Unsuccessful login");
  };

  useEffect(() => {
    if (state?.type === "current_user" && state?.payload) {
      props.updateUser(location.state.payload);
    }
  }, [state]);

  const onGetCurrentSuccess = (response) => {
    _logger("onGetCurrentSuccess", response);
    // get user id on get current user success
    usersService
      .getUserById(response)
      .then(onGetUserByIdSuccess)
      .catch(onGetUserByIdError);
  };

  const onGetCurrentError = (error) => {
    _logger(error);
  };

  const onGetUserByIdSuccess = (response) => {
    _logger("onGetUserByIdSuccess", response);
    const currentUser = response;
    // At this point you set the user into state.
    const userToTransfer = { type: "current_user", payload: currentUser };
    navigate("/", { state: userToTransfer }); // sending state to home page
  };

  const onGetUserByIdError = (error) => {
    _logger("onGetUserByIdError", error);
  };

  return (
    <>
      <h1 className="display-5 fw-bold">Login</h1>
      <div className="container d-flex justify-content-center">
        <Formik
          enableReinitialize={true}
          initialValues={loginFormData}
          onSubmit={onLoginClicked}
          validationSchema={basicValidation}
        >
          {({ dirty, isValid }) => (
            <Form>
              <div className="form-control px-5">
                <div className="form-group my-3 px-4">
                  <label htmlFor="email">Email address</label>
                  <Field
                    name="email"
                    type="email"
                    className="form-control my-2"
                    id="email"
                    autoComplete="email"
                    aria-describedby="emailHelp"
                    placeholder="Enter a valid email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    style={{ color: "red" }}
                  />
                  <small
                    id="emailHelp"
                    className="form-text text-muted"
                  ></small>
                </div>
                <div className="form-group my-3 px-4">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="form-control my-2"
                    id="password"
                    placeholder="Enter your Password"
                    autoComplete="current-password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary my-2"
                    disabled={!isValid || !dirty}
                  >
                    Sign-In
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default Login;
