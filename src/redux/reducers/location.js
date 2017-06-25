import initState from '../initialState'
import {UPDATE_LOCATION} from '../actions/types'

export default (state = initState.location, {type, payload}) => {
  switch (type) {
    case UPDATE_LOCATION:
      return {
        ...state,
        latitude: payload.latitude,
        longitude: payload.longitude,
      }
    default:
      return state
  }
}
