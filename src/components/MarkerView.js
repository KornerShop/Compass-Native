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
  socket,
}) =>
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      width: 300,
    }}
  >
    <View
      style={{
        flex: 1,
        backgroundColor: '#21CFBF',
      }}
    >
      <Text
        style={{
          color: 'white',
          fontSize: 20,
          fontWeight: 'bold',
          marginTop: 5,
          marginBottom: 5,
          padding: 5,
          textAlign: 'center',
        }}
      >
        {name}
      </Text>
    </View>
    <View style={{ flex: 1, backgroundColor: 'white', marginTop: 5 }}>
      <Text
        style={{
          color: 'royalblue',
          fontSize: 18,
          marginTop: 10,
          marginBottom: 10,
          textAlign: 'center',
        }}
      >
        <Anchor href={`tel: ${phone_local}`}>
          {phone_local}
        </Anchor>
      </Text>
    </View>
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
  socket: object.isRequired,
};

export default MarkerView;
