import initState from '../initialState'
import {TOGGLE_WIC_ELIGIBILITY} from '../actions/types'

export default (state = initState.wicEligible, {type, payload}) => {
  switch (type) {
    case TOGGLE_WIC_ELIGIBILITY:
      return payload
    default:
      return state
  }
}
