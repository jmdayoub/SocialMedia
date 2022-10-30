import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useLocation } from "react-router-dom";
import toastr from "toastr";
import * as jobsService from "../../services/jobsService";
import * as techService from "../../services/techService";
import * as Yup from "yup";

function AddJob() {
  //#region DECLARING STATE INITIALLY
  const [addJobFormData, setAddJobFormData] = useState({
    title: "",
    description: "",
    summary: "",
    pay: "",
    slug: "",
    statusId: "1",
    techCompanyId: 1,
    skills: [""],
  });

  console.log("from addJobData initial state", addJobFormData);

  const [techCompanyOptions, setTechCompanyOptions] = useState({
    options: [],
  });

  //#endregion

  const basicValidation = Yup.object().shape({
    title: Yup.string().min(2).max(50).required("Title is required"),
    techCompanyId: Yup.number()
      .min(1)
      .max(3000)
      .required("TechCompanyId is required"),
    description: Yup.string()
      .min(2)
      .max(4000)
      .required("Description is required"),
    summary: Yup.string().min(2).max(255).required("Summary is required"),
    pay: Yup.string().min(2).max(100).required("Pay is required"),
    slug: Yup.string().min(2).max(120).required("Slug is required"),
    skills: Yup.array()
      .of(Yup.string().min(2).max(50).required("Add at least two skills"))
      .required("Please add at least two friends")
      .min(2),
  });

  //#region FORM CHANGE HANDLER
  // const onFormFieldChange = (event) => {
  //   //capture info you need from event here as the event object will fall out of scope quickly
  //   const target = event.target;
  //   const value = target.value;
  //   const inputField = target.name;
  //   setAddJobFormData((prevState) => {
  //     const newJobObject = {
  //       ...prevState,
  //     };
  //     newJobObject[inputField] = value;
  //     return newJobObject;
  //   });
  // };
  //#endregion

  // const onDropdownChange = (e) => {
  //   const target = e.target;
  //   const value = target.value;
  //   const selectOption = target.name;

  //   setAddJobFormData((prevState) => {
  //     const newDropdownData = { ...prevState };
  //     newDropdownData[selectOption] = value;
  //     newDropdownData.techCompanyId = value;
  //     return newDropdownData;
  //   });
  // };

  const { state } = useLocation();
  const location = useLocation();

  useEffect(() => {
    // THIS IS FOR GETTING TECH COMPANIES FOR DROPDOWN MENU
    // do axios call here to getTechCompanies, then on getCompany success, setter function and mapTechCompanyOptions
    techService
      .getCompanies(0, 10)
      .then(onGetCompaniesSuccess)
      .catch(onGetCompaniesError);
  }, []);

  //#region useEffect (recieving job card payload and setting into state(formData)
  useEffect(() => {
    if (state?.type === "edit_job" && state?.payload) {
      console.log(
        "putting payload from job card into form via useEffect on AddJob"
      );
      setAddJobFormData((prevState) => {
        let formData = { ...prevState };
        formData = location.state.payload;
        formData.techCompanyId = formData.techCompany[0].id;
        return formData;
      });
    }
  }, [state]);
  //#endregion

  const onGetCompaniesSuccess = (response) => {
    console.log("getCompaniesSuccess on AddJob file", response);
    setTechCompanyOptions((prevState) => {
      let techCos = { ...prevState };
      techCos = response;
      techCos.options = techCos.map(mapTechCompanyOptions);
      console.log("TECH", techCos.options);
      return techCos;
    });
  };

  const onGetCompaniesError = (error) => {
    console.log("getCompaniesError", error);
  };

  const mapTechCompanyOptions = (techCompany) => {
    console.log("mapTechCompanyOptions", techCompany);
    return (
      <option value={techCompany.id} key={techCompany.id}>
        {techCompany.name}
      </option>
    );
  };

  // const onSkillsChange = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;

  //   setAddJobFormData((prevState) => {
  //     let newSkills = { ...prevState };
  //     newSkills[name] = [`${value}`];
  //     console.log("skills value", newSkills[name]);
  //     return newSkills;
  //   });
  // };

  //#region ADD/UPDATE JOB WHEN CLICKED
  const onAddJobClicked = (values) => {
    console.log("add job clicked");
    // e.preventDefault();

    if (!addJobFormData.id) {
      jobsService.addJob(values).then(onAddJobSuccess).catch(onAddJobError);
    } else {
      jobsService
        .updateJob(addJobFormData.id, values)
        .then(onUpdateJobSuccess)
        .catch(onUpdateJobError);
    }
  };

  const onAddJobSuccess = (response) => {
    console.log(response);
    toastr["success"]("You have created job successfully", "Success!");

    const jobId = response.id;

    setAddJobFormData((prevState) => {
      const addData = { ...prevState };
      addData.id = jobId;
      console.log(addData.id);
      return addData;
    });
  };

  const onAddJobError = (error) => {
    console.warn(error);
    toastr["error"](
      "Please confirm your information is correct!",
      "Unable to register"
    );
  };

  const onUpdateJobSuccess = (response) => {
    console.log(response);

    toastr["success"]("You have edited job successfully", "Edit job success!");
  };

  const onUpdateJobError = (error) => {
    console.warn(error);
  };

  //#endregion

  return (
    <>
      <h1 className="display-5 fw-bold">
        {addJobFormData.id ? "Edit Job" : "Add a Job"}
      </h1>
      <div className="container d-flex justify-content-center ">
        <Formik
          enableReinitialize={true}
          initialValues={addJobFormData}
          onSubmit={onAddJobClicked}
          validationSchema={basicValidation}
        >
          {({ values }) => (
            <Form className="w-50 my-5">
              <div className="form-control px-5 w-500">
                <div className="form-group my-3 px-4">
                  <label htmlFor="title">Title</label>
                  <Field
                    name="title"
                    type="text"
                    className="form-control my-2"
                    id="title"
                    placeholder="Enter your job name"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="col-md-12">
                  <label htmlFor="techCompanyId">Tech Company</label>
                  <Field
                    component="select"
                    className="form-control"
                    aria-label="Default select example"
                    name="techCompanyId"
                    style={{ appearance: "menulist" }}
                  >
                    <option value="Please select a tech company">
                      Please select a tech company
                    </option>
                    {techCompanyOptions.options.length >= 1 &&
                      techCompanyOptions.options}
                  </Field>
                  <ErrorMessage
                    name="techCompanyId"
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
                  <label htmlFor="pay">Pay</label>
                  <Field
                    name="pay"
                    type="pay"
                    className="form-control my-2"
                    id="pay"
                    placeholder="Enter a pay"
                  />
                  <ErrorMessage
                    name="pay"
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
                    placeholder="Enter a slug"
                  />
                  <ErrorMessage
                    name="slug"
                    component="div"
                    style={{ color: "red" }}
                  />
                </div>
                <div className="form-group my-3 px-4">
                  <label htmlFor="skills">Skills</label>
                  <div className="form-group my-3 px-4">
                    <FieldArray name="skills">
                      {({ push, remove }) => (
                        <div>
                          <button
                            className="btn btn-primary"
                            type="button"
                            onClick={() => push("")}
                          >
                            Add Skill
                          </button>
                          {values.skills &&
                            values.skills.map((skill, index) => (
                              <div
                                className="row mt-2"
                                key={index}
                                style={{ width: "100" }}
                              >
                                <div className="col-8">
                                  <Field
                                    name={`skills.${index}`}
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter a required skill"
                                  />
                                  <ErrorMessage
                                    name={`skills.${index}`}
                                    component="div"
                                    style={{
                                      color: "red",
                                      width: "50%",
                                    }}
                                  />
                                </div>
                                <div className="col">
                                  <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={() => {
                                      remove(index);
                                    }}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </FieldArray>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    onClick={onAddJobClicked}
                    type="submit"
                    className="btn btn-primary my-2"
                  >
                    {addJobFormData.id ? "Edit Job" : "Add Job"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

export default AddJob;
