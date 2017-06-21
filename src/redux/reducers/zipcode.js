import initState from '../initialState'
import {UPDATE_ZIPCODE} from '../actions/types'

export default (state = initState.zipcode, {type, payload}) => {
  switch (type) {
    case UPDATE_ZIPCODE:
      return payload
    default:
      return state
  }
}
