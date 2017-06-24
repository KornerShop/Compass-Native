import React, {Component} from 'react'
import {AsyncStorage} from 'react-native'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {updateWicEligibility} from '../redux/actions/actions'

import WicForm from '../components/WicForm'
import Eligible from '../components/Eligible'
import Ineligible from '../components/Ineligible'

class Wic extends Component {
  constructor(props) {
    super(props)
    this.state = {
      familySize: '',
      income: '',
      lifeEvents: 5,
      familySizeValid: '',
      incomeValid: '',
      lifeEventsValid: '',
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
  // determines eligibility and then stores it in AsyncStorage
  checkEligibility(lifeEvents, familySize, income) {
    const qualifyingIncomes = [
      0,
      1832.0,
      2470.0,
      3108.0,
      3747.0,
      4385.0,
      5023.0,
      5663.0,
      6304.0,
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
  render() {
    switch (this.props.wicEligible) {
      case 0:
        return (
          <WicForm
            orientation={this.props.orientation}
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
      case 1:
        return <Eligible />
      case 2:
        return <Ineligible />
    }
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
