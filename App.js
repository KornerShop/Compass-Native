import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Provider} from 'react-redux'

import NavigationProvider from './components/NavigationProvider'
import Welcome from './screens/Welcome'

import store from './redux/store'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      started: false,
    }
  }
  toggleStart() {
    this.setState({started: !this.state.started})
  }
  renderRoot(Component) {
    return (
      <Provider store={store}>
        <Component toggleStart={this.toggleStart.bind(this)} />
      </Provider>
    )
  }
  render() {
    return this.state.started
      ? this.renderRoot.call(this, NavigationProvider)
      : this.renderRoot.call(this, Welcome)
  }
}
