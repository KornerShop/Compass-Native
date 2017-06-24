import React, {Component} from 'react'
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

import {cacheImages} from '../utilities/cacheAssetsAsync'

import {setLanguagePreference} from '../redux/actions/actions'

// map
// translations
// submit button on form
// lock in form style
// eligible and ineligible screens
// test on Android
// uncomment out get AsyncStorage in Main.js
// take stock of issues, re-organize via waffle
// organize code
// tests
// look into reprecussions of ejecting w/ regard to pushing to app stores
// smile - we can do it!

const ActivityIndicatorWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const BackgroundImage = props =>
  <Image>
    {props.children}
  </Image>

const WelcomeUIContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-content: center;
`

const Logo = styled.Text`
  text-align: center;
  font-size: 65;
  font-weight: 500;
  color: white;
  background-color: transparent;
  margin-bottom: 30
`

class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      selectedLanguage: 2,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width,
    }
  }
  async _loadAssetsAsync() {
    await cacheImages([require('../assets/shopper.png')])
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
  componentWillMount() {
    this._loadAssetsAsync()
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content" />
        <Image
          onLoad={() => this.setState({isLoading: false})}
          source={require('../assets/shopper.jpg')}
          tintColor={'red'}
          style={{
            flex: 1,
            height: this.state.height,
            width: this.state.width,
            resizeMode: 'cover',
          }}
          onLayout={() => {
            this.setState({
              height: Dimensions.get('window').height,
              width: Dimensions.get('window').width,
            })
          }}>
          {this.state.isLoading
            ? <ActivityIndicatorWrapper>
                <ActivityIndicator color="tomato" size="large" />
              </ActivityIndicatorWrapper>
            : <WelcomeUIContainer>
                <Logo>
                  C<FontAwesome name="compass" size={52} color="white" />mpass
                </Logo>
                <ButtonGroup
                  onPress={this.updateIndex.bind(this)}
                  selectedIndex={this.state.selectedLanguage}
                  buttons={['English', 'Español']}
                  textStyle={{color: 'white', fontSize: 22, fontWeight: 'bold'}}
                  selectedTextStyle={{color: 'slategray'}}
                  innerBorderStyle={{
                    color: 'white',
                    width: 4,
                  }}
                  containerStyle={{
                    height: 60,
                    marginTop: 30,
                    backgroundColor: 'transparent',
                    borderWidth: 4,
                    borderRadius: 7,
                    borderColor: 'white',
                    width: 300,
                    alignSelf: 'center',
                  }}
                  selectedBackgroundColor="white"
                />
              </WelcomeUIContainer>}
        </Image>
      </View>
    )
  }
}

const mapStateToProps = ({orientation}) => ({orientation})

const mapDispatchToProps = dispatch => ({
  setLanguagePreference: bindActionCreators(setLanguagePreference, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
