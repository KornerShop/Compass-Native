import React from 'react'
import {AsyncStorage} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import WicForm from '../components/WicForm'
import {updateWicEligibility} from '../redux/actions/actions'
// Todo:
// Connect to Redux and push eligibility to store -> done
// Persist eligibility to async storage -> done
// Conditionally render "you're eligible && you're not eligible components"
// Add 'check again' component to retry

class Wic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      zip: '',
      familySize: '',
      income: '',
      lifeEvents: 5,
      zipValid: true,
      familySizeValid: true,
      incomeValid: true,
      lifeEventsValid: true,
      // shouldn't this start as false?
      formValid: false,
    }
  }
  updateState(obj) {
    this.setState(obj)
  }
  updateLifeEvents(idx) {
    this.setState({
      lifeEvents: idx,
      lifeEventsValid: true,
    })
  }

  checkEligibility(lifeEvents, familySize, income) {
    const qualifyingIncomes = [
      0,
      1832,
      2470,
      3108,
      3747,
      4385,
      5023,
      5663,
      6304,
    ]
    if (
      lifeEvents === 0 &&
      familySize <= 8 &&
      income <= qualifyingIncomes[familySize]
    ) {
      this.props.updateWicEligibility(1)
    } else {
      this.props.updateWicEligibility(2)
    }
  }

  async setStorage() {
    try {
      await AsyncStorage.setItem('wicEligible', wicEligible)
    } catch (error) {
      console.warn(error)
    }
  }

  render() {
    return (
      <WicForm
        orientation={this.props.orientation}
        zip={this.state.zip}
        zipValid={this.state.zipValid}
        familySize={this.state.familySize}
        familySizeValid={this.state.familySizeValid}
        income={this.state.income}
        incomeValid={this.state.incomeValid}
        lifeEvents={this.state.lifeEvents}
        formValid={this.state.formValid}
        lifeEventsValid={this.state.lifeEventsValid}
        updateLifeEvents={this.updateLifeEvents.bind(this)}
        updateState={this.updateState.bind(this)}
        checkEligibility={this.checkEligibility.bind(this)}
      />
    )
  }
}

const mapStateToProps = ({wicEligible, orientation}) => ({
  wicEligible,
  orientation,
})

const mapDispatchToProps = dispatch => ({
  updateWicEligibility: bindActionCreators(updateWicEligibility, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Wic)
