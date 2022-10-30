import React, { useState } from "react";
import Bird from "./Bird";

const Birds = () => {
  const [birds, setBirds] = useState({
    ogBirds: [
      { id: 1, name: "Twitty" },
      { id: 2, name: "Blue" },
      { id: 3, name: "Red" },
      { id: 4, name: "Green" },
      { id: 5, name: "Yellow" },
      { id: 6, name: "Green" },
    ],
    newBirds: [],
  });

  console.log(birds);

  const [show, setShow] = useState(false);

  // const [state, changeState] = useState({
  //   birds: ['pure JS array'],
  //   birdsComponents: ['array of Components']
  // })

  const mapBird = (bird) => {
    return <Bird bird={bird} key={bird.id} />;
  };

  const changeShow = () => {
    setShow(!show);
  };

  const onChangeNamesClicked = (e) => {
    e.preventDefault();

    setBirds((prevState) => {
      const greenOnly = { ...prevState };
      greenOnly.newBirds = birds.ogBirds.filter(
        (bird) => bird.name === "Green"
      );
      greenOnly.newBirds = greenOnly.newBirds.map(
        (bird) => (bird.name = "something")
      );
      return greenOnly;
    });
  };

  // const changeNames = (bird) => {
  //   // for (let i = 0; i < bird.length; i++) {
  //   //   bird[i].name = "something";
  //   // }
  //   bird.name = "something";
  //   return bird;
  // };

  return (
    <div className="mx-3">
      <h1>Birds</h1>
      <button className="btn btn-success" onClick={changeShow}>
        Show
      </button>
      <button className="btn btn-info" onClick={onChangeNamesClicked}>
        Change Birds Names
      </button>
      {/* {birds.map((bird) => (
        <h1>{bird.name}</h1>
      ))} */}
      {birds.newBirds.length < 1 ? birds.ogBirds.map(mapBird) : birds.newBirds}
    </div>
  );
};

export default Birds;

//iterating thru an array without changing it is when you use a for loop
