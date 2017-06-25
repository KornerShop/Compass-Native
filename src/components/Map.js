import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Alert} from 'react-native'
import {MapView} from 'expo'

import {dispatchUpdateLocation} from '../redux/actions/actionCreators'

// you might need a custom callout here (more info about locale/link to device's map)
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

const mapStateToProps = ({office, snapOffices, wicOffices}) => ({
  office,
  snapOffices,
  wicOffices,
})

export default connect(mapStateToProps)(Map)
