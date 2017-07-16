import React from 'react';
import { string, number, object, shape, oneOf } from 'prop-types';
import { View, Text } from 'react-native';

import Anchor from './Anchor';
import MapBrowser from './MapBrowser';

const MarkerView = ({
  location,
  lat,
  lng,
  name,
  phone_local,
  address,
  id,
  office,
  socket
}) =>
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      width: 300,
    }}
  >
    <Text
      style={{
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      {name}
    </Text>
    <Text
      style={{
        color: 'royalblue',
        marginBottom: 10,
      }}
    >
      <Anchor href={`tel: ${phone_local}`}>
        {phone_local}
      </Anchor>
    </Text>
    <MapBrowser
      socket={socket}
      office={office}
      name={name}
      location={location}
      address={address}
      place_id={id}
      officeLat={lat}
      officeLng={lng}
    />
  </View>;

MarkerView.propTypes = {
  office: oneOf([0, 1, 2]).isRequired,
  location: shape({
    latitude: number.isRequired,
    longitude: number.isRequired,
    latitudeDelta: number.isRequired,
    longitudeDelta: number.isRequired,
  }).isRequired,
  name: string.isRequired,
  phone_local: string,
  address: string.isRequired,
  lat: number.isRequired,
  lng: number.isRequired,
  id: string.isRequired,
  socket: object.isRequired
};

export default MarkerView;
