import React from 'react'
import {View, Text, TextInput, StyleSheet} from 'react-native'
import {ButtonGroup} from 'react-native-elements'

export default class Wic extends React.Component {
  constructor() {
    super()
    this.state = {
      zip: '',
      familySize: '',
      income: '',
      lifeEvents: '',
    }
  }

  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={zip => this.setState({zip: zip})}
          value={this.state.zip}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={familySize => this.setState({familySize: familySize})}
          value={this.state.familySize}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={income => this.setState({income: income})}
          value={this.state.income}
        />
        <Text>
          Does at least one of the following describe someone in your household:{' '}
          1) pregnant 2) has had a baby (or been pregnant) within the last 6
          months
          3) is currently breastfeeding a baby that is less than 12 months old
          4) is a baby, child or foster child under the age of 5?{' '}
        </Text>
        <ButtonGroup
          buttons={['English', 'Español']}
          containerStyle={{height: 150}}
        />
      </View>
    )
  }
}

// selectedIndex={this.props.language === 'en' ? 0 : 1}
// onPress={onPress={this.setState(
//  {lifeEvents: selectedIndex})}
// }
