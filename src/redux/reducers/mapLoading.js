import initState from '../initialState'
import {TOGGLE_MAP_LOADING} from '../actions/types'

export default (state = initState.mapLoading, {type, payload}) => {
  switch (type) {
    case TOGGLE_MAP_LOADING:
      return payload
    default:
      return state
  }
}
