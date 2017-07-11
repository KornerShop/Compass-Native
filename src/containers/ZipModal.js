import React from 'react';
import { string, number, bool, func } from 'prop-types';

import {
  Modal,
  TouchableHighlight,
  View,
  Text,
  TextInput,
  Platform
} from 'react-native';

import {
  FormHeader,
  StyledInputZip,
  ZipModalInputWrapper
} from '../components/styled/Styled';

import SubmitButton from '../components/SubmitButton';

import localizedStrings from '../utilities/localization';

const ZipModal = props =>
  <Modal
    style={{ flex: 1 }}
    animationType="slide"
    visible={props.modalVisible}
    onRequestClose={props.toggleModalVisibility}
  >
    <View
      accessible={false}
      style={{
        flex: 1,
        justifyContent: 'space-around',
        paddingVertical: 100,
        paddingHorizontal: 20,
        backgroundColor: '#00897b'
      }}
    >
      <FormHeader zip>
        {localizedStrings[props.language].zipModal.header}
      </FormHeader>
      <ZipModalInputWrapper zip valid={props.zipValid}>
        <StyledInputZip
          zip
          placeholder={
            localizedStrings[props.language].zipModal.zipCode
          }
          placeholderTextColor="white"
          underlineColorAndroid="rgba(0,0,0,0)"
          value={props.zipCode}
          valid={props.zipValid}
          maxLength={5}
          returnKeyType="done"
          keyboardType={`${Platform.OS === 'ios'
            ? 'numbers-and-punctuation'
            : 'numeric'}`}
          onChangeText={zipCode => {
            props.updateZipCode(zipCode);
            if (/^9[0-6]\d\d\d$/.test(zipCode)) {
              return props.updateState({
                zipValid: true
              });
            }
            props.updateState({
              zipValid: false
            });
          }}
        />
      </ZipModalInputWrapper>
      <SubmitButton
        zip
        title={localizedStrings[props.language].buttons.submit}
        accessibility={
          localizedStrings[props.language].buttons.accessibilitySubmit
        }
        onPress={() => {
          if (props.zipValid && props.zipCode) {
            props.fetchOffices(true);
            props.toggleLocationProvided(true);
            props.toggleModalVisibility();
          }
          return null;
        }}
        onAccessibilityTap={() => {
          if (props.zipValid && props.zipCode) {
            props.fetchOffices(true);
            props.toggleLocationProvided(true);
            props.toggleModalVisibility();
          }
          return null;
        }}
      />
    </View>
  </Modal>;

ZipModal.propTypes = {
  modalVisible: bool.isRequired,
  zipCode: string.isRequired,
  zipValid: bool.isRequired,
  updateZipCode: func.isRequired,
  updateState: func.isRequired,
  fetchOffices: func.isRequired,
  toggleModalVisibility: func.isRequired
};

export default ZipModal;
