import * as types from './types';

export const setLanguagePreference = pref => ({
  type: types.SET_LANGUAGE_PREFERENCE,
  payload: pref,
});

export const toggleLocationProvided = provided => ({
  type: types.TOGGLE_LOCATION_PROVIDED,
  payload: provided,
});

export const updateZipCode = zipCode => ({
  type: types.UPDATE_ZIPCODE,
  payload: zipCode,
});

export const updateWicEligibility = eligible => ({
  type: types.UPDATE_WIC_ELIGIBILITY,
  payload: eligible,
});

export const updateOrientation = dimensions => ({
  type: types.UPDATE_ORIENTATION,
  payload: dimensions,
});

export const updateOffice = office => ({
  type: types.UPDATE_OFFICE,
  payload: office,
});

export const updateMapLoading = newState => ({
  type: types.TOGGLE_MAP_LOADING,
  payload: newState,
});

export const updateLocation = location => ({
  type: types.UPDATE_LOCATION,
  payload: location,
});

export const populateSNAP = offices => ({
  type: types.POPULATE_SNAP_OFFICES,
  payload: offices,
});

export const populateWIC = offices => ({
  type: types.POPULATE_WIC_OFFICES,
  payload: offices,
});

export const populateWICVendors = vendors => ({
  type: types.POPULATE_WIC_VENDORS,
  payload: vendors
});
