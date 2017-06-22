import React from 'react'

import WicForm from '../components/WicForm'

// Todo:
// Eligibilty determination
// Connect to Redux and push eligibility to store
// Persist eligibility to async storage
// Conditionally render "you're eligible && you're not eligible components"
// Add 'check again' component to retry

export default class Wic extends React.Component {
  constructor() {
    super()
    this.state = {
      zip: '',
      familySize: '',
      income: '',
      lifeEvents: 5,
      zipValid: true,
      familySizeValid: true,
      incomeValid: true,
      lifeEventsValid: true,
      formValid: true,
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
  render() {
    return (
      <WicForm
        zip={this.state.zip}
        zipValid={this.state.zipValid}
        familySize={this.state.familySize}
        familySizeValid={this.state.familySizeValid}
        income={this.state.income}
        incomeValid={this.state.incomeValid}
        lifeEvents={this.state.lifeEvents}
        updateLifeEvents={this.updateLifeEvents.bind(this)}
        lifeEventsValid={this.state.lifeEventsValid}
        updateState={this.updateState.bind(this)}
      />
    )
  }
}
