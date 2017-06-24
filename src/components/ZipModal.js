import React, {Component} from 'react'
import {
  Modal,
  TouchableHighlight,
  View,
  Text,
  TextInput,
  Platform,
  Button,
} from 'react-native'
import styled from 'styled-components/native'

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
      return '1px solid papayawhip'
    case true:
      return '1px solid papayawhip'
    case false:
      return '1px solid tomato'
  }
}

const InputWrapper = styled.View`
  border: ${props => textInputWrapperColor(props.valid)};
  border-radius: 5px;
	padding: 10px;
  margin: 30px;
	background-color: papayawhip;
`

const StyledInput = styled.TextInput`
  font-size: 18px;
  font-weight: 300;
  color: ${props => textInputColor(props.valid)}
  height: 30px;
`

export default class ZipModal extends Component {
  render() {
    return (
      <Modal
        style={{flex: 1}}
        animationType="slide"
        visible={this.props.modalVisible}
        onRequestClose={this.props.toggleModalVisibility}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              textAlign: 'center',
              paddingHorizontal: 25,
            }}>
            Find offices near you
          </Text>
          <Text style={{fontSize: 30, textAlign: 'center', marginTop: 20}}>
            📍
          </Text>
          <InputWrapper valid={this.props.zipValid}>
            <StyledInput
              placeholder="Zip Code"
              placeholderTextColor="#90A4AE"
              value={this.props.zipCode}
              valid={this.props.zipValid}
              maxLength={5}
              returnKeyType="done"
              keyboardType={`${Platform.OS === 'ios'
                ? 'numbers-and-punctuation'
                : 'numeric'}`}
              onChangeText={zipCode => {
                this.props.updateZipCode(zipCode)
                if (/^9[0-6]\d\d\d$/.test(zipCode)) {
                  return this.props.updateState({
                    zipValid: true,
                  })
                }
                this.props.updateState({
                  zipValid: false,
                })
              }}
            />
          </InputWrapper>
          <Button
            title="Submit"
            style={{
              backGroundColor: 'tomato',
            }}
            accessibilityLabel="Find offices near you"
            onPress={() => {
              if ([0, 1].includes(props.lifeEvents)) {
                props.updateState({
                  lifeEventsValid: true,
                })
              }
              if (
                props.zipValid &&
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
        </View>
      </Modal>
    )
  }
}
