import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
// import * as Yup from "yup";
import LokiEvents from "../loki/LokiEvents";
// import "node_modules/react-loki/umd/main.css";

function AddEventModal(props) {
  console.log("Props on AddEventModal", props);
  const { eventData } = props;
  const { onSubmit } = props;
  const { setEvent } = props;

  // const basicValidation = Yup.object().shape({
  //   name: Yup.string().min(2).max(50).required("Required"),
  //   headline: Yup.string().min(2).max(250).required("Required"),
  //   description: Yup.string().min(2).max(4000).required("Required"),
  //   summary: Yup.string().min(2).max(255).required("Required"),
  //   slug: Yup.string().min(2).max(100).required("Required"),
  //   address: Yup.string().min(2).max(120).required("Required"),
  //   zipCode: Yup.string().min(5).max(10).required("Required"),
  // });

  console.log("this is my modal data from events main", eventData);

  return (
    <React.Fragment>
      <Modal isOpen={eventData.isOpen} toggle={eventData.toggleModal}>
        <ModalHeader>{eventData.id ? "Edit Event" : "Add Event"}</ModalHeader>
        <ModalBody>
          <LokiEvents
            setEvent={setEvent}
            onSubmit={onSubmit}
            eventData={eventData}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={props.onClose}>
            Close
          </Button>
          {/* <button type="submit" className="btn btn-primary">
                {modalData.id ? "Edit Event" : "Add Event"}
              </button> */}
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default AddEventModal;
