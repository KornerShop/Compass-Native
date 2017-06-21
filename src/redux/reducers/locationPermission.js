import initState from '../initialState'
import {TOGGLE_LOCATION_PERMISSION} from '../actions/types'

export default (state = initState.locationPermission, {type, payload}) => {
  switch (type) {
    case TOGGLE_LOCATION_PERMISSION:
      return payload
    default:
      return state
  }
}
