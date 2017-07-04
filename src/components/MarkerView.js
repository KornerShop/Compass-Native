import React from 'react'
import {string, number, object} from 'prop-types'
import {View, Text} from 'react-native'

import Anchor from './Anchor'
import MapBrowser from './MapBrowser'

const MarkerView = ({location, lat, lng, name, phone_local, address, id}) =>
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
      {phone_local}
    </Text>
    <MapBrowser
      name={name}
      location={location}
      address={address}
      place_id={id}
      officeLat={lat}
      officeLng={lng}
    />
  </View>

MarkerView.propTypes = {
  location: object.isRequired,
  name: string.isRequired,
  phone_local: string.isRequired,
  address: string.isRequired,
  lat: number.isRequired,
  lng: number.isRequired,
  id: string.isRequired,
}

export default MarkerView
