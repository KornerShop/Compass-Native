import React from 'react'
import styled from 'styled-components/native'
import {
  View,
  ScrollView,
  Button,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Dimensions,
} from 'react-native'
import {ButtonGroup} from 'react-native-elements'

const styleSwitch = (prop, cssIfValid, cssIfInvalid) => {
  switch (prop) {
    case '':
      return cssIfValid
    case true:
      return cssIfValid
    case false:
      return cssIfInvalid
  }
}

const textInputColor = prop => {
  switch (prop) {
    case '':
      return '#7C7A7A'
    case true:
      return '#7C7A7A'
    case false:
      return 'tomato'
  }
}

const textInputWrapperColor = prop => {
  switch (prop) {
    case '':
      return '1px solid #7C7A7A'
    case true:
      return '1px solid #7C7A7A'
    case false:
      return '1px solid tomato'
  }
}

const StyledInput = styled.TextInput`
  font-size: 18px;
  font-weight: 300;
  color: ${props => textInputColor(props.valid)}
  height: 30px;
`

const StyledContainer = styled.View`
  flex: 1;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`
const InputWrapper = styled.View`
  border: ${props => textInputWrapperColor(props.valid)};
  border-radius: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding:10px;
`

const LifeEventText = styled.Text`
  text-align: center;
  font-size: 18;
  font-weight: 300;
  margin-top: 15;
  margin-bottom: 10;
`

// if you submit and *any* of the form values '', make them invalid and thus red
// style placeholder buttons on Eligible and Ineligible and have them re-set state, thus rendering form

export default props =>
  <StyledContainer>
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag"
      contentContainerStyle={{
        justifyContent: 'space-between',
      }}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 25,
          textAlign: 'center',
          paddingVertical: 25,
        }}>
        Determine whether you're{' '}
        <Text style={{fontStyle: 'italic'}}>likely</Text> to be eligible for WIC
      </Text>
      <InputWrapper valid={props.zipValid}>
        <StyledInput
          placeholder="Zip Code"
          placeholderTextColor="#90A4AE"
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
              })
            }
            props.updateState({
              zipValid: false,
            })
          }}
        />
      </InputWrapper>
      <InputWrapper valid={props.familySizeValid}>
        <StyledInput
          placeholder="Household Size"
          placeholderTextColor="#90A4AE"
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
              })
            }
            props.updateState({
              familySizeValid: false,
            })
          }}
        />
      </InputWrapper>
      <InputWrapper valid={props.incomeValid}>
        <StyledInput
          placeholder="Monthly Income/Social Security"
          placeholderTextColor="#90A4AE"
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
              })
            }
            props.updateState({
              incomeValid: false,
            })
          }}
        />
      </InputWrapper>
      <LifeEventText>
        Are you pregnant and/or have a child under the age of 5?{' '}
      </LifeEventText>
      <ButtonGroup
        buttons={['Yes', 'No']}
        selectedIndex={props.lifeEvents}
        onPress={props.updateLifeEvents}
        textStyle={{
          color: styleSwitch(
            props.lifeEventsValid,
            'mediumturquoise',
            'tomato'
          ),
          fontWeight: 'bold',
          fontSize: 18,
        }}
        innerBorderStyle={{
          color: styleSwitch(
            props.lifeEventsValid,
            'mediumturquoise',
            'tomato'
          ),
          width: 3,
        }}
        containerStyle={{
          height: 50,
          borderWidth: 3,
          borderRadius: 30,
          borderColor: styleSwitch(
            props.lifeEventsValid,
            'mediumturquoise',
            'tomato'
          ),
          backgroundColor: 'transparent',
          marginTop: 15,
        }}
        selectedTextStyle={{color: 'white'}}
        selectedBackgroundColor="mediumturquoise"
      />

      <Button
        title="Submit"
        accessibilityLabel="Submit to find out your eligibility"
        onPress={() => {
          if ([0, 1].includes(props.lifeEvents)) {
            props.updateState({
              lifeEventsValid: true,
            })
          }
          if (
            props.lifeEventsValid &&
            props.familySizeValid &&
            props.incomeValid
          ) {
            props.checkEligibility(
              props.lifeEvents,
              props.familySize,
              props.income
            )
          } else {
            return props.updateState({
              zipValid: false,
              familySizeValid: false,
              incomeValid: false,
              lifeEventsValid: false,
            })
          }
        }}
      />
    </ScrollView>
  </StyledContainer>
