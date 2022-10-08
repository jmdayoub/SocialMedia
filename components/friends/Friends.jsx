import React, { useEffect, useState, useCallback } from "react";
import Friend from "./FriendCard";
import { Link, useNavigate } from "react-router-dom";
import * as friendsService from "../../services/friendsService";
import "./Friends.css";
import "rc-pagination/assets/index.css";
import Pagination from "rc-pagination";
import locale from "rc-pagination/lib/locale/en_US";
import debug from "sabio-debug";

const _logger = debug.extend("Friends");

function Friends() {
  const [pageData, setPageData] = useState({
    // using two arrays to keep state from going stale //setting state-2 arrays as properties of page data
    arrayOfFriends: [],
    friendComponents: [],
    pageIndex: 0,
    pageSize: 4,
    totalFriends: 8,
    current: 1,
    result: false,
  });

  // const [page, setPage] = useState({ // REFACTORED THIS INTO ^ pageData state declaration
  //   pageIndex: 1,
  //   pageSize: 4,
  //   totalFriends: 8,
  //   current: 1,
  // });

  const navigate = useNavigate(); // setting navigate as function with useNavigate() hook

  const navigateToEditPage = (friend) => {
    //click handler invokes this function and passes friend from friendCard page
    // when I click edit, taking friend from card I clicked and sending info to the form page
    _logger("this is friend firing", friend, { friend });

    const stateForTransport = { type: "EDIT_FRIEND", payload: friend }; // type is just an identifier

    navigate(`/friends/${friend.id}`, { state: stateForTransport }); // when you navigate to the form page, take stateReady object with you, which includes the myFriend object(payload)
  };

  false && _logger("arrayOfFriends", pageData.arrayOfFriends); // prevents error from declaring variable and not using it

  // #region setCount / Header Clicked
  // const [count, setCount] = useState(0);

  // const onHeaderClicked = () => {
  //   setCount((prevState) => {
  //     return prevState + 1;
  //   });
  // };
  // #endregion

  // #region TOGGLE
  // const [isShown, setIsShown] = useState(false); // using useState hook to setState(setIsShown) and setting its value to a boolean for conditional rendering

  const toggleClicked = () => {
    // conditional rendering -- based on whether button is clicked -- need to flip the result(boolean) inside of setState(setIsShown) function
    setPageData((prevState) => {
      // updater function

      const newPd = { ...prevState };
      newPd.result = !prevState.result;
      _logger("toggle clicked:", "isShown.result >>", newPd.result);
      return newPd;
    });
  };

  // #endregion

  // #region DELETE

  const onDeleteRequested = useCallback((myFriend, eObj) => {
    _logger(myFriend.id, { myFriend, eObj });

    const handler = getDeleteSuccessHandler(myFriend.id);

    friendsService.deleteById(myFriend.id).then(handler).catch(onDeleteError);
  }, []);

  const getDeleteSuccessHandler = (idToDelete) => {
    _logger("getDeleteSuccessHandler", idToDelete);
    return () => {
      _logger("onDeleteSuccess", idToDelete);
      setPageData((prevState) => {
        const pd = { ...prevState };
        pd.arrayOfFriends = [...pd.arrayOfFriends];

        const idxOf = pd.arrayOfFriends.findIndex((friend) => {
          // this findIndex just finds the position of the friend element in the arrayOfFriends array
          let result = false;

          if (friend.id === idToDelete) {
            result = true;
          }
          return result;
        });

        if (idxOf >= 0) {
          pd.arrayOfFriends.splice(idxOf, 1);
          pd.friendComponents = pd.arrayOfFriends.map(mapFriend);
        }
        return pd;
      });
    };
  };

  const onDeleteError = (error) => {
    console.warn("onDeleteError", error);
  };

  // #endregion

  // #region MAPPING
  const mapFriend = (aFriend) => {
    _logger("mapping", aFriend);

    return (
      <Friend
        friend={aFriend}
        key={"FriendsList-" + aFriend.id}
        onFriendDeleteClicked={onDeleteRequested} //coming from friend card page
        onEditClicked={navigateToEditPage} //coming from friend card page
      />
    );
  };

  // #endregion

  // #region SEARCH

  // ANYTIME YOU HAVE A FORM FIELD THAT TAKES USER INPUT, YOU NEED AN ON CHANGE function to bind input field to the state object declared (such as friend object or search feature)
  const [query, setSearchFormData] = useState({
    searchQuery: "",
  });

  const onSearchClicked = (e) => {
    e.preventDefault();
    _logger("search clicked");
    friendsService
      .searchFriends(0, 10, query.searchQuery)
      .then(onSearchSuccess)
      .catch(onSearchError);
  };

  const onSearchSuccess = (data) => {
    _logger("onSearchSuccess", data.item.pagedItems);
    let queriedFriends = data.item.pagedItems;
    _logger("queried friends", queriedFriends);

    setPageData((prevState) => {
      const pd = { ...prevState };
      pd.arrayOfFriends = queriedFriends;
      pd.friendComponents = queriedFriends.map(mapFriend);
      return pd;
    });
  };

  //#endregion

  const onFormFieldChange = (event) => {
    // _logger({ syntheticEvent: event });

    //capture info you need from event here as the event object will fall out of scope quickly
    const target = event.target;
    const value = target.value;
    const inputField = target.name;

    //set the new state using the old property name / object key and using the new value for formData
    setSearchFormData((prevState) => {
      // copy the xData object from state using the spread operator
      const newSearchObject = {
        ...prevState,
      };

      //change the value of the copied object using the name and using bracket notation
      newSearchObject[inputField] = value;

      //in functional components the name of this object/variable does not matter
      return newSearchObject;
    });
  };

  const onSearchError = (error) => {
    console.warn(error);
  };

  // #region getPage

  const onPageChange = (pageNumber) => {
    _logger("page clicked", pageNumber);

    setPageData((prevState) => {
      const newPage = { ...prevState };
      newPage.current = pageNumber;
      newPage.pageIndex = newPage.current - 1;
      _logger("pageIndex", newPage.pageIndex);
      return newPage;
    });
  };

  useEffect(() => {
    // if we want something to run (ex. on start-up, etc) or change automatically -- add dependancies if applicable inside of array brackets (ex. state, etc);
    // if setting state inside of useEffect, do not put that same piece of state inside of dependancy array, or you will die.
    _logger("firing useEffect for getPage");
    friendsService
      .getPage(pageData.pageIndex, pageData.pageSize)
      .then(onGetPageSuccess)
      .catch(onGetPageError);
  }, [pageData.current, pageData.pageSize]);

  const onGetPageSuccess = (data) => {
    // mapping INSIDE of success handler using pageData.components (two arrays);
    _logger("onGetPageSuccess", data);
    let arrayOfFr = data.item.pagedItems;
    let item = data.item; // this is so we can access the totalCount
    _logger("arrayOfFr", arrayOfFr);

    setPageData((prevState) => {
      // setting state function is needed when you need to add or change state
      const pd = { ...prevState };
      pd.arrayOfFriends = arrayOfFr;
      pd.friendComponents = arrayOfFr.map(mapFriend);
      pd.totalCount = item.totalCount;
      // pd.totalPages = item.totalPages;
      return pd;
    });
  };

  const onGetPageError = (error) => {
    console.error("onGetPageError", error);
  };

  // #endregion

  return (
    <>
      <main role="main">
        <div className="container">
          <div className=" mb-4 bg-light rounded-3">
            <div className="container-fluid py-2">
              <h1>Friends</h1> {/* onClick={onHeaderClicked} Friends {count} */}
              <div className="container-fluid d-flex justify-content-between">
                <button className="btn btn-warning" onClick={toggleClicked}>
                  {pageData.result ? "Hide Friends" : "Show Friends"}
                </button>
                <Link
                  to="/friends/addfriend"
                  type="button"
                  className="text-white btn btn-success mx-2"
                >
                  + Friend
                </Link>
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
                    Find Friend
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
              pageIndex={pageData.pageIndex}
              pageSize={pageData.pageSize}
              current={pageData.current}
              total={pageData.totalFriends}
              locale={locale}
            />
          </div>
          <div className="row">
            {pageData.result && pageData.friendComponents}{" "}
            {/* part of toggle -- conditional rendering */}
            {/* (if this part is true) && (this part will execute) */}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <Pagination
            onChange={onPageChange}
            pageIndex={pageData.pageIndex}
            pageSize={pageData.pageSize}
            current={pageData.current}
            total={pageData.totalFriends}
            locale={locale}
          />
        </div>
      </main>
    </>
  );
}

export default Friends;
