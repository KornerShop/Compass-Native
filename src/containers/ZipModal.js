import React, { Component } from 'react';
import { string, bool, func, object, oneOf } from 'prop-types';

import { Modal, View, Platform } from 'react-native';

import {
  FormHeader,
  StyledInputZip,
  ZipModalInputWrapper,
} from '../components/styled/Styled';

import SubmitButton from '../components/SubmitButton';

import localizedStrings from '../utilities/localization';

class ZipModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      zipCode: '',
      zipValid: true,
    };
    this.onChangeZip = this.onChangeZip.bind(this);
  }
  onChangeZip(zipCode) {
    this.setState({ zipCode });
  }
  render() {
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
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 100,
            paddingHorizontal: 20,
            backgroundColor: '#21CFBF',
          }}
        >
          <FormHeader zip>
            {localizedStrings[this.props.language].zipModal.header}
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
              keyboardType={`${Platform.OS === 'ios'
                ? 'numbers-and-punctuation'
                : 'numeric'}`}
              onChangeText={zipCode => {
                this.onChangeZip(zipCode);
                if (/^9[0-6]\d\d\d$/.test(zipCode)) {
                  return this.setState({
                    zipValid: true,
                  });
                }
                return this.setState({
                  zipValid: false,
                });
              }}
            />
          </ZipModalInputWrapper>
          <SubmitButton
            zip
            title={
              localizedStrings[this.props.language].buttons.submit
            }
            accessibility={
              localizedStrings[this.props.language].buttons
                .accessibilitySubmit
            }
            onPress={() => {
              if (this.state.zipValid && this.state.zipCode) {
                this.props.changeZipCode(
                  this.props.socket,
                  this.state.zipCode,
                );
                this.props.fetchOffices(true);
                this.props.toggleLocationProvided(true);
                this.props.toggleModalVisibility();
              }
              return null;
            }}
            onAccessibilityTap={() => {
              if (this.state.zipValid && this.state.zipCode) {
                this.props.changeZipCode(
                  this.props.socket,
                  this.state.zipCode,
                );
                this.props.fetchOffices(true);
                this.props.toggleLocationProvided(true);
                this.props.toggleModalVisibility();
              }
              return null;
            }}
          />
        </View>
      </Modal>
    );
  }
}

ZipModal.propTypes = {
  modalVisible: bool.isRequired,
  changeZipCode: func.isRequired,
  fetchOffices: func.isRequired,
  toggleModalVisibility: func.isRequired,
  language: oneOf(['en', 'es']).isRequired,
  toggleLocationProvided: func.isRequired,
  socket: object.isRequired,
};

export default ZipModal;
