import UPDATE_LOCATION from './types'
import {updateLocation} from './actions'
import regionFrom from '../../utilities/mapUtil'

export const dispatchUpdateLocation = location => {
  return dispatch =>
    dispatch({type: 'UPDATE_LOCATION', payload: regionFrom(location)})
}
