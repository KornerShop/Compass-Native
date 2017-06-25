import React from 'react'
import {func} from 'prop-types'

import {Button} from 'react-native-elements'

const EligibilityButton = props =>
  <Button
    fontSize={22}
    buttonStyle={{
      paddingVertical: 15,
      paddingHorizontal: 60,
    }}
    containerViewStyle={{
      borderRadius: 60,
    }}
    backgroundColor="tomato"
    borderRadius={60}
    color="white"
    raised={false}
    title="Recheck"
    accessibilityLabel="Check your eligibility again"
    onPress={() => props.updateWicEligibility(0)}
  />

EligibilityButton.propTypes = {
  updateWicEligibility: func.isRequired,
}

export default EligibilityButton
