import {locationPermission} from '../initialState'
import {TOGGLE_LOCATION_PERMISSION} from '../action/types'

export default (state = locationPermission, {type, payload}) => {
  switch (type) {
    case TOGGLE_LOCATION_PERMISSION:
      return payload
    default:
      return state
  }
}
