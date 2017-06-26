import React from 'react'
import {oneOf, string, bool} from 'prop-types'

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

import {
  styleSwitch,
  StyledContainer,
  FormHeader,
  textInputColor,
  textInputWrapperColor,
  OfficeText,
  StyledInput,
  InputWrapper,
  LifeEventText,
} from '../components/styled/Styled'

import SubmitButton from '../components/SubmitButton'

import languageStrings from '../utilities/localization'

const WicForm = props => {
  localizedStrings.setLanguage(props.language)
  return (
    <StyledContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag">
        <FormHeader>
          {localizedStrings.wic.header}
        </FormHeader>
        <InputWrapper valid={props.familySizeValid}>
          <StyledInput
            placeholder={localizedStrings.wic.householdSize}
            placeholderTextColor="#90A4AE"
            underlineColorAndroid="rgba(0,0,0,0)"
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
            placeholder={localizedStrings.wic.income}
            placeholderTextColor="#90A4AE"
            underlineColorAndroid="rgba(0,0,0,0)"
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
          {localizedStrings.wic.lifeEvents}
        </LifeEventText>
        <ButtonGroup
          buttons={[{localizedStrings.wic.yes}, {localizedStrings.wic.no}]}
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
          title={localizedStrings.buttons.submit}
          accessibility={localizedStrings.buttons.accessibilitySubmit}
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
  )
}

WicForm.propTypes = {
  familySize: string.isRequired,
  income: string.isRequired,
  lifeEvents: oneOf([0, 1, 2]),
  familySizeValid: bool.isRequired,
  incomeValid: bool.isRequired,
  lifeEventsValid: bool.isRequired,
  language: oneOf(['en', 'es']),
}

export default WicForm
