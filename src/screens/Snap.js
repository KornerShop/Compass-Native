import React, {Component} from 'react'
import {WebView} from 'react-native'
import {connect} from 'react-redux'

class Snap extends Component {
  render() {
    const host = 'https://getcalfresh.org/en/apply'
    const url = this.props.language === 'en' ? host : `${host}?new_locale=es`
    return <WebView source={{uri: url}} />
  }
}

const mapStateToProps = ({language}) => ({language})

export default connect(mapStateToProps)(Snap)
