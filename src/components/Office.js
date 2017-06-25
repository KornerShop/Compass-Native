import React, {Component} from 'react'
import {
  Image,
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
  TouchableHighlight,
} from 'react-native'
import styled from 'styled-components/native'

import ZipModal from './ZipModal'

const ImageContainer = styled.Image`
	flex: 1;
	justify-content: center;
	align-items: center;
	width: ${props => props.width};
	height: ${props => props.height};
`

const OfficeText = styled.Text`
	font-size: 65;
  font-weight: 300;
  color: white;
  background-color: transparent;
`

export default class Office extends Component {
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <StatusBar barStyle="light-content" />
        <View style={{flex: 0.5}}>
          <TouchableHighlight
            style={{flex: 1}}
            onPress={async () => {
              await this.props.getLocationAsync()
              this.props.updateOffice(1)
            }}>
            <ImageContainer
              height={this.props.height / 2}
              width={this.props.width}
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
              await this.props.getLocationAsync()
              this.props.updateOffice(2)
            }}>
            <ImageContainer
              height={this.props.height / 2}
              width={this.props.width}
              source={require('../assets/wic1.jpg')}
              resizeMode="cover">
              <OfficeText>
                WIC
              </OfficeText>
            </ImageContainer>
          </TouchableHighlight>
        </View>
        <ZipModal
          zipValid={this.props.zipValid}
          updateZipCode={this.props.updateZipCode}
          modalVisible={this.props.modalVisible}
          updateState={this.props.updateState}
        />
      </View>
    )
  }
}
