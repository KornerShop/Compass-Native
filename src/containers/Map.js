import React, {Component} from 'react'
import {
  oneOf,
  object,
  bool,
  array,
  func,
} from 'prop-types'
import {connect} from 'react-redux'

import {
  Platform,
  Switch,
  Link,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import {MapView} from 'expo'
import {Foundation} from '@expo/vector-icons'
import {ButtonGroup} from 'react-native-elements'
import {ActivityIndicatorWrapper} from '../components/styled/Styled'
import MarkerView from '../components/MarkerView'

import localizedStrings from '../utilities/localization'

class Map extends Component {
  constructor(props) {
    super(props)
  }
  async updateIndex(idx) {
    if (idx === 2) {
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
            backgroundColor:
              Platform.OS === 'ios'
                ? '#F9F5ED'
                : '#F0EDE5',
          }}>
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
              color: 'mediumturquoise',
              fontWeight: 'bold',
              fontSize: 15,
            }}
            innerBorderStyle={{
              color: 'mediumturquoise',
            }}
            containerStyle={{
              alignSelf: 'center',
              marginTop: 35,
              borderWidth: 3,
              borderRadius: 5,
              borderColor: 'mediumturquoise',
              backgroundColor: 'transparent',
              height: 40,
              marginLeft: 30,
              marginRight: 30,
            }}
            selectedTextStyle={{color: 'white'}}
            selectedBackgroundColor="mediumturquoise"
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
            region={this.props.region}>
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
            language={props.language}
            zipCode={props.zipCode}
            zipValid={props.zipValid}
            updateZipCode={props.updateZipCode}
            modalVisible={props.modalVisible}
            updateState={props.updateState}
            fetchOffices={props.fetchOffices}
            toggleLocationProvided={
              props.toggleLocationProvided
            }
            toggleModalVisibility={
              props.toggleModalVisibility
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
  language: oneOf(['en', 'es']).isRequired,
  location: object.isRequired,
  fetchOffices: func.isRequired,
  office: oneOf([0, 1, 2]).isRequired,
  updateOffice: func.isRequired,
  snapOffices: array.isRequired,
  wicOffices: array.isRequired,
  mapLoading: bool.isRequired,
}

export default Map
