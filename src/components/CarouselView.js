import React, { Component } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Platform } from 'react-native';

class CarouselView extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <View
        style={[
          {
            backgroundColor: 'white',
            marginTop: 120,
            alignItems: 'center',
            flexDirection: 'column',
          },
          {
            height: 736,
            width: 414
          },
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
          {localizedStrings[this.props.language].onboard.officeHeader}
        </Text>
        <Text
          style={{
            padding: 30,
            textAlign: 'center',
            fontSize: 20,
          }}
        >
          {localizedStrings[this.props.language].onboard.officeText}
        </Text>
        {this.props.OnboardButton}
      </View>
    )
  }
}

export default CarouselView
