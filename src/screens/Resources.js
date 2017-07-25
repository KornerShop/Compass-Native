import React, { Component } from "react";
import { oneOf, string, number, bool, func, arrayOf, shape } from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Permissions, Location } from "expo";
import SocketIOClient from "socket.io-client";

import { NGROK_ADDR } from "../utilities/config";

import Office from "../containers/Office";
import Map from "../containers/Map";

import { toggleLocationProvided } from "../redux/actions/actions";
import {
  changeOffice,
  changeZipCode,
  fetchOffices,
  changeLocation
} from "../redux/actions/actionCreators";

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      onboarded: false
    };
    this.socket = SocketIOClient(NGROK_ADDR, {
      transports: ["websocket"]
    });
    this.getLocationAsync = this.getLocationAsync.bind(this);
    this.toggleOnboarded = this.toggleOnboarded.bind(this);
    this.toggleModalVisibility = this.toggleModalVisibility.bind(this);
  }
  async getLocationAsync() {
    const { status: currentStatus } = await Permissions.getAsync(
      Permissions.LOCATION
    );
    if (currentStatus !== "granted") {
      // if app doesn't already have the user's location permission
      const { status: newStatus } = await Permissions.askAsync(
        Permissions.LOCATION
      );
      if (newStatus !== "granted") {
        // if user has denied app their location
        this.toggleModalVisibility();
      } else {
        // if user is giving us location permission for the first time
        var { coords: location } = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true
        });
        this.props.changeLocation(this.socket, {
          latitude: location.latitude,
          longitude: location.longitude
        });
        this.props.toggleLocationProvided(true);
      }
    } else {
      // app already has user's location
      var { coords: location } = await Location.getCurrentPositionAsync({
        enableHighAccuracy: true
      });
      this.props.changeLocation(this.socket, {
        latitude: location.latitude,
        longitude: location.longitude
      });
      this.props.toggleLocationProvided(true);
    }
  }
  toggleOnboarded() {
    this.setState({
      onboarded: true
    });
  }
  toggleModalVisibility() {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }
  render() {
    if (this.props.office === 0) {
      return (
        <Office
          socket={this.socket}
          language={this.props.language}
          height={this.props.orientation.height}
          width={this.props.orientation.width}
          getLocationAsync={this.getLocationAsync}
          changeOffice={this.props.changeOffice}
          modalVisible={this.state.modalVisible}
          changeZipCode={this.props.changeZipCode}
          fetchOffices={this.props.fetchOffices}
          toggleLocationProvided={this.props.toggleLocationProvided}
          toggleModalVisibility={this.toggleModalVisibility}
        />
      );
    }
    // Office has been choosen
    return (
      <Map
        socket={this.socket}
        orientation={this.props.orientation}
        language={this.props.language}
        location={this.props.location}
        office={this.props.office}
        changeOffice={this.props.changeOffice}
        snapOffices={this.props.snapOffices}
        wicOffices={this.props.wicOffices}
        wicVendors={this.props.wicVendors}
        fetchOffices={this.props.fetchOffices}
        getWICVendors={this.props.getWICVendors}
        mapLoading={this.props.mapLoading}
        modalVisible={this.state.modalVisible}
        changeZipCode={this.props.changeZipCode}
        toggleModalVisibility={this.toggleModalVisibility}
        toggleLocationProvided={this.props.toggleLocationProvided}
      />
    );
  }
}

Resources.defaultProps = {
  snapOffices: [],
  wicOffices: [],
  wicVendors: []
};

Resources.propTypes = {
  language: oneOf(["en", "es"]).isRequired,
  orientation: shape({
    scale: number.isRequired,
    height: number.isRequired,
    width: number.isRequired,
    fontScale: number.isRequired
  }).isRequired,
  office: oneOf([0, 1, 2]).isRequired,
  location: shape({
    latitude: number.isRequired,
    longitude: number.isRequired,
    latitudeDelta: number.isRequired,
    longitudeDelta: number.isRequired
  }).isRequired,
  snapOffices: arrayOf(
    shape({
      id: string.isRequired,
      lat: number.isRequired,
      lng: number.isRequired,
      name: string.isRequired,
      address: string.isRequired,
      phone_local: string,
      phone_intl: string
    })
  ),
  wicOffices: arrayOf(
    shape({
      id: string.isRequired,
      lat: number.isRequired,
      lng: number.isRequired,
      name: string.isRequired,
      address: string.isRequired,
      phone_local: string,
      phone_intl: string
    })
  ),
  wicVendors: arrayOf(
    shape({
      id: string.isRequired,
      name: string.isRequired,
      address: string.isRequired,
      lat: number.isRequired,
      lng: number.isRequired
    })
  ),
  changeZipCode: func.isRequired,
  changeOffice: func.isRequired,
  changeLocation: func.isRequired,
  fetchOffices: func.isRequired,
  locationProvided: bool.isRequired,
  mapLoading: bool.isRequired,
  toggleLocationProvided: func.isRequired
};

const mapStateToProps = ({
  locationProvided,
  language,
  orientation,
  office,
  location,
  snapOffices,
  wicOffices,
  wicVendors,
  mapLoading
}) => ({
  locationProvided,
  language,
  orientation,
  office,
  location,
  snapOffices,
  wicOffices,
  wicVendors,
  mapLoading
});

const mapDispatchToProps = dispatch => ({
  changeZipCode: bindActionCreators(changeZipCode, dispatch),
  changeOffice: bindActionCreators(changeOffice, dispatch),
  changeLocation: bindActionCreators(changeLocation, dispatch),
  fetchOffices: bindActionCreators(fetchOffices, dispatch),
  toggleLocationProvided: bindActionCreators(toggleLocationProvided, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Resources);
