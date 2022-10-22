import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MyCarousel from "./Carousel";
import debug from "sabio-debug";
import PropTypes from "prop-types";

const _logger = debug.extend("Home");

function Home(props) {
  _logger("Home page props", props);
  const location = useLocation();
  const { state } = useLocation();

  // _logger(location);

  useEffect(() => {
    // similar to startUp function
    //accepting updateUser function from APP component
    if (state?.type === "current_user" && state?.payload) {
      //using the opt chaining operator to prevent React from looking for an object property that isn't there
      props.updateUser(location.state.payload);
    }
  }, [state]);

  return (
    <React.Fragment>
      <main role="main">
        <div className="container">
          <div className="p-5 mb-4 bg-light rounded-3">
            <div className="container-fluid py-5">
              <h1 className="display-5 fw-bold">
                Hello, {props.user?.firstName} {props.user?.lastName}
              </h1>
            </div>
          </div>
          <hr />
        </div>
      </main>
      <MyCarousel key={Math.random() * 10000}></MyCarousel>
    </React.Fragment>
  );
}

Home.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    isConfirmed: PropTypes.bool.isRequired,
    roles: PropTypes.arrayOf(PropTypes.string.isRequired),
  }),
};

export default Home;
