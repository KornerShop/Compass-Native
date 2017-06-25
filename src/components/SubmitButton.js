import React from 'react'
import {func} from 'prop-types'

import {Button} from 'react-native-elements'

const SubmitButton = props =>
  <Button
    title="Submit"
    raised
    textStyle={{color: 'white'}}
    buttonStyle={{
      backgroundColor: 'tomato',
    }}
    containerViewStyle={{
      marginRight: 30,
      marginLeft: 30,
      borderRadius: 5,
    }}
    borderRadius={5}
    fontSize={18}
    accessibilityLabel="Find offices near you"
    onPress={props.onPress}
  />

SubmitButton.propTypes = {
  onPress: func.isRequired,
}

export default SubmitButton
