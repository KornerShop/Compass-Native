import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, AsyncStorage} from 'react-native'
import {ButtonGroup} from 'react-native-elements'

import {setLanguagePreference} from '../redux/actions/actions'

class Welcome extends Component {
  constructor(props) {
    super(props)
  }
  async updateIndex(idx) {
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
      <ButtonGroup
        onPress={this.updateIndex.bind(this)}
        selectedIndex={this.props.language === 'en' ? 0 : 1}
        buttons={['English', 'Español']}
        containerStyle={{height: 150}}
      />
    )
  }
}

const mapStateToProps = ({language, orientation}) => ({language, orientation})

const mapDispatchToProps = dispatch => ({
  setLanguagePreference: bindActionCreators(setLanguagePreference, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
