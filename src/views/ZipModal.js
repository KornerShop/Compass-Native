import React, { Component } from "react";
import { bool, func, object, oneOf } from "prop-types";

import { Modal, View, Platform } from "react-native";

import {
  FormHeader,
  StyledInputZip,
  ZipModalInputWrapper
} from "../components/styled/Styled";

import SubmitButton from "../components/SubmitButton";

import localizedStrings from "../utilities/localization";

class ZipModal extends Component {
  state = {
    zipCode: "",
    zipValid: true
  };
  onChangeZip = zipCode => {
    this.setState({ zipCode });
  };
  render() {
    const localization = this.props.foodBanks
      ? localizedStrings[this.props.language].zipModal.foodBanks
      : localizedStrings[this.props.language].zipModal.header;
    return (
      <Modal
        style={{ flex: 1 }}
        animationType="slide"
        visible={this.props.modalVisible}
        onRequestClose={this.props.toggleModalVisibility}
      >
        <View
          accessible={false}
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: 100,
            paddingHorizontal: 20,
            backgroundColor: "#21CFBF"
          }}
        >
          <FormHeader zip>
            {localization}
          </FormHeader>
          <ZipModalInputWrapper zip valid={this.state.zipValid}>
            <StyledInputZip
              zip
              placeholder={
                localizedStrings[this.props.language].zipModal.zipCode
              }
              placeholderTextColor="white"
              underlineColorAndroid="rgba(0,0,0,0)"
              value={this.state.zipCode}
              valid={this.state.zipValid}
              maxLength={5}
              returnKeyType="done"
              keyboardType={`${Platform.OS === "ios"
                ? "numbers-and-punctuation"
                : "numeric"}`}
              onChangeText={zipCode => {
                this.onChangeZip(zipCode);
                if (/^9[0-6]\d\d\d$/.test(zipCode)) {
                  return this.setState({
                    zipValid: true
                  });
                }
                return this.setState({
                  zipValid: false
                });
              }}
            />
          </ZipModalInputWrapper>
          <SubmitButton
            zip
            title={localizedStrings[this.props.language].buttons.submit}
            accessibility={
              localizedStrings[this.props.language].buttons.accessibilitySubmit
            }
            onPress={() => {
              if (this.state.zipValid && this.state.zipCode) {
                this.props.changeZipCode(this.props.socket, this.state.zipCode);
                if (this.props.foodBanks) {
                  this.props.updateFoodBanks();
                } else {
                  this.props.updateOffices();
                  this.props.updateWICVendorsZipModal(this.state.zipCode);
                }
                this.props.toggleLocationProvided(true);
                this.props.toggleModalVisibility();
              }
            }}
            onAccessibilityTap={() => {
              if (this.state.zipValid && this.state.zipCode) {
                this.props.changeZipCode(this.props.socket, this.state.zipCode);
                if (this.props.foodBanks) {
                  this.props.updateFoodBanks();
                } else {
                  this.props.updateOffices();
                  this.props.updateWICVendorsZipModal(this.state.zipCode);
                }
                this.props.toggleLocationProvided(true);
                this.props.toggleModalVisibility();
              }
            }}
          />
        </View>
      </Modal>
    );
  }
}

ZipModal.defaultProps = {
  foodBanks: null,
  updateOffices: null,
  updateFoodBanks: null,
  updateWICVendorsZipModal: null
};

ZipModal.propTypes = {
  modalVisible: bool.isRequired,
  changeZipCode: func.isRequired,
  updateOffices: func,
  updateFoodBanks: func,
  toggleModalVisibility: func.isRequired,
  language: oneOf(["en", "es"]).isRequired,
  toggleLocationProvided: func.isRequired,
  socket: object.isRequired,
  foodBanks: bool,
  updateWICVendorsZipModal: func
};

export default ZipModal;
