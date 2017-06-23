import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

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
    } catch (error) {
      console.warn(error)
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
        <View style={styles.loader}>
          <ActivityIndicator color="tomato" size="large" />
        </View>
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

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'papayawhip',
  },
})

export default connect(null, mapDispatchToProps)(Main)
