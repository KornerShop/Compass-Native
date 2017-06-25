import React, {Component} from 'react'
import {oneOf, array, func} from 'prop-types'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Alert} from 'react-native'
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
    const offices = this.props.office === 0
      ? this.props.snapOffices
      : this.props.wicOffices
    return (
      <MapView style={{flex: 1}} provider="google" region={this.props.region}>
        {offices.map(marker => {
          return (
            <MapView.Marker
              key={marker.id}
              coordinate={{
                latitude: marker.geometry.location.lat,
                longitude: marker.geometry.location.lng,
              }}
              title={marker.name}
              description={marker.vicinity}
            />
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
