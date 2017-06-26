import React, {Component} from 'react'
import {string, number, bool, func, oneOf} from 'prop-types'

import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableHighlight,
} from 'react-native'

import ZipModal from './ZipModal'
import {ImageContainer, OfficeText} from '../components/styled/Styled'

const Office = props =>
  <View style={{flex: 1, flexDirection: 'column'}}>
    <StatusBar barStyle="light-content" />
    <View style={{flex: 0.5}}>
      <TouchableHighlight
        style={{flex: 1}}
        onPress={async () => {
          props.updateOffice(1)
          await props.getLocationAsync()
        }}>
        <ImageContainer
          height={props.height / 2}
          width={props.width}
          source={require('../assets/snap1.jpg')}
        resizeMode="cover">
          <OfficeText>
            CalFresh
          </OfficeText>
        </ImageContainer>
      </TouchableHighlight>
    </View>
    <View style={{flex: 0.5}}>
      <TouchableHighlight
        style={{flex: 1}}
        onPress={async () => {
          props.updateOffice(2)
          await props.getLocationAsync()
        }}>
        <ImageContainer
          height={props.height / 2}
          width={props.width}
          source={require('../assets/wic1.jpeg')}
          resizeMode="cover">
          <OfficeText>
            WIC
          </OfficeText>
        </ImageContainer>
      </TouchableHighlight>
    </View>
    <ZipModal
      language={props.language}
      zipCode={props.zipCode}
      zipValid={props.zipValid}
      updateZipCode={props.updateZipCode}
      modalVisible={props.modalVisible}
      updateState={props.updateState}
      fetchOffices={props.fetchOffices}
      toggleLocationProvided={props.toggleLocationProvided}
      toggleModalVisibility={props.toggleModalVisibility}
    />
  </View>

Office.propTypes = {
  getLocationAsync: func.isRequired,
  updateOffice: func.isRequired,
  height: number.isRequired,
  width: number.isRequired,
  zipCode: string.isRequired,
  zipValid: bool.isRequired,
  updateZipCode: func.isRequired,
  modalVisible: bool.isRequired,
  updateState: func.isRequired,
  fetchOffices: func.isRequired,
  toggleLocationProvided: func.isRequired,
  toggleModalVisibility: func.isRequired,
  language: oneOf(['en', 'es']).isRequired,
}

export default Office
