import React from "react";
import debug from "sabio-debug";

const _logger = debug.extend("FriendCard");

// THIS PAGE RETURNS(RENDERS) THE FRIEND CARDS TO THE FRIENDS PAGE and ACCEPTS THE CLICK HANDLER FUNCTIONS AS PROPS FROM FRIENDS PAGE
function Friend(props) {
  const aFriend = props.friend; // passing each friend as prop from Friend component in Friends file
  _logger("aFriend", aFriend);

  const onDeleteClicked = (e) => {
    e.preventDefault();
    props.onFriendDeleteClicked(props.friend, e); //sending prop back to main Friends page to delete friend
  };

  const onEditFriendClicked = (e) => {
    e.preventDefault();
    props.onEditClicked(props.friend); //function coming from friend component on friends page /
    //sending props.friend back to friends page to invoke navigateToEditPage
  };

  return (
    <div
      className="col-md-3 d-flex justify-content-center"
      key={"FriendsList-" + aFriend.id}
    >
      <div className="card my-4 text-center" style={{ width: 400 }}>
        <img
          className="card-img-top"
          src={aFriend.primaryImage.imageUrl}
          alt="Card cap"
        />
        <div className="card-body">
          <h5 className="card-title">{aFriend.title}</h5>
          <p className="card-text">{aFriend.bio}</p>
          <p className="card-text">
            {aFriend.skills?.map((skill) => skill?.name).join(", ")}
          </p>
          <button
            className="btn link-btn btn-primary mx-2"
            onClick={onEditFriendClicked}
            // data-page="/friends/"
            // {...aFriend.id}
          >
            Edit
          </button>
          <button className="btn link-btn btn-danger" onClick={onDeleteClicked}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Friend;
