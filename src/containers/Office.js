import React, { Component } from 'react';
import { string, number, bool, func, oneOf } from 'prop-types';

import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableHighlight
} from 'react-native';

import { Icon, Button } from 'react-native-elements';

import ZipModal from './ZipModal';
import {
  ImageContainer,
  OfficeText
} from '../components/styled/Styled';

import localizedStrings from '../utilities/localization';

const Office = props => {
  const officeChosen = async officeNum => {
    props.updateOffice(officeNum);
    await props.getLocationAsync();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#2C2C2C'
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: 'column'
        }}
      >
        <StatusBar barStyle="light-content" />
        <TouchableHighlight
          style={{
            flex: 0.5,
            marginTop: 25,
            marginLeft: 5,
            marginRight: 5
          }}
          onPress={() => officeChosen(1)}
        >
          <ImageContainer
            borderRadius={2}
            height={props.height / 2}
            width={props.width - 10}
            source={require('../assets/snap1.jpg')}
            resizeMode="cover"
          >
            <OfficeText
              style={{
                fontFamily: 'merriweather-sans'
              }}
            >
              CalFresh
            </OfficeText>
            <Button
              raised
              icon={{
                color: '#2C2C2C',
                type: 'ionicon',
                name: 'ios-nutrition',
                size: 30
              }}
              borderRadius={2}
              containerViewStyle={{
                borderRadius: 2,
                marginTop: 20
              }}
              buttonStyle={{
                paddingHorizontal: 30
              }}
              color="#2C2C2C"
              backgroundColor="white"
              title={localizedStrings[
                props.language
              ].buttons.office.toUpperCase()}
              fontFamily="merriweather-sans"
              onPress={() => officeChosen(1)}
            />
          </ImageContainer>
        </TouchableHighlight>
        <TouchableHighlight
          style={{
            flex: 0.5,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 10
          }}
          onPress={() => officeChosen(2)}
        >
          <ImageContainer
            borderRadius={2}
            height={props.height / 2}
            width={props.width - 10}
            source={require('../assets/wic1.jpeg')}
            resizeMode="cover"
          >
            <OfficeText
              style={{
                fontFamily: 'merriweather-sans'
              }}
            >
              WIC
            </OfficeText>
            <Button
              raised
              icon={{
                color: '#2C2C2C',
                type: 'ionicon',
                name: 'ios-woman',
                size: 30
              }}
              borderRadius={2}
              containerViewStyle={{
                borderRadius: 2,
                marginTop: 20
              }}
              buttonStyle={{
                paddingHorizontal: 30
              }}
              color="#2C2C2C"
              backgroundColor="white"
              title={localizedStrings[
                props.language
              ].buttons.office.toUpperCase()}
              fontFamily="merriweather-sans"
              onPress={officeChosen.bind(null, 2)}
            />
          </ImageContainer>
        </TouchableHighlight>
        <ZipModal
          language={props.language}
          zipCode={props.zipCode}
          zipValid={props.zipValid}
          updateZipCode={props.updateZipCode}
          modalVisible={props.modalVisible}
          updateState={props.updateState}
          fetchOffices={props.fetchOffices}
          toggleLocationProvided={props.toggleLocationProvided}
          toggleModalVisibility={props.toggleModalVisibility}
        />
      </View>
    </View>
  );
};

Office.propTypes = {
  getLocationAsync: func.isRequired,
  updateOffice: func.isRequired,
  height: number.isRequired,
  width: number.isRequired,
  zipCode: string.isRequired,
  zipValid: bool.isRequired,
  updateZipCode: func.isRequired,
  modalVisible: bool.isRequired,
  updateState: func.isRequired,
  fetchOffices: func.isRequired,
  toggleLocationProvided: func.isRequired,
  toggleModalVisibility: func.isRequired,
  language: oneOf(['en', 'es']).isRequired
};

export default Office;
