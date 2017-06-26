import React from 'react'
import {func} from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {ScrollView, Text, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'

import {updateWicEligibility} from '../redux/actions/actions'

import {StyledContainer, FormHeader} from '../components/styled/Styled'
import EligibilityButton from '../components/EligibilityButton'

const Ineligible = props =>
  <StyledContainer>
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <FormHeader>
        You may be ineligible, but you do have options. Go to a local office to
        learn more.{' '}
      </FormHeader>
      <Text
        style={{
          fontSize: 80,
          marginVertical: 120,
        }}>
        🏢
      </Text>
      <EligibilityButton updateWicEligibility={props.updateWicEligibility} />
    </ScrollView>
  </StyledContainer>

Ineligible.propTypes = {
  updateWicEligibility: func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  updateWicEligibility: bindActionCreators(updateWicEligibility, dispatch),
})

export default connect(null, mapDispatchToProps)(Ineligible)
