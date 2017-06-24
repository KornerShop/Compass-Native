import {updateLocation} from './actions'

export const dispatchUpdateLocation = location => {
  return dispatch => dispatch({type: 'UPDATE_LOCATION', payload: location})
}
