import React, { Component } from 'react';
import { func, number, object, shape } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Image,
  View,
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ButtonGroup } from 'react-native-elements';

import { updateLanguage } from '../redux/actions/actionCreators';

import Onboard from '../containers/Onboard';

import {
  ActivityIndicatorWrapper,
  WelcomeUIWrapper,
  Logo,
} from '../components/styled/Styled';

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      selectedLanguage: 2,
      onboard: false,
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  async updateIndex(idx) {
    this.setState({ selectedLanguage: idx, onboard: true });
    const language = idx === 1 ? 'es' : 'en';
    try {
      await AsyncStorage.setItem('language', language);
    } catch (error) {
      console.warn(error);
    }
    this.props.updateLanguage(this.props.socket, language);
  }
  render() {
    if (!this.state.onboard) {
      return (
        <View style={{ flex: 1 }}>
          <StatusBar barStyle="light-content" />
          <Image
            onLoad={() => this.setState({ isLoading: false })}
            source={require('../assets/shopper.png')}
            style={{
              flex: 1,
              height: this.props.orientation.height,
              width: this.props.orientation.width,
              resizeMode: 'cover',
            }}
          >
            {this.state.isLoading
              ? <ActivityIndicatorWrapper>
                  <ActivityIndicator color="#00897b" size="large" />
                </ActivityIndicatorWrapper>
              : <WelcomeUIWrapper accessible={false}>
                  <Logo>
                    C<FontAwesome
                      name="compass"
                      size={47}
                      color="white"
                    />mpass
                  </Logo>
                  <ButtonGroup
                    accessibilityLabel={'Select a language'}
                    accessibilityLabels="button"
                    onAccessibilityTap={this.updateIndex}
                    accessibilityTraits="button"
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedLanguage}
                    buttons={['English', 'Español']}
                    textStyle={{
                      color: 'white',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}
                    borderRadius={3}
                    selectedTextStyle={{
                      color: '#2c2c2c',
                    }}
                    innerBorderStyle={{
                      color: 'white',
                      width: 3,
                    }}
                    containerStyle={{
                      height: 50,
                      marginTop: 30,
                      backgroundColor: 'transparent',
                      borderWidth: 3,
                      borderRadius: 3,
                      borderColor: 'white',
                      width: 265,
                      alignSelf: 'center',
                    }}
                    selectedBackgroundColor="white"
                  />
                </WelcomeUIWrapper>}
          </Image>
        </View>
      );
    }
    return (
      <Onboard
        language={this.state.selectedLanguage === 1 ? 'es' : 'en'}
        orientation={this.props.orientation}
        toggleStart={this.props.toggleStart}
      />
    );
  }
}

Welcome.propTypes = {
  updateLanguage: func.isRequired,
  toggleStart: func.isRequired,
  orientation: shape({
    scale: number.isRequired,
    height: number.isRequired,
    width: number.isRequired,
    fontScale: number.isRequired,
  }).isRequired,
  socket: object.isRequired,
};

const mapStateToProps = ({ orientation }) => ({
  orientation,
});

const mapDispatchToProps = dispatch => ({
  updateLanguage: bindActionCreators(updateLanguage, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Welcome);
