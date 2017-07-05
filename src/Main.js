import React, {Component} from 'react'
import {func} from 'prop-types'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {
  AsyncStorage,
  ActivityIndicator,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native'

import NavigationProvider from './containers/NavigationProvider'
import Welcome from './screens/Welcome'
import {ActivityIndicatorWrapper} from './components/styled/Styled'

import {updateOrientation} from './redux/actions/actions'
import {setLanguagePreference} from './redux/actions/actions'

import {cacheImages} from './utilities/cacheAssetsAsync'

class Main extends Component {
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
  async getLanguage() {
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

  async _loadAssetsAsync() {
    await cacheImages([
      require('./assets/shopper.png'),
      require('./assets/snap1.jpg'),
      require('./assets/wic1.jpeg'),
    ])
    this.setState({
      isLoading: false,
    })
  }
  componentWillMount() {
    // Not ideal, but this action is necessary for getting the initial orientation of the device
    this.props.updateOrientation(Dimensions.get('window'))
    this._loadAssetsAsync()
  }
  renderRoot(Component) {
    return (
      <View
        style={{flex: 1}}
        onLayout={() => this.props.updateOrientation(Dimensions.get('window'))}
      >
        <Component toggleStart={this.toggleStart.bind(this)} />
      </View>
    )
  }
  render() {
    if (this.state.isLoading) {
      return (
        <ActivityIndicatorWrapper>
          <ActivityIndicator color="#00897b" size="large" />
        </ActivityIndicatorWrapper>
      )
    }
    return this.state.started
      ? this.renderRoot(NavigationProvider)
      : this.renderRoot(Welcome)
  }
}

Main.propTypes = {
  updateOrientation: func.isRequired,
  setLanguagePreference: func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  updateOrientation: bindActionCreators(updateOrientation, dispatch),
  setLanguagePreference: bindActionCreators(setLanguagePreference, dispatch),
})

export default connect(null, mapDispatchToProps)(Main)
