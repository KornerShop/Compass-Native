import React from 'react';
import { number, func, shape } from 'prop-types';
import { Text, View, Platform, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Carousel from 'react-native-looped-carousel';

import styled from 'styled-components/native';

const OnboardScreen = styled.View`flex: 1;`;

const Onboard = ({orientation: {height, width}, toggleStart}) => {
  const orientationObj= {
    height,
    width
  };
  return (
    <OnboardScreen>
      <Carousel
        style={orientationObj}
        autoplay={false}
        bullets
        onAnimateNextPage={p => console.log(p)}
      >
        <View
          style={[
            { backgroundColor: 'white' },
            orientationObj,
          ]}
        >
          <Text>
            {Platform.OS === 'ios'
              ? <Ionicons
                name="md-compass"
                size={160}
                color="#00897b"
                />
              : <Ionicons
                name="ios-locate"
                size={160}
                color="#00897b"
                />}
          </Text>
        </View>
        <View
          style={[
            { backgroundColor: 'white' },
            orientationObj,
          ]}
        >
          <Text>
            <Ionicons
              name="ios-nutrition-outline"
              size={160}
              color="#00897b"
            />
          </Text>
        </View>
        <View
          style={[
            { backgroundColor: 'white' },
            orientationObj,
          ]}
        >
          <Text>
            <Ionicons
              name="ios-woman-outline"
              size={160}
              color="#00897b"
            />
          </Text>
          <TouchableOpacity onPress={toggleStart}>
            <Text>Got it</Text>
          </TouchableOpacity>
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
  toggleStart: func.isRequired
};

export default Onboard;
