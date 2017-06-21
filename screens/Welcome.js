import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ButtonGroup } from 'react-native-elements';


export default class Welcome extends React.Component {
  constructor () {
    super()
    this.state = {
      selectedIndex: 2
  }
  this.updateIndex = this.updateIndex.bind(this)
  }
  updateIndex (idx) {
    // Dispatch action to change the language key on our redux store,
    // which would hopefully update the 'selected' on line 26
  }

  render () {
    const buttons = ['English', 'Español']
    const {  } = this.state
    const selected = props.language === 'en' ? 0 : 1
    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selected}
        buttons={buttons}
        containerStyle={{height: 150}} />
    )
  }
}


const styles = StyleSheet.create({
  
})