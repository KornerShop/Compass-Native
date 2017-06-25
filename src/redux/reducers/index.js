import {combineReducers} from 'redux'

import language from './language'
import locationPermission from './locationPermission'
import zipCode from './zipCode'
import snapOffices from './snapOffices'
import wicOffices from './wicOffices'
import wicEligible from './wicEligible'
import location from './location'
import orientation from './orientation'
import office from './office'

export default combineReducers({
  language,
  locationPermission,
  zipCode,
  snapOffices,
  wicOffices,
  wicEligible,
  orientation,
  location,
  office,
})
