import React, { Component } from "react";
import { func, oneOf } from "prop-types";

import { View, Platform } from "react-native";
import { MapView } from "expo";

import { StyledContainer, EligibleHeader } from "../components/styled/Styled";
import EligibilityButton from "../components/EligibilityButton";

import localizedStrings from "../utilities/localization";
import MarkerView from '../components/MarkerView';

export default class Ineligible extends Component {
  componentDidMount() {
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
            <EligibleHeader>
              {localizedStrings[this.props.language].ineligible.header}
            </EligibleHeader>
            <EligibleHeader>
              {localizedStrings[this.props.language].ineligible.foodBanks}
            </EligibleHeader>
            <MapView
              style={{
                flex: 1,
                borderRadius: 2,
              }}
              provider={Platform.OS === 'ios' ? null : 'google'}
              region={this.props.location}
            >
              {this.props.foodBanks.map(foodBank =>
                <MapView.Marker
                  accessibilityLabels="button"
                  key={foodBank.id}
                  coordinate={{
                    latitude: foodBank.lat,
                    longitude: foodBank.lng,
                  }}
                  image={require('../assets/groceries.png')}
                >
                  <MapView.Callout tooltip>
                    <MarkerView
                      {...foodBank}
                      socket={this.props.socket}
                      office={2}
                      location={this.props.location}
                    />
                  </MapView.Callout>
                </MapView.Marker>,
              )}
            </MapView>
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
      </View>
    );
  }
}

Ineligible.propTypes = {
  updateWicEligibility: func.isRequired,
  language: oneOf(["es", "en"]).isRequired,
  getFoodBanks: func.isRequired
};
