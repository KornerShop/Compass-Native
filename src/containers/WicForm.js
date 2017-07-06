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

import LinearGrad from '../components/LinearGradient'
import SubmitButton from '../components/SubmitButton'

import localizedStrings from '../utilities/localization'

const WicForm = props =>
  <LinearGrad>
    <StyledContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'space-around',
        }}
      >
        <FormHeader>
          {localizedStrings[props.language].wic.header}
        </FormHeader>
        <InputWrapper valid={props.familySizeValid}>
          <StyledInput
            placeholder={localizedStrings[props.language].wic.householdSize}
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
            placeholder={localizedStrings[props.language].wic.income}
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
          {localizedStrings[props.language].wic.lifeEvents}
        </LifeEventText>
        <ButtonGroup
          buttons={[
            localizedStrings[props.language].wic.yes,
            localizedStrings[props.language].wic.no,
          ]}
          selectedIndex={props.lifeEvents}
          onPress={props.updateLifeEvents}
          textStyle={{
            color: styleSwitch(props.lifeEventsValid, '#00897b', 'tomato'),
            fontWeight: 'bold',
            fontSize: 18,
          }}
          innerBorderStyle={{
            color: styleSwitch(props.lifeEventsValid, '#00897b', 'tomato'),
            width: 3,
          }}
          containerStyle={{
            height: 50,
            borderWidth: 3,
            borderRadius: 5,
            borderColor: styleSwitch(
              props.lifeEventsValid,
              '#00897b',
              'tomato'
            ),
            backgroundColor: 'transparent',
            marginRight: 20,
            marginLeft: 20,
          }}
          selectedTextStyle={{color: 'white'}}
          selectedBackgroundColor="#00897b"
        />
        <SubmitButton
          title={localizedStrings[props.language].buttons.submit}
          accessibility={
            localizedStrings[props.language].buttons.accessibilitySubmit
          }
          onPress={() => {
            // check life event button group validity
            if ([0, 1].includes(props.lifeEvents)) {
              // if selected then valid
              props.updateState({
                lifeEventsValid: true,
              })
            } else {
              // else return not valid
              props.updateState({
                lifeEventsValid: false,
              })
            }
            // check eligibility if we have a valid input for all three sections
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
              // & reset form when they press submit button && formValidity
              props.updateState({
                familySize: '',
                income: '',
                lifeEvents: 2,
                lifeEventsValid: null,
                familySizeValid: null,
                incomeValid: null,
              })
              // if not a valid form check to see which input is invalid
            } else {
              if (props.lifeEventsValid === null) {
                return props.updateState({
                  lifeEventsValid: false,
                })
              }
              if (props.familySizeValid === null) {
                return props.updateState({
                  familySizeValid: false,
                })
              }
              if (props.incomeValid === null) {
                return props.updateState({
                  incomeValid: false,
                })
              }
            }
          }}
        />
      </ScrollView>
    </StyledContainer>
  </LinearGrad>

WicForm.propTypes = {
  familySize: string.isRequired,
  income: string.isRequired,
  lifeEvents: oneOf([0, 1, 2]),
  // familySizeValid: bool.isRequired,
  // incomeValid: bool.isRequired,
  // lifeEventsValid: bool.isRequired,
  language: oneOf(['en', 'es']),
}

export default WicForm
