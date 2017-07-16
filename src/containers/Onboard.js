import React from 'react';
import { shape, number } from 'prop-types';
import { Text, View } from 'react-native';
import styled from 'styled-components/native';
import Carousel from 'react-native-looped-carousel';

const OnboardScreen = styled.View`
  flex:1;
`

const Onboard = ({ orientation: { height, width } }) => {
  const orientationObj = {
    height,
    width,
  };
  console.warn(JSON.stringify(orientationObj))
  return (
    <OnboardScreen>
      <Carousel
        style={orientationObj}
        autoplay={false}
        bullets
        onAnimateNextPage={(p) => console.log(p)}
      >
        <View
          style={[{ backgroundColor: '#BADA55' }, orientationObj]}
        >
          <Text>1</Text>
        </View>
        <View style={[{ backgroundColor: 'pink' }, orientationObj]}>
          <Text>2</Text>
        </View>
        <View style={[{ backgroundColor: 'blue' }, orientationObj]}>
          <Text>3</Text>
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
};

export default Onboard;
