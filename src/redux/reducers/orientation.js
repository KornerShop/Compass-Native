import initState from '../initialState';
import { UPDATE_ORIENTATION } from '../actions/types';

export default (state = initState.orientation, { type, payload }) => {
  switch (type) {
    case UPDATE_ORIENTATION:
      return payload;
    default:
      return state;
  }
};
