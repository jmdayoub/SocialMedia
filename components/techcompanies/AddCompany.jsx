import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toastr from "toastr";
import * as techService from "../../services/techService";

function AddCompany() {
  const { state } = useLocation();
  const location = useLocation(); // so we can access location.state.payload from companies page

  const [companyFormData, setCompanyFormData] = useState({
    name: "",
    profile: "",
    summary: "",
    headline: "",
    contactInformation: "",
    slug: "",
    statusId: "1",
    imageTypeId: 5,
    imageUrl: "",
  });

  useEffect(() => {
    if (state?.type === "edit_company" && state?.payload) {
      console.log(
        "putting payload from company card into form via useEffect on AddCompany file",
        location.state
      );
      setCompanyFormData((prevState) => {
        let newFormData = { ...prevState };
        newFormData = location.state.payload;
        return newFormData;
      });
    }
  }, [state]);

  const basicValidation = Yup.object().shape({
    name: Yup.string().min(2).max(120).required("Required"),
    profile: Yup.string().min(2).max(4000).required("Required"),
    summary: Yup.string().min(2).max(255).required("Required"),
    headline: Yup.string().min(2).max(120).required("Required"),
    contactInformation: Yup.string().min(2).max(100).required("Required"),
    slug: Yup.string().min(2).max(100).required("Required"),
    imageUrl: Yup.string().min(2).max(500).required("Required"),
  });

  // const onFormFieldChange = (e) => {
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;
  //   setCompanyFormData((prevState) => {
  //     const newCompanyObj = { ...prevState };
  //     newCompanyObj[name] = value;
  //     return newCompanyObj;
  //   });
  // };

  // const onImageChange = (e) => {
  //   const value = e.target.value;
  //   const name = e.target.name;

  //   setCompanyFormData((prevState) => {
  //     const newImageObj = { ...prevState };
  //     newImageObj.imageUrl[name] = value;
  //     return newImageObj;
  //   });
  // };

  // const onUrlChange = (e) => {
  //   e.preventDefault();
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;

  //   setCompanyFormData((prevState) => {
  //     let newUrls = { ...prevState };
  //     newUrls[name][0] = value;
  //     return newUrls;
  //   });
  // };

  const onAddCompanyClicked = (e) => {
    console.log("add company clicked");
    e.preventDefault();

    if (!companyFormData.id) {
      techService
        .addCompany(companyFormData)
        .then(onAddCompanySuccess)
        .catch(onAddCompanyError);
    } else {
      techService
        .updateCompany(companyFormData.id, companyFormData)
        .then(onUpdateCompanySuccess)
        .catch(onUpdateCompanyError);
    }
  };

  const onAddCompanySuccess = (response) => {
    console.log(response);
    toastr["success"](
      "You have added company successfully",
      "Add company success!"
    );
  };

  const onAddCompanyError = (error) => {
    console.warn(error);
    toastr["error"](
      "Please confirm your information is correct!",
      "Unable to add company"
    );
  };

  const onUpdateCompanySuccess = (response) => {
    console.log(response);

    toastr["success"]("You have edited job successfully", "Edit job success!");
  };

  const onUpdateCompanyError = (error) => {
    console.warn(error);
  };

  return (
    <>
      <h1 className="display-5 fw-bold">
        {companyFormData.id ? "Edit Company" : "Add a Company"}
      </h1>
      <div className="container d-flex justify-content-center ">
        <Formik
          enableReinitialize={true}
          initialValues={companyFormData}
          onSubmit={onAddCompanyClicked}
          validationSchema={basicValidation}
        >
          <Form className="w-50 my-5">
            <div className="form-control px-5 w-500">
              <div className="form-group my-3 px-4">
                <label htmlFor="name">Name</label>
                <Field
                  name="name"
                  type="text"
                  className="form-control my-2"
                  id="name"
                  placeholder="Enter your job name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="profile">Profile</label>
                <Field
                  name="profile"
                  type="text"
                  className="form-control my-2"
                  id="profile"
                  placeholder="Enter your company profile"
                />
                <ErrorMessage
                  name="profile"
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
                  placeholder="Enter a summary"
                />
                <ErrorMessage
                  name="summary"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="form-group my-3 px-4">
                <label htmlFor="headline">Headline</label>
                <Field
                  name="headline"
                  type="text"
                  className="form-control my-2"
                  id="headline"
                  placeholder="Enter a short headline"
                />
                <ErrorMessage
                  name="headline"
                  component="div"
                  style={{ color: "red" }}
                />
              </div>
              <div className="form-group my-3 px-4">
                <label htmlFor="contact">Contact Information</label>
                <Field
                  name="contactInformation"
                  type="contactInformation"
                  className="form-control my-2"
                  id="contactInformation"
                  placeholder="Enter your contact information"
                />
                <ErrorMessage
                  name="contactInformation"
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
                <label htmlFor="primaryImage">Image URL</label>
                <Field
                  name="primaryImage"
                  type="url"
                  className="form-control my-2"
                  id="primaryImage"
                  placeholder="Enter your company image URL"
                />
              </div>
              <div className="d-flex justify-content-center">
                <button
                  onClick={onAddCompanyClicked}
                  type="submit"
                  className="btn btn-primary my-2"
                >
                  {companyFormData.id ? "Edit Job" : "Add Job"}
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

export default AddCompany;
