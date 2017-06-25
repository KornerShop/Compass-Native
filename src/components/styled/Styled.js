import React from 'react'
import styled from 'styled-components'

import {View, Text, Image} from 'react-native'

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
      return '1px solid papayawhip'
    case true:
      return '1px solid papayawhip'
    case false:
      return '1px solid tomato'
  }
}

export const StyledContainer = styled.View`
  flex: 1;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
`
export const ImageContainer = styled.Image`
	flex: 1;
	justify-content: center;
	align-items: center;
	width: ${props => props.width};
	height: ${props => props.height};
`

export const OfficeText = styled.Text`
	font-size: 65;
  font-weight: 300;
  color: white;
  background-color: transparent;
`

export const StyledInput = styled.TextInput`
  font-size: 18px;
  font-weight: 300;
  color: ${props => textInputColor(props.valid)};
  height: 30px;
`

export const InputWrapper = styled.View`
  border: ${props => textInputWrapperColor(props.valid)};
  border-radius: 5px;
	padding: 10px;
  margin: 20px;
  background-color: papayawhip;
`

export const LifeEventText = styled.Text`
  text-align: center;
  font-size: 18;
  font-weight: 300;
  margin-top: 15;
  margin-bottom: 10;
`
