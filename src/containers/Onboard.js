import React from 'react';
import { number, oneOf, func, shape } from 'prop-types';
import { Text, View, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-looped-carousel';

import styled from 'styled-components/native';

import OnboardButton from '../components/OnboardButton';
import localizedStrings from '../utilities/localization';

const OnboardScreen = styled.View`flex: 1;`;

const Onboard = ({
  orientation: { height, width },
  toggleStart,
  language,
}) => {
  const orientationObj = {
    height,
    width,
  };
  return (
    <OnboardScreen>
      <Carousel
        style={orientationObj}
        autoplay={false}
        bullets
        swipe
        bulletStyle={{
          backgroundColor: '#cfd8dc',
        }}
        bulletsContainerStyle={{
          marginBottom: 30,
        }}
        chosenBulletStyle={{
          backgroundColor: '#78909c',
        }}
        onAnimateNextPage={p => console.log(p)}
      >
        <View
          style={[
            {
              backgroundColor: 'white',
              marginTop: 110,
              alignItems: 'center',
              flexDirection: 'column',
            },
            orientationObj,
          ]}
        >
          <Text>
            {Platform.OS === 'ios'
              ? <Ionicons
                name="md-compass"
                size={180}
                  color="tomato"
                />
              : <Ionicons
                  name="ios-locate"
                  size={180}
                  color="tomato"
                />}
          </Text>
          <Text
            style={{
              marginTop: 20,
              padding: 20,
              textAlign: 'center',
              fontSize: 35,
            }}
          >
            {localizedStrings[language].onboard.officeHeader}
          </Text>
          <Text
            style={{
              padding: 30,
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            {localizedStrings[language].onboard.officeText}
          </Text>
        </View>
        <View
          style={[
            {
              marginTop: 120,
              alignItems: 'center',
              flexDirection: 'column',
              backgroundColor: 'white',
            },
            orientationObj,
          ]}
        >
          <Text>
            <Ionicons
              name="ios-nutrition-outline"
              size={180}
              color="tomato"
            />
          </Text>
          <Text
            style={{
              marginTop: 20,
              padding: 20,
              textAlign: 'center',
              fontSize: 35,
            }}
          >
            CalFresh
          </Text>
          <Text
            style={{
              padding: 30,
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            {localizedStrings[language].onboard.snapText}
          </Text>
        </View>
        <View
          style={[
            {
              backgroundColor: 'white',
              marginTop: 120,
              alignItems: 'center',
              flexDirection: 'column',
            },
            orientationObj,
          ]}
        >
          <Text>
            <Ionicons
              name="ios-woman-outline"
              size={180}
              color="tomato"
            />
          </Text>
          <Text
            style={{
              marginTop: 20,
              padding: 20,
              textAlign: 'center',
              fontSize: 35,
            }}
          >
            WIC
          </Text>
          <Text
            style={{
              padding: 30,
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            {localizedStrings[language].onboard.wicText}
          </Text>
          <OnboardButton
            title={localizedStrings[language].buttons.onboard}
            onPress={toggleStart}
          />
        </View>
      </Carousel>
    </OnboardScreen>
  );
};

Onboard.propTypes = {
  language: oneOf(['en', 'es']).isRequired,
  orientation: shape({
    scale: number,
    height: number.isRequired,
    width: number.isRequired,
    fontScale: number,
  }).isRequired,
  toggleStart: func.isRequired,
};

export default Onboard;
