import {
  POPULATE_SNAP_OFFICES,
  POPULATE_WIC_OFFICES,
  UPDATE_LOCATION,
  TOGGLE_MAP_LOADING,
} from './types'
import {fetchZipCodeCoords, fetchResults} from '../../utilities/mapUtils'

export const updateLocation = location => {
  return dispatch => dispatch({type: 'UPDATE_LOCATION', payload: location})
}

export const fetchOffices = bool => {
  return async (dispatch, getState) => {
    dispatch({type: TOGGLE_MAP_LOADING, payload: true})
    let keyword
    let actionType
    const {office, zipCode} = getState()
    if (bool) {
      var {lat: latitude, lng: longitude} = await fetchZipCodeCoords(zipCode)
    } else {
      var {latitude, longitude} = getState().location
    }
    dispatch({type: UPDATE_LOCATION, payload: {latitude, longitude}})
    if (office === 1) {
      keyword = 'calfresh'
      actionType = POPULATE_SNAP_OFFICES
    } else {
      keyword = 'wic'
      actionType = POPULATE_WIC_OFFICES
    }
    const offices = await fetchResults(latitude, longitude, keyword)
    dispatch({type: actionType, payload: offices})
    dispatch({type: TOGGLE_MAP_LOADING, payload: false})
  }
}
