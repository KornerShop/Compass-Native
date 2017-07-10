import {
  updateMapLoading,
  updateLocation,
  populateSNAP,
  populateWIC
} from './actions'

import {
  fetchZipCodeCoords,
  fetchResults
} from '../../utilities/mapUtils'

const updateOffices = (dispatch, officeNum) => {
  const offices = await fetchResults(latitude, longitude, keyword)
  if (officeNum === 1) {
    dispatch(populateSNAP(offices))
  } else {
    dispatch(populateWIC(offices))
  }
  dispatch(updateMapLoading(false))
}

export const fetchOffices = bool => {
  return async (dispatch, getState) => {
    dispatch(updateMapLoading(true))
    const {office, zipCode} = getState()
    if (bool) {
      var {lat: latitude, lng: longitude} = await fetchZipCodeCoords(
        zipCode
      )
    } else {
      var {latitude, longitude} = getState().location
    }
    dispatch(updateLocation({latitude, longitude}))
    updateOffices(dispatch, office)
  }
}
