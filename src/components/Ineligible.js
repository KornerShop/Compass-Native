import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components/native'
import {ScrollView, Text, StyleSheet} from 'react-native'
import {Button} from 'react-native-elements'

import {updateWicEligibility} from '../redux/actions/actions'

const StyledContainer = styled.View`
  flex: 1;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`

const Ineligible = props =>
  <StyledContainer>
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          fontSize: 100,
          marginVertical: 120,
        }}>
        👎
      </Text>
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
    </ScrollView>
  </StyledContainer>

const mapDispatchToProps = dispatch => ({
  updateWicEligibility: bindActionCreators(updateWicEligibility, dispatch),
})

export default connect(null, mapDispatchToProps)(Ineligible)
