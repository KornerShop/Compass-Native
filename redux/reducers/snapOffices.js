import initState from '../initialState'
import {POPULATE_SNAP_OFFICES} from '../actions/types'

export default (state = initState.snapOffices, {type, payload}) => {
  switch (type) {
    case POPULATE_SNAP_OFFICES:
      // ensure payload is an array
      return payload
    default:
      return state
  }
}
