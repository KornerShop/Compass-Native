import React, {Component} from 'react'
import {oneOf, bool, array, func} from 'prop-types'
import {connect} from 'react-redux'
import {
  Platform,
  Link,
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native'
import {MapView} from 'expo'

import {ActivityIndicatorWrapper} from '../components/styled/Styled'

import {dispatchUpdateLocation} from '../redux/actions/actionCreators'

class Map extends Component {
  constructor(props) {
    super(props)
  }
  async componentWillMount() {
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
    const offices = this.props.office === 1
      ? this.props.snapOffices
      : this.props.wicOffices
    if (!this.props.mapLoading) {
      return (
        <MapView
          style={{flex: 1}}
          provider={Platform.OS === 'ios' ? null : 'google'}
          region={this.props.region}>
          {offices.map(office => {
            return (
              <MapView.Marker
                pinColor={colors[Math.floor(Math.random() * colors.length)]}
                key={office.id}
                coordinate={{
                  latitude: office.latitude,
                  longitude: office.longitude,
                }}>
                <MapView.Callout>
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
                      {office.name}
                    </Text>
                    <Text style={{color: 'royalblue', marginBottom: 10}}>
                      {office.phone_local}
                    </Text>
                    <Text style={{marginBottom: 10}}>
                      {office.address}
                    </Text>
                  </View>
                </MapView.Callout>
              </MapView.Marker>
            )
          })}
        </MapView>
      )
    } else {
      return (
        <ActivityIndicatorWrapper>
          <ActivityIndicator color="tomato" size="large" />
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
