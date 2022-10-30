import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "./MapComponent";

const MapWrapper = (props) => (
  <Wrapper apiKey={""}>
    <MapComponent event={props.event} />
  </Wrapper>
);

export default MapWrapper;
