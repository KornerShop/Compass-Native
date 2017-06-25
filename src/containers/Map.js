import React, {Component} from 'react'
import {oneOf, array, func} from 'prop-types'
import {connect} from 'react-redux'
import {Platform, Link, View, Text, StyleSheet, Alert} from 'react-native'
import {MapView} from 'expo'

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
                    height: 100,
                    flex: 1,
                    justifyContent: 'center',
                    width: 300,
                  }}>
                  <Text style={{fontWeight: 'bold', marginBottom: 10}}>
                    {office.name}
                  </Text>
                  <Text style={{color: 'royalblue', marginBottom: 10}}>
                    {office.phone_local}
                  </Text>
                  <Text>
                    {office.address}
                  </Text>
                </View>
              </MapView.Callout>
            </MapView.Marker>
          )
        })}
      </MapView>
    )
  }
}

Map.propTypes = {
  fetchOffices: func.isRequired,
  office: oneOf([0, 1, 2]).isRequired,
  snapOffices: array.isRequired,
  wicOffices: array.isRequired,
}

const mapStateToProps = ({office, snapOffices, wicOffices}) => ({
  office,
  snapOffices,
  wicOffices,
})

export default connect(mapStateToProps)(Map)
