import {createAction} from 'redux-actions'

import * as types from './types'

export const setLanguagePreference = pref =>
  createAction(types.SET_LANGUAGE_PREFERENCE)(pref)

export const toggleLocationPermission = perm =>
  createAction(types.TOGGLE_LOCATION_PERMISSION)(perm)

export const updateZipcode = zip => createAction(types.UPDATE_ZIPCODE)(zip)

export const populateSnapOffices = offices =>
  createAction(types.POPULATE_SNAP_OFFICES)(offices)

export const populateWicOffices = offices =>
  createAction(types.POPULATE_WIC_OFFICES)(offices)

export const toggleWicEligibility = eligible =>
  createAction(types.TOGGLE_WIC_ELIGIBILITY)(eligible)
