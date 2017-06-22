import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {AsyncStorage, ActivityIndicator, View, StyleSheet} from 'react-native'

import NavigationProvider from './components/NavigationProvider'
import Welcome from './screens/Welcome'

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
  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator color="tomato" size="large" />
        </View>
      )
    }
    return this.state.started
      ? <NavigationProvider />
      : <Welcome toggleStart={this.toggleStart.bind(this)} />
  }
}

const mapDispatchToProps = dispatch => ({
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
