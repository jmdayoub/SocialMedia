import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Logger from "../Logger";

function Step2Component(props) {
  console.log("Props on Step1 Component", props);
  const { eventData } = props;
  // const onFormSubmit = props.onFormSubmit;

  const {
    //   Loki props
    backLabel,
    nextLabel,
    onBack,
    onNext,
    cantBack,
  } = props;

  const handleSubmit = (values) => {
    onNext(values);
  };

  return (
    <>
      <h1>Step Two</h1>
      <Formik
        enableReinitialize={true}
        initialValues={eventData}
        onSubmit={handleSubmit}

        // validationSchema={basicValidation}
      >
        {(
          { isSubmitting } //dirty, isValid,
        ) => (
          <Form className="my-5">
            <Logger></Logger>
            <div className="form-control px-5 w-500">
              <div className="form-group my-3 px-4">
                <label htmlFor="dateStart">Start Date</label>
                <Field
                  name="dateStart"
                  type="datetime-local"
                  className="form-control my-2"
                  id="dateStart"
                />
                <ErrorMessage
                  name="dateEnd"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="form-group my-3 px-4">
                <label htmlFor="dateEnd">End Date</label>
                <Field
                  name="dateEnd"
                  type="datetime-local"
                  className="form-control my-2"
                  id="dateEnd"
                />
                <ErrorMessage
                  name="dateEnd"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="button-group">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={onBack}
                  disabled={isSubmitting || cantBack}
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

export default Step2Component;
