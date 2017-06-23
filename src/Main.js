import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import styled from 'styled-components/native'

import {
  AsyncStorage,
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'

import NavigationProvider from './components/NavigationProvider'
import Welcome from './screens/Welcome'

import {updateOrientation} from './redux/actions/actions'
import {setLanguagePreference} from './redux/actions/actions'

const ActivityIndicatorWrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      started: false,
      isLoading: true,
    }
  }
  toggleStart() {
    this.setState({started: !this.state.started})
  }
  async componentWillMount() {
    // Not ideal, but this action is necessary for getting the initial orientation of the device
    this.props.updateOrientation(Dimensions.get('window'))
    try {
      const language = await AsyncStorage.getItem('language')
      this.setState({
        isLoading: false,
      })
      if (language) {
        this.setState({
          started: true,
        })
        setLanguagePreference(language)
      }
    } catch (err) {
      console.warn(err)
    }
  }
  renderRoot(Component) {
    return (
      <View
        style={{flex: 1}}
        onLayout={() => this.props.updateOrientation(Dimensions.get('window'))}>
        <Component toggleStart={this.toggleStart.bind(this)} />
      </View>
    )
  }
  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicatorWrapper>
          <ActivityIndicator color="tomato" size="large" />
        </ActivityIndicatorWrapper>
      )
    }
    return this.state.started
      ? this.renderRoot(NavigationProvider)
      : this.renderRoot(Welcome)
  }
}

const mapDispatchToProps = dispatch => ({
  updateOrientation: bindActionCreators(updateOrientation, dispatch),
  setLanguagePreference: bindActionCreators(setLanguagePreference, dispatch),
})

export default connect(null, mapDispatchToProps)(Main)
