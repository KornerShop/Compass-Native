import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import NavigationProvider from './components/NavigationProvider'
import Welcome from './screens/Welcome'

import {setLanguagePreference} from './redux/actions/actions'

class Main extends React.Component {
  constructor() {
    super()
    this.state = {
      started: false,
    }
  }
  toggleStart() {
    this.setState({started: !this.state.started})
  }
  render() {
    // if ('check asyncStorage has language') {
    //   this.setState({started: !this.state.started})
    //   // dispatch action to update language
    // }
    return this.state.started
      ? <NavigationProvider />
      : <Welcome toggleStart={this.toggleStart.bind(this)} />
  }
}

const mapDispatchToProps = dispatch => ({
  setLanguagePreference: bindActionCreators(setLanguagePreference, dispatch),
})

export default connect(null, mapDispatchToProps)(Main)
