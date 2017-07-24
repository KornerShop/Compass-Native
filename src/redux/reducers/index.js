import { combineReducers } from 'redux';

import language from './language';
import locationProvided from './locationProvided';
import zipCode from './zipCode';
import snapOffices from './snapOffices';
import wicOffices from './wicOffices';
import wicVendors from './wicVendors';
import wicEligible from './wicEligible';
import location from './location';
import orientation from './orientation';
import office from './office';
import mapLoading from './mapLoading';

export default combineReducers({
  language,
  locationProvided,
  zipCode,
  snapOffices,
  wicOffices,
  wicVendors,
  wicEligible,
  orientation,
  location,
  office,
  mapLoading,
});
