import {createAction} from 'redux-actions'

import * as types from './types'

import getLayoutInfo from '../../utilities/orientation'

export const setLanguagePreference = pref =>
	createAction(types.SET_LANGUAGE_PREFERENCE)(pref)

export const toggleLocationPermission = perm =>
	createAction(types.TOGGLE_LOCATION_PERMISSION)(perm)

export const updateZipcode = zip => createAction(types.UPDATE_ZIPCODE)(zip)

export const populateSnapOffices = offices =>
	createAction(types.POPULATE_SNAP_OFFICES)(offices)

export const populateWicOffices = offices =>
	createAction(types.POPULATE_WIC_OFFICES)(offices)

export const updateWicEligibility = eligible =>
	createAction(types.UPDATE_WIC_ELIGIBILITY)(eligible)

export const updateOrientation = dimensions =>
	createAction(types.UPDATE_ORIENTATION)(getLayoutInfo(dimensions))

export const updateLocation = location => {
	createAction(types.UPDATE_LOCATION)(regionFrom(location))
}

export const updateOffice = office => createAction(types.UPDATE_OFFICE)(office)
