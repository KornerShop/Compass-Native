import React, { Component } from 'react';
import {
  oneOf,
  string,
  number,
  bool,
  func,
  arrayOf,
  shape,
} from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Permissions, Location } from 'expo';

import Office from '../containers/Office';
import Map from '../containers/Map';

import {
  updateOffice,
  updateZipCode,
  toggleLocationProvided,
  updateLocation,
} from '../redux/actions/actions';
import fetchOffices from '../redux/actions/actionCreators';

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      zipValid: true,
    };
    this.getLocationAsync = this.getLocationAsync.bind(this);
    this.updateState = this.updateState.bind(this);
    this.toggleModalVisibility.bind(this);
    this.updateState.bind(this);
    this.toggleModalVisibility = this.toggleModalVisibility.bind(
      this,
    );
  }
  async getLocationAsync() {
    const { status: currentStatus } = await Permissions.getAsync(
      Permissions.LOCATION,
    );
    if (currentStatus !== 'granted') {
      // if app doesn't already have the user's location permission
      const { status: newStatus } = await Permissions.askAsync(
        Permissions.LOCATION,
      );
      if (newStatus !== 'granted') {
        // if user has denied app their location
        this.toggleModalVisibility();
      } else {
        // if user is giving us location permission for the first time
        var {
          coords: location,
        } = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        this.props.updateLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        this.props.toggleLocationProvided(true);
      }
    } else {
      // app already has user's location
      var {
        coords: location,
      } = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true,
      });
      this.props.updateLocation({
        latitude: location.latitude,
        longitude: location.longitude,
      });
      this.props.toggleLocationProvided(true);
    }
  }
  toggleModalVisibility() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }
  updateState(obj) {
    this.setState(obj);
  }
  render() {
    if (this.props.locationProvided === false) {
      return (
        <Office
          language={this.props.language}
          height={this.props.orientation.height}
          width={this.props.orientation.width}
          getLocationAsync={this.getLocationAsync}
          updateOffice={this.props.updateOffice}
          modalVisible={this.state.modalVisible}
          zipValid={this.state.zipValid}
          updateZipCode={this.props.updateZipCode}
          updateState={this.updateState}
          fetchOffices={this.props.fetchOffices}
          zipCode={this.props.zipCode}
          toggleLocationProvided={this.props.toggleLocationProvided}
          toggleModalVisibility={this.toggleModalVisibility}
        />
      );
    }
    // location hasn't been provided
    return (
      <Map
        orientation={this.props.orientation}
        language={this.props.language}
        location={this.props.location}
        office={this.props.office}
        updateOffice={this.props.updateOffice}
        snapOffices={this.props.snapOffices}
        wicOffices={this.props.wicOffices}
        fetchOffices={this.props.fetchOffices}
        mapLoading={this.props.mapLoading}
        modalVisible={this.state.modalVisible}
        zipCode={this.props.zipCode}
        zipValid={this.state.zipValid}
        updateZipCode={this.props.updateZipCode}
        updateState={this.updateState}
        toggleModalVisibility={this.toggleModalVisibility}
        toggleLocationProvided={this.props.toggleLocationProvided}
      />
    );
  }
}

Resources.defaultProps = {
  snapOffices: [],
  wicOffices: []
}

Resources.propTypes = {
  language: oneOf(['en', 'es']).isRequired,
  orientation: shape({
    scale: number.isRequired,
    height: number.isRequired,
    width: number.isRequired,
    fontScale: number.isRequired,
  }).isRequired,
  office: oneOf([0, 1, 2]).isRequired,
  location: shape({
    latitude: number.isRequired,
    longitude: number.isRequired,
    latitudeDelta: number.isRequired,
    longitudeDelta: number.isRequired,
  }).isRequired,
  zipCode: string.isRequired,
  snapOffices: arrayOf(
    shape({
      id: string.isRequired,
      lat: number.isRequired,
      lng: number.isRequired,
      name: string.isRequired,
      address: string.isRequired,
      phone_local: string,
      phone_intl: string,
    }).isRequired,
  ),
  wicOffices: arrayOf(
    shape({
      id: string.isRequired,
      lat: number.isRequired,
      lng: number.isRequired,
      name: string.isRequired,
      address: string.isRequired,
      phone_local: string,
      phone_intl: string,
    }).isRequired,
  ),
  updateZipCode: func.isRequired,
  updateOffice: func.isRequired,
  updateLocation: func.isRequired,
  fetchOffices: func.isRequired,
  locationProvided: bool.isRequired,
  mapLoading: bool.isRequired,
  toggleLocationProvided: func.isRequired,
};

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
});

const mapDispatchToProps = dispatch => ({
  updateZipCode: bindActionCreators(updateZipCode, dispatch),
  updateOffice: bindActionCreators(updateOffice, dispatch),
  updateLocation: bindActionCreators(updateLocation, dispatch),
  fetchOffices: bindActionCreators(fetchOffices, dispatch),
  toggleLocationProvided: bindActionCreators(
    toggleLocationProvided,
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(
  Resources,
);
