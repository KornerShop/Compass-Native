import React from 'react'
import {View, Button, Text, TextInput, StyleSheet, Platform} from 'react-native'
import {ButtonGroup} from 'react-native-elements'
import styled from 'styled-components/native'

const StyledInput = styled.TextInput`
  height: 40;
  border: ${props => (props.valid ? '1px solid #7C7A7A' : '1px solid tomato')};
  color: ${props => (props.valid ? '#7C7A7A' : 'tomato')};
  padding: 10px;
`

const StyledContainer = styled.View`
  flex: 1;
  justify-content: space-around;
  padding: 35px;
`

export default class Wic extends React.Component {
  constructor() {
    super()
    this.state = {
      zip: '',
      familySize: '',
      income: '',
      lifeEvents: '',
      zipValid: true,
      familySizeValid: true,
      incomeValid: true,
      lifeEventsValid: true,
      formValid: true,
    }
  }
  render() {
    return (
      <StyledContainer>
        <Text>Enter Zip code</Text>
        <StyledInput
          value={this.state.zip}
          valid={this.state.zipValid}
          maxLength={5}
          returnKeyType="done"
          keyboardType={`${Platform.OS === 'ios'
            ? 'numbers-and-punctuation'
            : 'numeric'}`}
          onChangeText={zip => {
            this.setState({zip})
            if (/^9[0-6]\d\d\d$/.test(zip)) {
              return this.setState({
                zipValid: true,
                formValid: true,
              })
            }
            this.setState({
              zipValid: false,
              formValid: false,
            })
          }}
        />
        <Text>
          Household size (excluding member that is age 60+, or is disabled)
        </Text>
        <StyledInput
          value={this.state.familySize}
          valid={this.state.familySizeValid}
          returnKeyType="done"
          keyboardType={`${Platform.OS === 'ios'
            ? 'numbers-and-punctuation'
            : 'numeric'}`}
          onChangeText={familySize => {
            this.setState({familySize})
            if (familySize > 0 && familySize < 11) {
              return this.setState({
                familySizeValid: true,
                formValid: true,
              })
            }
            this.setState({
              familySizeValid: false,
              formValid: false,
            })
          }}
        />
        <Text>Monthly income (including social security) in dollars $</Text>
        <StyledInput
          value={this.state.income}
          valid={this.state.incomeValid}
          returnKeyType="done"
          keyboardType={`${Platform.OS === 'ios'
            ? 'numbers-and-punctuation'
            : 'numeric'}`}
          onChangeText={income => {
            this.setState({income})
            if (
              /^(?!\(.*[^)]$|[^(].*\)$)\(?\$?(0|[1-9]\d{0,2}(,?\d{3})?)(\.\d\d?)?\)?$/.test(
                parseInt(income)
              )
            ) {
              return this.setState({
                incomeValid: true,
                formValid: true,
              })
            }
            this.setState({
              incomeValid: false,
              formValid: false,
            })
          }}
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
          onPress={e => {
            e.preventDefault
          }}
        />
      </StyledContainer>
    )
  }
}
