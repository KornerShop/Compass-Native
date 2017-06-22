import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Wic extends React.Component {  
  constructor(){
    super();
    this.state = {
      zip: '',
      familySize:'',
      income: '',
      lifeEvents: ''
    }
  }
  
  render() {
    return(
      <View style ={styles.container}>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(zip) => this.setState({zip})}
          value={this.state.zip}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(familySize) => this.setState({familySize})}
          value={this.state.familySize}
        />
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(income) => this.setState({income})}
          value={this.state.income}
        />
        <Text>Does at least one of the following describe someone in your household: 
          1) pregnant 2) has had a baby (or been pregnant) within the last 6 months 
          3) is currently breastfeeding a baby that is less than 12 months old 
          4) is a baby, child or foster child under the age of 5? 
        </Text>
        <ButtonGroup
          onPress={onPress={this.setState(
            {lifeEvents: selectedIndex})}
          }
          selectedIndex={this.props.language === 'en' ? 0 : 1}
          buttons={['English', 'Español']}
          containerStyle={{height: 150}}
        />
      </View>
      );
    }
}
