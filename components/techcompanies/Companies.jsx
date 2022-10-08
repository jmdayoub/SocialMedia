import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as techService from "../../services/techService";
import CompanyCard from "./CompanyCard";

function Companies() {
  //JUST NEED CREATE/POST, UPDATE/PUT, AND READ/GET
  const [companyData, setCompanyData] = useState({
    //initial state declaration
    arrayOfCompanies: [],
    companyComponents: [],
  });

  false && console.log("arrayOfCompanies", companyData.arrayOfCompanies);

  useEffect(() => {
    // useEffect fires on page load (invoke getCompanies service call);
    console.log("useEffect firing on Jobs page");
    techService
      .getCompanies(0, 10)
      .then(onGetCompSuccess)
      .catch(onGetCompError);
  }, []);

  const navigate = useNavigate();
  const navigateToEditPage = (company) => {
    console.log("navigate to company page", company, { company });

    const payload = company;
    payload.imageUrl = company.imageUrl;
    payload.contactInformation = company.contactInformation;
    const state = { type: "edit_company", payload: payload };
    navigate(`/techcompanies/${company.id}`, { state: state });
  };

  const onGetCompSuccess = (response) => {
    // onGetCompSuccess, set arrayOfComps equal to response(pagedItems);
    console.log("initial getComp success", response);

    let arrayOfComps = response;
    console.log("arrayOfComp", arrayOfComps);

    setCompanyData((prevState) => {
      // set response into state and map arrayOfComps into companyComponents array
      const cd = { ...prevState };
      cd.arrayOfCompanies = arrayOfComps; // why are we doing this step?
      cd.companyComponents = arrayOfComps.map(mapCompany); // companyComponents is array of actual companyCards
      return cd;
    });
  };

  const onGetCompError = (error) => {
    console.warn(error);
  };

  const mapCompany = (company) => {
    // mapping function (sending each company to CompanyCard component);
    console.log("company mapping", company);

    return (
      <CompanyCard
        company={company}
        key={"CompanyList-" + company.id}
        onEditClicked={navigateToEditPage}
      />
    );
  };

  return (
    <>
      <main role="main">
        <div className="container">
          <div className=" mb-4 bg-light rounded-3">
            <div className="container-fluid py-2">
              <h1>Companies</h1>
              <div className="container-fluid d-flex justify-content-between">
                {
                  <Link
                    to="/techcompanies/addCompany"
                    type="button"
                    className="text-white btn btn-success mx-2"
                  >
                    + Company
                  </Link>
                }
              </div>
            </div>
          </div>
          <div className="row">{companyData.companyComponents}</div>
        </div>
      </main>
    </>
  );
}

export default Companies;
