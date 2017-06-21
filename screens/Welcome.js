import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {View, Text, StyleSheet} from 'react-native'
import {ButtonGroup} from 'react-native-elements'

import {setLanguagePreference} from '../redux/actions/actions'

class Welcome extends Component {
  constructor(props) {
    super(props)
  }
  // Updates language preference, triggering the tabbed UI to render
  updateIndex(idx) {
    // Dispatch action to change the language key on our redux store,
    // which would hopefully update the 'selected' on line 26
    // if it doesn't, let's talk
    const language = idx === 1 ? 'es' : 'en'
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

const styles = StyleSheet.create({})

const mapStateToProps = ({language}) => {
  language
}

const mapDispatchToProps = dispatch => {
  setLanguagePreference: bindActionCreators(setLanguagePreference, dispatch)
}

export default connect()(Welcome)
