import React from 'react'
import {View, Text, StyleSheet, Alert} from 'react-native'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {MapView} from 'expo'
// import {updateLocation} from '../redux/actions/actions'
import {dispatchUpdateLocation} from '../redux/actions/actionCreators'

// API Key: AIzaSyCgsIvh_6KHhGiGv8XHfTP2rUm_T42eH2E

export default class Map extends React.Component {
  render() {
    return <MapView style={{flex: 1}} initialRegion={this.props.location} />
  }
}
