import React, { useState } from "react";
import SingleCar from "./SingleCar";

function Cars() {
  // USING THE BELOW CODE, I CAN SHOW CARS AND FILTER WHEN BUTTON IS CLICKED, BUT FOR SOME REASON,
  // I HAVE TO REFRESH THE PAGE TO CLICK THE NEXT BUTTON IF I WANT TO FILTER BY YEAR AGAIN.
  // HOWEVER, I AM ABLE TO SHOW ONLY CARS MATCHING THE YEAR UPON BUTTON CLICK

  const [cars, setCars] = useState({
    cars: [
      {
        make: "Kia",
        model: "Sorento",
        year: 2020,
      },
      {
        make: "Kia",
        model: "Optima",
        year: 2019,
      },
      {
        make: "Tesla",
        model: "Model 3",
        year: 2021,
      },
      {
        make: "Honda",
        model: "Civic",
        year: 2019,
      },
      {
        make: "Honda",
        model: "Accord",
        year: 2018,
      },
      {
        make: "Volkswagen",
        model: "Jetta",
        year: 2021,
      },
      {
        make: "Toyota",
        model: "Camry",
        year: 2021,
      },
      {
        make: "Ford",
        model: "Mustang",
        year: 2019,
      },
      {
        make: "Ford",
        model: "F-150",
        year: 2019,
      },
      {
        make: "Toyota",
        model: "Camry",
        year: 2020,
      },
      {
        make: "Ford",
        model: "F-150",
        year: 2021,
      },
    ],
  });

  const [show, setShow] = useState(false);

  const showCars = () => {
    setShow(!show);
  };

  const mapCar = (car) => {
    return <SingleCar car={car} key={Math.random() * 10000} />;
  };

  // const filter2018Car = (car) => {
  //   let result = false;

  //   if (car.year === 2018) {
  //     result = true;
  //   }
  //   return result;
  // };

  // const filter2019Car = (car) => {
  //   let result = false;

  //   if (car.year === 2019) {
  //     result = true;
  //   }
  //   return result;
  // };

  // const filter2020Car = (car) => {
  //   let result = false;

  //   if (car.year === 2020) {
  //     result = true;
  //   }
  //   return result;
  // };

  // const filter2021Car = (car) => {
  //   let result = false;

  //   if (car.year === 2021) {
  //     result = true;
  //   }
  //   return result;
  // };

  const show2018Cars = () => {
    setCars((prevState) => {
      let filtered2018Cars = { ...prevState };
      filtered2018Cars.cars = cars.cars.filter((car) => car.year === 2018);
      // filtered2018Cars.filteredCars = filtered2018Cars.map(mapCar);
      console.log(filtered2018Cars);
      return filtered2018Cars;
    });
  };

  const show2019Cars = () => {
    setCars((prevState) => {
      let filtered2019Cars = { ...prevState };
      filtered2019Cars.cars = cars.cars.filter((car) => car.year === 2019);
      // filteredCars.filteredCars = filteredCars.map(mapCar);
      return filtered2019Cars;
    });
  };

  const show2020Cars = () => {
    setCars((prevState) => {
      let filtered2020Cars = { ...prevState };
      filtered2020Cars.cars = cars.cars.filter((car) => car.year === 2020);
      // filtered2020Cars.filteredCars = filteredCars.map(mapCar);
      return filtered2020Cars;
    });
  };

  const show2021Cars = () => {
    setCars((prevState) => {
      let filtered2021Cars = { ...prevState };
      filtered2021Cars.cars = cars.cars.filter((car) => car.year === 2021);
      // filteredCars.filteredCars = filteredCars.map(mapCar);
      return filtered2021Cars;
    });
  };

  false && console.log(cars);
  false && console.log(show);

  return (
    <>
      <div className="mx-3">
        <h1>Cars</h1>
        <button className="btn btn-success mx-2" onClick={showCars}>
          Show Cars
        </button>
        <button
          type="button"
          className="btn btn-success mx-2"
          id="show-2018-Cars"
          onClick={show2018Cars}
        >
          2018 Cars
        </button>
        <button
          type="button"
          className="btn btn-success mx-2"
          id="show-2019-Cars"
          onClick={show2019Cars}
        >
          2019 Cars
        </button>
        <button
          type="button"
          className="btn btn-success mx-2"
          id="show-2020-Cars"
          onClick={show2020Cars}
        >
          2020 Cars
        </button>
        <button
          type="button"
          className="btn btn-success mx-2"
          id="show-2021-Cars"
          onClick={show2021Cars}
        >
          2021 Cars
        </button>

        {show && cars.cars.map(mapCar)}
        {/* {!show2018Cars && cars.map(mapCar)} */}
      </div>
    </>
  );
}

export default Cars;
