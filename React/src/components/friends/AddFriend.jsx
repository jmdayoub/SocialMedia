import React, { useState, useEffect } from "react";
import { Formik, Form, Field, FieldArray, ErrorMessage } from "formik";
import { useLocation } from "react-router-dom";
import toastr from "toastr";
import * as friendsService from "../../services/friendsService";

function AddFriend() {
  const [addFriendFormData, setAddFriendFormData] = useState({
    title: "",
    bio: "",
    summary: "",
    headline: "",
    slug: "",
    statusId: 1,
    skills: [""],
    imageTypeId: 2,
    imageUrl: "",
    id: "",
  });

  // useLocation -- gives you access to the location object
  const { state } = useLocation(); // destructuring state so we can say state.payload, etc. below - digging down a layer into the location object
  const location = useLocation();
  // console.log(location);

  // const { friendId } = useParams();

  useEffect(() => {
    // useEffect / useCallback ALWAYS HAVE A DEPENDENCY ARRAY
    console.log("useEffect firing");

    if (state?.type === "EDIT_FRIEND" && state?.payload) {
      console.log("friend id change firing");
      setAddFriendFormData((prevState) => {
        let formData = { ...prevState };
        formData = location.state.payload;

        const skillsReceived = formData.skills?.map((skill) => skill?.name);
        formData.skills = skillsReceived;

        formData.imageUrl = formData.primaryImage.imageUrl;
        formData.imageTypeId = formData.primaryImage.imageTypeId;
        if (formData.primaryImage) {
          delete formData.primaryImage;
        }
        return formData;
      });
    }
  }, [state]);

  // const onSkillsChange = (e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;

  //   setAddFriendFormData((prevState) => {
  //     let newSkills = { ...prevState };
  //     newSkills[name] = value.split(",");
  //     console.log("skills value", newSkills[name]);
  //     return newSkills;
  //   });
  // };

  const onAddFriendClicked = (values) => {
    console.log("add friend clicked", values);

    if (!addFriendFormData.id) {
      friendsService
        .addFriend(values)
        .then(onAddFriendSuccess)
        .catch(onAddFriendError);
    } else {
      friendsService
        .updateFriend(addFriendFormData.id, values)
        .then(onUpdateFriendSuccess)
        .catch(onUpdateFriendError);
    }
  };

  // const onFormFieldChange = (event) => {
  //   // console.log({ syntheticEvent: event });

  //   //capture info you need from event here as the event object will fall out of scope quickly
  //   const target = event.target;
  //   const value = target.value;
  //   const inputField = target.name;

  //   //set the new state using the old property name / object key and using the new value for formData
  //   setAddFriendFormData((prevState) => {
  //     // copy the personData object from state using the spread operator
  //     const newFriendObject = {
  //       ...prevState,
  //     };
  //     // if (inputField === "imageUrl") {
  //     // newFriendObject.primaryImage[inputField] = value;
  //     // } else {
  //     //change the value of the copied object using the name and using bracket notation
  //     newFriendObject[inputField] = value;
  //     // }

  //     //in functional components the name of this object/variable does not matter
  //     return newFriendObject;
  //   });
  // };

  const onAddFriendSuccess = (response) => {
    console.log(response);
    toastr["success"](
      "You have registered successfully",
      "Registration success!"
    );

    const friendId = response.id;

    setAddFriendFormData((prevState) => {
      const addData = { ...prevState };
      addData.id = friendId;
      console.log(addData.id);
      return addData;
    });
  };

  const onAddFriendError = (error) => {
    console.warn(error);
    toastr["error"](
      "Please confirm your information is correct!",
      "Unable to register"
    );
  };

  const onUpdateFriendSuccess = (response) => {
    console.log(response);
  };

  const onUpdateFriendError = (error) => {
    console.warn(error);
  };

  return (
    <>
      <h1 className="display-5 fw-bold">
        {addFriendFormData.id ? "Edit Friend" : "Add a Friend"}
      </h1>
      <div className="container d-flex justify-content-center ">
        <Formik
          enableReinitialize={true}
          initialValues={addFriendFormData}
          onSubmit={onAddFriendClicked}
        >
          {({ values }) => (
            <Form className="w-50 my-5">
              <div className="form-control px-5 w-500">
                <div className="form-group my-3 px-4">
                  <label htmlFor="title">Title</label>
                  <Field
                    name="title"
                    type="title"
                    className="form-control my-2"
                    id="title"
                    placeholder="Enter your friend's name"
                  />
                </div>
                <div className="form-group my-3 px-4">
                  <label htmlFor="bio">Bio</label>
                  <Field
                    name="bio"
                    type="text"
                    className="form-control my-2"
                    id="bio"
                    placeholder="Enter a bio"
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
                    // value={addFriendFormData.summary}
                    // onChange={onFormFieldChange}
                  />
                </div>
                <div className="form-group my-3 px-4">
                  <label htmlFor="headline">Headline</label>
                  <Field
                    name="headline"
                    type="headline"
                    className="form-control my-2"
                    id="headline"
                    placeholder="Enter a headline"
                    // value={addFriendFormData.headline}
                    // onChange={onFormFieldChange}
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
                    // value={addFriendFormData.slug}
                    // onChange={onFormFieldChange}
                  />
                </div>
                {/* <h4><FieldArray></h4> */}
                <div className="form-group my-3 px-4">
                  <label htmlFor="skills">Skills</label>
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
                          values.skills.map((_skill, index) => (
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
                <div className="form-group my-3 px-4">
                  <label htmlFor="primaryImage">Image URL</label>
                  <Field
                    name="imageUrl"
                    type="url"
                    className="form-control my-2"
                    id="primaryImage"
                    // value={addFriendFormData.imageUrl}
                    placeholder="Enter your profile URL"
                    // onChange={onFormFieldChange}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    // onClick={onAddFriendClicked}
                    type="submit"
                    className="btn btn-primary my-2"
                  >
                    {/* Add Friend */}
                    {addFriendFormData.id ? "Edit Friend" : "Add Friend"}
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

export default AddFriend;
