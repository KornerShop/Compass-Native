import React from 'react'
import styled from 'styled-components/native'
import {View, Button, Text, TextInput, StyleSheet, Platform} from 'react-native'
import {ButtonGroup} from 'react-native-elements'

const StyledInput = styled.TextInput`
  height: 40px;
  border: ${props => (props.valid ? '1px solid #7C7A7A' : '1px solid tomato')};
  color: ${props => (props.valid ? '#7C7A7A' : 'tomato')};
  padding: 10px;
`

const StyledContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  padding: 35px;
`

export default props =>
  <StyledContainer>
    <Text>Enter Zip code</Text>
    <StyledInput
      value={props.zip}
      valid={props.zipValid}
      maxLength={5}
      returnKeyType="done"
      keyboardType={`${Platform.OS === 'ios'
        ? 'numbers-and-punctuation'
        : 'numeric'}`}
      onChangeText={zip => {
        props.updateState({zip})
        if (/^9[0-6]\d\d\d$/.test(zip)) {
          return props.updateState({
            zipValid: true,
            formValid: true,
          })
        }
        props.updateState({
          zipValid: false,
          formValid: false,
        })
      }}
    />
    <Text>
      Household size (excluding member that is age 60+, or is disabled)
    </Text>
    <StyledInput
      value={props.familySize}
      valid={props.familySizeValid}
      returnKeyType="done"
      keyboardType={`${Platform.OS === 'ios'
        ? 'numbers-and-punctuation'
        : 'numeric'}`}
      onChangeText={familySize => {
        props.updateState({familySize})
        if (familySize > 0 && familySize < 11) {
          return props.updateState({
            familySizeValid: true,
            formValid: true,
          })
        }
        props.updateState({
          familySizeValid: false,
          formValid: false,
        })
      }}
    />
    <Text>Monthly income (including social security) in dollars $</Text>
    <StyledInput
      value={props.income}
      valid={props.incomeValid}
      returnKeyType="done"
      keyboardType={`${Platform.OS === 'ios'
        ? 'numbers-and-punctuation'
        : 'numeric'}`}
      onChangeText={income => {
        props.updateState({income})
        if (
          /^(?!\(.*[^)]$|[^(].*\)$)\(?\$?(0|[1-9]\d{0,2}(,?\d{3})?)(\.\d\d?)?\)?$/.test(
            parseInt(income)
          )
        ) {
          return props.updateState({
            incomeValid: true,
            formValid: true,
          })
        }
        props.updateState({
          incomeValid: false,
          formValid: false,
        })
      }}
    />
    <Text>
      Does at least one of the following describe someone in your household:{' '}
      1) pregnant 2) has had a baby (or been pregnant) within the last 6
      months
      3) is currently breastfeeding a baby that is less than 12 months old
      4) is a baby, child or foster child under the age of 5?{' '}
    </Text>
    <ButtonGroup
      buttons={['Yes', 'No']}
      selectedIndex={props.lifeEvents}
      onPress={props.updateLifeEvents}
      textStyle={{
        color: props.lifeEventsValid ? 'mediumturquoise' : 'tomato',
        fontWeight: 'bold',
      }}
      innerBorderStyle={{
        color: props.lifeEventsValid ? 'mediumturquoise' : 'tomato',
        width: 3,
      }}
      containerStyle={{
        height: 50,
        borderWidth: 3,
        borderRadius: 30,
        borderColor: props.lifeEventsValid ? 'mediumturquoise' : 'tomato',
        backgroundColor: 'transparent',
        marginTop: 15,
      }}
      selectedTextStyle={{color: 'white'}}
      selectedBackgroundColor="mediumturquoise"
    />

    <Button
      title="Submit"
      accessibilityLabel="Submit to find out your eligibility"
      onPress={e => {
        e.preventDefault()
        if ([0, 1].includes(props.lifeEvents)) {
          // dispatch && re-render
        }
        return props.updateState({
          lifeEventsValid: false,
          formValid: false,
        })
      }}
    />
  </StyledContainer>
