import React from 'react'
import {string, func} from 'prop-types'

import {Button} from 'react-native-elements'

const EligibilityButton = props =>
  <Button
    title={props.title}
    raised
    textStyle={{color: 'white'}}
    buttonStyle={{
      backgroundColor: 'tomato',
    }}
    containerViewStyle={{
      marginRight: 20,
      marginLeft: 20,
      borderRadius: 5,
    }}
    borderRadius={5}
    fontSize={18}
    accessibilityLabel={props.accessibility}
    onPress={() => props.updateWicEligibility(0)}
  />

EligibilityButton.propTypes = {
  updateWicEligibility: func.isRequired,
  accessibility: string.isRequired,
  title: string.isRequired,
}

export default EligibilityButton
