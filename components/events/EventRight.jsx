import React from "react";

function EventRight(props) {
  console.log("props in event right file", props);
  const eventRight = props.event;

  const onViewMoreClicked = () => {
    console.log("onViewMoreClicked EventRight");
    // e.preventDefault();
    props.onViewClicked(eventRight);
  };

  const onEditClicked = () => {
    console.log("onEditClicked Show Modal");
    // e.preventDefault();
    props.onEditClicked(eventRight);
  };

  return (
    <>
      <div className="d-flex">
        <div
          className="card my-4 text-center justify-content-end"
          style={{ width: 400 }}
        >
          <div className="card-body">
            <img
              className="card-img-top"
              src={eventRight.headline}
              height={25}
              style={{ width: 300 }}
              alt="Event Goes Here"
            />
            <h5 className="card-title">{eventRight.name}</h5>
            <p className="card-text">{`${
              new Date(eventRight.dateStart).toISOString().split("T")[0]
            }`}</p>
            <p className="card-text">{eventRight.summary}</p>
            <button
              className="link-btn btn-secondary mx-2"
              onClick={onViewMoreClicked}
            >
              View More
            </button>
            <button
              className="link-btn btn-secondary mx-2"
              onClick={onEditClicked}
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default EventRight;
