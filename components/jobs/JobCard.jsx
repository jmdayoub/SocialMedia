import React from "react";
import "./Jobs.css";

function JobCard(props) {
  // console.log("props from Job Card", props);
  const aJob = props.job;

  const onViewMoreClicked = (e) => {
    e.preventDefault();
    props.onViewClicked(props.job);
  };

  const onEditJobClicked = (e) => {
    e.preventDefault();
    props.onEditClicked(aJob); //coming from job component on jobs page
  };

  return (
    <div
      className="col-md-3 d-flex justify-content-center"
      key={"JobsList-" + aJob.id}
    >
      <div className="card my-4 text-center" style={{ width: 400 }}>
        <img
          className="card-img-top"
          src={aJob.techCompany.map((company) => company.imageUrl)}
          alt="Tech Company Goes Here"
        />
        <div className="card-body">
          <h5 className="card-title">{aJob.title}</h5>
          <p className="card-text">{aJob.description}</p>
          <p className="card-text">
            {aJob.skills?.map((skill) => skill?.name).join(", ")}
          </p>
          <button
            className="btn link-btn btn-secondary mx-2"
            onClick={onEditJobClicked}
          >
            Edit
          </button>
          <div className="button-holder">
            <button
              type="button"
              className="btn link-btn btn-success mx-2 my-2"
              onClick={onViewMoreClicked}
            >
              View More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;
