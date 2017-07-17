import React, { Component } from 'react';
import { shape, number } from 'prop-types';
import { Text, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { ScreenOrientation } from 'expo';
import Carousel from 'react-native-looped-carousel';

// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
//
// import { updateOrientation } from '../redux/actions/actions';

import styled from 'styled-components/native';

const OnboardScreen = styled.View`flex: 1;`;

export default class Onboard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const orientationObj= {
      height: this.props.orientation.height,
      width: this.props.orientation.width
    }
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
          </View>
        </Carousel>
      </OnboardScreen>
    );
  }
}

Onboard.propTypes = {
  orientation: shape({
    scale: number,
    height: number.isRequired,
    width: number.isRequired,
    fontScale: number,
  }).isRequired,
};
