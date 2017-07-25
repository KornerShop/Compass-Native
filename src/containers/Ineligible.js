import React, { Component } from "react";
import { bool, object, func, oneOf } from "prop-types";

import { View, Platform, ActivityIndicator } from "react-native";
import { MapView } from "expo";

import { StyledContainer, IneligibleHeader, ActivityIndicatorWrapper } from "../components/styled/Styled";

import ZipModal from "./ZipModal";
import EligibilityButton from "../components/EligibilityButton";

import localizedStrings from "../utilities/localization";
import MarkerView from "../components/MarkerView";

export default class Ineligible extends Component {
  async componentDidMount() {
    await this.props.getLocationAsync();
    this.props.getFoodBanks();
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 20,
          paddingHorizontal: 5,
          paddingBottom: 5,
          backgroundColor: "white"
        }}
      >
        <StyledContainer>
          <View
            style={{
              flex: 1,
              justifyContent: "space-around"
            }}
          >
            <IneligibleHeader>
              {localizedStrings[this.props.language].ineligible.header}
              {localizedStrings[this.props.language].ineligible.foodBanks}
            </IneligibleHeader>
            {this.props.mapLoading
              ? <ActivityIndicatorWrapper>
                  <ActivityIndicator color="#21CFBF" size="large" />
                </ActivityIndicatorWrapper>
              : <MapView
                  style={{
                    flex: 1,
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
                </MapView>}
            <EligibilityButton
              language={this.props.language}
              ineligible
              title={localizedStrings[this.props.language].buttons.recheck}
              accessibility={
                localizedStrings[this.props.language].buttons
                  .accessibilityRecheck
              }
              updateWicEligibility={this.props.updateWicEligibility}
            />
          </View>
        </StyledContainer>
        <ZipModal
          foodBanks
          socket={this.props.socket}
          language={this.props.language}
          changeZipCode={this.props.changeZipCode}
          modalVisible={this.props.modalVisible}
          getFoodBanks={this.props.getFoodBanks}
          toggleLocationProvided={this.props.toggleLocationProvided}
          toggleModalVisibility={this.props.toggleModalVisibility}
        />
      </View>
    );
  }
}

Ineligible.propTypes = {
  getLocationAsync: func.isRequired,
  locationProvided: bool.isRequired,
  updateWicEligibility: func.isRequired,
  language: oneOf(["es", "en"]).isRequired,
  getFoodBanks: func.isRequired,
  changeZipCode: func.isRequired,
  modalVisible: bool.isRequired,
  toggleLocationProvided: func.isRequired,
  toggleModalVisibility: func.isRequired,
  socket: object.isRequired
};
