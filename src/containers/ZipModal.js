import React from 'react'
import {string, number, bool, func} from 'prop-types'

import {
  Modal,
  TouchableHighlight,
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native'

import {
  FormHeader,
  ZipModalEmoji,
  StyledInput,
  InputWrapper,
} from '../components/styled/Styled'

import SubmitButton from '../components/SubmitButton'

import localizedStrings from '../utilities/localization'

const ZipModal = props => {
  localizedStrings.setLanguage(props.language)
  return (
    <Modal
      style={{flex: 1}}
      animationType="slide"
      visible={props.modalVisible}
      onRequestClose={props.toggleModalVisibility}>
      <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <FormHeader>
            {localizedStrings.zipModal.header}
          </FormHeader>
          <ZipModalEmoji>
            📍
          </ZipModalEmoji>
          <InputWrapper valid={props.zipValid}>
            <StyledInput
              placeholder={localizedStrings.zipModal.zipCode}
              placeholderTextColor="#90A4AE"
              underlineColorAndroid="rgba(0,0,0,0)"
              value={props.zipCode}
              valid={props.zipValid}
              maxLength={5}
              returnKeyType="done"
              keyboardType={`${Platform.OS === 'ios'
                ? 'numbers-and-punctuation'
                : 'numeric'}`}
              onChangeText={zipCode => {
                props.updateZipCode(zipCode)
                if (/^9[0-6]\d\d\d$/.test(zipCode)) {
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
          <SubmitButton
            title={localizedStrings.buttons.submit}
            accessibility={localizedStrings.buttons.accessibilitySubmit}
            onPress={() => {
              if (props.zipValid && props.zipCode) {
                props.fetchOffices(true)
                props.toggleLocationProvided(true)
              }
              return null
            }}
          />
        </View>
      </ScrollView>
    </Modal>
  )
}

ZipModal.propTypes = {
  modalVisible: bool.isRequired,
  zipCode: string.isRequired,
  zipValid: bool.isRequired,
  updateZipCode: func.isRequired,
  updateState: func.isRequired,
  fetchOffices: func.isRequired,
  toggleModalVisibility: func.isRequired,
}

export default ZipModal
