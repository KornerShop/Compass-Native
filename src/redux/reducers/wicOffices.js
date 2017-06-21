import initState from '../initialState'
import {POPULATE_WIC_OFFICES} from '../actions/types'

export default (state = initState.wicOffices, {type, payload}) => {
  switch (type) {
    case POPULATE_WIC_OFFICES:
      // ensure payload is an array
      return payload
    default:
      return state
  }
}
