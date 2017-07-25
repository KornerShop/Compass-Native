import initState from '../initialState';
import { SET_LANGUAGE_PREFERENCE } from '../actions/types';

export default (state = initState.language, { type, payload }) => {
  console.log(`payload: ${JSON.stringify(payload, null, 2)}`)
  switch (type) {
    case SET_LANGUAGE_PREFERENCE:
      return payload;
    default:
      return state;
  }
};
