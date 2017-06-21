import {zipcode} from '../initialState'
import {UPDATE_ZIPCODE} from '../action/types'

export default (state = zipcode, {type, payload}) => {
  switch (type) {
    case UPDATE_ZIPCODE:
      return payload
    default:
      return state
  }
}
