import React from 'react';
import { string, bool, func } from 'prop-types';

import { Button } from 'react-native-elements';

const OnboardButton = props =>
  <Button
    style={{ justifyContent: 'center', alignItems: 'center' }}
    title={props.title}
    textStyle={{
      color: 'white',
      fontSize: 22,
      textAlign:'center',
      fontWeight: 'bold',
    }}
    buttonStyle={{
      borderWidth: 1,
      width: 140,
      borderColor: 'white',
      backgroundColor: 'tomato',
    }}
    containerViewStyle={{
      marginTop:20,
      width: 500,
      borderRadius: 25,
    }}
    borderRadius={25}
    fontSize={18}
    onPress={props.onPress}
  />;

OnboardButton.propTypes = {
  title: string.isRequired,
  onPress: func.isRequired,
};

export default OnboardButton;
