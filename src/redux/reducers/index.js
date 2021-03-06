import { combineReducers } from 'redux';

import language from './language';
import locationProvided from './locationProvided';
import snapOffices from './snapOffices';
import wicOffices from './wicOffices';
import wicVendors from './wicVendors';
import wicEligible from './wicEligible';
import zipCode from './zipCode';
import location from './location';
import orientation from './orientation';
import office from './office';
import mapLoading from './mapLoading';
import foodBanks from './foodBanks'

export default combineReducers({
  language,
  locationProvided,
  zipCode,
  snapOffices,
  wicOffices,
  wicVendors,
  foodBanks,
  wicEligible,
  orientation,
  location,
  office,
  mapLoading,
});
