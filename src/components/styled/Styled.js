import React from 'react'
import styled from 'styled-components/native'

import {View, Text, Image} from 'react-native'

export const styleSwitch = (prop, cssIfValid, cssIfInvalid) => {
  switch (prop) {
    case null:
      return cssIfValid
    case true:
      return cssIfValid
    case false:
      return cssIfInvalid
  }
}

export const textInputColor = prop => {
  switch (prop) {
    case null:
      return '#7C7A7A'
    case true:
      return '#7C7A7A'
    case false:
      return 'tomato'
  }
}

export const textInputWrapperColor = prop => {
  switch (prop) {
    case null:
      return '1px solid papayawhip'
    case true:
      return '1px solid papayawhip'
    case false:
      return '1px solid tomato'
  }
}

export const StyledContainer = styled.View`
  flex: 1;
  margin-top: 15;
  background-color: white;
  padding-top: 20;
  padding-left: 20;
  padding-right: 20;
`
export const ImageContainer = styled.Image`
  flex: 1;
  justify-content: center;
  align-items: center;
  width: ${props => props.width};
  height: ${props => props.height};
`

export const OfficeText = styled.Text`
  font-size: 60;
  font-weight: 300;
  color: #d7d2cc;
  background-color: transparent;
`

export const StyledInput = styled.TextInput`
  font-size: 18;
  font-weight: 300;
  color: ${props => textInputColor(props.valid)};
  height: 30;
  border-color: papayawhip;
`

export const InputWrapper = styled.View`
  border: ${props => textInputWrapperColor(props.valid)};
  border-radius: 5;
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 10;
  padding-right: 10;
  margin-left: 20;
  margin-right: 20;
  background-color: papayawhip;
`

export const LifeEventText = styled.Text`
  text-align: center;
  font-size: 18;
  font-weight: 300;
`

export const FormHeader = styled.Text`
  font-weight: bold;
  font-size: 20;
  text-align: center;
  padding-bottom: 10;
`

export const ZipModalEmoji = styled.Text`
  font-size: 30;
  text-align: center;
`

export const ActivityIndicatorWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const WelcomeUIWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
`

export const Logo = styled.Text`
  text-align: center;
  font-size: 65;
  font-weight: 300;
  color: white;
  background-color: transparent;
  margin-bottom: 30;
`
