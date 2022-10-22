import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import * as eventsService from "../../services/eventsService";
import EventLeft from "./EventLeft";
import EventRight from "./EventRight";
import AddEventModal from "./AddEventModal";
import "./Events.css";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import toastr from "toastr";
import MapComponent from "./MapComponent";
import BigMap from "./BigMap";
import { Wrapper } from "@googlemaps/react-wrapper";
import Email from "../Email";
import Geocode from "react-geocode"; // USE FOR SUBMIT/POST
import debug from "sabio-debug";

const _logger = debug.extend("Events");

function Events() {
  //JUST NEED CREATE/POST, UPDATE/PUT, AND READ/GET
  const [eventLeftState, setEventLeftState] = useState({});

  const [eventRightState, setEventRightState] = useState({
    arrayOfEvents: [],
    eventComponents: [],
    pageIndex: 0,
    pageSize: 2,
    totalEvents: 10,
    current: 1,
  });

  const [searchDates, setSearchFormData] = useState({
    dateStart: "",
    dateEnd: "",
  });

  const [modalData, setModalData] = useState({
    isOpen: false,
  });

  const [allEvents, setAllEventState] = useState({
    total: [],
    result: false,
  });

  Geocode.setApiKey("");

  false && _logger("arrayOfEventsLeft", eventLeftState);
  false && _logger("arrayOfEventsRight", eventRightState.arrayOfEvents);

  //#region MODAL
  const onEditRequested = (event) => {
    _logger("view clicker", event);

    setModalData((prevState) => {
      let md = { ...prevState };
      md = event;
      md.isOpen = !prevState.isOpen;
      return md;
    });
  };

  const onAddClicked = (event) => {
    _logger("add event", event);

    setModalData((prevState) => {
      let aMd = { ...prevState };
      aMd.isOpen = !prevState.isOpen;
      aMd.id = "";
      aMd.name = "";
      aMd.headline = "";
      aMd.description = "";
      aMd.summary = "";
      aMd.slug = "";
      aMd.dateStart = "";
      aMd.dateEnd = "";
      aMd.address = "";
      aMd.zipCode = "";
      aMd.latitude = "";
      aMd.longitude = "";
      aMd.statusId = 1;
      return aMd;
    });
  };

  // .then(
  //   (result) => {
  //      _logger(result.text);
  //      toastr.success("Message Sent");
  //      e.target.reset();
  //   },

  const onCloseClicked = () => {
    // needed separate click function for close button in order to avoid undefined error (it was trying to run my onViewClicked function twice)
    setModalData((prevState) => {
      const closeModal = { ...prevState };
      closeModal.isOpen = !prevState.isOpen;
      closeModal.id = "";
      closeModal.name = "";
      closeModal.headline = "";
      closeModal.description = "";
      closeModal.summary = "";
      closeModal.slug = "";
      closeModal.dateStart = "";
      closeModal.dateEnd = "";
      closeModal.address = "";
      closeModal.zipCode = "";
      closeModal.latitude = "";
      closeModal.longitude = "";
      closeModal.statusId = 1;
      return closeModal;
    });
  };
  //#endregion

  //for BIG MAP
  useEffect(() => {
    eventsService
      .getPage(eventRightState.pageIndex, eventRightState.pageSize)
      .then(onGetAllSuccess)
      .catch(onGetRightError);
  }, [eventRightState.pageIndex, eventRightState.pageSize]);

  //PAGINATION useEffect
  useEffect(() => {
    _logger("useEffect firing for Events right");
    eventsService
      .getPage(eventRightState.pageIndex, eventRightState.pageSize)
      .then(onGetPageSuccess)
      .catch(onGetRightError);
  }, [eventRightState.current, eventRightState.pageSize]);

  const onGetPageSuccess = (response) => {
    _logger("eventRightSuccess array", response.pagedItems);
    let eventRightArray = response.pagedItems;
    _logger("arrayOfRightEvents getRightSuccess", eventRightArray);

    setEventRightState((prevState) => {
      const rData = { ...prevState };
      rData.arrayOfEvents = eventRightArray;
      rData.eventComponents = eventRightArray.map(mapRightEvent);
      rData.totalCount = response;
      return rData;
    });
    setEventLeftState((prevState) => {
      let lData = { ...prevState };
      lData = response.pagedItems[0];
      return lData;
    });
    setAllEventState((prevState) => {
      let viewAll = { ...prevState };

      viewAll.total = eventRightArray;
      _logger("view all total", viewAll.total);
      return viewAll;
    });
  };

  const onViewClicked = (eventData) => {
    _logger("viewMore right-side clicker", eventData);

    setEventLeftState((prevState) => {
      let viewMoreRight = { ...prevState };
      viewMoreRight = eventData;
      return viewMoreRight;
    });
  };

  const onViewAllClicked = (e) => {
    _logger("viewAll Clicked", e);
    setAllEventState((prevState) => {
      let viewAll = { ...prevState };
      viewAll.result = !prevState.result;
      return viewAll;
    });
  };

  const onGetAllSuccess = (response) => {
    _logger("getAllSuccess for the big map", response.pagedItems);

    let eventData = response.pagedItems;

    setAllEventState((prevState) => {
      let viewAll = { ...prevState };

      viewAll.total = eventData;
      _logger("view all total", viewAll.total);
      return viewAll;
    });
  };

  const onGetRightError = (error) => {
    console.warn("onGetRightError events page", error);
  };

  //#region MAPPING RIGHT
  const mapRightEvent = (eventRight) => {
    _logger("event right mapping", eventRight);

    return (
      <EventRight
        event={eventRight}
        key={"EventRight" + eventRight.id}
        onViewClicked={onViewClicked}
        onEditClicked={onEditRequested}
      />
    );
  };
  //#endregion MAPPING RIGHT

  const onPageChange = (pageNumber) => {
    _logger("page clicked", pageNumber);

    setEventRightState((prevState) => {
      const newPage = { ...prevState };
      newPage.current = pageNumber;
      newPage.pageIndex = newPage.current - 1;
      _logger("pageIndex", newPage.pageIndex);
      return newPage;
    });
  };

  //#region SEARCH
  const onSearchClicked = (e) => {
    e.preventDefault();
    _logger("search clicked");
    eventsService
      .searchEvents(0, 10, searchDates.dateStart, searchDates.dateEnd)
      .then(onSearchSuccess)
      .catch(onSearchError);
  };

  const onSearchSuccess = (response) => {
    _logger("onSearchSuccess", response);
    let queriedEvents = response;
    _logger("queried events", queriedEvents);

    setEventRightState((prevState) => {
      const sd = { ...prevState };
      sd.arrayOfEvents = queriedEvents;
      sd.eventComponents = queriedEvents.map(mapRightEvent);
      return sd;
    });
  };

  const onSearchError = (error) => {
    _logger("onSearchError", error);
  };

  const onSearchFormChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    setSearchFormData((prevState) => {
      const searchEventObj = { ...prevState };
      searchEventObj[name] = value;
      _logger(searchEventObj[name]);
      return searchEventObj;
    });
  };
  //#endregion SEARCH

  // const onDateChange = (e) => {

  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;
  //   setModalData((prevState) => {
  //     const newModalDates = { ...prevState };
  //     newModalDates[name] = value;
  //     return newModalDates;
  //   });
  // };

  // const onLocationChange = (e) => {
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;

  //   setModalData((prevState) => {
  //     const newModalLocation = { ...prevState };
  //     newModalLocation[name] = value;
  //     return newModalLocation;
  //   });
  // };

  // const onFormChange = (e) => {
  //   const target = e.target;
  //   const value = target.value;
  //   const name = target.name;

  //   setModalData((prevState) => {
  //     const newModalForm = { ...prevState };
  //     newModalForm[name] = value;
  //     return newModalForm;
  //   });
  // };

  Geocode.setApiKey("");

  const geoCode = () => {
    Geocode.fromAddress(modalData.address).then((response) => {
      const lat = response.results[0].geometry.location.lat;
      const lng = response.results[0].geometry.location.lng;
      _logger("lat", lat, "lng", lng);
    });
  };

  const onModalSubmit = (values) => {
    _logger("modal submitted", values);

    // setModalData((prevState) => {
    //   let modalState = { ...prevState, ...values };

    // Get latitude & longitude from address.
    const modalState = { ...values };

    Geocode.fromAddress(values.address).then((response) => {
      const latitude = response.results[0].geometry.location.lat;
      const longitude = response.results[0].geometry.location.lng;
      modalState.latitude = latitude;
      modalState.longitude = longitude;

      if (!modalState.id) {
        eventsService
          .addEvent(modalState)
          .then(onAddEventSuccess)
          .catch(onAddEventError);
      } else {
        eventsService
          .updateEvent(modalState.id, modalState)
          .then(onUpdateEventSuccess)
          .catch(onUpdateEventError);
      }

      setModalData((prev) => ({ ...prev, ...modalState }));
      //   return modalState;
      // });
    });
  };

  const onAddEventSuccess = (response) => {
    _logger("onAddEventSuccess", response);
    //set total events and push modalState into totalEvent array
    //set events - splice [0][1] and modalState
    toastr["success"]("You have added your event successfully", "Success!");
  };

  const onUpdateEventSuccess = () => {
    _logger("onUpdateEventSuccess");
    // const eventsData

    let id = modalData.id;
    toastr["success"]("You have updated your event successfully", "Success!");

    setEventRightState((prevState) => {
      const eventsData = { ...prevState };
      eventsData.arrayOfEvents = [...eventsData.arrayOfEvents];
      const fndIdx = eventsData.arrayOfEvents.findIndex((eVent) => {
        let result = false;
        if (eVent.id === id) {
          false && _logger(eVent.id, id);
          result = true;
        }
        return result;
      });
      if (fndIdx >= 0) {
        eventsData.arrayOfEvents.splice(fndIdx, 1, modalData);
        eventsData.eventComponents =
          eventsData.arrayOfEvents.map(mapRightEvent);
      }
      return eventsData;
    });
  };

  const onAddEventError = (error) => {
    _logger("onAddEventError", error);
    toastr["error"](
      "Please confirm event information is correct!",
      "Unable to add event"
    );
  };

  const onUpdateEventError = (error) => {
    _logger("onUpdateEventError", error);
    toastr["error"](
      "Please confirm event info is correct!",
      "Unable to edit event"
    );
  };

  return (
    <>
      <main className="main">
        <div className="container-left">
          <div className="mb-4 bg-light rounded-3" onClick={geoCode}>
            <div className="container-fluid py-2">
              <h1>Events</h1>
            </div>
          </div>
        </div>
      </main>
      <div className="card-container d-flex mx-3">
        {eventLeftState && !allEvents.result && (
          <div className="eventLeft mx-5">
            <EventLeft event={eventLeftState}></EventLeft>
            <div className="map">
              <Wrapper apiKey={""}>
                <MapComponent events={[eventLeftState]}></MapComponent>
              </Wrapper>
            </div>
            <Email></Email>
          </div>
        )}
        {allEvents.result && (
          <div className="map mx-5">
            <Wrapper apiKey={""}>
              <BigMap events={allEvents.total}></BigMap>
            </Wrapper>
          </div>
        )}
        <div className="eventRight">
          <h3 className="my-3">Search Events By Date</h3>
          <div className="input-group w-50 inline-flex">
            <div className="date-picker d-flex">
              <label htmlFor="dateStart" className="dateStart">
                Start Date
              </label>
              <input
                className="form-control searchStartDate mx-3"
                name="dateStart"
                type="date"
                onChange={onSearchFormChange}
                value={searchDates.dateStart}
              />
              <label
                htmlFor="dateEnd"
                className="dateEnd justify-content-center mx-3"
              >
                End Date
              </label>
              <input
                className="form-control searchEndDate"
                name="dateEnd"
                type="date"
                onChange={onSearchFormChange}
                value={searchDates.dateEnd}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary bg-white text-black w-100 my-4 mx-5"
              width={50}
              onClick={onSearchClicked}
            >
              Find Event
            </button>
          </div>
          <button
            type="button"
            className="btn btn-primary modal-createEvent my-2 mx-2"
            onClick={onAddClicked}
          >
            Create Event
          </button>
          <button
            type="button"
            className="btn btn-secondary modal-createEvent"
            onClick={onViewAllClicked}
          >
            View All On Map
          </button>
          <h3 className="mx-5">Upcoming Events</h3>
          <Pagination
            onChange={onPageChange}
            pageIndex={eventRightState.pageIndex}
            pageSize={eventRightState.pageSize}
            current={eventRightState.current}
            total={eventRightState.totalEvents}
            locale={locale}
            className="my-3 mx-5"
          />
          <div className="my-2">{eventRightState.eventComponents}</div>
        </div>
        <AddEventModal
          toggleModal={onEditRequested}
          onClose={onCloseClicked}
          onSubmit={onModalSubmit}
          eventData={modalData}
          setEvent={setModalData}
        >
          Job Information
        </AddEventModal>
      </div>
    </>
  );
}

export default Events;
