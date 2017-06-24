import React from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {MapView, Permissions, Location} from 'expo'
// import {updateLocation} from '../redux/actions/actions'
import {dispatchUpdateLocation} from '../redux/actions/actionCreators'

import regionFrom from '../utilities/mapUtil'

// API Key: AIzaSyCgsIvh_6KHhGiGv8XHfTP2rUm_T42eH2E

class Map extends React.Component {
  constructor(props) {
    super(props)
  }
  async _getLocationAsync() {
    const {status: currentStatus} = await Permissions.getAsync(
      Permissions.LOCATION
    )
    if (currentStatus !== 'granted') {
      const {status: newStatus} = await Permissions.askAsync(
        Permissions.LOCATION
      )
      if (newStatus !== 'granted') {
        // zip code
        console.warn('not granted')
      } else {
        var {coords: location} = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        })
        console.warn(JSON.stringify(location, null, 2))
      }
    } else {
      var {coords: location} = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      })
    }
    this.props.dispatchUpdateLocation({
      lat: location.latitude,
      long: location.longitude,
    })
  }
  componentWillMount() {
    this._getLocationAsync()
  }
  render() {
    return <MapView style={{flex: 1}} initialRegion={this.props.location} />
  }
}

const mapStateToProps = ({language, orientation, location}) => ({
  language,
  orientation,
  location,
})

const mapDispatchToProps = dispatch => ({
  dispatchUpdateLocation: bindActionCreators(dispatchUpdateLocation, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Map)
