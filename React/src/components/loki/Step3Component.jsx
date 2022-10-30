import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Logger from "../Logger";

function Step3Component(props) {
  console.log("Props on Step1 Component", props);
  const { eventData } = props;

  const {
    //   Loki props
    backLabel,
    nextLabel,
    onBack,
    onNext,
    //   cantBack,
    // onFinish,
  } = props;

  return (
    <>
      <h1>Step Three</h1>
      <Formik
        enableReinitialize={true}
        initialValues={eventData}
        onSubmit={onNext}
        // validationSchema={basicValidation}
      >
        {(
          { isSubmitting } //dirty, isValid,
        ) => (
          <Form className="my-5">
            <Logger></Logger>
            <div className="form-control px-5 w-500">
              <div className="form-group my-3 px-4">
                <label htmlFor="address">Address</label>
                <Field
                  name="address"
                  type="text"
                  className="form-control my-2"
                  id="address"
                  placeholder="Enter event address"
                />
                <ErrorMessage
                  name="address"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="form-group my-3 px-4">
                <label htmlFor="zipCode">Zip Code</label>
                <Field
                  name="zipCode"
                  type="text"
                  className="form-control my-2"
                  id="zipCode"
                  placeholder="Enter event zip code"
                />
                <ErrorMessage
                  name="zipCode"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="button-group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onBack}
                  disabled={isSubmitting}
                >
                  {backLabel}
                </button>
                <button
                  type="submit"
                  className="btn btn-primary ml-1"
                  disabled={isSubmitting}
                >
                  {nextLabel}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Step3Component;
