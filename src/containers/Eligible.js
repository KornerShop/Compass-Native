import React from 'react'
import {func, oneOf} from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {ScrollView, Text, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'

import {updateWicEligibility} from '../redux/actions/actions'

import {StyledContainer, FormHeader} from '../components/styled/Styled'
import EligibilityButton from '../components/EligibilityButton'

import localizedStrings from '../utilities/localization'

const Eligible = props => {
  localizedStrings.setLanguage(props.language)
  console.log(props.language)
  return (
    <StyledContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        <FormHeader>
          {localizedStrings.eligible.header}
        </FormHeader>
        <Text
          style={{
            fontSize: 80,
            marginVertical: 120,
          }}>
          👍
        </Text>
        <EligibilityButton
          title={localizedStrings.buttons.recheck}
          accessibility={localizedStrings.buttons.accessibilityRecheck}
          updateWicEligibility={props.updateWicEligibility}
        />
      </ScrollView>
    </StyledContainer>
  )
}

Eligible.propTypes = {
  updateWicEligibility: func.isRequired,
  language: oneOf(['es', 'en']).isRequired,
}

const mapDispatchToProps = dispatch => ({
  updateWicEligibility: bindActionCreators(updateWicEligibility, dispatch),
})

export default connect(null, mapDispatchToProps)(Eligible)
