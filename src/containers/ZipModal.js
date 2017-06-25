import React from 'react'
import {number, bool, func} from 'prop-types'

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

const ZipModal = props => {
  return (
    <Modal
      style={{flex: 1}}
      animationType="slide"
      visible={props.modalVisible}
      onRequestClose={props.toggleModalVisibility}>
      <ScrollView contentContainerStyle={{flex: 1, justifyContent: 'center'}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <FormHeader>
            Find Offices Near You
          </FormHeader>
          <ZipModalEmoji>
            📍
          </ZipModalEmoji>
          <InputWrapper valid={props.zipValid}>
            <StyledInput
              placeholder="Zip Code"
              placeholderTextColor="#90A4AE"
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
            onPress={() => {
              if (props.zipValid) {
                // call geocode api, get location, push it to store, change whatever you need to in order to re-render
                // props.toggleModalVisibility
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
  toggleModalVisibility: func.isRequired,
  zipCode: number.isRequired,
  zipValid: bool.isRequired,
  updateZipCode: func.isRequired,
  updateState: func.isRequired,
}

export default ZipModal
