import React from "react";
import { Wrapper } from "@googlemaps/react-wrapper";
import MapComponent from "./MapComponent";

const MapWrapper = (props) => (
  <Wrapper apiKey={"AIzaSyCqk2Mh4b-7jZuBxQovHKyf3lAJiOHJsTU"}>
    <MapComponent event={props.event} />
  </Wrapper>
);

export default MapWrapper;
