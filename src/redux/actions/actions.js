import {createAction} from 'redux-actions'

import * as types from './types'

import getLayoutInfo from '../../utilities/orientation'

export const setLanguagePreference = pref =>
  createAction(types.SET_LANGUAGE_PREFERENCE)(pref)

export const toggleLocationPermission = perm =>
  createAction(types.TOGGLE_LOCATION_PERMISSION)(perm)

export const updateZipCode = zipCode =>
  createAction(types.UPDATE_ZIPCODE)(zipCode)

export const updateWicEligibility = eligible =>
  createAction(types.UPDATE_WIC_ELIGIBILITY)(eligible)

export const updateOrientation = dimensions =>
  createAction(types.UPDATE_ORIENTATION)(getLayoutInfo(dimensions))

export const updateOffice = office => createAction(types.UPDATE_OFFICE)(office)
