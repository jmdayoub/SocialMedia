import React from "react";

function CompanyCard(props) {
  // receiving props from Companies page
  // console.log("props on CompCard", props);
  const company = props.company;

  const onEditCompanyClicked = (e) => {
    e.preventDefault();
    props.onEditClicked(company); // coming from company component in mapCompany function on companies page
  };

  return (
    // rendering cards on page
    <div
      className="col-md-3 d-flex justify-content-center"
      key={"CoList-" + company.id}
    >
      <div className="card my-4 text-center" style={{ width: 400 }}>
        <img
          className="card-img-top"
          src={company.imageUrl}
          alt="Tech Company Goes Here"
        />
        <div className="card-body">
          <h5 className="card-title">{company.name}</h5>
          <p className="card-text">{company.headline}</p>
          <p className="card-text">{company.contactInformation}</p>
          <button
            className="btn link-btn btn-warning mx-2"
            onClick={onEditCompanyClicked}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;
