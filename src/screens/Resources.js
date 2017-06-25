import React, {Component} from 'react'
import {oneOf, number, bool, object, func, shape, array} from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Permissions, Location} from 'expo'

import Office from '../containers/Office'
import Map from '../containers/Map'

import {updateOffice, updateZipCode} from '../redux/actions/actions'
import {updateLocation, fetchOffices} from '../redux/actions/actionCreators'

class Resources extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      zipValid: true,
    }
  }
  updateState(obj) {
    this.setState(obj)
  }
  toggleModalVisiblity() {
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
        toggleModalVisiblity()
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
          toggleModalVisibility={this.toggleModalVisiblity.bind(this)}
          zipCode={this.props.zipCode}
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

Resources.propTypes = {
  language: oneOf(['en', 'es']).isRequired,
  orientation: object.isRequired,
  office: oneOf([0, 1, 2]).isRequired,
  location: shape({
    latitude: number.isRequired,
    longitude: number.isRequired,
    latitudeDelta: number.isRequired,
    longitudeDelta: number.isRequired,
  }).isRequired,
  zipCode: number.isRequired,
  snapOffices: array.isRequired,
  wicOffices: array.isRequired,
  // updateZipCode: func.isRequied,
  updateOffice: func.isRequired,
  updateLocation: func.isRequired,
  fetchOffices: func.isRequired,
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
  updateZipCode: bindActionCreators(updateZipCode, dispatch),
  updateOffice: bindActionCreators(updateOffice, dispatch),
  updateLocation: bindActionCreators(updateLocation, dispatch),
  fetchOffices: bindActionCreators(fetchOffices, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Resources)
