import React from 'react';
import { string, number, object } from 'prop-types';
import { Text, Button, AsyncStorage } from 'react-native';
import { WebBrowser } from 'expo';

const MapBrowser = ({
  name,
  address,
  officeLat,
  officeLng,
  place_id,
  location
}) => {
  const _handlepress = async () => {
    const { latitude: lat, longitude: lng } = location;
    const url =
      lat === 0 && lng === 0
        ? `https://www.google.com/maps/search/?api=1&query=${officeLat},${officeLng}&query_place_id=${place_id}`
        : `https://www.google.com/maps/dir/?api=1&origin=${lat},${lng}&destination=${name.replace(
            /\s/g,
            '+'
          )}&destination_place_id=${place_id}&travelmode=transit`;
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <Button
      onAccessibilityTap={_handlepress}
      title={address}
      onPress={_handlepress}
    />
  );
};

MapBrowser.propTypes = {
  name: string.isRequired,
  address: string.isRequired,
  officeLat: number.isRequired,
  officeLng: number.isRequired,
  place_id: string.isRequired,
  location: object.isRequired
};

export default MapBrowser;
