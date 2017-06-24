import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Permissions, Location} from 'expo'

import Office from '../components/Office'
import Map from '../components/Map'

import {
  updateOffice,
  updateZipCode,
  populateSnapOffices,
  populateWicOffices,
} from '../redux/actions/actions'
import {dispatchUpdateLocation} from '../redux/actions/actionCreators'

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
    this.props.dispatchUpdateLocation(payload)
  }
  // update office state
  // Modal: update location state; update office state
  render() {
    switch (this.props.office) {
      case 0:
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
          />
        )
      case 1:
        return (
          <Map offices={this.props.snapOffices} region={this.props.location} />
        )
      case 2:
        return (
          <Map offices={this.props.wicOffices} region={this.props.location} />
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
  dispatchUpdateLocation: bindActionCreators(dispatchUpdateLocation, dispatch),
  updateZipCode: bindActionCreators(updateZipCode, dispatch),
  populateSnapOffices: bindActionCreators(populateSnapOffices, dispatch),
  populateWicOffices: bindActionCreators(populateWicOffices, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Resources)
