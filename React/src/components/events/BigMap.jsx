import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// import Geocode from "react-geocode"; USE FOR SUBMIT

const containerStyle = {
  width: "750px",
  height: "400px",
};

function BigMap(props) {
  console.log("BIG map props", props);

  const position = {
    lat: Number(props.events[0]?.latitude),
    lng: Number(props.events[0]?.longitude),
  };
  console.log("position", position);

  const [markers, setMarkerState] = useState([]);

  useEffect(() => {
    if (props.events) {
      setMarkerState(() => {
        let newMarker = props.events.map((event) => {
          let latitude = Number(event?.latitude);
          let longitude = Number(event?.longitude);
          let marker = {
            lat: latitude,
            lng: longitude,
          };
          return marker;
        });
        return newMarker;
      });
    }
  }, [props]);

  const center = {
    lat: Number(props.events[0]?.latitude),
    lng: Number(props.events[0]?.longitude),
  };

  console.log("markers", markers);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  const [map, setMap] = React.useState(null);
  false && console.log(map);

  const onLoad = React.useCallback(function callback(map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    false && console.log(map);
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={9}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {markers.map((event) => {
        return (
          <Marker
            position={{ lat: event.lat, lng: event.lng }}
            animation="DROP"
            key={event.lat}
          />
        );
      })}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(BigMap);
