import React, { useState } from "react";
import * as emailService from "../services/emailService";
import toastr from "toastr";

function Email() {
  const [email, setEmail] = useState({
    to: [""],
    body: "",
    bcc: "",
    name: "",
  });

  const onFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setEmail((prevState) => {
      let newEmail = { ...prevState };
      newEmail[name] = value;
      return newEmail;
    });
  };

  const onToChange = (e) => {
    const value = e.target.value;

    setEmail((prevState) => {
      let newTo = { ...prevState };
      newTo.to = [`${value}`];
      return newTo;
    });
  };

  const onSendClicked = (e) => {
    console.log("onSendClicked", e);

    emailService.send(email).then(onEmailSuccess).catch(onEmailError);
  };

  const onEmailSuccess = (response) => {
    console.log("onEmailSuccess", response);
    toastr["success"]("Email sent successfully", "Email success!");
  };

  const onEmailError = (error) => {
    console.warn("onEmailError", error);
    toastr["error"](
      "Please confirm your email is correct!",
      "Unable to send email"
    );
  };

  return (
    <>
      <div className="d-flex justify-content-center">
        <form className="form-control my-5 w-100 ">
          <h1 className="text-center">Contact Us</h1>
          <div className="mb-3">
            <label htmlFor="newEmail" className="form-label newEmail">
              Email Address
            </label>
            <input
              name="to"
              className="form-control newEmail"
              type="email"
              onChange={onToChange}
              value={email.to}
              placeholder="Enter email address or addresses you are sending to here"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="body" className="form-label body">
              Message
            </label>
            <input
              name="body"
              className="form-control body"
              type="text"
              onChange={onFormChange}
              value={email.body}
              placeholder="Enter your email message here"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="bcc" className="form-label bcc">
              BCC
            </label>
            <input
              name="bcc"
              className="form-control bcc"
              type="email"
              onChange={onFormChange}
              value={email.bcc}
              placeholder="Enter additional email address for BCC"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="name" className="form-label name">
              From
            </label>
            <input
              name="name"
              className="form-control name"
              type="email"
              onChange={onFormChange}
              value={email.name}
              placeholder="Enter your name here"
            />
          </div>
          <button
            type="button"
            className="btn btn-primary sendEmail"
            onClick={onSendClicked}
          >
            Send Email
          </button>
        </form>
      </div>
    </>
  );
}

export default Email;
