import React, {Component} from 'react'
import {number, bool, func} from 'prop-types'

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

const Office = props => {
  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <StatusBar barStyle="light-content" />
      <View style={{flex: 0.5}}>
        <TouchableHighlight
          style={{flex: 1}}
          onPress={async () => {
            await props.getLocationAsync()
            props.updateOffice(1)
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
            await props.getLocationAsync()
            props.updateOffice(2)
          }}>
          <ImageContainer
            height={props.height / 2}
            width={props.width}
            source={require('../assets/wic1.jpg')}
            resizeMode="cover">
            <OfficeText>
              WIC
            </OfficeText>
          </ImageContainer>
        </TouchableHighlight>
      </View>
      <ZipModal
        zipCode={props.zipCode}
        zipValid={props.zipValid}
        updateZipCode={props.updateZipCode}
        modalVisible={props.modalVisible}
        updateState={props.updateState}
        toggleModalVisibility={props.toggleModalVisibility}
      />
    </View>
  )
}

Office.propTypes = {
  getLocationAsync: func.isRequired,
  updateOffice: func.isRequired,
  height: number.isRequired,
  width: number.isRequired,
  zipCode: number.isRequired,
  zipValid: bool.isRequired,
  updateZipCode: func.isRequired,
  modalVisible: bool.isRequired,
  updateState: func.isRequired,
  toggleModalVisibility: func.isRequired,
}

export default Office
