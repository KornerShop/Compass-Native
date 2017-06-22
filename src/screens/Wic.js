import React from 'react'
import {View, Button, Text, TextInput, StyleSheet, Platform} from 'react-native'
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
      <View style={{flex: 1, justifyContent: 'space-around', padding: 40}}>
        <Text>Enter Zip code</Text>
        <TextInput
          ref={node => (this.zip = node)}
          maxLength={5}
          returnKeyType="done"
          caretHidden={true}
          keyboardType={`${Platform.OS === 'ios'
            ? 'numbers-and-punctuation'
            : 'numeric'}`}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={zip => this.setState({zip: zip})}
          onSubmitEditing={zip}
          value={this.state.zip}
        />
        <Text>
          Household size (excluding member that is age 60+, or is disabled)
        </Text>
        <TextInput
          ref={node => (this.familySize = node)}
          returnKeyType="done"
          keyboardType={`${Platform.OS === 'ios'
            ? 'numbers-and-punctuation'
            : 'numeric'}`}
          caretHidden={true}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={familySize => this.setState({familySize: familySize})}
          value={this.state.familySize}
        />

        <Text>Monthly income (including social security) in dollars $</Text>
        <TextInput
          ref={node => (this.income = node)}
          returnKeyType="done"
          keyboardType={`${Platform.OS === 'ios'
            ? 'numbers-and-punctuation'
            : 'numeric'}`}
          caretHidden={true}
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
        <ButtonGroup buttons={['Yes', 'No']} containerStyle={{height: 50}} />

        <Button
          title="Submit"
          accessibilityLabel="Submit to find out your eligibility"
          onPress={e => e.preventDefault}
        />
      </View>
    )
  }
}

// selectedIndex={this.props.language === 'en' ? 0 : 1}
// onPress={onPress={this.setState(
//  {lifeEvents: selectedIndex})}
// }
