import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Logger from "../Logger";
import * as Yup from "yup";
import EventsWizard from "../loki/Loki";
// import "node_modules/react-loki/umd/main.css";

function AddEventModal(props) {
  console.log("Props on AddEventModal", props);
  const modalData = props.modalData;

  const onFormSubmit = (values) => {
    console.log("values onModalSubmit", values);

    props.onSubmit(values);
  };

  const basicValidation = Yup.object().shape({
    name: Yup.string().min(2).max(50).required("Required"),
    headline: Yup.string().min(2).max(250).required("Required"),
    description: Yup.string().min(2).max(4000).required("Required"),
    summary: Yup.string().min(2).max(255).required("Required"),
    slug: Yup.string().min(2).max(100).required("Required"),
    address: Yup.string().min(2).max(120).required("Required"),
    zipCode: Yup.string().min(5).max(10).required("Required"),
  });

  console.log("this is my modal data from events main", modalData);

  return (
    <React.Fragment>
      <Modal isOpen={modalData.isOpen} toggle={modalData.toggleModal}>
        <ModalHeader>{modalData.id ? "Edit Event" : "Add Event"}</ModalHeader>

        <Formik
          enableReinitialize={true}
          initialValues={modalData}
          onSubmit={onFormSubmit}
          validationSchema={basicValidation}
        >
          <Form className="my-5">
            <Logger></Logger>
            <ModalBody>
              <div className="form-control px-5 w-500">
                <EventsWizard onSubmit={onFormSubmit} eventData={modalData} />
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
                <div className="form-group my-3 px-4">
                  <label htmlFor="dateStart">Start Date</label>
                  <Field
                    name="dateStart"
                    type="datetime-local"
                    className="form-control my-2"
                    id="dateStart"
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
                </div>
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
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={props.onClose}>
                Close
              </Button>
              <button type="submit" className="btn btn-primary">
                {modalData.id ? "Edit Event" : "Add Event"}
              </button>
            </ModalFooter>
          </Form>
        </Formik>
      </Modal>
    </React.Fragment>
  );
}

export default AddEventModal;
