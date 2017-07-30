import initState from '../initialState';
import { UPDATE_ZIP_CODE } from '../actions/types';

export default (
  state = initState.zipCode,
  { type, payload },
) => {
  switch (type) {
    case UPDATE_ZIP_CODE:
      return payload;
    default:
      return state;
  }
};
