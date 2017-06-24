import {combineReducers} from 'redux'

import language from './language'
import locationPermission from './locationPermission'
import zipcode from './zipcode'
import snapOffices from './snapOffices'
import wicOffices from './wicOffices'
import wicEligible from './wicEligible'
import location from './location'
import orientation from './orientation'

export default combineReducers({
  language,
  locationPermission,
  zipcode,
  snapOffices,
  wicOffices,
  wicEligible,
  orientation,
  location,
})
