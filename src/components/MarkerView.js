import React from 'react'
import {string} from 'prop-types'
import {View, Text} from 'react-native'

import Anchor from './Anchor'

const MarkerView = ({
  name,
  phone_local,
  address,
}) =>
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      width: 300,
    }}>
    <Text
      style={{
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 10,
      }}>
      {name}
    </Text>
    <Text
      style={{
        color: 'royalblue',
        marginBottom: 10,
      }}>
      {phone_local}
    </Text>
    <Text style={{marginBottom: 10}}>
      {address}
    </Text>
  </View>

MarkerView.propTypes = {
  name: string.isRequired,
  phone_local: string.isRequired,
  address: string.isRequired,
}

export default MarkerView
