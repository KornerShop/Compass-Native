import initState from '../initialState';
import { UPDATE_OFFICE } from '../actions/types';

export default (state = initState.office, { type, payload }) => {
  switch (type) {
    case UPDATE_OFFICE:
      return payload;
    default:
      return state;
  }
};
