import React from 'react'
import 'prop-types'

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

import {
  styleSwitch,
  textInputColor,
  textInputWrapperColor,
  OfficeText,
  StyledInput,
  InputWrapper,
  LifeEventText,
} from '../components/styled/Styled'

export default props =>
  <StyledContainer>
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="on-drag">
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
      <SubmitButton
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
              familySizeValid: false,
              incomeValid: false,
              lifeEventsValid: false,
            })
          }
        }}
      />
    </ScrollView>
  </StyledContainer>
