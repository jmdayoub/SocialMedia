import React from "react";
import Modal from "react-bootstrap/Modal";

const JobModal = (props) => {
  console.log("these are the props on JobModal", props);
  // toggle={props.toggleModal}
  return (
    <React.Fragment>
      <Modal show={props.isOpen}>
        <Modal.Header>Job Info</Modal.Header>
        <Modal.Body>
          <div>
            <strong>Title:</strong> {props.title}
          </div>
          <div>
            <strong>Salary:</strong> {props.pay}
          </div>
          <div>
            <strong>Summary:</strong> {props.summary}
          </div>
          <div>
            <strong>Skills:</strong>
            {props.skills.map((skill) => skill).join(", ")}
          </div>
          <div>
            <strong>Description:</strong> {props.content}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={props.onClose}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};

export default JobModal;
