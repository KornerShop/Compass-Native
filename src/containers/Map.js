import React, {Component} from 'react'
import {
  string,
  oneOf,
  object,
  bool,
  array,
  func,
} from 'prop-types'
import {connect} from 'react-redux'

import {
  Platform,
  StatusBar,
  Link,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import {MapView} from 'expo'
import {Foundation} from '@expo/vector-icons'
import {ButtonGroup} from 'react-native-elements'

import ZipModal from './ZipModal'
import {ActivityIndicatorWrapper} from '../components/styled/Styled'
import MarkerView from '../components/MarkerView'

import localizedStrings from '../utilities/localization'

class Map extends Component {
  constructor(props) {
    super(props)
  }
  async updateIndex(idx) {
    if (idx === 2) {
      this.props.toggleModalVisibility()
    } else {
      const officeNum = idx === 0 ? 1 : 2
      this.props.updateOffice(officeNum)
      await this.props.fetchOffices()
    }
  }
  async componentDidMount() {
    await this.props.fetchOffices()
  }
  render() {
    const colors = [
      'coral',
      'crimson',
      'aquamarine',
      'darkturquoise',
      'deeppink',
      'indianred',
      'mediumspringgreen',
      'sandybrown',
      'plum',
      'tomato',
      'aqua',
      'palevioletred',
      'salmon',
    ]
    const offices =
      this.props.office === 1
        ? this.props.snapOffices
        : this.props.wicOffices
    if (!this.props.mapLoading) {
      return (
        <View
          style={{
            flex: 1,
            // backgroundColor:
            //   Platform.OS === 'ios'
            //     ? '#F9F5ED'
            //     : '#F0EDE5',
            marginTop: 0,
            backgroundColor: 'mediumturquoise',
          }}>
          <StatusBar hidden={true} />
          <ButtonGroup
            onPress={this.updateIndex.bind(this)}
            buttons={[
              'Calfresh',
              'WIC',
              localizedStrings[
                this.props.language
              ].buttons.recheck,
            ]}
            selectedIndex={
              this.props.office === 1 ? 0 : 1
            }
            textStyle={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
            }}
            innerBorderStyle={{
              color: 'mediumturquoise',
              width: 3,
            }}
            containerStyle={{
              alignSelf: 'center',
              marginTop: 0,
              marginBottom: 0,
              borderWidth: 0,
              borderColor: 'white',
              backgroundColor: 'transparent',
              height: 55,
              width: this.props.orientation.width,
            }}
            selectedTextStyle={{
              color: 'mediumturquoise',
            }}
            selectedBackgroundColor="white"
          />
          <MapView
            style={{
              flex: 1,
            }}
            provider={
              Platform.OS === 'ios'
                ? null
                : 'google'
            }
            region={this.props.location}>
            {offices.map(office => {
              return (
                <MapView.Marker
                  pinColor={
                    colors[
                      Math.floor(
                        Math.random() *
                          colors.length
                      )
                    ]
                  }
                  key={office.id}
                  coordinate={{
                    latitude: office.lat,
                    longitude: office.lng,
                  }}>
                  <MapView.Callout>
                    <MarkerView
                      {...office}
                      location={
                        this.props.location
                      }
                    />
                  </MapView.Callout>
                </MapView.Marker>
              )
            })}
          </MapView>
          <ZipModal
            language={this.props.language}
            zipCode={this.props.zipCode}
            zipValid={this.props.zipValid}
            updateZipCode={
              this.props.updateZipCode
            }
            modalVisible={this.props.modalVisible}
            updateState={this.props.updateState}
            fetchOffices={this.props.fetchOffices}
            toggleLocationProvided={
              this.props.toggleLocationProvided
            }
            toggleModalVisibility={
              this.props.toggleModalVisibility
            }
          />
        </View>
      )
    } else {
      return (
        <ActivityIndicatorWrapper>
          <ActivityIndicator
            color="tomato"
            size="large"
          />
        </ActivityIndicatorWrapper>
      )
    }
  }
}

Map.propTypes = {
  orientation: object.isRequired,
  language: oneOf(['en', 'es']).isRequired,
  location: object.isRequired,
  fetchOffices: func.isRequired,
  office: oneOf([0, 1, 2]).isRequired,
  updateOffice: func.isRequired,
  snapOffices: array.isRequired,
  wicOffices: array.isRequired,
  mapLoading: bool.isRequired,
  modalVisible: bool.isRequired,
  zipCode: string.isRequired,
  zipValid: bool.isRequired,
  updateZipCode: func.isRequired,
  updateState: func.isRequired,
  toggleModalVisibility: func.isRequired,
  toggleLocationProvided: func.isRequired,
}

export default Map
