import React, {Component} from 'react'
import {
  oneOf,
  bool,
  array,
  func,
} from 'prop-types'
import {connect} from 'react-redux'
import {
  Platform,
  TouchableHighlight,
  Link,
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native'
import {MapView} from 'expo'
import {Foundation} from '@expo/vector-icons'

import {ActivityIndicatorWrapper} from '../components/styled/Styled'
import MarkerView from '../components/MarkerView'

import {dispatchUpdateLocation} from '../redux/actions/actionCreators'

class Map extends Component {
  constructor(props) {
    super(props)
  }
  async componentDidMount() {
    await this.props.fetchOffices()
  }
  render() {
    const colors = [
      'coral',
      'crimson',
      'aquamarine',
      'darkturquoise',
      'deeppink',
      'indianred',
      'mediumspringgreen',
      'sandybrown',
      'plum',
      'tomato',
      'aqua',
      'palevioletred',
      'salmon',
    ]
    const offices =
      this.props.office === 1
        ? this.props.snapOffices
        : this.props.wicOffices
    if (!this.props.mapLoading) {
      return (
        // <TouchableHighlight
        //   activeOpacity={0.5}
        //   style={{
        //     display: 'flex',
        //     flexDirection: 'column',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     backgroundColor: 'tomato',
        //     height: 60,
        //     width: 60,
        //     borderRadius: 30,
        //   }}>
        //   <Foundation name="refresh" size={22} color="white" />
        // </TouchableHighlight>
        <MapView
          style={{flex: 1}}
          provider={
            Platform.OS === 'ios'
              ? null
              : 'google'
          }
          region={this.props.region}>
          {offices.map(office => {
            return (
              <MapView.Marker
                pinColor={
                  colors[
                    Math.floor(
                      Math.random() *
                        colors.length
                    )
                  ]
                }
                key={office.id}
                coordinate={{
                  latitude: office.latitude,
                  longitude: office.longitude,
                }}>
                <MapView.Callout>
                  <MarkerView {...office} />
                </MapView.Callout>
              </MapView.Marker>
            )
          })}
        </MapView>
      )
    } else {
      return (
        <ActivityIndicatorWrapper>
          <ActivityIndicator
            color="tomato"
            size="large"
          />
        </ActivityIndicatorWrapper>
      )
    }
  }
}

Map.propTypes = {
  fetchOffices: func.isRequired,
  office: oneOf([0, 1, 2]).isRequired,
  snapOffices: array.isRequired,
  wicOffices: array.isRequired,
  mapLoading: bool.isRequired,
}

export default Map
