import React, { Component } from 'react';
import { number, func, shape, oneOf } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateWicEligibility } from '../redux/actions/actions';
import { getFoodBanks } from '../redux/actions/actionCreators';

import WicForm from '../containers/WicForm';
import Eligible from '../containers/Eligible';
import Ineligible from '../containers/Ineligible';

class Wic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      familySize: '',
      income: '',
      lifeEvents: 2,
      familySizeValid: null,
      incomeValid: null,
      lifeEventsValid: null,
    };
    this.updateLifeEvents = this.updateLifeEvents.bind(this);
    this.updateState = this.updateState.bind(this);
    this.checkEligibility = this.checkEligibility.bind(this);
  }
  updateState(obj) {
    this.setState(obj);
  }
  updateLifeEvents(idx) {
    this.setState({
      lifeEvents: idx,
      lifeEventsValid: true,
    });
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
    ];
    if (
      lifeEvents === 0 &&
      familySize <= 8 &&
      income <= qualifyingIncomes[familySize]
    ) {
      this.props.updateWicEligibility(1);
    } else {
      this.props.updateWicEligibility(2);
    }
  }
  render() {
    if (this.props.wicEligible === 0) {
      return (
        <WicForm
          language={this.props.language}
          orientation={this.props.orientation}
          familySize={this.state.familySize}
          familySizeValid={this.state.familySizeValid}
          income={this.state.income}
          incomeValid={this.state.incomeValid}
          lifeEvents={this.state.lifeEvents}
          formValid={this.state.formValid}
          lifeEventsValid={this.state.lifeEventsValid}
          updateLifeEvents={this.updateLifeEvents}
          updateState={this.updateState}
          checkEligibility={this.checkEligibility}
        />
      );
    } else if (this.props.wicEligible === 1) {
      return (
        <Eligible
          language={this.props.language}
          updateWicEligibility={this.props.updateWicEligibility}
        />
      );
    }
    return (
      <Ineligible
        language={this.props.language}
        updateWicEligibility={this.props.updateWicEligibility}
        foodBanks={this.props.foodBanks}
        getFoodBanks={this.props.getFoodBanks}
        office={2}
      />
    );
  }
}

Wic.propTypes = {
  wicEligible: oneOf([0, 1, 2]).isRequired,
  orientation: shape({
    scale: number.isRequired,
    height: number.isRequired,
    width: number.isRequired,
    fontScale: number.isRequired,
  }).isRequired,
  updateWicEligibility: func.isRequired,
  language: oneOf(['es', 'en']).isRequired,
};

const mapStateToProps = ({ wicEligible, orientation, language, foodBanks }) => ({
  wicEligible,
  orientation,
  language,
  foodBanks
});

const mapDispatchToProps = dispatch => ({
  updateWicEligibility: bindActionCreators(
    updateWicEligibility,
    dispatch,
  ),
  getFoodBanks: bindActionCreators(
    getFoodBanks,
    dispatch,
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Wic);
