// import { React, useEffect, useState } from "react";
// function Filter() {
//   const [formData, setFormData] = useState({
//     filter: "",
//   });
//   const [arOfNames, setArOfNames] = useState({
//     names: [
//       "Anthony",
//       "Alex",
//       "Alison",
//       "Andy",
//       "Bob",
//       "James",
//       "Tim",
//       "Christian",
//       "Ann",
//       "Sara",
//       "Jared",
//       "Collin",
//       "Lee",
//       "Jake",
//     ],
//     displayNames: [],
//   });
//   false && console.log(formData);
//   const onFormChange = (e) => {
//     const value = e.target.value;
//     const name = e.target.name;
//     setFormData((prevState) => {
//       const newData = { ...prevState };
//       newData[name] = value;
//       return newData;
//     });
//   };
//   const mapNames = (name) => {
//     return (
//       <div className="card nameCard col-lg-2 col-md-6 col-sm-12 py-1 m-4 text-center bg-dark text-light">
//         <h3 className="my-auto">{name}</h3>
//       </div>
//     );
//   };
//   useEffect(() => {
//     setArOfNames((prevState) => {
//       const newNames = { ...prevState };
//       newNames.displayNames = newNames.names.map(mapNames);
//       return newNames;
//     });
//   }, []);
//   const onFilterClicked = (e) => {
//     e.preventDefault();
//     setArOfNames((prevState) => {
//       const newNames = { ...prevState };
//       newNames.displayNames = newNames.names.filter(
//         (name) =>
//           name.toLowerCase().includes(formData.filter) ||
//           name.toUpperCase().includes(formData.filter)
//       );
//       newNames.displayNames = newNames.displayNames.map(mapNames);
//       return newNames;
//     });
//   };
//   return (
//     <>
//       <div className="container">
//         <h1 className="text-center py-2">Filtering</h1>
//       </div>
//       <form>
//         <div className="form-group d-flex justify-content-center">
//           <input name="filter" onChange={onFormChange} />
//         </div>
//         <div className="text-center">
//           <button
//             type="submit"
//             className="btn btn-secondary my-2"
//             onClick={onFilterClicked}
//           >
//             Filter
//           </button>
//         </div>
//       </form>
//       <div className="row flex-wrap d-flex card-deck justify-content-center">
//         {arOfNames.displayNames}
//       </div>
//     </>
//   );
// }
// export default Filter;

import { React, useEffect, useState } from "react";
function Filter() {
  const [formData, setFormData] = useState({
    filter: "",
  });
  const [arrayOfAnimals, setArrayOfAnimals] = useState({
    animals: [
      "Armadillo",
      "Bison",
      "Chimpanzee",
      "Dolphin",
      "Goat",
      "Cow",
      "Anaconda",
      "Whale",
      "Hippopotamus",
      "Snake",
      "Ardvarck",
      "Monkey",
      "Shark",
    ],
    displayAnimals: [],
  });
  false && console.log(formData);
  const onFormChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => {
      const newData = { ...prevState };
      newData[name] = value;
      return newData;
    });
  };
  const mapAnimals = (animal) => {
    return (
      <div className="card animalCard col-lg-2 col-md-6 col-sm-12 text-center bg-dark text-light my-2 mx-2">
        <h3 className="my-auto">{animal}</h3>
      </div>
    );
  };
  useEffect(() => {
    setArrayOfAnimals((prevState) => {
      const newAnimals = { ...prevState };
      newAnimals.displayAnimals = newAnimals.animals.map(mapAnimals);
      return newAnimals;
    });
  }, []);
  const onFilterClicked = (e) => {
    e.preventDefault();
    setArrayOfAnimals((prevState) => {
      const newAnimals = { ...prevState };
      newAnimals.displayAnimals = newAnimals.animals.filter(
        (animal) =>
          animal.toLowerCase().includes(formData.filter) ||
          animal.toUpperCase().includes(formData.filter)
      );

      newAnimals.displayAnimals = newAnimals.displayAnimals.map(mapAnimals);
      return newAnimals;
    });
  };

  return (
    <>
      <div className="container">
        <h1 className="text-center py-2">Filtering</h1>
      </div>
      <form>
        <div className="form-group d-flex justify-content-center">
          <input name="filter" onChange={onFormChange} />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="btn btn-secondary my-2"
            onClick={onFilterClicked}
          >
            Filter
          </button>
        </div>
      </form>
      <div className="row flex-wrap d-flex card-deck justify-content-center">
        {arrayOfAnimals.displayAnimals}
      </div>
    </>
  );
}

export default Filter;
