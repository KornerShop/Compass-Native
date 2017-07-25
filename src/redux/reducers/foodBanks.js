import initialState from '../initialState';
import { POPULATE_FOOD_BANKS } from '../actions/types';

export default (state = initialState.foodBanks, { type, payload }) => {
  switch (type) {
    case POPULATE_FOOD_BANKS:
      return payload;
    default:
      return state;
  }
};
