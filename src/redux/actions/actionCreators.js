import {fetchResults} from '../../utilities/mapUtils'

export const updateLocation = location => {
  return dispatch => dispatch({type: 'UPDATE_LOCATION', payload: location})
}

export const fetchOffices = () => {
  return async (dispatch, getState) => {
    let keyword
    let actionType
    const {location, office} = getState()
    if (office === 1) {
      keyword = 'calfresh'
      actionType = 'POPULATE_SNAP_OFFICES'
    } else {
      keyword = 'wic'
      actionType = 'POPULATE_WIC_OFFICES'
    }
    const offices = await fetchResults(
      location.latitude,
      location.longitude,
      keyword
    )
    return dispatch({type: actionType, payload: offices})
  }
}
