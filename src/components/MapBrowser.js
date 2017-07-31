import React from "react";
import { string, number, object, shape, oneOf } from "prop-types";
import { Button } from "react-native";
import { WebBrowser } from "expo";
import moment from "moment";

const MapBrowser = ({
  socket,
  name,
  address,
  officeLat,
  officeLng,
  place_id,
  location,
  office
}) => {
  const initiateNav = () => {
    const { latitude: lat, longitude: lng } = location;
    const url =
      lat === 0 && lng === 0
        ? `https://www.google.com/maps/search/?api=1&query=${officeLat},${officeLng}&query_place_id=${place_id}`
        : `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${name.replace(
            /\s/g,
            "+"
          )}&destination_place_id=${place_id}&travelmode=transit`;
    WebBrowser.openBrowserAsync(url);
    socket.emit("update-nav", {
      office: office === 1 ? "SNAP" : "WIC",
      date: moment().format("l")
    });
  };
  const handlepress = () => {
    initiateNav();
  };
  return (
    <Button
      onAccessibilityTap={handlepress}
      title={address}
      onPress={handlepress}
    />
  );
};

MapBrowser.propTypes = {
  office: oneOf([0, 1, 2]).isRequired,
  name: string.isRequired,
  address: string.isRequired,
  officeLat: number.isRequired,
  officeLng: number.isRequired,
  place_id: string.isRequired,
  location: shape({
    latitude: number.isRequired,
    longitude: number.isRequired,
    latitudeDelta: number.isRequired,
    longitudeDelta: number.isRequired
  }).isRequired,
  socket: object
};

export default MapBrowser;
