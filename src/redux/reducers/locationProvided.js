import initState from '../initialState';
import { TOGGLE_LOCATION_PROVIDED } from '../actions/types';

export default (
  state = initState.locationProvided,
  { type, payload },
) => {
  switch (type) {
    case TOGGLE_LOCATION_PROVIDED:
      return payload;
    default:
      return state;
  }
};
