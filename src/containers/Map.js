import React, { Component } from 'react';
import {
  string,
  oneOf,
  number,
  bool,
  object,
  shape,
  arrayOf,
  func,
} from 'prop-types';

import {
  Platform,
  StatusBar,
  View,
  ActivityIndicator,
} from 'react-native';
import { MapView } from 'expo';
import { ButtonGroup } from 'react-native-elements';

import ZipModal from './ZipModal';
import { ActivityIndicatorWrapper } from '../components/styled/Styled';
import MarkerView from '../components/MarkerView';

import localizedStrings from '../utilities/localization';

class Map extends Component {
  constructor(props) {
    super(props);
    this.updateIndex = this.updateIndex.bind(this);
  }
  componentDidMount() {
    this.props.fetchOffices();
  }
  updateIndex(idx) {
    if (idx === 2) {
      this.props.toggleModalVisibility();
    } else {
      const officeNum = idx === 0 ? 1 : 2;
      this.props.changeOffice(this.props.socket, officeNum);
      this.props.fetchOffices();
    }
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
    ];
    const offices =
      this.props.office === 1
        ? this.props.snapOffices
        : this.props.wicOffices;
    if (!this.props.mapLoading) {
      return (
        <View
          accessible={false}
          style={{
            flex: 1,
            paddingTop: 10,
            paddingBottom: 5,
            paddingHorizontal: 5,
            backgroundColor: '#2C2C2C',
          }}
        >
          <StatusBar barStyle="light-content" />
          <ButtonGroup
            onAccessibilityTap={this.updateIndex}
            accessibilityTraits="button"
            onPress={this.updateIndex}
            buttons={[
              'Calfresh',
              'WIC',
              localizedStrings[this.props.language].buttons.recheck,
            ]}
            selectedIndex={this.props.office === 1 ? 0 : 1}
            textStyle={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'merriweather-sans',
            }}
            borderRadius={2}
            buttonStyle={{
              borderWidth: 1,
              borderColor: 'white',
            }}
            innerBorderStyle={{
              width: 1,
              color: 'white',
            }}
            containerStyle={{
              alignSelf: 'center',
              marginTop: 20,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: 'white',
              backgroundColor: 'transparent',
              width: this.props.orientation.width - 10,
              borderRadius: 2,
            }}
            selectedTextStyle={{
              color: '#304352',
              borderRadius: 2,
            }}
            selectedBackgroundColor="white"
          />
          <MapView
            style={{
              flex: 1,
              borderRadius: 2,
            }}
            provider={Platform.OS === 'ios' ? null : 'google'}
            region={this.props.location}
          >
            {offices.map(office =>
              <MapView.Marker
                accessibilityLabels="button"
                pinColor={
                  colors[Math.floor(Math.random() * colors.length)]
                }
                key={office.id}
                coordinate={{
                  latitude: office.lat,
                  longitude: office.lng,
                }}
              >
                <MapView.Callout>
                  <MarkerView
                    {...office}
                    socket={this.props.socket}
                    office={this.props.office}
                    location={this.props.location}
                  />
                </MapView.Callout>
              </MapView.Marker>,
            )}
          </MapView>
          <ZipModal
            socket={this.props.socket}
            language={this.props.language}
            changeZipCode={this.props.changeZipCode}
            modalVisible={this.props.modalVisible}
            fetchOffices={this.props.fetchOffices}
            toggleLocationProvided={this.props.toggleLocationProvided}
            toggleModalVisibility={this.props.toggleModalVisibility}
          />
        </View>
      );
    }
    return (
      <ActivityIndicatorWrapper>
        <ActivityIndicator color="#00897b" size="large" />
      </ActivityIndicatorWrapper>
    );
  }
}

Map.defaultProps = {
  snapOffices: [],
  wicOffices: [],
};

Map.propTypes = {
  orientation: shape({
    scale: number.isRequired,
    height: number.isRequired,
    width: number.isRequired,
    fontScale: number.isRequired,
  }).isRequired,
  language: oneOf(['en', 'es']).isRequired,
  location: shape({
    latitude: number.isRequired,
    longitude: number.isRequired,
    latitudeDelta: number.isRequired,
    longitudeDelta: number.isRequired,
  }).isRequired,
  fetchOffices: func.isRequired,
  office: oneOf([0, 1, 2]).isRequired,
  changeOffice: func.isRequired,
  snapOffices: arrayOf(
    shape({
      id: string.isRequired,
      lat: number.isRequired,
      lng: number.isRequired,
      name: string.isRequired,
      address: string.isRequired,
      phone_local: string,
      phone_intl: string,
    }).isRequired,
  ),
  wicOffices: arrayOf(
    shape({
      id: string.isRequired,
      lat: number.isRequired,
      lng: number.isRequired,
      name: string.isRequired,
      address: string.isRequired,
      phone_local: string,
      phone_intl: string,
    }).isRequired,
  ),
  mapLoading: bool.isRequired,
  modalVisible: bool.isRequired,
  changeZipCode: func.isRequired,
  toggleModalVisibility: func.isRequired,
  toggleLocationProvided: func.isRequired,
  socket: object.isRequired,
};

export default Map;
