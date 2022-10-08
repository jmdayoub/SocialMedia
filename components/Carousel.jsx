import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import * as filesService from "../services/filesService";

function MyCarousel() {
  const [images, setImages] = useState({
    files: [],
    fileImages: [],
  });

  const onChange = (e) => {
    const target = e.target.files;

    setImages((prevState) => {
      let newState = { ...prevState };
      newState.files = target;
      return newState;
    });
  };

  const onSubmitClicked = (e) => {
    console.log("onSubmitClicked", e);
    const data = new FormData();
    for (let i = 0; i < images.files.length; i++) {
      data.append("file", images.files[i]);
    }

    filesService.addFile(data).then(onAddFileSuccess).catch(onAddFileError);
  };

  const onAddFileSuccess = (response) => {
    console.log("file array", response);

    let fileArray = response;

    setImages((prevState) => {
      let newImages = { ...prevState };
      newImages.files = fileArray;
      newImages.fileImages = newImages.files.map(mapImage);
      return newImages;
    });
  };

  const onAddFileError = (error) => {
    console.log("onAddFile ERROR", error);
  };

  const mapImage = (image, index) => {
    return (
      <Carousel.Item key={`carousel-item-${index}`}>
        <img
          className="d-block w-100"
          src={image}
          alt="First slide"
          // key={Math.random() * 10000}
        />
      </Carousel.Item>
    );
  };

  return (
    <>
      <Carousel>
        {images.fileImages.length > 1 ? (
          images.fileImages
        ) : (
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://tinyurl.com/dsrnj6r6"
              alt="First slide"
            />
          </Carousel.Item>
        )}
      </Carousel>
      <label htmlFor="fileForm" className="form-label">
        File Upload
      </label>
      <input
        name="fileForm"
        className="form-control fileForm"
        type="file"
        id="fileUpload"
        multiple
        onChange={onChange}
      />
      <button
        type="button"
        className="btn btn-primary fileUpload"
        onClick={onSubmitClicked}
      >
        Upload File
      </button>
    </>
  );
}

export default MyCarousel;
