import React, { Component } from "react";
import { Permissions, Location } from "expo";
import { number, func, shape, oneOf } from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import SocketIOClient from "socket.io-client";

import { SOCKET_ADDR } from "../utilities/config";

import {
  updateWicEligibility,
  toggleLocationProvided
} from "../redux/actions/actions";
import {
  updateFoodBanks,
  changeZipCode,
  changeLocation
} from "../redux/actions/actionCreators";

import WicForm from "../containers/WicForm";
import Eligible from "../containers/Eligible";
import Ineligible from "../containers/Ineligible";

class Wic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      familySize: "",
      income: "",
      lifeEvents: 2,
      familySizeValid: null,
      incomeValid: null,
      lifeEventsValid: null,
      modalVisible: false
    };
    this.socket = SocketIOClient(SOCKET_ADDR, {
      transports: ["websocket"]
    });
  }
  getLocationAsync = async () => {
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
        this.props.updateFoodBanks();
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
      this.props.updateFoodBanks();
      this.props.toggleLocationProvided(true);
    }
  };

  // determines eligibility and then stores it in AsyncStorage
  checkEligibility = (lifeEvents, familySize, income) => {
    const qualifyingIncomes = [
      0,
      1832.0,
      2470.0,
      3108.0,
      3747.0,
      4385.0,
      5023.0,
      5663.0,
      6304.0
    ];
    if (
      lifeEvents === 0 &&
      familySize <= 8 &&
      income <= qualifyingIncomes[familySize]
    ) {
      this.props.updateWicEligibility(1);
    } else {
      this.props.updateWicEligibility(2);
    }
  };

  toggleModalVisibility = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };
  updateState = obj => {
    this.setState(obj);
  };
  updateLifeEvents = idx => {
    this.setState({
      lifeEvents: idx,
      lifeEventsValid: true
    });
  };

  render() {
    if (this.props.wicEligible === 0) {
      return (
        <WicForm
          language={this.props.language}
          orientation={this.props.orientation}
          familySize={this.state.familySize}
          familySizeValid={this.state.familySizeValid}
          income={this.state.income}
          incomeValid={this.state.incomeValid}
          lifeEvents={this.state.lifeEvents}
          formValid={this.state.formValid}
          lifeEventsValid={this.state.lifeEventsValid}
          updateLifeEvents={this.updateLifeEvents}
          updateState={this.updateState}
          checkEligibility={this.checkEligibility}
        />
      );
    } else if (this.props.wicEligible === 1) {
      return (
        <Eligible
          language={this.props.language}
          updateWicEligibility={this.props.updateWicEligibility}
        />
      );
    }
    return (
      <Ineligible
        socket={this.socket}
        mapLoading={this.props.mapLoading}
        language={this.props.language}
        updateWicEligibility={this.props.updateWicEligibility}
        changeZipCode={this.props.changeZipCode}
        foodBanks={this.props.foodBanks}
        updateFoodBanks={this.props.updateFoodBanks}
        location={this.props.location}
        locationProvided={this.props.locationProvided}
        toggleModalVisibility={this.toggleModalVisibility}
        getLocationAsync={this.getLocationAsync}
        toggleLocationProvided={this.props.toggleLocationProvided}
        modalVisible={this.state.modalVisible}
      />
    );
  }
}

Wic.propTypes = {
  wicEligible: oneOf([0, 1, 2]).isRequired,
  orientation: shape({
    scale: number.isRequired,
    height: number.isRequired,
    width: number.isRequired,
    fontScale: number.isRequired
  }).isRequired,
  updateWicEligibility: func.isRequired,
  language: oneOf(["es", "en"]).isRequired
};

const mapStateToProps = ({
  wicEligible,
  orientation,
  language,
  zipCode,
  foodBanks,
  location,
  locationProvided,
  mapLoading
}) => ({
  wicEligible,
  orientation,
  language,
  zipCode,
  foodBanks,
  location,
  locationProvided,
  mapLoading
});

const mapDispatchToProps = dispatch => ({
  changeZipCode: bindActionCreators(changeZipCode, dispatch),
  changeLocation: bindActionCreators(changeLocation, dispatch),
  updateWicEligibility: bindActionCreators(updateWicEligibility, dispatch),
  updateFoodBanks: bindActionCreators(updateFoodBanks, dispatch),
  toggleLocationProvided: bindActionCreators(toggleLocationProvided, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Wic);
