import initialState from '../initialState';
import { POPULATE_WIC_VENDORS } from '../actions/types';

export default (state = initialState.wicVendors, { type, payload }) => {
  switch (type) {
    case POPULATE_WIC_VENDORS:
      return payload;
    default:
      return state;
  }
};
