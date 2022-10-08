import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Logger from "../Logger";
// import * as Yup from "yup";

function Step1Component(props) {
  console.log("Step1 Component Props", props);
  const { eventData } = props;

  const {
    //   Loki props
    backLabel,
    nextLabel,
    onBack,
    onNext,
    cantBack,
  } = props;

  return (
    <>
      <h1>Step One</h1>
      <Formik
        enableReinitialize={true}
        initialValues={eventData}
        onSubmit={onNext}
        // backLabel={backLabel}
        // nextLabel={nextLabel}
        // validationSchema={basicValidation}
      >
        {(
          { isSubmitting } //dirty, isValid,
        ) => (
          <Form className="my-5">
            <Logger></Logger>
            <div className="form-control px-5 w-500">
              <div className="form-group my-3 px-4">
                <label htmlFor="name">Name</label>
                <Field
                  name="name"
                  type="text"
                  className="form-control my-2"
                  id="name"
                  placeholder="Enter your event name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="form-group my-3 px-4">
                <label htmlFor="headline">Headline</label>
                <Field
                  name="headline"
                  type="url"
                  className="form-control my-2"
                  id="headline"
                  placeholder="Enter an image url"
                />
                <ErrorMessage
                  name="headline"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="form-group my-3 px-4">
                <label htmlFor="description">Description</label>
                <Field
                  name="description"
                  type="text"
                  className="form-control my-2"
                  id="description"
                  placeholder="Enter a description"
                />
                <ErrorMessage
                  name="description"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="form-group my-3 px-4">
                <label htmlFor="summary">Summary</label>
                <Field
                  name="summary"
                  type="text"
                  className="form-control my-2"
                  id="summary"
                  placeholder="Enter a short summary"
                />
                <ErrorMessage
                  name="summary"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="form-group my-3 px-4">
                <label htmlFor="slug">Slug</label>
                <Field
                  name="slug"
                  type="text"
                  className="form-control my-2"
                  id="slug"
                  placeholder="Enter a unique slug"
                />
                <ErrorMessage
                  name="slug"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
            </div>
            <div className="button-group mt-1">
              <button
                type="button"
                className="btn btn-secondary mx-1"
                onClick={onBack}
                disabled={isSubmitting || cantBack}
              >
                {backLabel}
              </button>
              <button
                type="submit"
                className="btn btn-primary ml-1 mx-1"
                disabled={isSubmitting}
              >
                {nextLabel}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default Step1Component;
