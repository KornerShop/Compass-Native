import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Permissions, Location} from 'expo'

import Office from '../components/Office'
import Map from '../components/Map'

import {updateOffice, updateZipCode} from '../redux/actions/actions'
import {updateLocation, fetchOffices} from '../redux/actions/actionCreators'

class Resources extends Component {
  constructor() {
    super()
    this.state = {
      modalVisible: false,
      zipValid: '',
    }
  }
  updateState(obj) {
    this.setState(obj)
  }
  _toggleModalVisiblity() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    })
  }
  async getLocationAsync() {
    const {status: currentStatus} = await Permissions.getAsync(
      Permissions.LOCATION
    )
    if (currentStatus !== 'granted') {
      const {status: newStatus} = await Permissions.askAsync(
        Permissions.LOCATION
      )
      if (newStatus !== 'granted') {
        _toggleModalVisiblity()
      } else {
        var {coords: location} = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        })
      }
    } else {
      var {coords: location} = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      })
    }
    const payload = {
      latitude: location.latitude,
      longitude: location.longitude,
    }
    this.props.updateLocation(payload)
  }
  render() {
    if (this.props.office === 0) {
      return (
        <Office
          height={this.props.orientation.height}
          width={this.props.orientation.width}
          getLocationAsync={this.getLocationAsync.bind(this)}
          updateOffice={this.props.updateOffice}
          modalVisible={this.state.modalVisible}
          zipValid={this.state.zipValid}
          updateZipCode={this.props.updateZipCode}
          updateState={this.updateState.bind(this)}
          fetchOffices={this.props.fetchOffices}
        />
      )
    } else {
      return (
        <Map
          fetchOffices={this.props.fetchOffices}
          region={this.props.location}
        />
      )
    }
  }
}

const mapStateToProps = ({
  language,
  orientation,
  office,
  location,
  zipCode,
  snapOffices,
  wicOffices,
}) => ({
  language,
  orientation,
  office,
  location,
  zipCode,
  snapOffices,
  wicOffices,
})

const mapDispatchToProps = dispatch => ({
  updateOffice: bindActionCreators(updateOffice, dispatch),
  updateLocation: bindActionCreators(updateLocation, dispatch),
  updateZipCode: bindActionCreators(updateZipCode, dispatch),
  fetchOffices: bindActionCreators(fetchOffices, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Resources)
