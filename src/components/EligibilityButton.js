import React from 'react';
import { string, func } from 'prop-types';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import localizedStrings from '../utilities/localization';

const EligibilityButton = props =>
  <View accessible={false}>
    <Button
      title={props.title}
      raised
      textStyle={{ color: 'white' }}
      buttonStyle={{
        backgroundColor: 'tomato'
      }}
      containerViewStyle={{
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 5
      }}
      borderRadius={5}
      fontSize={18}
      accessibilityLabel={
        props.ineligible
          ? localizedStrings[props.language].ineligible.header
          : localizedStrings[props.language].eligible.header
      }
      onPress={() => props.updateWicEligibility(0)}
      onAccessibilityTap={() => props.updateWicEligibility(0)}
    />
  </View>;

EligibilityButton.propTypes = {
  updateWicEligibility: func.isRequired,
  title: string.isRequired
};

export default EligibilityButton;
