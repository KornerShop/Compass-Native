import React, {Component} from 'react'
import {func, object} from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {
  Image,
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import {ButtonGroup} from 'react-native-elements'
import styled from 'styled-components/native'

import {setLanguagePreference} from '../redux/actions/actions'

import {
  ActivityIndicatorWrapper,
  WelcomeUIWrapper,
  Logo,
} from '../components/styled/Styled'

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      selectedLanguage: 2,
    }
  }

  async updateIndex(idx) {
    this.setState({selectedLanguage: idx})
    const language = idx === 1 ? 'es' : 'en'
    try {
      await AsyncStorage.setItem('language', language)
    } catch (error) {
      console.warn(error)
    }
    this.props.setLanguagePreference(language)
    this.props.toggleStart()
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <Image
          onLoad={() => this.setState({isLoading: false})}
          source={require('../assets/shopper.png')}
          style={{
            flex: 1,
            height: this.props.orientation.height,
            width: this.props.orientation.width,
            resizeMode: 'cover',
          }}>
          {this.state.isLoading
            ? <ActivityIndicatorWrapper>
                <ActivityIndicator
                  color="#00897b"
                  size="large"
                />
              </ActivityIndicatorWrapper>
            : <WelcomeUIWrapper>
                <Logo>
                  C<FontAwesome
                    name="compass"
                    size={47}
                    color="white"
                  />mpass
                </Logo>
                <ButtonGroup
                  onPress={this.updateIndex.bind(this)}
                  selectedIndex={
                    this.state.selectedLanguage
                  }
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
    )
  }
}

Welcome.propTypes = {
  setLanguagePreference: func.isRequired,
  toggleStart: func.isRequired,
  orientation: object.isRequired,
}

const mapStateToProps = ({orientation}) => ({
  orientation,
})

const mapDispatchToProps = dispatch => ({
  setLanguagePreference: bindActionCreators(
    setLanguagePreference,
    dispatch
  ),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  Welcome
)
