import initState from '../initialState'
import {UPDATE_WIC_ELIGIBILITY} from '../actions/types'

export default (state = initState.wicEligible, {type, payload}) => {
	switch (type) {
		case UPDATE_WIC_ELIGIBILITY:
			return payload
		default:
			return state
	}
}
