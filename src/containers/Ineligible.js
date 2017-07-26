import React, { Component } from "react";
import { bool, object, func, oneOf } from "prop-types";

import { View, Platform, ActivityIndicator } from "react-native";
import { MapView } from "expo";

import {
  IneligibleHeader,
  ActivityIndicatorWrapper
} from "../components/styled/Styled";

import ZipModal from "./ZipModal";
import EligibilityButton from "../components/EligibilityButton";

import localizedStrings from "../utilities/localization";
import MarkerView from "../components/MarkerView";

export default class Ineligible extends Component {
  constructor() {
    super();
    this.state = {
      selectedCalloutIndex: 0
    };
    this.onCalloutPressed = this.onCalloutPressed.bind(this);
  }
  async componentDidMount() {
    await this.props.getLocationAsync();
    this.props.updateFoodBanks();
  }
  onCalloutPressed(index) {
    const calloutRef = `callout-${index}`;
    const item = this.refs[calloutRef];
    this.setState({ selectedCalloutIndex: index });
  }

  render() {
    let index;
    return (
      <View
        accessible={false}
        style={{
          flex: 1,
          paddingTop: 10,
          paddingBottom: 5,
          paddingHorizontal: 5,
          backgroundColor: "white"
        }}
      >
        {this.props.mapLoading
          ? <ActivityIndicatorWrapper>
            <ActivityIndicator color="#21CFBF" size="large" />
          </ActivityIndicatorWrapper>
          : <View
            style={{
                flex: 1,
                justifyContent: "space-between",
                paddingLeft: 5,
                paddingRight: 5,
                paddingBottom: 20,
                paddingTop: 30,
                marginTop: 10
            }}
            >
            <IneligibleHeader>
              {localizedStrings[this.props.language].ineligible.header}
              {localizedStrings[this.props.language].ineligible.foodBanks}
            </IneligibleHeader>
            <MapView
              style={{
                  flex: 1,
                  marginBottom: 25,
                  marginTop: 20,
                  borderRadius: 2
              }}
              provider={Platform.OS === "ios" ? null : "google"}
              region={this.props.location}
            >
              {this.props.foodBanks.map(foodBank =>
                <MapView.Marker
                  accessibilityLabels="button"
                  key={foodBank.id}
                  coordinate={{
                      latitude: foodBank.lat,
                      longitude: foodBank.lng
                  }}
                  image={require("../assets/apple.png")}
                  zIndex={this.state.selectedCalloutIndex === index ? 999 : 0}
                  onPress={() => this.onCalloutPressed(index)}
                  ref={`callout-${index}`}
                >
                  <MapView.Callout tooltip>
                    <MarkerView
                      {...foodBank}
                      socket={this.props.socket}
                      office={2}
                      location={this.props.location}
                    />
                  </MapView.Callout>
                </MapView.Marker>
              )}
            </MapView>
            <EligibilityButton
              ineligible
              language={this.props.language}
              title={localizedStrings[this.props.language].buttons.recheck}
              accessibility={
                  localizedStrings[this.props.language].buttons
                    .accessibilityRecheck
                }
                updateWicEligibility={this.props.updateWicEligibility}
              />
              <ZipModal
                foodBanks
                socket={this.props.socket}
                language={this.props.language}
                changeZipCode={this.props.changeZipCode}
                modalVisible={this.props.modalVisible}
                updateFoodBanks={this.props.updateFoodBanks}
                toggleLocationProvided={this.props.toggleLocationProvided}
                toggleModalVisibility={this.props.toggleModalVisibility}
              />
            </View>}
      </View>
    );
  }
}

Ineligible.propTypes = {
  getLocationAsync: func.isRequired,
  locationProvided: bool.isRequired,
  updateWicEligibility: func.isRequired,
  language: oneOf(["es", "en"]).isRequired,
  updateFoodBanks: func.isRequired,
  changeZipCode: func.isRequired,
  modalVisible: bool.isRequired,
  toggleLocationProvided: func.isRequired,
  toggleModalVisibility: func.isRequired,
  mapLoading: bool.isRequired,
  socket: object.isRequired
};
