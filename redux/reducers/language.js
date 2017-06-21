import {language} from '../initialState'
import {SET_LANGUAGE_PREFERENCE} from '../action/types'

export default (state = language, {type, payload}) => {
  switch (type) {
    case SET_LANGUAGE_PREFERENCE:
      return payload
    default:
      return state
  }
}
