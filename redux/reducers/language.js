import initState from '../initialState'
import {SET_LANGUAGE_PREFERENCE} from '../actions/types'

export default (state = initState.language, {type, payload}) => {
  switch (type) {
    case SET_LANGUAGE_PREFERENCE:
      return payload
    default:
      return state
  }
}
