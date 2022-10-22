import React, { useEffect, useState } from "react";
import JobModal from "./JobModal";
import JobCard from "./JobCard";
import { Link, useNavigate } from "react-router-dom";
import * as jobsService from "../../services/jobsService";
import "./Jobs.css";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";

function Jobs() {
  //#region DECLARING STATE INITIALLY
  const [jobData, setJobData] = useState({
    // send jobData.arrayOfJobs to addJob page
    arrayOfJobs: [],
    jobComponents: [],
    pageIndex: 0,
    pageSize: 4,
    totalJobs: 10,
    current: 1,
    result: false,
  });

  const [modalData, setModalState] = useState({
    isOpen: false,
    title: "",
    description: "",
    summary: "",
    pay: "",
    skills: [],
  });

  const [query, setSearchFormData] = useState({
    searchQuery: "",
  });

  false && console.log("arrayOfJobs", jobData.arrayOfJobs);

  //#endregion

  //#region USE EFFECT for INITIAL getPAGE
  useEffect(() => {
    console.log("useEffect firing");
    jobsService.getPage(0, 4).then(onGetPageSuccess).catch(onGetPageError);
  }, []);

  useEffect(() => {
    //useEffect for PAGINATION
    // if we want something to run (ex. on start-up, etc) or change automatically -- add dependancies if applicable inside of array brackets (ex. state, etc);
    // if setting state inside of useEffect, do not put that same piece of state inside of dependancy array, or you will die.
    console.log("firing useEffect for getPage");
    jobsService
      .getPage(jobData.pageIndex, jobData.pageSize)
      .then(onGetPageSuccess)
      .catch(onGetPageError);
  }, [jobData.current, jobData.pageSize]);

  //#endregion

  //#region MODAL
  const onViewClicked = (job) => {
    console.log("view clicker", job);

    setModalState((prevState) => {
      let md = { ...prevState };
      md = job;
      console.log("9/9", job);
      md.isOpen = !prevState.isOpen;
      md.skills = job.skills?.map((skill) => skill?.name);
      return md;
    });
  };

  const onCloseClicked = () => {
    // needed separate click function for close button in order to avoid undefined error (it was trying to run my onViewClicked function twice)
    setModalState((prevState) => {
      const closeModal = { ...prevState };
      closeModal.isOpen = !prevState.isOpen;
      return closeModal;
    });
  };
  //#endregion

  //#region NAVIGATE TO FORM PAGE WITH JOB INFO via useNavigate
  const navigate = useNavigate();
  const navigateToEditPage = (job) => {
    console.log("navigate job fire", job, { job });

    const payload = job;
    payload.primaryImage = job.techCompany.map((company) => company.imageUrl);
    // payload.techCompanyId = Number(job.techCompany.id);
    payload.skills = job.skills?.map((skill) => skill?.name);

    const state = { type: "edit_job", payload }; //type must match on the other side(addJob)

    navigate(`/jobs/${job.id}`, { state }); //retrieve on the other side(addJob) with useLocation
  };

  //#endregion

  //#region FORM FIELD CHANGE HANDLER
  const onFormFieldChange = (event) => {
    const target = event.target;
    const value = target.value;
    const inputField = target.name;

    setSearchFormData((prevState) => {
      const newSearchObject = {
        ...prevState,
      };
      newSearchObject[inputField] = value;
      return newSearchObject;
    });
  };
  //#endregion

  //#region TOGGLE JOBS
  const toggleClicked = () => {
    // toggles show jobs
    // conditional rendering -- based on whether button is clicked -- need to flip the result(boolean) inside of setState(setIsShown) function
    setJobData((prevState) => {
      // updater function

      const newPd = { ...prevState };
      newPd.result = !prevState.result;
      console.log("toggle clicked:", "isShown.result >>", newPd.result);
      return newPd;
    });
  };
  //#endregion

  //#region PAGINATION
  const onGetPageSuccess = (data) => {
    console.log("onGetPageSuccess", data);
    // let skills = data.item.pagedItems.map((item) =>
    //   item.skills.map((skill) => skill.name)
    // );
    // for (let i = 0; i < data.item.pagedItems.length; i++) {
    //   let currentItem = data.item.pagedItems[i];
    //   currentItem = skills[i];
    //   console.log("this be a skill", currentItem);
    // }
    // console.log(
    //   "this be da mapped skills log",
    //   data.item.pagedItems.map((item) => item.skills)
    // );
    let arrayOfJbs = data.item.pagedItems;
    // let job = data.item; // this is so we can access the totalCount
    console.log("arrayOfJbs", arrayOfJbs);

    setJobData((prevState) => {
      const jd = { ...prevState };
      jd.arrayOfJobs = arrayOfJbs;
      jd.jobComponents = arrayOfJbs.map(mapJob);
      // jd.totalCount = item.totalCount;
      return jd;
    });
  };

  const onGetPageError = (error) => {
    console.warn("onGetPageError jobs", error);
  };

  const onPageChange = (pageNumber) => {
    console.log("page clicked", pageNumber);

    setJobData((prevState) => {
      const newPage = { ...prevState };
      newPage.current = pageNumber;
      newPage.pageIndex = newPage.current - 1;
      console.log("pageIndex", newPage.pageIndex);
      return newPage;
    });
  };
  //#endregion

  //#region SEARCH
  const onSearchClicked = (e) => {
    e.preventDefault();
    console.log("search clicked");
    jobsService
      .searchJobs(0, 10, query.searchQuery)
      .then(onSearchSuccess)
      .catch(onSearchError);
  };

  const onSearchSuccess = (data) => {
    console.log("onSearchSuccess", data.item.pagedItems);
    let queriedJobs = data.item.pagedItems;
    console.log("queried Jobs", queriedJobs);

    setJobData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfJobs = queriedJobs;
      pd.jobComponents = queriedJobs.map(mapJob);
      return pd;
    });
  };

  const onSearchError = (error) => {
    console.log("onSearchError", error);
  };
  //#endregion

  //#region MAPPING JOB AND RENDERING JOB CARD
  const mapJob = (aJob) => {
    console.log("job mapping", aJob);

    return (
      <JobCard
        job={aJob}
        key={"JobsList-" + aJob.id}
        onViewClicked={onViewClicked} // going to Job Card
        onEditClicked={navigateToEditPage} // going to Job Card
      />
    );
  };
  //#endregion

  //#region RENDER/RETURN JSX
  return (
    <>
      <main role="main">
        <div className="container">
          <div className=" mb-4 bg-light rounded-3">
            <div className="container-fluid py-2">
              <h1>Jobs</h1>
              <div className="container-fluid d-flex justify-content-between">
                <button className="btn btn-warning" onClick={toggleClicked}>
                  {jobData.result ? "Hide Jobs" : "Show Jobs"}
                </button>
                {
                  <Link
                    to="/jobs/addJob"
                    type="button"
                    className="text-white btn btn-success mx-2"
                    // onClick={onAddJobClicked}
                  >
                    + Job
                  </Link>
                }
                <div className="input-group w-25">
                  <input
                    type="search"
                    name="searchQuery"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    onChange={onFormFieldChange}
                  />
                  <button
                    type="button"
                    className="btn btn-primary bg-white text-black"
                    onClick={onSearchClicked}
                  >
                    Find Job
                  </button>
                </div>
              </div>
            </div>
            {/* <div className="container-fluid py-2 search">
            
          </div> */}
          </div>
          <div className="d-flex justify-content-center">
            <Pagination
              onChange={onPageChange}
              pageIndex={jobData.pageIndex}
              pageSize={jobData.pageSize}
              current={jobData.current}
              total={jobData.totalJobs}
              locale={locale}
            />
          </div>
          <div className="row">
            {jobData.result && jobData.jobComponents}{" "}
            {/* part of toggle -- conditional rendering */}
            {/* (if this part is true) && (this part will execute) */}
          </div>
          <JobModal
            isOpen={modalData.isOpen}
            toggleModal={onViewClicked}
            onClose={onCloseClicked}
            title={modalData.title}
            pay={modalData.pay}
            summary={modalData.summary}
            skills={modalData.skills}
            content={modalData.description}
            key={"JobsList-" + modalData.id}
          >
            Job Information
          </JobModal>
        </div>
        <div className="d-flex justify-content-center">
          <Pagination
            onChange={onPageChange}
            pageIndex={jobData.pageIndex}
            pageSize={jobData.pageSize}
            current={jobData.current}
            total={jobData.totalJobs}
            locale={locale}
          />
        </div>
      </main>
    </>
  );
  //#endregion
}

export default Jobs;
