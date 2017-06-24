import React from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {MapView} from 'expo'
// import {updateLocation} from '../redux/actions/actions'
import {dispatchUpdateLocation} from '../redux/actions/actionCreators'

// you might need a custom callout here (more info about locale/link to device's map)
export default class Map extends React.Component {
  render() {
    return (
      <MapView style={{flex: 1}} provider="google" region={this.props.region}>
        {this.props.offices.map(marker => {
          coordinate = {}
          title = {}
          description = {}
          image = {}
        })}
      </MapView>
    )
  }
}
