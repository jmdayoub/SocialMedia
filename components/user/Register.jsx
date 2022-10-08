import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import usersService from "../../services/usersService";
import toastr from "toastr";
import debug from "sabio-debug";

const _logger = debug.extend("Register");

function Register() {
  const [registerFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    passwordConfirm: "",
    avatarUrl: "",
    tenantId: "U03NCNQ6QAX",
  });

  // const onFormFieldChange = (event) => {
  //   _logger({ syntheticEvent: event });

  //   //capture info you need from event here as the event object will fall out of scope quickly
  //   const target = event.target;
  //   const value = target.value;
  //   const name = target.name;

  //   //set the new state using the old property name / object key and using the new value for formData
  //   setRegisterFormData((prevState) => {
  //     // copy the personData object from state using the spread operator
  //     const newRegisterObject = { ...prevState }; // <<< THIS IS A COPY OF THE PREVIOUS STATE

  //     //change the value of the copied object using the name and using bracket notation
  //     newRegisterObject[name] = value;

  //     //in functional components the name of this object/variable does not matter
  //     return newRegisterObject;
  //   });
  // };

  const onRegisterClicked = (values) => {
    // use values as parameter and pass as payload for POST/PUT
    _logger("register clicked", values);
    // e.preventDefault(); // NEVER USE e.preventDefault with Formik
    usersService
      .registerUser(values)
      .then(onRegisterUserSuccess)
      .catch(onRegisterUserError);
  };

  const onRegisterUserSuccess = (response) => {
    _logger(response);
    toastr["success"](
      "You have registered successfully",
      "Registration success!"
    );
  };

  const onRegisterUserError = (error) => {
    console.warn(error);
    toastr["error"](
      "Please confirm your information is correct!",
      "Unable to register"
    );
  };

  return (
    <>
      <h1 className="display-5 fw-bold">Register</h1>
      <div className="container d-flex justify-content-center">
        <Formik
          enableReinitialize={true}
          initialValues={registerFormData}
          onSubmit={onRegisterClicked}
        >
          <Form>
            <div className="form-control px-5">
              <div className="form-group my-3">
                <label htmlFor="email">Email address</label>
                <Field
                  name="email"
                  type="email"
                  className="form-control my-2"
                  id="email"
                  aria-describedby="emailHelp"
                  autoComplete="email"
                  placeholder="Enter a valid email"
                  // value={registerFormData.email}
                  // onChange={onFormFieldChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className="form-group my-3">
                <label htmlFor="firstName">First Name</label>
                <Field
                  name="firstName"
                  type="text"
                  className="form-control my-2"
                  id="firstName"
                  placeholder="Enter your first name"
                  // value={registerFormData.firstName}
                  // onChange={onFormFieldChange}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  name="lastName"
                  type="text"
                  className="form-control my-2"
                  id="lastName"
                  placeholder="Enter your last name"
                  // value={registerFormData.lastName}
                  // onChange={onFormFieldChange}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control my-2"
                  id="password"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  // value={registerFormData.password}
                  // onChange={onFormFieldChange}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="password">Confirm Password</label>
                <Field
                  name="passwordConfirm"
                  type="password"
                  className="form-control my-2"
                  id="passwordConfirm"
                  placeholder="Confirm password"
                  autoComplete="new-password"
                  // value={registerFormData.passwordConfirm}
                  // onChange={onFormFieldChange}
                />
              </div>
              <div className="form-group my-3">
                <label htmlFor="avatarUrl">Avatar URL</label>
                <Field
                  name="avatarUrl"
                  type="text"
                  className="form-control my-2"
                  id="avatarUrl"
                  placeholder="Enter your profile URL"
                  // value={registerFormData.avatarUrl}
                  // onChange={onFormFieldChange}
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  // onClick={onRegisterClicked}
                  type="submit"
                  className="btn btn-primary my-2"
                >
                  Register
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default Register;
