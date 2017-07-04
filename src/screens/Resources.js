import React, {Component} from 'react'
import {
  oneOf,
  string,
  number,
  bool,
  object,
  func,
  shape,
  array,
} from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Permissions, Location} from 'expo'

import Office from '../containers/Office'
import Map from '../containers/Map'

import {
  updateOffice,
  updateZipCode,
  toggleLocationProvided,
} from '../redux/actions/actions'
import {
  updateLocation,
  fetchOffices,
} from '../redux/actions/actionCreators'

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
  toggleModalVisibility() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    })
  }
  async getLocationAsync() {
    const {
      status: currentStatus,
    } = await Permissions.getAsync(
      Permissions.LOCATION
    )
    if (currentStatus !== 'granted') {
      // if app doesn't already have the user's location permission
      const {
        status: newStatus,
      } = await Permissions.askAsync(
        Permissions.LOCATION
      )
      if (newStatus !== 'granted') {
        // if user has denied app their location
        this.toggleModalVisibility()
      } else {
        // if user is giving us location permission for the first time
        var {
          coords: location,
        } = await Location.getCurrentPositionAsync(
          {
            enableHighAccuracy: true,
          }
        )
        this.props.updateLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        })
        this.props.toggleLocationProvided(true)
      }
    } else {
      // app already has user's location
      var {
        coords: location,
      } = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      })
      this.props.updateLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      })
      this.props.toggleLocationProvided(true)
    }
  }
  render() {
    if (this.props.locationProvided === false) {
      return (
        <Office
          language={this.props.language}
          height={this.props.orientation.height}
          width={this.props.orientation.width}
          getLocationAsync={this.getLocationAsync.bind(
            this
          )}
          updateOffice={this.props.updateOffice}
          modalVisible={this.state.modalVisible}
          zipValid={this.state.zipValid}
          updateZipCode={this.props.updateZipCode}
          updateState={this.updateState.bind(
            this
          )}
          fetchOffices={this.props.fetchOffices}
          zipCode={this.props.zipCode}
          toggleLocationProvided={
            this.props.toggleLocationProvided
          }
          toggleModalVisibility={this.toggleModalVisibility.bind(
            this
          )}
        />
      )
    } else {
      // location hasn't been provided
      return (
        <Map
          language={this.props.language}
          location={this.props.location}
          office={this.props.office}
          updateOffice={this.props.updateOffice}
          snapOffices={this.props.snapOffices}
          wicOffices={this.props.wicOffices}
          fetchOffices={this.props.fetchOffices}
          region={this.props.location}
          mapLoading={this.props.mapLoading}
          updateOffice={this.props.updateOffice}
          modalVisible={this.state.modalVisible}
          zipValid={this.state.zipValid}
          updateZipCode={this.props.updateZipCode}
          updateState={this.updateState.bind(
            this
          )}
          toggleModalVisibility={
            props.toggleModalVisibility
          }
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
  zipCode: string.isRequired,
  snapOffices: array.isRequired,
  wicOffices: array.isRequired,
  // updateZipCode: func.isRequied,
  updateOffice: func.isRequired,
  updateLocation: func.isRequired,
  fetchOffices: func.isRequired,
  locationProvided: bool.isRequired,
  mapLoading: bool.isRequired,
}

const mapStateToProps = ({
  locationProvided,
  language,
  orientation,
  office,
  location,
  zipCode,
  snapOffices,
  wicOffices,
  mapLoading,
}) => ({
  locationProvided,
  language,
  orientation,
  office,
  location,
  zipCode,
  snapOffices,
  wicOffices,
  mapLoading,
})

const mapDispatchToProps = dispatch => ({
  updateZipCode: bindActionCreators(
    updateZipCode,
    dispatch
  ),
  updateOffice: bindActionCreators(
    updateOffice,
    dispatch
  ),
  updateLocation: bindActionCreators(
    updateLocation,
    dispatch
  ),
  fetchOffices: bindActionCreators(
    fetchOffices,
    dispatch
  ),
  toggleLocationProvided: bindActionCreators(
    toggleLocationProvided,
    dispatch
  ),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resources)
