import React from 'react'
import {Text, Button} from 'react-native'
import {WebBrowser} from 'expo'

const MapBrowser = ({address, lat, lng, place_id}) => {
  const _handlepress = async () => {
    await WebBrowser.openBrowserAsync(
      `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${place_id}`
    )
  }

  return <Button title={address} onPress={_handlepress} />
}

export default MapBrowser
