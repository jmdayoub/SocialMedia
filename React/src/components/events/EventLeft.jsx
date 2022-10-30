import React from "react";
// import * as eventsService from "../../services/eventsService";

function EventLeft(props) {
  // console.log("eventLeft props", props.event);
  const eventLeft = props.event;

  return (
    // rendering latest event
    <div className="my-4 text-center justify-content-start">
      <img
        className="card-img-top"
        src={eventLeft.headline}
        height={700}
        style={{ width: 700 }}
        alt="Event Goes Here"
      />
      <div className="card-body my-3" style={{ width: 800 }}>
        <h5 className="card-title">{eventLeft.name}</h5>
        <p className="card-text">{`${new Date(
          eventLeft.dateStart
        ).toDateString()}`}</p>
        <p className="card-text">{eventLeft.summary}</p>
      </div>
    </div>
  );
}

export default EventLeft;
