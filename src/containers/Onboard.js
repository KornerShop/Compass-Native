import React from 'react';
import { number, func, shape } from 'prop-types';
import { Text, View, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-looped-carousel';

import styled from 'styled-components/native';

import OnboardButton from '../components/OnboardButton';

const OnboardScreen = styled.View`flex: 1;`;

const Onboard = ({ orientation: { height, width }, toggleStart }) => {
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
          marginBottom: 50,
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
              marginTop: 120,
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
                  size={190}
                  color="tomato"
                />
              : <Ionicons
                  name="ios-locate"
                  size={190}
                  color="tomato"
                />}
          </Text>
          <Text
            style={{
              marginTop: 20,
              padding: 20,
              textAlign: 'center',
              fontSize: 40,
            }}
          >
            Office Search
          </Text>
          <Text
            style={{
              padding: 30,
              textAlign: 'center',
              fontSize: 20,
            }}
          >
            You can locate WIC and/or CalFresh offices near you.
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
              size={190}
              color="tomato"
            />
          </Text>
          <Text
            style={{
              marginTop: 20,
              padding: 20,
              textAlign: 'center',
              fontSize: 40,
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
            Determine whether your likely to be elegible for CalFresh
            benefits.
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
              size={190}
              color="tomato"
            />
          </Text>
          <Text
            style={{
              marginTop: 20,
              padding: 20,
              textAlign: 'center',
              fontSize: 40,
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
            Determine whether your likely to be elegible for WIC
            benefits.
          </Text>
          <OnboardButton title="Got it!" onPress={toggleStart} />
        </View>
      </Carousel>
    </OnboardScreen>
  );
};

Onboard.propTypes = {
  orientation: shape({
    scale: number,
    height: number.isRequired,
    width: number.isRequired,
    fontScale: number,
  }).isRequired,
  toggleStart: func.isRequired,
};

export default Onboard;
