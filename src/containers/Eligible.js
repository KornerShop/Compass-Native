import React from 'react'
import {func} from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {ScrollView, Text, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'

import {updateWicEligibility} from '../redux/actions/actions'

import {StyledContainer} from '../components/styled/Styled'
import EligibilityButton from '../components/EligibilityButton'

const Eligible = props =>
  <StyledContainer>
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
      <Text
        style={{
          fontSize: 100,
          marginVertical: 120,
        }}>
        👍
      </Text>
      <EligibilityButton updateWicEligibility={props.updateWicEligibility} />
    </ScrollView>
  </StyledContainer>

Eligible.propTypes = {
  updateWicEligibility: func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  updateWicEligibility: bindActionCreators(updateWicEligibility, dispatch),
})

export default connect(null, mapDispatchToProps)(Eligible)
