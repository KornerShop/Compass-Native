import React from 'react'
import {func} from 'prop-types'

import {Button} from 'react-native'

const SubmitButton = props =>
  <Button
    title="Submit"
    accessibilityLabel="Submit to find out your eligibility"
    onPress={props.onPress}
  />

SubmitButton.propTypes = {
  onPress: func.isRequired,
}

export default SubmitButton
